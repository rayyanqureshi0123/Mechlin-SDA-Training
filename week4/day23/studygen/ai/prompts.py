def study_plan_prompt(subject: str, level: str, days: int) -> str:
    return f"Create a practical {days}-day study plan for {subject} for a {level}-level student. Include daily topics, practice activities, and a short revision task."

def explanation_prompt(topic: str, level: str) -> str:
    return f"Explain {topic} to a {level}-level student. Use simple language, a small example, and key points to remember."

def quiz_prompt(topic: str, count: int, level: str) -> str:
    return f"Create {count} multiple-choice quiz questions about {topic} for a {level}-level student. Include four options and identify the correct answer with a brief explanation."

def summary_prompt(text: str) -> str:
    return "Summarize the following study material into concise revision notes with headings and bullet points:\n\n" + text + "\n"
