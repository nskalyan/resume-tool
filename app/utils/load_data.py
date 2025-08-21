import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
DATA_DIR = os.path.abspath(os.path.join(BASE_DIR, "..", "data"))

def load_keywords():
    path = os.path.join(DATA_DIR, "company_role_keywords.json")
    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)

def load_resume_examples():
    path = os.path.join(DATA_DIR, "company_role_resume_links.json")
    with open(path, "r", encoding="utf-8") as file:
        return json.load(file)
