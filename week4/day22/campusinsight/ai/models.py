import logging

import joblib
from sklearn.ensemble import GradientBoostingClassifier, RandomForestClassifier
from sklearn.linear_model import LogisticRegression


class MLModelFactory:
    """Create and manage models used by CampusInsight."""

    SUPPORTED_MODELS = {
        "random_forest",
        "logistic_regression",
        "gradient_boosting",
    }

    def __init__(self) -> None:
        self.logger = logging.getLogger(__name__)

    def create_classifier(self, model_type: str):
        if model_type == "random_forest":
            return RandomForestClassifier(
                n_estimators=120,
                max_depth=6,
                random_state=42,
            )

        if model_type == "logistic_regression":
            return LogisticRegression(
                max_iter=1000,
                random_state=42,
            )

        if model_type == "gradient_boosting":
            return GradientBoostingClassifier(
                n_estimators=100,
                learning_rate=0.08,
                max_depth=3,
                random_state=42,
            )

        raise ValueError(
            f"Unsupported model '{model_type}'. "
            f"Choose from: {sorted(self.SUPPORTED_MODELS)}"
        )

    def train_model(self, model, X_train, y_train):
        self.logger.info("Training %s", type(model).__name__)
        return model.fit(X_train, y_train)

    def save_model(self, model, file_path: str) -> None:
        joblib.dump(model, file_path)

    def load_model(self, file_path: str):
        return joblib.load(file_path)
