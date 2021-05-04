from . import *
from app.irsystem.models.helpers import *
from app.irsystem.models.helpers import NumpyEncoder as NumpyEncoder
from .json_reader import *
from .cosine_similarity import *
from .personality_vector import *
from flask_cors import CORS
import numpy
from sklearn.feature_extraction.text import TfidfVectorizer
from .rocchio import *

project_name = "Perfect Wine Match: Find Your Perfect Wine"
net_id = "Ashley Park: ap764, Junho Kim-Lee: jk2333, Sofia Yoon: hy348, Yubin Heo: yh356"

df = json_read("app/irsystem/controllers/winemag_data_withtoks.json")
df_personality = json_read("app/irsystem/controllers/wine_personality.json")

inv_ind, idf, norms = precompute(df["toks"])
scores = get_scores(df["points"])
legend, index, mat = json_read_vector(
    "app/irsystem/controllers/wine_variety_vectors.json")

# Personality data
tokenized_personality = tokenizer_personality_data(df_personality)
tokenized_variety = tokenizer_personality_variety(df_personality)
flat_tokenized_variety = flat_tokenizer_personality_variety(df_personality)
inv_ind_person, idf_person, norms_person = precompute_personality(
    tokenized_personality)


def build_vectorizer(max_n_terms=5000, max_prop_docs=0.8, min_n_docs=10):
    """Returns a TfidfVectorizer object with certain preprocessing properties.

    Params: {max_n_terms: Integer,
             max_prop_docs: Float,
             min_n_docs: Integer}
    Returns: TfidfVectorizer
    """
    # YOUR CODE HERE
    vectorizer = TfidfVectorizer(min_df=min_n_docs,
                                 max_df=max_prop_docs,
                                 max_features=max_n_terms,
                                 stop_words='english')
    return vectorizer


tfidf_vec = build_vectorizer()
tfidf_mat = tfidf_vec.fit_transform(df['description']).toarray()
tfidf_dict = {}

matrix_index = 0
for key in df['description'].keys():
    tfidf_dict[int(key)] = tfidf_mat[matrix_index]
    matrix_index += 1

vocab_to_index = {
    v.lower(): i
    for i, v in enumerate(tfidf_vec.get_feature_names())
}
########################### Prototype 1 start ###########################

# @irsystem.route('/prototype1', methods=['GET'])
# def search():
#     name = request.args.get('name')
#     p1 = request.args.get('personality1')
#     p2 = request.args.get('personality2')
#     p3 = request.args.get('personality3')
#     p4 = request.args.get('personality4')
#     p5 = request.args.get('personality5')
#     p6 = request.args.get('personality6')
#     p7 = request.args.get('personality7')
#     p8 = request.args.get('personality8')
#     scale = [0, 1, 2, 3, 4, 5]
#     flavor = request.args.get('flavor')
#     scent = request.args.get('scent')
#     price = request.args.get('price')
#     print(price)

#     if not p1 or not p2 or not p3 or not p4 or not p5 or not p6 or not p7 or not p8:
#         personality_match = ''
#         wine_match = ''
#     else:
#         responses = [
#             int(p1),
#             int(p2),
#             int(p3),
#             int(p4),
#             int(p5),
#             int(p6),
#             int(p7),
#             int(p8)
#         ]

#     return {"personality_match": personality_match, "wine_match": wine_match}
#         wine_scores = compute_personality_vec(legend, index, mat, responses)
#         flavor_result = cossim_dict(flavor, inv_ind, idf, norms)
#         scent_result = cossim_dict(scent, inv_ind, idf, norms)
#         total = total_score(flavor_result, scent_result)

#         personality_match = compute_personality(name, wine_scores,
#                                                 df_personality)
#         wine_match = compute_wine(name, wine_scores, total, df, 5, price)

#     return render_template('search.html',
#                            name=project_name,
#                            user_name=name,
#                            netid=net_id,
#                            scale=scale,
#                            personality_match=personality_match,
#                            wine_match=wine_match)

########################### Prototype 1 end ###########################


@irsystem.route('/search', methods=['GET'])
def search():
    name = request.args.get('name')
    # personality = request.args.getAll('personality')
    p1 = request.args.get('personality1')
    p2 = request.args.get('personality2')
    p3 = request.args.get('personality3')
    p4 = request.args.get('personality4')
    p5 = request.args.get('personality5')
    p6 = request.args.get('personality6')
    p7 = request.args.get('personality7')
    p8 = request.args.get('personality8')
    scale = [1, 2, 3, 4, 5]
    flavor = request.args.get('flavor')
    scent = request.args.get('scent')
    price = request.args.get('price')

    # responses = []
    # for p in personality:
    #     if p == '':
    #         personality_match = ''
    #         wine_match = ''
    #     else:
    #         responses.append(int(p))

    if not p1 or not p2 or not p3 or not p4 or not p5 or not p6 or not p7 or not p8:
        personality_match = ''
        wine_match = ''
    else:
        responses = [
            int(p1),
            int(p2),
            int(p3),
            int(p4),
            int(p5),
            int(p6),
            int(p7),
            int(p8)
        ]
        wine_scores = compute_personality_vec(legend, index, mat, responses)
        # wine_scores = frontend_similar_varieties(legend, index, mat, responses)
        flavor_result = cossim_dict(flavor, inv_ind, idf, norms)
        scent_result = cossim_dict(scent, inv_ind, idf, norms)
        total = total_score(flavor_result, scent_result, scores)

        personality_match = compute_personality(wine_scores, df_personality)
        wine_match = compute_wine(wine_scores, total, df, 6, price)

    return {"personality_match": personality_match, "wine_match": wine_match}


@irsystem.route('/rocchio', methods=['POST'])
def rocchio_match():
    print(request)
    if request.method == "POST":
        content = request.get_json()
        for wine in content['wine_match']:
            if wine['doc_id'] not in content['likedWines']:
                content['likedWines'][wine['doc_id']] = False
        rel_and_unrel_docs = {"relevant": [], "irrelevant": []}

        for key in content['likedWines'].keys():
            if content['likedWines'][key] == True:
                rel_and_unrel_docs['relevant'].append(int(key))
            else:
                rel_and_unrel_docs["irrelevant"].append(int(key))

        flavor = content['flavor']
        scent = content['scent']
        max_price = content['price']
        variety = content['variety']
        flavor_cossim = cossim_with_rocchio(flavor, tfidf_dict, idf,
                                            rel_and_unrel_docs, vocab_to_index)
        scent_cossim = cossim_with_rocchio(scent, tfidf_dict, idf,
                                           rel_and_unrel_docs, vocab_to_index)

        total = total_score_with_rocchio(flavor_cossim, scent_cossim)
        new_wine_match = compute_wine_rocchio(variety, total, df, 6, max_price, rel_and_unrel_docs)

        return {"new_wine_match": new_wine_match}


@irsystem.route('/', defaults={'path': ''})
@irsystem.route('/<path:path>')
def catch_all(path):
    return render_template("index.html")
