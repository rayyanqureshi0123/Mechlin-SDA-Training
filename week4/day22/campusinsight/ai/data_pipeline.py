from pathlib import Path
import logging

import joblib
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder, StandardScaler


class DataPipeline:
    """Prepare CampusInsight student-performance data for ML models."""

    def __init__(self) -> None:
        self.scaler = StandardScaler()
        self.target_encoder = LabelEncoder()
        self.logger = logging.getLogger(__name__)

    def load_data(self, file_path: str | Path) -> pd.DataFrame:
        path = Path(file_path)

        if path.suffix.lower() != ".csv":
            raise ValueError(f"Unsupported file format: {path.suffix}")

        if not path.exists():
            raise FileNotFoundError(f"Dataset not found: {path}")

        data = pd.read_csv(path)

        if data.empty:
            raise ValueError("Dataset is empty")

        self.logger.info("Loaded %d rows from %s", len(data), path)
        return data

    def preprocess_data(
        self,
        data: pd.DataFrame,
        target_column: str = "performance",
    ) -> pd.DataFrame:
        if target_column not in data.columns:
            raise ValueError(f"Missing target column: {target_column}")

        cleaned = data.dropna().drop_duplicates().copy()

        feature_columns = [
            column for column in cleaned.columns if column != target_column
        ]

        cleaned[feature_columns] = cleaned[feature_columns].apply(
            pd.to_numeric,
            errors="raise",
        )

        cleaned[target_column] = self.target_encoder.fit_transform(
            cleaned[target_column]
        )

        cleaned[feature_columns] = self.scaler.fit_transform(
            cleaned[feature_columns]
        )

        return cleaned

    def split_data(
        self,
        data: pd.DataFrame,
        target_column: str = "performance",
        test_size: float = 0.2,
    ):
        if not 0 < test_size < 1:
            raise ValueError("test_size must be between 0 and 1")

        features = data.drop(columns=[target_column])
        target = data[target_column]

        return train_test_split(
            features,
            target,
            test_size=test_size,
            random_state=42,
            stratify=target,
        )

    def save_pipeline(self, file_path: str | Path) -> None:
        joblib.dump(
            {
                "scaler": self.scaler,
                "target_encoder": self.target_encoder,
            },
            file_path,
        )

    def load_pipeline(self, file_path: str | Path) -> None:
        pipeline = joblib.load(file_path)
        self.scaler = pipeline["scaler"]
        self.target_encoder = pipeline["target_encoder"]
