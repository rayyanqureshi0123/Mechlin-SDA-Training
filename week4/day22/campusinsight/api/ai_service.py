from pathlib import Path

import joblib
import pandas as pd
from flask import Flask, jsonify, request


FEATURES = [
    "study_hours",
    "attendance",
    "assignments_completed",
    "previous_score",
    "sleep_hours",
]


class CampusInsightService:
    """Serve student-performance predictions through Flask."""

    def __init__(self, model_path: str, pipeline_path: str) -> None:
        self.model = joblib.load(model_path)
        self.pipeline = joblib.load(pipeline_path)

    def preprocess_input(self, payload: dict) -> pd.DataFrame:
        missing = [feature for feature in FEATURES if feature not in payload]

        if missing:
            raise ValueError(f"Missing features: {', '.join(missing)}")

        values = pd.DataFrame(
            [[payload[feature] for feature in FEATURES]],
            columns=FEATURES,
        )

        values = values.apply(pd.to_numeric, errors="raise")

        values = self.pipeline["scaler"].transform(values)

        return pd.DataFrame(values, columns=FEATURES)

    def predict(self, payload: dict) -> dict:
        processed = self.preprocess_input(payload)
        prediction_id = int(self.model.predict(processed)[0])

        response = {
            "prediction_id": prediction_id,
        }

        if hasattr(self.model, "predict_proba"):
            probabilities = self.model.predict_proba(processed)[0]
            response["confidence"] = round(float(max(probabilities)), 4)

        return response


def create_app(model_path: str, pipeline_path: str) -> Flask:
    app = Flask(__name__)
    service = CampusInsightService(model_path, pipeline_path)

    @app.get("/health")
    def health():
        return jsonify({"status": "healthy", "service": "campusinsight-ai"})

    @app.post("/predict")
    def predict():
        payload = request.get_json(silent=True)

        if not isinstance(payload, dict):
            return jsonify({"error": "Request body must be a JSON object"}), 400

        try:
            return jsonify(service.predict(payload))
        except (TypeError, ValueError) as error:
            return jsonify({"error": str(error)}), 400

    @app.post("/batch-predict")
    def batch_predict():
        payload = request.get_json(silent=True)

        if not isinstance(payload, list) or not payload:
            return jsonify({"error": "Request body must be a non-empty JSON array"}), 400

        try:
            predictions = [service.predict(item) for item in payload]
            return jsonify({"predictions": predictions})
        except (TypeError, ValueError) as error:
            return jsonify({"error": str(error)}), 400

    return app
