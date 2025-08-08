def ats_score(resume_text: str) -> float:
    required_sections = ["education", "experience", "skills", "projects"]
    score = 0
    total = len(required_sections)

    for section in required_sections:
        if section.lower() in resume_text.lower():
            score += 1

    word_count = len(resume_text.split())
    if 350 <= word_count <= 1000:
        score += 1  # Good length

    return round((score / (total + 1)) * 100, 2)
