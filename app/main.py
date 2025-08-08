from fastapi import FastAPI
from routes import upload, evaluate, optimize
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="AI Resume Screener",
    description="API for resume evaluation, optimization, and JD matching",
    version="1.0"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # match your frontend dev server
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(upload.router, prefix="/api")
app.include_router(evaluate.router, prefix="/api")
app.include_router(optimize.router, prefix="/api")
