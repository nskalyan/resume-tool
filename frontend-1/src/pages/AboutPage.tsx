// src/pages/AboutPage.tsx
import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-[#ffe3ec] via-[#d0e8ff] to-[#e0ffe3] py-16 px-4">
      <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full p-8 border border-fuchsia-200">
        <h1 className="text-3xl font-bold text-fuchsia-800 mb-4 text-center">
          About ATS Resume Pro
        </h1>

        <p className="text-lg text-slate-800 mb-6 text-center">
          <strong>ATS Resume Pro</strong> is a powerful, AI-driven platform designed to help you build,
          evaluate, and optimize your resume to meet the standards of top Applicant Tracking Systems (ATS).
          Whether you're applying to Google, Amazon, Flipkart, or any other company, our tool ensures your
          resume is tailored to the role and company you're targeting.
        </p>

        <h2 className="text-xl font-semibold text-emerald-700 mb-3 mt-6">🔍 Key Features</h2>
        <ul className="list-disc list-inside text-slate-900 mb-6 space-y-2">
          <li>Upload your resume (PDF/DOCX) and get detailed ATS evaluation</li>
          <li> Optimize your resume based on company and job role</li>
          <li>Get ATS score, keyword insights, and formatting tips</li>
          <li> Access real-world example resumes from top companies</li>
          <li>Smart suggestions for improving resume impact</li>
        </ul>

        <h2 className="text-xl font-semibold text-emerald-700 mb-3 mt-6">🚀 Why Use This Tool?</h2>
        <p className="text-slate-800 mb-4">
          Recruiters use automated systems to filter out unqualified resumes before they even reach a human.
          ATS Resume Pro gives your resume the best chance of passing these filters by aligning it with the
          exact expectations of employers.
        </p>

        <p className="text-slate-800 mb-4">
          The tool is free, fast, and designed for students, professionals, and job seekers looking to
          stand out in competitive hiring pipelines.
        </p>

        <p className="text-center text-cyan-600 font-medium mt-8">
          Made with <span className="text-pink-500">❤️</span> to help you land your dream job.
        </p>
      </div>
    </div>
  );
};

export default AboutPage;
