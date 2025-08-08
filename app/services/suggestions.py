from utils.load_data import load_keywords, load_resume_examples

# Load data from JSON files
keywords_db = load_keywords()
examples_db = load_resume_examples()

def get_role_keywords(company, role):
    return keywords_db.get(company, {}).get(role, [])

def get_resume_example(company, role):
    return examples_db.get(company, {}).get(role, None)

def suggest_resume_improvements(resume_text, company, role):
    resume_keywords = []

    # Use keyword extractor (or regex) to simulate section extraction from text
    # For now, treat entire text as one blob
    text_blob = resume_text.lower()

    target_keywords = get_role_keywords(company, role)

    missing = [kw for kw in target_keywords if kw.lower() not in text_blob]

    return {
        "missing_keywords": missing,
        "example_resume_link": get_resume_example(company, role),
        "total_target": len(target_keywords),
        "matched": len(target_keywords) - len(missing)
    }

