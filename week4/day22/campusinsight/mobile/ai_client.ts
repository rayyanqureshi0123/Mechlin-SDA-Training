export interface StudentFeatures {
  study_hours: number;
  attendance: number;
  assignments_completed: number;
  previous_score: number;
  sleep_hours: number;
}

export interface PredictionResult {
  prediction_id: number;
  confidence?: number;
}

interface CachedPrediction {
  result: PredictionResult;
  expiresAt: number;
}

export class CampusInsightMobileClient {
  private readonly apiBaseUrl: string;
  private readonly cache = new Map<string, CachedPrediction>();
  private readonly cacheTtlMs: number;

  constructor(apiBaseUrl: string, cacheTtlMs = 60 * 60 * 1000) {
    this.apiBaseUrl = apiBaseUrl.replace(/\/$/, "");
    this.cacheTtlMs = cacheTtlMs;
  }

  async predict(
    student: StudentFeatures,
  ): Promise<PredictionResult> {
    const cacheKey = this.createCacheKey(student);
    const cached = this.cache.get(cacheKey);

    if (cached && cached.expiresAt > Date.now()) {
      return cached.result;
    }

    try {
      const response = await fetch(`${this.apiBaseUrl}/predict`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(student),
      });

      if (!response.ok) {
        throw new Error(`Prediction failed: ${response.status}`);
      }

      const result = (await response.json()) as PredictionResult;

      this.cache.set(cacheKey, {
        result,
        expiresAt: Date.now() + this.cacheTtlMs,
      });

      return result;
    } catch (error) {
      if (cached && cached.expiresAt > Date.now()) {
        return cached.result;
      }

      throw error;
    }
  }

  async batchPredict(
    students: StudentFeatures[],
  ): Promise<PredictionResult[]> {
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

    const payload = (await response.json()) as {
      predictions: PredictionResult[];
    };

    return payload.predictions;
  }

  clearCache(): void {
    this.cache.clear();
  }

  private createCacheKey(student: StudentFeatures): string {
    return JSON.stringify(student);
  }
}
