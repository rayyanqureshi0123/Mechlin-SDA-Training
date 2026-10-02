import os
import requests

from .providers import AIProvider

class OllamaProvider(AIProvider):
    def __init__(self, base_url: str | None = None, model: str = "llama3.2"):
        self.base_url = (base_url or os.getenv("OLLAMA_BASE_URL", "http://localhost:11434")).rstrip("/")
        self.model = model

    def generate(self, prompt: str, **options) -> str:
        response = requests.post(
            f"{self.base_url}/api/generate",
            json={
                "model": self.model,
                "prompt": prompt,
                "stream": False,
                **options,
            },
            timeout=60,
        )
        response.raise_for_status()
        data = response.json()
        return data["response"]

    def chat(self, messages: list[dict[str, str]], **options) -> str:
        response = requests.post(
            f"{self.base_url}/api/chat",
            json={
                "model": self.model,
                "messages": messages,
                "stream": False,
                **options,
            },
            timeout=60,
        )
        response.raise_for_status()
        data = response.json()
        return data["message"]["content"]
