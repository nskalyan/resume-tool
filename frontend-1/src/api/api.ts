// api.ts

// Dynamically switch between local and deployed backend
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8000/api";

export async function uploadResume(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/upload-resume/`, {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    throw new Error("Resume upload failed.");
  }

  return response.json();
}

export async function evaluateResume(
  resumeText: string,
  jobDescription: string,
  company: string,
  role: string
) {
  const response = await fetch(`${API_BASE_URL}/evaluate`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      resume_text: resumeText,
      job_description: jobDescription,
      company,
      role,
    }),
  });

  if (!response.ok) {
    throw new Error("Resume evaluation failed.");
  }

  return response.json();
}

export async function optimizeResume(
  resume: object,
  company: string,
  role: string
) {
  const response = await fetch(`${API_BASE_URL}/optimize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume, company, role }),
  });

  if (!response.ok) {
    throw new Error("Resume optimization failed.");
  }

  return response.json();
}

export async function fetchExampleResume(company: string, role: string) {
  const response = await fetch(`${API_BASE_URL}/optimize`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ resume: {}, company, role }),
  });

  if (!response.ok) {
    throw new Error("Failed to fetch example resume.");
  }

  return response.json();
}

// ✅ Export API_BASE_URL so pages can import it
export { API_BASE_URL };
