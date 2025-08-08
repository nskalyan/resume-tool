from fastapi import APIRouter, UploadFile, File, HTTPException
from models.schema import UploadResumeResponse
import os
from services import parser

router = APIRouter()

@router.post("/upload-resume/", response_model=UploadResumeResponse)
async def upload_resume(file: UploadFile = File(...)):
    if not file.filename.endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only .pdf and .docx files are supported.")

    temp_path = f"temp/{file.filename}"
    os.makedirs("temp", exist_ok=True)

    with open(temp_path, "wb") as f:
        f.write(await file.read())

    if file.filename.endswith('.pdf'):
        resume_text = parser.extract_text_from_pdf(temp_path)
    else:
        resume_text = parser.extract_text_from_docx(temp_path)

    os.remove(temp_path)

    contact_info = parser.extract_contact_info(resume_text)
    sections = parser.extract_sections(resume_text)

    return UploadResumeResponse(
        filename=file.filename,
        message="Resume uploaded and parsed successfully.",
        text=resume_text,
        contact_info=contact_info,
        sections=sections
    )
