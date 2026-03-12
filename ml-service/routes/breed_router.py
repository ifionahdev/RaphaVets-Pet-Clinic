from fastapi import APIRouter, UploadFile, File, HTTPException
from fastapi.responses import JSONResponse
from predictors.predict_breed import predict_breed_from_bytes

router = APIRouter()

# Acceptable image MIME types and max upload size
ALLOWED_MIME = {"image/jpeg", "image/png", "image/webp"}
MAX_UPLOAD_BYTES = 25 * 1024 * 1024  # 5 MB


@router.post("/")
async def predict_breed_endpoint(file: UploadFile = File(...)):
    # Basic validation
    if file.content_type not in ALLOWED_MIME:
        raise HTTPException(status_code=415, detail="Unsupported media type")

    contents = await file.read()
    if len(contents) > MAX_UPLOAD_BYTES:
        raise HTTPException(status_code=413, detail="File too large")

    try:
        result = predict_breed_from_bytes(contents)
        return JSONResponse(result)
    except Exception as e:
        print("Breed prediction error:", e)
        raise HTTPException(status_code=500, detail="Prediction failed")