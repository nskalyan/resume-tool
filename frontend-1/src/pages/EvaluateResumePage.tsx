import React, { useState } from "react";
import "../styles/pages.css";
import { evaluateResume, API_BASE_URL } from "../api/api";


const EvaluateResumePage: React.FC = () => {
  const [resumeText, setResumeText] = useState("");
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [jobDescription, setJobDescription] = useState("");
  const [evaluationResult, setEvaluationResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    setResumeText("");
    try {
      const formData = new FormData();
      formData.append("file", file);
const res = await fetch(`${API_BASE_URL}/upload-resume/`, {
  method: "POST",
  body: formData,
});
      if (!res.ok) throw new Error("Failed to upload and extract resume.");
      const data = await res.json();
      setResumeText(data.text || "");
    } catch (err) {
      setError("Resume upload or extraction failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleEvaluate = async () => {
    if (!resumeText || !company || !role || !jobDescription) {
      alert("Please upload your resume or paste text, and fill in all fields before evaluating.");
      return;
    }

    setLoading(true);
    setError(null);
    setEvaluationResult(null);

    try {
      const result = await evaluateResume(resumeText, jobDescription,company,role);
      console.log("Evaluation result:", result); 
      setEvaluationResult(result);
    } catch (err) {
      setError("Evaluation failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="evaluate-resume-page">
      <h1 className="page-title">Evaluate Your Resume</h1>

      <div className="input-group">
        <label className="input-label">Upload Resume (PDF/DOCX) or paste text below:</label>
        <input
          type="file"
          accept=".pdf,.docx"
          className="input"
          onChange={handleFileUpload}
          disabled={loading}
        />
      </div>

      <div className="input-group">
        <label className="input-label">Extracted Resume Text:</label>
        <textarea
          className="input-textarea"
          value={resumeText}
          onChange={(e) => setResumeText(e.target.value)}
          rows={10}
          placeholder="Paste your resume content here, or upload a file above to extract the text."
        />
      </div>

      <div className="input-group">
        <div className="input-field">
          <label className="input-label">Company:</label>
          <input
            type="text"
            className="input"
            placeholder="e.g., Google"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
          />
        </div>
        <div className="input-field">
          <label className="input-label">Role:</label>
          <input
            type="text"
            className="input"
            placeholder="e.g., Software Engineer Intern"
            value={role}
            onChange={(e) => setRole(e.target.value)}
          />
        </div>
      </div>

      <div className="input-group">
        <label className="input-label">Job Description:</label>
        <textarea
          className="input-textarea"
          placeholder="Paste job description here..."
          rows={8}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
        />
      </div>

      <button
        onClick={handleEvaluate}
        disabled={loading || !resumeText || !company || !role || !jobDescription}
        className="evaluate-button"
      >
        {loading ? "Evaluating..." : "Evaluate"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {evaluationResult && (
        <div className="evaluation-result">
          <h2 className="result-title">📊 Evaluation Result</h2>
          <ul className="result-list">
            <li><strong>ATS Score:</strong> {evaluationResult.ats_score}%</li>
            <li><strong>Relevance Score:</strong> {evaluationResult.relevance_score}%</li>
            <li><strong>Structure Score:</strong> {evaluationResult.structure_score}%</li>
            <li><strong>Overall Score:</strong> {evaluationResult.overall_score}%</li>
          </ul>

          {evaluationResult.missing_keywords && evaluationResult.missing_keywords.length > 0 && (
            <div className="keyword-missing-section">
              <h3>❌ Missing Keywords</h3>
              <ul className="keyword-list">
                {evaluationResult.missing_keywords.map((kw: string, idx: number) => (
                  <li key={idx}>🔹 {kw}</li>
                ))}
              </ul>
            </div>
          )}

          {evaluationResult.improvement_suggestions && evaluationResult.improvement_suggestions.length > 0 && (
            <div className="improvement-section">
              <h3>💡 Improvement Suggestions</h3>
              <ul className="suggestion-list">
                {evaluationResult.improvement_suggestions.map((sugg: string, idx: number) => (
                  <li key={idx}>✅ {sugg}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default EvaluateResumePage;
