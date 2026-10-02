from abc import ABC, abstractmethod

class AIProvider(ABC):
    @abstractmethod
    def generate(self, prompt: str, **options) -> str:
        """Generate text from a prompt."""
        raise NotImplementedError

    @abstractmethod
    def chat(self, messages: list[dict[str, str]], **options) -> str:
        """Generate a response from conversation messages."""
        raise NotImplementedError
