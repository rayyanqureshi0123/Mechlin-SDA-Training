import os

from .providers import AIProvider
from .openai_provider import OpenAIProvider
from .huggingface_provider import HuggingFaceProvider
from .ollama_provider import OllamaProvider


def get_provider(name: str | None = None) -> AIProvider:
    provider_name = (name or os.getenv("AI_PROVIDER", "ollama")).lower()

    if provider_name == "openai":
        return OpenAIProvider()
    if provider_name in {"huggingface", "hf"}:
        return HuggingFaceProvider()
    if provider_name == "ollama":
        return OllamaProvider()

    raise ValueError(f"Unsupported AI provider: {provider_name}")
