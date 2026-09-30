from pathlib import Path

import joblib
import pytest

from week4.day22.campusinsight.ai.data_pipeline import DataPipeline
from week4.day22.campusinsight.ai.models import MLModelFactory
from week4.day22.campusinsight.api.ai_service import create_app


BASE_DIR = Path("week4/day22/campusinsight")
DATASET = BASE_DIR / "data/student_performance.csv"
MODEL = BASE_DIR / "api/model.joblib"
PIPELINE = BASE_DIR / "api/pipeline.joblib"


def test_pipeline_loads_dataset():
    pipeline = DataPipeline()
    data = pipeline.load_data(DATASET)

    assert len(data) == 20
    assert "performance" in data.columns


def test_model_factory_supports_expected_models():
    factory = MLModelFactory()

    for model_name in factory.SUPPORTED_MODELS:
        assert factory.create_classifier(model_name) is not None


@pytest.fixture()
def client():
    app = create_app(str(MODEL), str(PIPELINE))
    app.config["TESTING"] = True
    return app.test_client()


def test_health_endpoint(client):
    response = client.get("/health")

    assert response.status_code == 200
    assert response.json["status"] == "healthy"


def test_prediction_endpoint(client):
    response = client.post(
        "/predict",
        json={
            "study_hours": 5.0,
            "attendance": 85,
            "assignments_completed": 8,
            "previous_score": 72,
            "sleep_hours": 7.0,
        },
    )

    assert response.status_code == 200
    assert "prediction_id" in response.json
    assert 0 <= response.json["confidence"] <= 1


def test_prediction_rejects_missing_features(client):
    response = client.post(
        "/predict",
        json={
            "study_hours": 5.0,
            "attendance": 85,
        },
    )

    assert response.status_code == 400
    assert "error" in response.json


def test_batch_prediction_endpoint(client):
    response = client.post(
        "/batch-predict",
        json=[
            {
                "study_hours": 2.0,
                "attendance": 65,
                "assignments_completed": 4,
                "previous_score": 52,
                "sleep_hours": 5.5,
            },
            {
                "study_hours": 7.0,
                "attendance": 92,
                "assignments_completed": 10,
                "previous_score": 84,
                "sleep_hours": 8.0,
            },
        ],
    )

    assert response.status_code == 200
    assert len(response.json["predictions"]) == 2
