import React, { useState } from "react";
import { fetchExampleResume } from "../api/api";
import "../styles/pages.css";

const ExampleViewerPage: React.FC = () => {
  const [company, setCompany] = useState("");
  const [role, setRole] = useState("");
  const [resumeLink, setResumeLink] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchExample = async () => {
    if (!company || !role) {
      alert("Please fill in both company and role.");
      return;
    }

    setLoading(true);
    setError(null);
    setResumeLink(null);

    try {
      const result = await fetchExampleResume(
        company.trim().toLowerCase(),
        role.trim().toLowerCase()
      );

      if (result && result.link) {
        setResumeLink(result.link);
      } else {
        throw new Error("Resume not found");
      }
    } catch (err) {
      console.warn("No matching resume, using fallback.");
      setError("No exact example found. Showing general example.");
      setResumeLink("/examples/default_example_resume.pdf"); // fallback
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="example-viewer-container">
      <h1 className="page-title">View Example Resumes</h1>

      <div className="input-group">
        <input
          type="text"
          placeholder="Company (e.g., Google)"
          className="input-field"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />
        <input
          type="text"
          placeholder="Role (e.g., Data Analyst Intern)"
          className="input-field"
          value={role}
          onChange={(e) => setRole(e.target.value)}
        />
      </div>

      <button
        onClick={handleFetchExample}
        disabled={loading}
        className="fetch-button"
      >
        {loading ? "Fetching..." : "Fetch Example Resume"}
      </button>

      {error && <p className="error-message">{error}</p>}

      {resumeLink && (
        <div className="resume-link-container">
          <p className="resume-link-title">📄 Example Resume:</p>
          <a
            href={resumeLink}
            target="_blank"
            rel="noopener noreferrer"
            className="resume-link"
          >
            {resumeLink}
          </a>
        </div>
      )}
    </div>
  );
};

export default ExampleViewerPage;
