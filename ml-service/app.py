from fastapi import FastAPI, UploadFile, File

app = FastAPI()

@app.get("/")
def root():
    return {"message": "ML service is running"}

@app.post("/predict")
async def predict(file: UploadFile = File(...)):
    return {
        "prediction": "golden_retriever",
        "confidence": 0.92
    }