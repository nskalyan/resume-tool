// filepath: c:\Users\nunna\Downloads\resume-tool\frontend\src\services\api.js
const BASE_URL = "http://localhost:8000/api"; 

// Upload resume file (PDF/DOCX)
export async function uploadResume(file) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${BASE_URL}/upload-resume/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Resume upload failed.");
  }

  return response.json();
}

// Evaluate resume
export async function evaluateResume(resumeText, jobDescription) {
  const response = await fetch(`${BASE_URL}/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume_text: resumeText, job_description: jobDescription }),
  });

  if (!response.ok) {
    throw new Error("Resume evaluation failed.");
  }

  return response.json();
}

// Optimize resume
export async function optimizeResume(resume, company, role) {
  const response = await fetch(`${BASE_URL}/optimize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume, company, role }),
  });

  if (!response.ok) {
    throw new Error("Resume optimization failed.");
  }

  return response.json();
}