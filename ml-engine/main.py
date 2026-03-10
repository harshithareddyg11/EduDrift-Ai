from fastapi import FastAPI
from pydantic import BaseModel, Field

from drift_detection import detect_drift


app = FastAPI(title="EduDrift ML Service", version="1.0.0")


class DriftInput(BaseModel):
    accuracy: float = Field(..., description="Percent 0-100")
    solveTime: float = Field(..., description="Average solve time in seconds")
    retryCount: float = Field(..., description="Average retry count")
    topicErrorRate: float = Field(..., description="Repeated mistakes score")


@app.get("/health")
def health():
    return {"ok": True}


@app.post("/ml/detect-drift")
def ml_detect_drift(payload: DriftInput):
    result = detect_drift(payload.model_dump())
    return {"driftDetected": result.driftDetected, "reason": result.reason}

