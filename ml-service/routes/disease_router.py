from fastapi import APIRouter, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel
from typing import List, Dict
from predictors.predict_dog_disease import predict_dog
from predictors.predict_cat_disease import predict_cat

router = APIRouter()

# Define all symptoms the model expects

class SymptomsInput(BaseModel):
    symptoms: List[str]  # list of feature names sent from frontend

@router.post("/dog")
async def predict_disease_endpoint(input_data: SymptomsInput):
    """
    Convert symptom list to one-hot dict and predict top K diseases.
    """
    print("Router reached. Symptoms:", input_data.symptoms)
    try:

        # Call predictor
        result = predict_dog(input_data.symptoms, top_k=3)
        return JSONResponse(result)
    except Exception as e:
        print("Prediction error:", e)
        raise HTTPException(status_code=500, detail="Prediction failed due to server error.")

@router.post("/cat")
async def predict_disease_cat_endpoint(input_data: SymptomsInput):
    """
    Convert symptom list to one-hot dict and predict top K diseases for cats.
    """
    print("Router reached for cats. Symptoms:", input_data.symptoms)
    try:
        # Call predictor
        result = predict_cat(input_data.symptoms, top_k=3)
        return JSONResponse(result)
    except Exception as e:
        print("Prediction error for cats:", e)
        raise HTTPException(status_code=500, detail="Prediction failed due to server error.")