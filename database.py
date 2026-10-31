import json
import os

DATA_FILE = "portfolio_data.json"

DEFAULT_DATA = {
    "name": "Mohammad Salman Ifrat",
    "title": "RAG Systems Engineer & CSE Student",
    "affiliation": "Department of Computer Science & Engineering, North South University",
    "about": "I am a 4th-year Computer Science and Engineering student at North South University, Dhaka, graduating in late 2027. My technical work centers around Retrieval-Augmented Generation (RAG) systems, building robust backend architectures with LangChain, FAISS, HuggingFace embeddings, Groq/LLaMA, and FastAPI.",
    "admin_password": "salman123" # You can change this password anytime!
}

def load_data():
    if not os.path.exists(DATA_FILE):
        save_data(DEFAULT_DATA)
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_data(data):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=4)
