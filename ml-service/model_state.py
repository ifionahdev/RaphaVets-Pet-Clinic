from fastai.vision.all import load_learner
from pathlib import Path

import joblib

breed_model = None
dog_diagnostic_model = None
dog_diagnostic_scaler = None
dog_diagnostic_model_load_error = None
dog_diagnostic_scaler_load_error = None
breed_model_load_error = None

def load_models():
    global breed_model, breed_model_load_error
    global dog_diagnostic_model, dog_diagnostic_model_load_error
    global dog_diagnostic_scaler, dog_diagnostic_scaler_load_error
    
    model_path = Path(__file__).resolve().parent / "models"

    if breed_model is None and breed_model_load_error is None:
        try:
            breed_model_path = model_path / "breed_model.pkl"
            breed_model = load_learner(breed_model_path)

            print("Breed model loaded successfully.")
        except Exception as e:
            breed_model_load_error = str(e)
            print("Error loading breed model:", breed_model_load_error)

    if dog_diagnostic_model is None and dog_diagnostic_model_load_error is None:
        try:
            dog_diagnostic_model_path = model_path / "dog_diagnostic_model.pkl"
            dog_diagnostic_model = joblib.load(dog_diagnostic_model_path)
            print("Dog diagnostic model and scaler loaded successfully.")

        except Exception as e:
            dog_diagnostic_model_load_error = str(e)
            print("Error loading dog diagnostic model:", dog_diagnostic_model_load_error)

    if dog_diagnostic_scaler is None and dog_diagnostic_scaler_load_error is None:
        try:
            dog_diagnostic_scaler_path = model_path / "dog_diagnostic_scaler.pkl"
            dog_diagnostic_scaler = joblib.load(dog_diagnostic_scaler_path)
            print("Dog diagnostic scaler loaded successfully.")
        except Exception as e:
            dog_diagnostic_scaler_load_error = str(e)
            print("Error loading dog diagnostic scaler:", dog_diagnostic_scaler_load_error)