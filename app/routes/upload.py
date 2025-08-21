import os
from fastapi import APIRouter, UploadFile, File, HTTPException
from app.models.schema import UploadResumeResponse
from app.services import parser

router = APIRouter()

@router.post("/upload-resume/", response_model=UploadResumeResponse)
async def upload_resume(file: UploadFile = File(...)):
    # Sanitize filename and normalize extension
    filename = os.path.basename(file.filename)
    if not filename.lower().endswith(('.pdf', '.docx')):
        raise HTTPException(status_code=400, detail="Only .pdf and .docx files are supported.")

    os.makedirs("temp", exist_ok=True)
    temp_path = os.path.join("temp", filename)

    try:
        # Save file temporarily
        with open(temp_path, "wb") as f:
            f.write(await file.read())

        # Extract text based on file type
        if filename.lower().endswith('.pdf'):
            resume_text = parser.extract_text_from_pdf(temp_path)
        else:
            resume_text = parser.extract_text_from_docx(temp_path)

        # Extract structured info
        contact_info = parser.extract_contact_info(resume_text)
        sections = parser.extract_sections(resume_text)

        return UploadResumeResponse(
            filename=filename,
            message="Resume uploaded and parsed successfully.",
            text=resume_text,
            contact_info=contact_info,
            sections=sections
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to process resume: {str(e)}")
    finally:
        # Ensure temp file cleanup
        if os.path.exists(temp_path):
            os.remove(temp_path)
