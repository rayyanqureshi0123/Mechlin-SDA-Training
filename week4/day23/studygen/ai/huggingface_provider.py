import os
import requests

from .providers import AIProvider

class HuggingFaceProvider(AIProvider):
    def __init__(self, api_key: str | None = None, model: str = "google/flan-t5-base"):
        self.api_key = api_key or os.getenv("HF_API_KEY")
        self.model = model
        self.base_url = f"https://api-inference.huggingface.co/models/{self.model}"

    def _headers(self) -> dict[str, str]:
        if not self.api_key:
            raise RuntimeError("HF_API_KEY is not configured")
        return {"Authorization": f"Bearer {self.api_key}"}

    def generate(self, prompt: str, **options) -> str:
        response = requests.post(
            self.base_url,
            headers=self._headers(),
            json={"inputs": prompt, "parameters": options},
            timeout=60,
        )
        response.raise_for_status()
        data = response.json()

        if isinstance(data, list) and data and "generated_text" in data[0]:
            return data[0]["generated_text"]

        raise RuntimeError(f"Unexpected Hugging Face response: {data}")

    def chat(self, messages: list[dict[str, str]], **options) -> str:
        prompt = "\n".join(
            f'{message["role"]}: {message["content"]}'
            for message in messages
        )
        return self.generate(prompt, **options)
