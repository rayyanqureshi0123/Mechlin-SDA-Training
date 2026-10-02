export type AIProvider = "openai" | "huggingface" | "ollama";

export interface StudyGenConfig {
  baseUrl: string;
  provider?: AIProvider;
}

interface ApiResponse {
  result?: string;
  error?: string;
}

export class StudyGenClient {
  private readonly baseUrl: string;
  private readonly provider?: AIProvider;

  constructor(config: StudyGenConfig) {
    this.baseUrl = config.baseUrl.replace(/\/$/, "");
    this.provider = config.provider;
  }

  private async request<T extends ApiResponse>(
    path: string,
    body?: Record<string, unknown>
  ): Promise<T> {
    const headers: Record<string, string> = {
      "Content-Type": "application/json",
    };

    if (this.provider) {
      headers["X-AI-Provider"] = this.provider;
    }

    const response = await fetch(this.baseUrl + path, {
      method: body ? "POST" : "GET",
      headers,
      ...(body ? { body: JSON.stringify(body) } : {}),
    });

    const data = (await response.json()) as T;

    if (!response.ok) {
      throw new Error(data.error || "StudyGen API request failed");
    }

    return data;
  }

  health(): Promise<ApiResponse> {
    return this.request("/health");
  }

  studyPlan(subject: string, level: string, days: number): Promise<ApiResponse> {
    return this.request("/generate/study-plan", {
      subject,
      level,
      days,
    });
  }

  explain(topic: string, level: string): Promise<ApiResponse> {
    return this.request("/generate/explanation", {
      topic,
      level,
    });
  }

  quiz(topic: string, count: number, level: string): Promise<ApiResponse> {
    return this.request("/generate/quiz", {
      topic,
      count,
      level,
    });
  }

  summary(text: string): Promise<ApiResponse> {
    return this.request("/generate/summary", {
      text,
    });
  }

  chat(messages: Array<{ role: string; content: string }>): Promise<ApiResponse> {
    return this.request("/chat", {
      messages,
    });
  }
}
