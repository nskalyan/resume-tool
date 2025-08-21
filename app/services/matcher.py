try:
    from sentence_transformers import SentenceTransformer, util
    _HAS_ST = True
    model = SentenceTransformer("all-MiniLM-L6-v2")
except ImportError:
    _HAS_ST = False
    from sklearn.feature_extraction.text import TfidfVectorizer
    from sklearn.metrics.pairwise import cosine_similarity


def get_similarity_score(resume_text: str, jd_text: str):
    if _HAS_ST:
        # Use SentenceTransformer (preferred, more accurate)
        embeddings = model.encode([resume_text, jd_text], convert_to_tensor=True)
        score = util.cos_sim(embeddings[0], embeddings[1]).item()
        return round(score * 100, 2)
    else:
        # Fallback: TF-IDF cosine similarity (lighter, faster)
        vectorizer = TfidfVectorizer().fit([resume_text, jd_text])
        vectors = vectorizer.transform([resume_text, jd_text])
        score = cosine_similarity(vectors[0], vectors[1]).item()
        return round(score * 100, 2)
