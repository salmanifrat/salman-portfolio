# Salman Portfolio (FastAPI Backend)

To run your portfolio locally with the FastAPI backend:

1. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

2. Run the server:
   ```bash
   uvicorn main:app --reload
   ```

3. Open in your browser:
   `http://127.0.0.1:8000`

### Publishing on a Server (Render, Railway, Vercel, or VPS)
Because you now have a Python backend (`main.py`), you can host this on free cloud platforms like **Render** or **Railway**:
- **Build Command**: `pip install -r requirements.txt`
- **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
