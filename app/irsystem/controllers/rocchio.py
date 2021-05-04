from sklearn.feature_extraction.text import TfidfVectorizer
from nltk.tokenize import TreebankWordTokenizer
import numpy as np

# df = json_read("app/irsystem/controllers/winemag_data_withtoks.json")

# def build_vectorizer(max_n_terms=5000, max_prop_docs=0.8, min_n_docs=10):
#     """Returns a TfidfVectorizer object with certain preprocessing properties.

#     Params: {max_n_terms: Integer,
#              max_prop_docs: Float,
#              min_n_docs: Integer}
#     Returns: TfidfVectorizer
#     """
#     # YOUR CODE HERE
#     vectorizer = TfidfVectorizer(min_df=min_n_docs,
#                                  max_df=max_prop_docs,
#                                  max_features=max_n_terms,
#                                  stop_words='english')
#     return vectorizer

# tfidf_vec = build_vectorizer()
# tfidf_mat = tfidf_vec.fit_transform(df['description']).toarray()
# tfidf_dict = {}
# matrix_index = 0
# for key in df['description'].keys():
#     tfidf_dict[key] = tfidf_mat[matrix_index]
#     matrix_index += 1

# index_to_vocab = {i: v for i, v in enumerate(tfidf_vec.get_feature_names())}
# vocab_to_index = {
#     v.lower(): i
#     for i, v in enumerate(tfidf_vec.get_feature_names())
# }


def rocchio_update(query,
                   input_doc_dict,
                   idf,
                   rel_and_unrel_docs,
                   vocab_to_index,
                   a=.3,
                   b=.3,
                   c=.8):
    """
    Returns a vector representing the modified query vector.

    Params: {query: string query,
             input_doc_dict: tf-idf vectors for docs where key is the doc_id and value is the tf-idf vector,
             idf: a dictionary of precomputed IDF values of words where key is word and value is the IDF value
             rel_and_unrel_docs: Dict (storing the doc_id's of relevant and irrelevant wines for query),
             a,b,c: floats (weighting of the original query, relevant movies,
                             and irrelevant movies, respectively)}
    Returns: np.ndarray 

    """

    #Making our query into a tf-idf vector
    query = TreebankWordTokenizer().tokenize(query)
    q_tf = {}
    for word in query:
        if word in q_tf:
            q_tf[word] += 1
        else:
            q_tf[word] = 1

    q0 = np.zeros(len(list(input_doc_dict.values())[0]))
    for word in query:
        if word in vocab_to_index and word in idf:
            q0[vocab_to_index[word]] = q_tf[word] * idf[word]

    rel_docs = rel_and_unrel_docs['relevant']  # doc ids
    nonrel_docs = rel_and_unrel_docs['irrelevant']

    rel_sum = np.zeros(len(list(input_doc_dict.values())[0]))
    nonrel_sum = np.zeros(len(list(input_doc_dict.values())[0]))
    for rel in rel_docs:
        d = input_doc_dict[rel]
        rel_sum += d
    for nonrel in nonrel_docs:
        d = input_doc_dict[nonrel]
        nonrel_sum += d

    if len(rel_docs) == 0:
        second = 0
    else:
        second = b / len(rel_docs) * rel_sum

    if len(nonrel_docs) == 0:
        third = 0
    else:
        third = c / len(nonrel_docs) * nonrel_sum

    q1 = a * q0 + second - third

    return np.clip(q1, a_min=0, a_max=None)


def cossim_with_rocchio(query,
                        input_doc_dict,
                        idf,
                        rel_and_unrel_docs,
                        vocab_to_index,
                        input_rocchio=rocchio_update):
    """
    
    Returns: Dict where keys are wine document indices and values are scores.
    """
    # YOUR CODE HERE
    rankings = {}

    # for query in input_queries:
    q1 = input_rocchio(query, input_doc_dict, idf, rel_and_unrel_docs,
                       vocab_to_index)
    output = {}
    for doc_ind in input_doc_dict.keys():
        # if doc_ind != query_ind:
        score = np.dot(q1, input_doc_dict[doc_ind])/ \
        (np.linalg.norm(q1)*np.linalg.norm(input_doc_dict[doc_ind]))
        output[doc_ind] = score

    return output


def total_score_with_rocchio(dict1, dict2):
    """
    Returns a sorted list of (score, doc_id) ranked by score in
    descending order where score is the total score between dict1 and dict2

    [dict#] is a dictionary where key is [doc_id] and value is [score]
    """
    result_dict = dict()
    keywords = {}
    all_data = [dict1, dict2]
    for dictionary in all_data:
        for key, value in dictionary.items():
            if key not in result_dict:
                result_dict[key] = 0
            result_dict[key] += value

    result = []
    for key in result_dict:
        result.append((result_dict[key], key))
    result.sort(key=lambda x: x[1])
    result.sort(key=lambda x: x[0], reverse=True)
    return result


def compute_wine_rocchio(top_variety, total_scores, reviews, num, max_price, rel_and_unrel_docs):
    """
    Returns a dictionary of wines based on new cossine similarity scores from
    rocchio

    total_scores is a sorted list of (score, doc_id) ranked by score in
    descending order - this was calculated using total_score_with_rocchio
    """
    results = []

    i = 0
    counter = 1
    dup_list = []

    excluded_wines = set(rel_and_unrel_docs['relevant'] + rel_and_unrel_docs['irrelevant'])

    while len(dup_list) < num and i < len(total_scores):
        idx = total_scores[i][1]
        variety = reviews["variety"].get(key=str(idx))
        title = reviews["title"].get(key=str(idx))
        price = reviews["price"].get(key=str(idx))
        if idx not in excluded_wines:
            if variety == top_variety and price <= float(max_price):
                if title not in dup_list:
                    dup_list.append(title)
                    desc = reviews["description"].get(key=str(idx))
                    price = reviews["price"].get(key=str(idx))
                    result = {}
                    result["top_wine"] = top_variety
                    result["price"] = str(int(price))
                    result["wine"] = title
                    result["description"] = desc
                    results.append(result)
                    counter += 1
        i += 1
    return results
