type QueuedRequest = {
  id: string;
  method: "GET" | "POST" | "PUT" | "DELETE";
  url: string;
  data?: unknown;
};

class OfflineService {
  private queue: QueuedRequest[] = [];
  private cache = new Map<string, unknown>();

  cacheResponse(key: string, data: unknown): void {
    this.cache.set(key, data);
  }

  getCachedResponse<T>(key: string): T | null {
    const data = this.cache.get(key);

    return data === undefined ? null : (data as T);
  }

  queueRequest(
    method: QueuedRequest["method"],
    url: string,
    data?: unknown
  ): string {
    const id = `request-${Date.now()}-${Math.random()
      .toString(36)
      .slice(2, 8)}`;

    this.queue.push({
      id,
      method,
      url,
      data,
    });

    return id;
  }

  getQueuedRequests(): QueuedRequest[] {
    return [...this.queue];
  }

  removeQueuedRequest(id: string): void {
    this.queue = this.queue.filter((request) => request.id !== id);
  }

  clearQueue(): void {
    this.queue = [];
  }

  getQueueSize(): number {
    return this.queue.length;
  }

  async synchronize(
    sendRequest: (request: QueuedRequest) => Promise<void>
  ): Promise<void> {
    const pendingRequests = [...this.queue];

    for (const request of pendingRequests) {
      try {
        await sendRequest(request);
        this.removeQueuedRequest(request.id);
      } catch {
        // Keep failed requests in the queue for the next synchronization.
        break;
      }
    }
  }
}

export const offlineService = new OfflineService();