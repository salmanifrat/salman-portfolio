from fastapi import FastAPI, UploadFile, File, HTTPException, Form
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse, JSONResponse
from pydantic import BaseModel
import shutil
import os
from database import load_data, save_data

app = FastAPI(title="Salman Portfolio Backend")

# Ensure assets directory exists
os.makedirs("assets", exist_ok=True)

# Mount assets directory for photos
app.mount("/assets", StaticFiles(directory="assets"), name="assets")

@app.get("/api/data")
def get_portfolio_data():
    """Get portfolio data for frontend dynamic rendering"""
    return load_data()

@app.post("/api/admin/login")
def admin_login(password: str = Form(...)):
    """Admin login verification"""
    data = load_data()
    if password == data.get("admin_password", "salman123"):
        return {"success": True, "message": "Login successful"}
    raise HTTPException(status_code=401, detail="Invalid password")

@app.post("/api/admin/update")
def admin_update(
    name: str = Form(...),
    title: str = Form(...),
    affiliation: str = Form(...),
    about: str = Form(...),
    new_password: str = Form(None)
):
    """Update portfolio bio, title, and password"""
    data = load_data()
    data["name"] = name
    data["title"] = title
    data["affiliation"] = affiliation
    data["about"] = about
    if new_password and new_password.strip():
        data["admin_password"] = new_password.strip()
    save_data(data)
    return {"success": True, "message": "Portfolio updated successfully!"}

@app.post("/api/admin/upload-banner")
async def upload_banner(file: UploadFile = File(...)):
    """Upload or update cover banner photo dynamically"""
    try:
        file_path = os.path.join("assets", "banner.jpg")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {"success": True, "message": "Banner photo uploaded successfully!", "url": "/assets/banner.jpg"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/admin/upload-profile")
async def upload_profile(file: UploadFile = File(...)):
    """Upload or update circular profile picture dynamically"""
    try:
        file_path = os.path.join("assets", "profile.jpg")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {"success": True, "message": "Profile picture uploaded successfully!", "url": "/assets/profile.jpg"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/admin/upload-photo")
async def upload_photo(file: UploadFile = File(...)):
    """Legacy endpoint mapping to profile upload"""
    try:
        file_path = os.path.join("assets", "profile.jpg")
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        return {"success": True, "message": "Profile photo uploaded successfully!", "url": "/assets/profile.jpg"}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

class ContactMessage(BaseModel):
    name: str
    email: str
    message: str

@app.post("/api/contact")
def handle_contact(data: ContactMessage):
    """Handle contact form submissions"""
    print(f"Received message from {data.name} ({data.email}): {data.message}")
    return {"speed": True, "message": "Thank you! Your message has been received."}

@app.get("/")
def read_index():
    return FileResponse("index.html")

@app.get("/admin")
def read_admin():
    return FileResponse("admin.html")

@app.get("/courses.html")
def read_courses():
    return FileResponse("courses.html")

@app.get("/experience.html")
def read_experience():
    return FileResponse("experience.html")

@app.get("/projects.html")
def read_projects():
    return FileResponse("projects.html")

@app.get("/weird.html")
def read_weird():
    return FileResponse("weird.html")

# Mount root directory last so static assets are served correctly
app.mount("/", StaticFiles(directory="."), name="static")
