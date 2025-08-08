import json
import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

def load_keywords():
    path = os.path.join(BASE_DIR, '../data/company_role_keywords.json')
    with open(path, 'r') as file:
        return json.load(file)

def load_resume_examples():
    path = os.path.join(BASE_DIR, '../data/company_role_resume_links.json')
    with open(path, 'r') as file:
        return json.load(file)
