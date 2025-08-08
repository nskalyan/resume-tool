import React, { useState, useEffect, useRef } from "react";

const ResumeEditorPage: React.FC = () => {
  const [resumeContent, setResumeContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // useRef to get a reference to the textarea DOM element
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // useEffect to dynamically resize the textarea
  useEffect(() => {
    if (textAreaRef.current) {
      // Set the height to 'auto' to calculate the new scroll height
      textAreaRef.current.style.height = "auto";
      // Set the height to the scroll height to fit the content
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  }, [resumeContent]); // Re-run this effect whenever resumeContent changes

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setLoading(true);
    setError(null);
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await fetch("http://localhost:8000/api/upload-resume/", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) throw new Error("Failed to upload and extract resume.");
      const data = await res.json();
      setResumeContent(data.text || "");
    } catch (err) {
      setError("Resume upload or extraction failed.");
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    if (confirm("Are you sure you want to clear the editor?")) {
      setResumeContent("");
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(resumeContent);
      alert("Resume copied to clipboard!");
    } catch (err) {
      alert("Failed to copy.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-start bg-gradient-to-br from-[#ffe3ec] via-[#d0e8ff] to-[#e0ffe3] py-12 px-4">
      <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl border border-fuchsia-200 p-8 flex flex-col gap-6">
        <h1 className="text-4xl font-bold text-center text-fuchsia-800">Resume Editor</h1>

        <div className="flex flex-col md:flex-row gap-4 items-center">
          <label className="text-lg font-medium text-slate-700">
            Upload Resume (PDF/DOCX):
          </label>
          <input
            type="file"
            accept=".pdf,.docx"
            className="border border-gray-300 rounded px-3 py-1 shadow-sm"
            onChange={handleFileUpload}
            disabled={loading}
          />
          {loading && (
            <span className="text-blue-600 font-medium ml-2">Extracting text...</span>
          )}
        </div>

        <textarea
          ref={textAreaRef} // Assign the ref to the textarea
          className="w-full border border-gray-300 rounded-xl px-4 py-3 font-mono text-base resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 overflow-hidden" // Add `overflow-hidden` to prevent scrollbars
          placeholder="Write, paste, or upload your resume content here..."
          value={resumeContent}
          onChange={(e) => setResumeContent(e.target.value)}
          rows={5} // Set a default number of rows for initial rendering
        />

        <div className="flex flex-wrap gap-4 justify-end">
          <button
            onClick={handleClear}
            className="bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg transition duration-300"
          >
            Clear
          </button>
          <button
            onClick={handleCopy}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold px-5 py-2 rounded-lg transition duration-300"
          >
            Copy to Clipboard
          </button>
        </div>

        {error && <p className="text-red-600 text-sm">{error}</p>}
      </div>
    </div>
  );
};

export default ResumeEditorPage;