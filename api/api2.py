import os
from fastapi import FastAPI, HTTPException
import joblib
from pydantic import BaseModel
from typing import List
import numpy as np
import pickle as pkl

# Workaround to fix ModuleNotFoundError for numpy._core
import numpy.core  # Ensure numpy.core is imported
import sys
sys.path.append(os.path.abspath('.'))
#sys.modules['numpy._core'] = numpy.core

# Load the MLPClassifier model using pickle
# Ensure that the file path is correct relative to your working directory

try:
    model = joblib.load("data/xgboost_model_tuned.pkl")
    scaler = joblib.load("data/scaler.pkl")
    print("Modèle et scaler chargés avec succès!")
except Exception as e:
    print(f"Error loading model & scaler: {e}")
    raise


# Initialize FastAPI app
app = FastAPI(title="XGBoost Batch Prediction API")

# Pydantic model for a single sample input
class Sample(BaseModel):
    recency: float
    frequency: float
    time: float

# Pydantic model for a batch input
class BatchInput(BaseModel):
    samples: List[Sample]

@app.get("/")
def read_root():
    return {"Hello": "World"}

@app.post("/predict")
def predict(input_batch: BatchInput):
    try:
        # Convert list of samples into a 2D numpy array
        data = np.array([
            [sample.recency, sample.frequency, sample.time]
            for sample in input_batch.samples
        ])
        # Appliquer le scaler
        scaled_data = scaler.transform(data)
        # Prédire avec le modèle
        predictions = model.predict(scaled_data)
        return {"predictions": predictions.tolist()}
    except Exception as e:
        # Return an HTTP 400 error with the error message if an exception occurs
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    print("Starting server...")
    import uvicorn
    uvicorn.run(app, host="127.0.0.1", port=8000)