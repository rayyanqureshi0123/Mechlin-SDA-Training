from flask import Flask, jsonify, request

from .ai_service import StudyGenService

app = Flask(__name__)


def get_service() -> StudyGenService:
    return StudyGenService(request.headers.get("X-AI-Provider"))


def require_json():
    data = request.get_json(silent=True)
    if not isinstance(data, dict):
        return None, (jsonify({"error": "Request body must be valid JSON"}), 400)
    return data, None


@app.get("/health")
def health():
    return jsonify({"service": "studygen-ai", "status": "healthy"})


@app.post("/generate/study-plan")
def generate_study_plan():
    data, error = require_json()
    if error:
        return error
    if not all(key in data for key in ("subject", "level", "days")):
        return jsonify({"error": "subject, level and days are required"}), 400
    try:
        result = get_service().create_study_plan(data["subject"], data["level"], int(data["days"]))
        return jsonify({"result": result})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.post("/generate/explanation")
def generate_explanation():
    data, error = require_json()
    if error:
        return error
    if not all(key in data for key in ("topic", "level")):
        return jsonify({"error": "topic and level are required"}), 400
    try:
        result = get_service().explain_topic(data["topic"], data["level"])
        return jsonify({"result": result})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.post("/generate/quiz")
def generate_quiz():
    data, error = require_json()
    if error:
        return error
    if not all(key in data for key in ("topic", "count", "level")):
        return jsonify({"error": "topic, count and level are required"}), 400
    try:
        result = get_service().create_quiz(data["topic"], int(data["count"]), data["level"])
        return jsonify({"result": result})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.post("/generate/summary")
def generate_summary():
    data, error = require_json()
    if error:
        return error
    if "text" not in data:
        return jsonify({"error": "text is required"}), 400
    try:
        result = get_service().summarize(data["text"])
        return jsonify({"result": result})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.post("/chat")
def chat():
    data, error = require_json()
    if error:
        return error
    messages = data.get("messages")
    if not isinstance(messages, list) or not messages:
        return jsonify({"error": "messages must be a non-empty list"}), 400
    try:
        result = get_service().chat(messages)
        return jsonify({"result": result})
    except Exception as exc:
        return jsonify({"error": str(exc)}), 500


@app.errorhandler(404)
def not_found(_error):
    return jsonify({"error": "Endpoint not found"}), 404


if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=False)
