from fastapi import APIRouter, HTTPException
from rich import _console
from services.matcher import get_similarity_score
from services.suggestions import suggest_resume_improvements
from utils.ats_rules import ats_score
from utils.structure_check import check_structure_quality
from utils.load_data import load_keywords
from utils.keyword_extractor import extract_keywords_from_jd
from models.schema import EvaluationRequest

router = APIRouter()


@router.post("/evaluate")
async def evaluate_resume(data: EvaluationRequest):
    try:
        resume_text = data.resume_text
        job_description = data.job_description
        company = data.company
        role = data.role

        print(f"Evaluating resume for company: {company}, role: {role}")



        all_keywords = load_keywords()
        
        expected_keywords = all_keywords.get(company.lower(), {}).get(role.lower(), [])

        print(expected_keywords)

        # Extract keywords from resume
        resume_keywords = extract_keywords_from_jd(resume_text)

        # Calculate missing keywords
        missing_keywords = [
            kw for kw in expected_keywords if kw.lower() not in [rk.lower() for rk in resume_keywords]
        ]
        print(missing_keywords)

        # Generate improvement suggestions

        improvement_suggestions = suggest_resume_improvements(resume_text,company,role)

        # Calculate scores
        ats_score_num = ats_score(resume_text)
        relevance_score = get_similarity_score(resume_text, job_description)
        structure_score = check_structure_quality(resume_text)

        # Overall score (weighted average or simple mean)
        overall_score = round((ats_score_num + relevance_score + structure_score) / 3, 2)

        return {
            "ats_score": round(ats_score_num, 2),
            "relevance_score": round(relevance_score, 2),
            "structure_score": round(structure_score, 2),
            "overall_score": overall_score,
            "missing_keywords": missing_keywords,
            "improvement_suggestions": improvement_suggestions,
        }

    except Exception as e:
        print(str(e))
        raise HTTPException(status_code=500, detail=str(e))
