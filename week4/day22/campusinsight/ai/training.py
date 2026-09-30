from dataclasses import dataclass

from sklearn.metrics import accuracy_score, f1_score, precision_score, recall_score

from .models import MLModelFactory


@dataclass
class ModelResult:
    name: str
    accuracy: float
    precision: float
    recall: float
    f1_score: float


class ModelTrainer:
    """Train and evaluate CampusInsight classification models."""

    def __init__(self) -> None:
        self.factory = MLModelFactory()

    def train_and_evaluate(
        self,
        X_train,
        X_test,
        y_train,
        y_test,
    ) -> list[ModelResult]:
        results = []

        for model_name in sorted(self.factory.SUPPORTED_MODELS):
            model = self.factory.create_classifier(model_name)
            model = self.factory.train_model(model, X_train, y_train)
            predictions = model.predict(X_test)

            results.append(
                ModelResult(
                    name=model_name,
                    accuracy=accuracy_score(y_test, predictions),
                    precision=precision_score(
                        y_test,
                        predictions,
                        average="weighted",
                        zero_division=0,
                    ),
                    recall=recall_score(
                        y_test,
                        predictions,
                        average="weighted",
                        zero_division=0,
                    ),
                    f1_score=f1_score(
                        y_test,
                        predictions,
                        average="weighted",
                        zero_division=0,
                    ),
                )
            )

        return results
