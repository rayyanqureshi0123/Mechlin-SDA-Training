const DEFAULT_BASE_URL = "http://127.0.0.1:5000";

async function request(path, options = {}, baseUrl = DEFAULT_BASE_URL) {
  const response = await fetch(baseUrl + path, {
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
    ...options,
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "StudyGen API request failed");
  }

  return data;
}

export function createStudyGenClient(baseUrl = DEFAULT_BASE_URL) {
  return {
    health: () => request("/health", { method: "GET" }, baseUrl),
    studyPlan: (subject, level, days, provider) => request("/generate/study-plan", { method: "POST", headers: provider ? { "X-AI-Provider": provider } : {}, body: JSON.stringify({ subject, level, days }) }, baseUrl),
    explain: (topic, level, provider) => request("/generate/explanation", { method: "POST", headers: provider ? { "X-AI-Provider": provider } : {}, body: JSON.stringify({ topic, level }) }, baseUrl),
    quiz: (topic, count, level, provider) => request("/generate/quiz", { method: "POST", headers: provider ? { "X-AI-Provider": provider } : {}, body: JSON.stringify({ topic, count, level }) }, baseUrl),
    summary: (text, provider) => request("/generate/summary", { method: "POST", headers: provider ? { "X-AI-Provider": provider } : {}, body: JSON.stringify({ text }) }, baseUrl),
    chat: (messages, provider) => request("/chat", { method: "POST", headers: provider ? { "X-AI-Provider": provider } : {}, body: JSON.stringify({ messages }) }, baseUrl),
  };
}
