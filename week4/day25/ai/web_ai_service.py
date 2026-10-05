from datetime import datetime

from flask import Flask, jsonify, request


app = Flask(__name__)


def generate_chat_response(message, history=None):
    """Generate a simple AI-style response using conversation context."""
    message = message.strip()
    history = history or []

    if not message:
        return "Please enter a message."

    context_note = ""
    if history:
        context_note = f" I can also use the {len(history)} previous messages as context."

    return (
        f"AI response to: {message}.{context_note}"
    )


def generate_content(content_type, topic, tone, length, keywords):
    """Generate demo AI content from the supplied parameters."""
    content_type = content_type or "article"
    topic = topic or "General Topic"
    tone = tone or "professional"
    length = length or "medium"
    keywords = keywords or []

    keyword_text = ", ".join(keywords) if keywords else "none specified"

    return (
        f"{content_type.title()} about {topic}\n\n"
        f"Tone: {tone}\n"
        f"Length: {length}\n"
        f"Keywords: {keyword_text}\n\n"
        f"This is AI-generated {content_type} content about {topic}. "
        f"The content is written in a {tone} tone and follows the requested "
        f"{length} length."
    )


def generate_recommendations(profile):
    """Generate recommendations based on a user profile."""
    profile = profile or {}

    interests = profile.get("interests", [])
    skills = profile.get("skills", [])

    recommendations = []

    if interests:
        for interest in interests[:3]:
            recommendations.append(
                {
                    "title": f"Learn more about {interest}",
                    "description": f"Explore advanced resources related to {interest}.",
                    "category": "learning",
                    "reason": "Matches your interests",
                }
            )

    if skills:
        for skill in skills[:2]:
            recommendations.append(
                {
                    "title": f"Improve your {skill} skills",
                    "description": f"Practice projects and resources for {skill}.",
                    "category": "skills",
                    "reason": "Matches your existing skills",
                }
            )

    if not recommendations:
        recommendations = [
            {
                "title": "Explore Web Development",
                "description": "Learn modern frontend and backend development.",
                "category": "technology",
                "reason": "Popular learning path",
            },
            {
                "title": "Practice Programming",
                "description": "Build projects to improve your programming skills.",
                "category": "programming",
                "reason": "Useful for skill development",
            },
        ]

    return recommendations


@app.get("/health")
def health():
    return jsonify(
        {
            "status": "healthy",
            "service": "ai-web-service",
            "timestamp": datetime.utcnow().isoformat(),
        }
    )


@app.post("/chat")
def chat():
    data = request.get_json(silent=True) or {}

    message = data.get("message", "")
    history = data.get("history", [])

    if not isinstance(message, str) or not message.strip():
        return jsonify({"error": "message is required"}), 400

    if not isinstance(history, list):
        return jsonify({"error": "history must be an array"}), 400

    response = generate_chat_response(message, history)

    return jsonify(
        {
            "response": response,
            "timestamp": datetime.utcnow().isoformat(),
        }
    )


@app.post("/generate")
def generate():
    data = request.get_json(silent=True) or {}

    topic = data.get("topic", "")
    content_type = data.get("contentType", "article")
    tone = data.get("tone", "professional")
    length = data.get("length", "medium")
    keywords = data.get("keywords", [])

    if not isinstance(topic, str) or not topic.strip():
        return jsonify({"error": "topic is required"}), 400

    if not isinstance(keywords, list):
        return jsonify({"error": "keywords must be an array"}), 400

    content = generate_content(
        content_type,
        topic,
        tone,
        length,
        keywords,
    )

    return jsonify(
        {
            "content": content,
            "metadata": {
                "type": content_type,
                "topic": topic,
                "tone": tone,
                "length": length,
            },
        }
    )


@app.post("/recommendations")
def recommendations():
    data = request.get_json(silent=True) or {}

    profile = data.get("profile", {})

    if not isinstance(profile, dict):
        return jsonify({"error": "profile must be an object"}), 400

    return jsonify(
        {
            "recommendations": generate_recommendations(profile)
        }
    )


@app.post("/recommendations/feedback")
def recommendation_feedback():
    data = request.get_json(silent=True) or {}

    recommendation_id = data.get("recommendationId")
    feedback = data.get("feedback")

    if not recommendation_id:
        return jsonify({"error": "recommendationId is required"}), 400

    if feedback not in {"like", "dislike", "bookmark"}:
        return jsonify(
            {
                "error": (
                    "feedback must be one of: "
                    "like, dislike, bookmark"
                )
            }
        ), 400

    return jsonify(
        {
            "success": True,
            "recommendationId": recommendation_id,
            "feedback": feedback,
        }
    )


if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=5001,
        debug=False,
    )