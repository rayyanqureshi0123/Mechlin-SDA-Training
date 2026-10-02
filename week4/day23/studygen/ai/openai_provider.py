import os
import requests

from .providers import AIProvider

class OpenAIProvider(AIProvider):
    def __init__(self, api_key: str | None = None, model: str = "gpt-4o-mini"):
        self.api_key = api_key or os.getenv("OPENAI_API_KEY")
        self.model = model
        self.base_url = "https://api.openai.com/v1"

    def _headers(self) -> dict[str, str]:
        if not self.api_key:
            raise RuntimeError("OPENAI_API_KEY is not configured")
        return {
            "Authorization": f"Bearer {self.api_key}",
            "Content-Type": "application/json",
        }

    def generate(self, prompt: str, **options) -> str:
        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers=self._headers(),
            json={
                "model": self.model,
                "messages": [{"role": "user", "content": prompt}], 
                **options,
            },
            timeout=30,
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]

    def chat(self, messages: list[dict[str, str]], **options) -> str:
        response = requests.post(
            f"{self.base_url}/chat/completions",
            headers=self._headers(),
            json={
                "model": self.model,
                "messages": messages,
                **options,
            },
            timeout=30,
        )
        response.raise_for_status()
        return response.json()["choices"][0]["message"]["content"]
