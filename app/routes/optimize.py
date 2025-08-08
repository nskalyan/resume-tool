import json
from fastapi import APIRouter, Request
from fastapi.responses import JSONResponse
from services.evaluator import evaluate_resume

router = APIRouter()

# Load the company-role-resume links once
with open("data/company_role_resume_links.json", "r") as f:
    resume_links = json.load(f)

@router.post("/optimize")
async def optimize_resume(request: Request):
    data = await request.json()

    company = data.get("company", "").strip().title()
    role = data.get("role", "").strip().title()

    # If company or role missing, return 400
    if not company or not role:
        return JSONResponse(status_code=400, content={"detail": "Missing company or role."})

    # Detect fallback mode (ExampleViewer): no resume text
    resume_data = data.get("resume")
    resume_text = ""
    if resume_data and isinstance(resume_data, dict):
        resume_text = resume_data.get("text", "").strip()


    if not resume_text:
        company_data = resume_links.get(company)
        if company_data:
            resume_link = company_data.get(role)
            if resume_link:
                return JSONResponse(content={"link": resume_link})
        return JSONResponse(status_code=404, content={"detail": "Resume link not found."})

    # Full evaluation mode
    result = evaluate_resume(resume_text, jd_text="", company=company, role=role)
    return JSONResponse(content=result)
