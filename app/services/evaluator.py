from app.services.matcher import get_similarity_score
from app.utils.ats_rules import ats_score
from app.utils.structure_check import check_structure_quality
from app.services.parser import parse_resume
from app.services.suggestions import suggest_resume_improvements

def evaluate_resume(resume_text, jd_text, company=None, role=None):
    relevance = get_similarity_score(resume_text, jd_text)
    ats = ats_score(resume_text)
    structure = check_structure_quality(resume_text)

    result = {
        "relevance_score": relevance,
        "ats_score": ats,
        "structure_score": structure,
        "overall_score": round((ats + relevance + structure) / 3, 2),
        "missing_keywords": [],
        "improvement_suggestions": []
    }

    # Only run suggestions logic if company and role are provided
    if company and role:
        parsed_resume = parse_resume(resume_text)
        suggestion_data = suggest_resume_improvements(parsed_resume, company, role)

        result["missing_keywords"] = suggestion_data["missing_keywords"]

        if suggestion_data["missing_keywords"]:
            result["improvement_suggestions"].append(
                f"Consider adding missing keywords: {', '.join(suggestion_data['missing_keywords'])}"
            )

    return result
