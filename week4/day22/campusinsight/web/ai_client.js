export class CampusInsightClient {
  constructor(apiBaseUrl) {
    this.apiBaseUrl = apiBaseUrl.replace(/\/$/, "");
  }

  async checkHealth() {
    const response = await fetch(`${this.apiBaseUrl}/health`);

    if (!response.ok) {
      throw new Error(`Health check failed: ${response.status}`);
    }

    return response.json();
  }

  async predict(studentData) {
    const response = await fetch(`${this.apiBaseUrl}/predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(studentData),
    });

    if (!response.ok) {
      const message = await response.text();
      throw new Error(`Prediction failed (${response.status}): ${message}`);
    }

    return response.json();
  }

  async batchPredict(students) {
    const response = await fetch(`${this.apiBaseUrl}/batch-predict`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(students),
    });

    if (!response.ok) {
      throw new Error(`Batch prediction failed: ${response.status}`);
    }

    return response.json();
  }
}
