import pickle
from pathlib import Path
from io import BytesIO
from PIL import Image
import numpy as np
from fastapi import HTTPException
from model_state import breed_model, breed_model_load_error

def predict_breed_from_bytes(file_bytes: bytes) -> dict:
    if breed_model_load_error is not None:
        raise HTTPException(status_code=503, detail=f"Breed model failed to load: {breed_model_load_error}")
    if breed_model is None:
        raise HTTPException(status_code=503, detail="Breed model is not available")

    try:
        img = Image.open(BytesIO(file_bytes))
        pred_class, pred_idx, probs = breed_model.predict(np.array(img))

        confidence = float(probs[pred_idx])
        breed = str(pred_class).title().replace('_', ' ')
        
        if confidence > 0.85:
            main_note = "Most likely a " + breed
        elif confidence > 0.6:
            main_note = "Possibly a " + breed
        else:
            main_note = "Uncertain, but could be a " + breed
        
        disclaimer = "This is an AI prediction and may not be accurate. Please consult a veterinarian for a definitive diagnosis."
        note = f"{main_note}.\n{disclaimer}"
        
        return {
            "breed": breed,
            "confidence": confidence,
            "note": note
        }
    except Exception as e:
        print("ML prediction error:", e)
        raise HTTPException(status_code=500, detail="Prediction failed due to server error.")