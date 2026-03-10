import sys
import pickle
from pathlib import Path, PureWindowsPath, PurePosixPath
from io import BytesIO
from PIL import Image
import numpy as np
from fastapi import HTTPException

# === CRITICAL: Patch pickle BEFORE importing fastai ===
# This handles WindowsPath objects baked into the model file
_original_find_class = pickle.Unpickler.find_class.__func__

def _patched_find_class(self, module, name):
    """Intercept WindowsPath deserialization and convert to PureWindowsPath"""
    if module == "pathlib":
        if name == "WindowsPath":
            return PureWindowsPath
        elif name == "PosixPath":
            return PurePosixPath
    return _original_find_class(self, module, name)

pickle.Unpickler.find_class = _patched_find_class

# NOW safe to import fastai
from fastai.vision.all import load_learner

ml_service_root = Path(__file__).resolve().parents[1]
MODEL_PATH = str(ml_service_root / "models" / "breed_model.pkl")

learn = None
model_load_error = None


def get_learner():
    global learn, model_load_error

    if learn is not None:
        return learn

    if model_load_error is not None:
        raise HTTPException(
            status_code=500,
            detail=f"Model failed to load: {model_load_error}",
        )

    try:
        learn = load_learner(MODEL_PATH)
        return learn
    except Exception as error:
        model_load_error = str(error)
        print("ML model load error:", error)
        raise HTTPException(
            status_code=500,
            detail=f"Model failed to load: {model_load_error}",
        )

def predict_breed_from_bytes(file_bytes: bytes) -> dict:
    try:
        """
        Predicts the breed from an image in memory (bytes).
        No disk I/O needed.
        """
        img = Image.open(BytesIO(file_bytes))
        learner = get_learner()
        
        pred_class, pred_idx, probs = learner.predict(np.array(img))

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