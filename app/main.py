from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
from app.routes import upload, evaluate, optimize

# load env file
load_dotenv()

app = FastAPI()

# Read from .env
origins = [
    "http://localhost:5173",
    os.getenv("FRONTEND_URL"),   # ✅ dynamically from .env
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=[o for o in origins if o],  # filter None
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# canonical API prefix
app.include_router(upload.router, prefix="/api")
app.include_router(evaluate.router, prefix="/api")
app.include_router(optimize.router, prefix="/api")
