
from app.utils.load_data import load_keywords

def suggest_resume_improvements(resume_text, company, role):
    keywords_db = load_keywords()
    
    # Normalize company and role names for case-insensitive matching
    company_key = company.lower()
    role_key = role.lower()
    
    # Retrieve target keywords, with a fallback to an empty list
    target_keywords = keywords_db.get(company_key, {}).get(role_key, [])
    
    missing_keywords = []
    improvement_suggestions = []
    
    # Check if a keyword list was found
    if target_keywords:
        resume_text_lower = resume_text.lower()
        
        # Determine missing keywords
        missing_keywords = [
            kw for kw in target_keywords 
            if kw.lower() not in resume_text_lower
        ]

        if missing_keywords:
            improvement_suggestions.append(
                f"Consider adding the following keywords: {', '.join(missing_keywords)}"
            )
            improvement_suggestions.append(
                "Integrate these keywords naturally into your experience, skills, and summary sections."
            )
    else:
        # Fallback for when company/role is not in the database
        improvement_suggestions.append(
            f"No specific keyword suggestions available for '{company}' - '{role}'. Try a different company or role for more targeted feedback."
        )

    return {
        "missing_keywords": missing_keywords,
        "improvement_suggestions": improvement_suggestions,
    }