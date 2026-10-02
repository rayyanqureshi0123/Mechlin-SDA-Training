from ..ai.factory import get_provider
from ..ai.prompts import explanation_prompt, quiz_prompt, study_plan_prompt, summary_prompt


class StudyGenService:
    def __init__(self, provider_name: str | None = None):
        self.provider = get_provider(provider_name)

    def create_study_plan(self, subject: str, level: str, days: int) -> str:
        return self.provider.generate(study_plan_prompt(subject, level, days))

    def explain_topic(self, topic: str, level: str) -> str:
        return self.provider.generate(explanation_prompt(topic, level))

    def create_quiz(self, topic: str, count: int, level: str) -> str:
        return self.provider.generate(quiz_prompt(topic, count, level))

    def summarize(self, text: str) -> str:
        return self.provider.generate(summary_prompt(text))

    def chat(self, messages: list[dict[str, str]]) -> str:
        return self.provider.chat(messages)
