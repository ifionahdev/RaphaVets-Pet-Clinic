from fastapi import FastAPI
import fastai, torch, torchvision, sklearn, numpy
from routes import breed_router as breed
from routes import disease_router as disease
from model_state import load_models, breed_model, dog_diagnostic_model, dog_diagnostic_scaler
from contextlib import asynccontextmanager
from fastapi.middleware.cors import CORSMiddleware

@asynccontextmanager
async def lifespan(app: FastAPI):
    print("Starting up ML Service...")
    load_models()  # Preload models during startup
    yield
    print("Shutting down ML Service...")

app = FastAPI(title="ML Service", lifespan=lifespan)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust origins as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(breed.router, prefix="/predict_breed", tags=["Breed Detection"])
app.include_router(disease.router, prefix="/predict_disease", tags=["Disease Prediction"])

@app.get("/")
def read_root():
    return {"message": "Welcome to the ML Service API!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.get("/ready")
def readiness_check():
    missing = []
    if breed_model is None:
        missing.append("breed_model")
    if dog_diagnostic_model is None:
        missing.append("dog_diagnostic_model")
    if dog_diagnostic_scaler is None:
        missing.append("dog_diagnostic_scaler")
    if missing:
        load_models()  # Attempt to load missing models
        return {"status": "loading", "missing": missing}
    return {"status": "ready"}