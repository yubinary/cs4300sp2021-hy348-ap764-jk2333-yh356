# Module for implementing edit distance algorithm

from nltk.tokenize import TreebankWordTokenizer
from json_reader import *


def tokenizer(query):
    """
    Returns list of tokens from query.
    """
    if query is None:
        query = ""
    return TreebankWordTokenizer().tokenize(query)


def insertion_cost(message, j):
    return 1


def deletion_cost(query, i):
    return 1


def substitution_cost(query, message, i, j):
    if query[i-1] == message[j-1]:
        return 0
    else:
        return 2


def edit_matrix(query, message):
    """ calculates the edit matrix

    Arguments
    =========

    query: query string,

    message: message string,

    m: length of query + 1,

    n: length of message + 1,

    Returns:
        edit matrix {(i,j): int}
    """

    m = len(query) + 1
    n = len(message) + 1

    matrix = np.zeros((m, n))
    for i in range(1, m):
        matrix[i, 0] = matrix[i-1, 0] + deletion_cost(query, i)

    for j in range(1, n):
        matrix[0, j] = matrix[0, j-1] + insertion_cost(message, j)

    for i in range(1, m):
        for j in range(1, n):
            matrix[i, j] = min(
                # "down" or delete op
                matrix[i-1, j] + deletion_cost(query, i),
                # "right" or insert op
                matrix[i, j-1] + insertion_cost(message, j),
                # "diagnol" or sub op
                matrix[i-1, j-1] + substitution_cost(query, message, i, j)
            )

    return matrix


def edit_distance(query, message):
    """ Edit distance calculator

    Arguments
    =========

    query: query string,

    message: message string,

    Returns:
        edit cost (int)
    """

    query = query.lower()
    message = message.lower()

    # YOUR CODE HERE
    matrix = edit_matrix(query, message)
    m, n = matrix.shape
    return matrix[m-1][n-1]


def scorify(score, max_score):
    """
    Returns a score percentage where lower is a better match- max points is
    max_score
    """
    return 1 - (score/max_score)


def top_keywords(keywords):
    """
    Takes dict mapping keywords to frequency and outputs list of top 3
    """
    keyword_tup = []
    for key in keywords.keys():
        keyword_tup.append((key, keywords[key]))
    keyword_tup.sort(key=lambda x: x[1], reverse=True)
    iter_num = min(3, len(keyword_tup))

    output = []
    i = 0
    while i < iter_num:
        output.append(keyword_tup[i][0])
        i += 1

    return output


def edit_dict(query1, query2, df):
    df_desc = df["toks"]
    df_dict = {}
    for key in df_desc.keys():
        df_dict[int(key)] = df_desc[key]

    query = tokenizer(query1) + tokenizer(query2)

    doc_list = []
    max_score = 0

    for doc_id in df_dict.keys():
        doc_score = 0
        keywords = {}
        for word in df_dict[doc_id]:
            min_score = float('inf')
            min_keyword = ""
            for tok in query:
                score = edit_distance(tok, word)
                if score < min_score:
                    min_score = score
                    min_keyword = tok
            doc_score += min_score
            if min_keyword not in keywords:
                keywords[min_keyword] = 0
            keywords[min_keyword] += 1
        doc_list.append((doc_id, doc_score, keywords))
        if doc_score > max_score:
            max_score = doc_score

    doc_dict = {}
    for i in doc_list:
        doc_dict[i[0]] = (scorify(i[1], max_score), top_keywords(i[2]))

    return doc_dict


df = json_read("winemag_data_withtoks.json")
print(edit_dict("fruiity and sweet", "hote and aocoholic", df))
