import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).parents[1].parent))

from studygen.ai.prompts import explanation_prompt, quiz_prompt, study_plan_prompt, summary_prompt


def test_study_plan_prompt():
    prompt = study_plan_prompt("Python", "beginner", 7)
    assert "7-day study plan" in prompt
    assert "Python" in prompt


def test_explanation_prompt():
    prompt = explanation_prompt("recursion", "beginner")
    assert "recursion" in prompt
    assert "beginner" in prompt


def test_quiz_prompt():
    prompt = quiz_prompt("OOP", 5, "intermediate")
    assert "5 multiple-choice quiz questions" in prompt
    assert "OOP" in prompt


def test_summary_prompt():
    prompt = summary_prompt("Important Python concepts")
    assert "revision notes" in prompt
    assert "Important Python concepts" in prompt
