def check_structure_quality(text: str) -> float:
    lines = text.split("\n")
    bullet_points = [line for line in lines if line.strip().startswith(("-", "*", "•"))]

    score = 0
    if len(bullet_points) > 5:
        score += 1  # Uses bullet points

    if any(keyword in text.lower() for keyword in ["summary", "objective"]):
        score += 1  # Has summary/objective section

    if any(char.isdigit() and "20" in char for char in text):  # crude year check
        score += 1  # Dates present

    return round((score / 3) * 100, 2)
