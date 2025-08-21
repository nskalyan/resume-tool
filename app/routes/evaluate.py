from fastapi import APIRouter, HTTPException
from app.services.matcher import get_similarity_score
from app.services.suggestions import suggest_resume_improvements
from app.utils.ats_rules import ats_score
from app.utils.structure_check import check_structure_quality
from app.models.schema import EvaluationRequest

router = APIRouter()

@router.post("/evaluate")
async def evaluate_resume(data: EvaluationRequest):
    try:
        resume_text = (data.resume_text or "").strip()
        job_description = (data.job_description or "").strip()
        company = (data.company or "").strip()
        role = (data.role or "").strip()

        # Validate required inputs
        if not resume_text:
            raise HTTPException(status_code=400, detail="Resume text is required.")
        if not job_description:
            raise HTTPException(status_code=400, detail="Job description is required.")

        # Suggestions (company/role optional)
        suggestion_data = suggest_resume_improvements(resume_text, company, role)

        # Calculate scores
        ats_score_num = ats_score(resume_text)
        relevance_score = get_similarity_score(resume_text, job_description)
        structure_score = check_structure_quality(resume_text)

        # Overall score (simple average for now)
        overall_score = round((ats_score_num + relevance_score + structure_score) / 3, 2)

        return {
            "ats_score": round(ats_score_num, 2),
            "relevance_score": round(relevance_score, 2),
            "structure_score": round(structure_score, 2),
            "overall_score": overall_score,
            "missing_keywords": suggestion_data.get("missing_keywords", []),
            "improvement_suggestions": suggestion_data.get("improvement_suggestions", []),
        }

    except HTTPException:
        raise  # re-raise validation errors as-is
    except Exception as e:
        print(f"An error occurred during resume evaluation: {str(e)}")
        raise HTTPException(status_code=500, detail="Error evaluating resume.")
