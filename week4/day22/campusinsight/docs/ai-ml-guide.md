# CampusInsight AI/ML Guide

## 1. Project Overview

CampusInsight is a student-performance prediction service built around a small machine-learning pipeline.

The system accepts academic indicators such as study hours, attendance, assignment completion, previous score, and sleep hours.

It processes the data, trains classification models, evaluates their results, and exposes predictions through a Flask API.

## 2. Data Pipeline

The `DataPipeline` class handles:

1. CSV loading
2. Empty-data validation
3. Missing-value removal
4. Duplicate removal
5. Numeric feature validation
6. Target-label encoding
7. Feature scaling
8. Train/test splitting

The dataset contains four performance categories:

- At_Risk
- Average
- Good
- Excellent

## 3. Machine Learning Models

CampusInsight currently supports:

- Random Forest
- Logistic Regression
- Gradient Boosting

Models are created through `MLModelFactory`, which keeps model selection centralized and rejects unsupported model names.

## 4. Model Evaluation

Each model is evaluated using:

- Accuracy
- Precision
- Recall
- F1 score

The evaluation uses a fixed random seed so local validation is repeatable.

Because the demonstration dataset is intentionally small, its metrics should not be treated as evidence of production-level model performance.

## 5. Prediction API

The Flask service provides:

- `GET /health` for service health
- `POST /predict` for single predictions
- `POST /batch-predict` for multiple predictions

## 6. Web Integration

`web/ai_client.js` provides a browser-friendly client for health checks, single predictions, and batch predictions.

HTTP failures are converted into useful JavaScript errors.

## 7. Mobile Integration

`mobile/ai_client.ts` provides:

- Single predictions
- Batch predictions
- In-memory result caching
- Cache expiration
- Cache clearing

The cache allows previously successful predictions to remain available when a later request fails.

## 8. Testing

The project contains automated tests for:

- Dataset loading
- Model factory creation
- Health endpoint
- Prediction endpoint
- Invalid prediction requests
- Batch prediction

Current local validation includes Python syntax checks, JavaScript syntax validation, TypeScript validation, and six passing pytest tests.

## 9. Security and Responsible AI

The project follows these practices:

- No credentials are stored in source code
- Generated model binaries are excluded from Git
- Invalid API input is rejected
- Unsupported model types are rejected
- Dependencies are pinned
- Predictions should be treated as decision-support information, not definitive judgments about students

Before production use, the model should be evaluated on a larger and more representative dataset, monitored for drift, and reviewed for fairness and privacy risks.

## 10. Performance and Monitoring

Production deployment should monitor:

- API response time
- Prediction failures
- Model confidence distribution
- Data-quality problems
- Model performance drift

The current project is a learning implementation and does not claim production-grade model accuracy.

## 11. Validation Checklist

- [x] Data pipeline implemented
- [x] Multiple ML models implemented
- [x] Model evaluation implemented
- [x] Prediction API implemented
- [x] Batch prediction implemented
- [x] Web integration implemented
- [x] Mobile integration implemented
- [x] Automated tests implemented
- [x] Generated model artifacts excluded from Git
- [x] Security considerations documented
