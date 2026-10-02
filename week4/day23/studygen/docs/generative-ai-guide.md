# StudyGen AI - Generative AI Guide

## 1. Project Overview

StudyGen AI is a study-assistance service that integrates multiple Generative AI providers behind a common interface.

The application supports:

- AI-generated study plans
- Topic explanations
- Multiple-choice quiz generation
- Study-material summarization
- Conversational chat
- OpenAI integration
- Hugging Face integration
- Ollama local-model integration
- Web and mobile API clients

## 2. Architecture

Web and mobile clients communicate with the Flask REST API. The API delegates requests to StudyGenService, which uses the provider factory to select OpenAI, Hugging Face, or Ollama.

## 3. AI Providers

### OpenAI

The OpenAI provider uses the Chat Completions API. The API key is loaded from the OPENAI_API_KEY environment variable and must never be committed to the repository.

### Hugging Face

The Hugging Face provider uses the inference API and supports configurable models. The API key is loaded from the HF_API_KEY environment variable.

### Ollama

Ollama provides a local model option. The default local endpoint is http://localhost:11434 and can be changed using OLLAMA_BASE_URL. The default model is llama3.2.

## 4. Prompt Engineering

StudyGen uses reusable prompt templates for study plans, topic explanations, quiz questions, and revision summaries. Prompts include the learner subject, topic, level, duration, or requested question count where appropriate.

This keeps prompt construction separate from the API and provider implementations.

## 5. REST API

### Health Check

GET /health

### Study Plan

POST /generate/study-plan

Request fields: subject, level, days.

### Explanation

POST /generate/explanation

Request fields: topic, level.

### Quiz

POST /generate/quiz

Request fields: topic, count, level.

### Summary

POST /generate/summary

Request field: text.

### Chat

POST /chat

Request field: messages, containing role and content values.

## 6. Provider Selection

A request can select a provider using the X-AI-Provider HTTP header.

Supported values:

- openai
- huggingface
- ollama

If no provider is specified, the application uses the configured default provider.

## 7. Web and Mobile Integration

The JavaScript client in web/ai_client.js provides methods for the main StudyGen operations. The TypeScript client in mobile/ai_client.ts provides the same API for mobile applications. Both clients support optional provider selection.

## 8. Security

StudyGen follows these practices:

- API keys are read from environment variables.
- Secrets are not embedded in source code.
- API responses are checked for HTTP errors.
- Request timeouts are configured for external AI services.
- Provider-specific credentials remain outside the repository.
- Invalid request bodies are rejected by the Flask API.

## 9. Testing

The project contains automated tests for prompt generation.

Current local validation:

- 4 pytest tests passed.
- JavaScript syntax validated with Node.js.
- TypeScript compilation validated with the TypeScript compiler.
- npm audit reports zero vulnerabilities.
- Live AI provider calls are not required for the automated tests.

## 10. Cost and Performance Considerations

Different providers can have different latency and cost characteristics.

For production use, the application should monitor:

- Request latency
- Error rates
- Token usage
- API costs
- Model response quality
- Rate limits

Local Ollama models can provide an alternative when local inference is appropriate.

## 11. Responsible AI

Generated educational content should be reviewed when accuracy is important. StudyGen should not present generated explanations or quiz answers as guaranteed factual truth.

Potential future improvements include output validation, content moderation, prompt versioning, response caching, usage monitoring, model evaluation, and rate limiting.

## 12. Limitations

This project provides provider integrations and a REST service abstraction. It does not claim that all providers are available or configured on every machine.

OpenAI and Hugging Face require valid API credentials. Ollama requires a locally running Ollama service and an installed model.

The automated tests use local logic and do not require live AI provider requests.

## 13. Validation Checklist

- [x] OpenAI provider implemented
- [x] Hugging Face provider implemented
- [x] Ollama provider implemented
- [x] Provider factory implemented
- [x] Study-focused prompt templates implemented
- [x] Flask REST API implemented
- [x] Web client implemented
- [x] Mobile TypeScript client implemented
- [x] Automated prompt tests implemented
- [x] JavaScript syntax validated
- [x] TypeScript compilation validated
- [x] npm audit reports zero vulnerabilities
- [ ] Live provider request requires provider credentials or local service
