from pdfminer.high_level import extract_text
import docx2txt
import re
import os

def extract_text_from_pdf(file_path):
    return extract_text(file_path)

def extract_text_from_docx(file_path):
    return docx2txt.process(file_path)

def extract_contact_info(text):
    email = re.findall(r"\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.\w{2,4}\b", text)
    phone = re.findall(r"\b\d{10}\b", text)
    return {
        "email": email[0] if email else None,
        "phone": phone[0] if phone else None
    }

def extract_sections(text):
    sections = {
        "skills": re.findall(r"(?i)(skills|technologies)\s*[:\-]?\s*(.*)", text),
        "education": re.findall(r"(?i)(education|qualifications)\s*[:\-]?\s*(.*)", text),
        "experience": re.findall(r"(?i)(experience|work)\s*[:\-]?\s*(.*)", text),
        "projects": re.findall(r"(?i)(projects|project work)\s*[:\-]?\s*(.*)", text),
    }
    return sections

def parse_resume(file_path: str) -> dict:
    # Determine file extension
    ext = os.path.splitext(file_path)[1].lower()

    if ext == ".pdf":
        text = extract_text_from_pdf(file_path)
    elif ext == ".docx":
        text = extract_text_from_docx(file_path)
    else:
        raise ValueError("Unsupported file type. Only PDF and DOCX are supported.")

    contact_info = extract_contact_info(text)
    sections = extract_sections(text)

    return {
        "text": text,
        "contact_info": contact_info,
        "sections": sections
    }

def parse_resume_from_text(text: str) -> dict:
    contact_info = extract_contact_info(text)
    sections = extract_sections(text)

    return {
        "text": text,
        "contact_info": contact_info,
        "sections": sections
    }