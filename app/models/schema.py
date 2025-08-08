from pydantic import BaseModel
from typing import List, Dict, Any,Optional

class EvaluationRequest(BaseModel):
    resume_text: str
    job_description: str
    company: str
    role: str

class EvaluationResponse(BaseModel):
    ats_score: float
    relevance_score: float
    structure_score: float
    overall_score: float

class OptimizationRequest(BaseModel):
    resume_text: str
    job_description: str

class OptimizationResponse(BaseModel):
    missing_keywords: List[str]
    example_resume_link: Optional[str]
    total_target: int
    matched: int


class UploadResumeResponse(BaseModel):  
    filename: str
    message: str
    text:str
    contact_info:Dict[str, Any]
    sections:Dict[str, Any]

class ResumeSection(BaseModel):
    email: str
    phone: str

class ResumeData(BaseModel):
    text: str
    contact_info: ResumeSection
    sections: dict

class OptimizationRequest(BaseModel):
    resume: ResumeData
    company: str
    role: str

