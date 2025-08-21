from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from app.services.evaluator import evaluate_resume
from app.utils.load_data import load_resume_examples

router = APIRouter()

# Load the company-role-resume links once
resume_links = load_resume_examples()

@router.post("/optimize")
async def optimize_resume(request: Request):
    data = await request.json()

    # Normalize company/role (case-insensitive)
    company = data.get("company", "").strip().lower()
    role = data.get("role", "").strip().lower()

    if not company or not role:
        return JSONResponse(status_code=400, content={"detail": "Missing company or role."})

    # Detect fallback mode (ExampleViewer): no resume text
    resume_data = data.get("resume")
    resume_text = ""
    if resume_data and isinstance(resume_data, dict):
        resume_text = resume_data.get("text", "").strip()

    if not resume_text:
        company_data = resume_links.get(company, {})
        resume_link = company_data.get(role)
        if resume_link:
            return JSONResponse(content={"link": resume_link})
        return JSONResponse(status_code=404, content={"detail": "Resume link not found."})

    # Full evaluation mode (resume text provided, JD skipped here)
    result = evaluate_resume(resume_text, jd_text="", company=company, role=role)
    return JSONResponse(content=result)
