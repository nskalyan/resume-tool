import re
from sklearn.feature_extraction.text import CountVectorizer

def extract_keywords_from_jd(jd_text: str, top_k=10):
    vectorizer = CountVectorizer(ngram_range=(1, 2), stop_words="english").fit([jd_text])
    keywords = vectorizer.get_feature_names_out()
    return list(keywords)[:top_k]
