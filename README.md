# AI-Powered Resume Evaluator, Optimizer & Generator

## Overview
A full-stack application that helps users screen, optimize, and generate resumes using AI. It features ATS compliance checks, role fit scoring, personalized suggestions, and a beautiful frontend UI. Users can upload resumes, receive actionable feedback, and generate role-specific templates.
---

## Features

### 1. Resume Screening Module
- **Upload & Parse Resume:**
  - Accepts `.pdf`, `.docx`, and `.txt` files
- **Custom Evaluation Engine:**
## Required Libraries
Install the following Python libraries for backend functionality:

```bash
pip install fastapi uvicorn python-multipart pdfminer.six python-docx spacy nltk sentence-transformers scikit-learn
python -m nltk.downloader punkt stopwords
python -m spacy download en_core_web_sm
```

    - Checks keyword matching, formatting, section headers
  - **Relevance Matching:**
    - Skills ↔ Projects
    - Skills & Experience ↔ Job Description
  - **Role Fit Score:**
    - Uses cosine similarity or sentence embeddings (SBERT) between JD and candidate profile
  - **Bonus Rules:**
    - Chronological consistency (no gaps)
    - Active language usage (action verbs, impact statements)
    - Industry-specific phrasing
    - Certification verification (if publicly available)

### 2. Resume Optimization
- **Personalized Suggestions:**
  - Missing keywords
  - Rephrase passive language
  - Highlight unclear project roles
- **Interactive Editor:**
  - Live preview with editable sections
  - Contextual suggestions (like Grammarly)

### 3. Resume Generator
- **Company & Role-Based Generator:**
  - Input: Target Role + Company
  - Uses anonymized database of successful resumes
  - Output: Role-optimized template with pre-filled sections
- **Template Selector:**
  - Modern, minimalist, academic, ATS-friendly designs
- **Language Tone Selector:**
  - Formal / Creative / Technical

### 4. Beautiful Frontend UI
- Clean, minimal, dynamic animations
- Dark/light mode
- Drag-and-drop resume upload
- Heatmap of strong/weak areas
- Progress bar for optimization score

### 5. Free Hosting + Account System
- Simple login/signup
- Resume history and versioning
- Save and compare multiple versions
- Export as PDF or DOCX

---

## Tech Stack
- **Backend:** Python (FastAPI/Flask), NLP libraries (spaCy, SBERT, transformers)
- **Frontend:** React.js, Tailwind CSS, animation libraries
- **Database:** PostgreSQL / MongoDB
- **File Handling:** pdfminer, python-docx
- **Authentication:** JWT, OAuth
- **Hosting:** Vercel, Netlify, or free-tier cloud

---

## Getting Started
1. Clone the repository
2. Install dependencies (`pip install -r requirements.txt` for backend, `npm install` for frontend)
3. Start backend and frontend servers
4. Access the app via browser

---

## Folder Structure
```
app/
  main.py
  requirements.txt
  data/
  models/
  routes/
  services/
  utils/
```

---

## License
MIT

## Contributing
Pull requests welcome! For major changes, open an issue first.

## Contact
For questions, reach out via Issues or email.
