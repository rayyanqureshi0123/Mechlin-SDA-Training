import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEYS = {
  dashboard: '@campusmate/dashboard',
  queue: '@campusmate/offline_queue',
};

class OfflineService {
  async saveDashboard(data) {
    await AsyncStorage.setItem(
      STORAGE_KEYS.dashboard,
      JSON.stringify(data)
    );
  }

  async getDashboard() {
    const storedData = await AsyncStorage.getItem(STORAGE_KEYS.dashboard);

    return storedData ? JSON.parse(storedData) : null;
  }

  async addToQueue(action) {
    const queue = await this.getQueue();

    queue.push({
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      createdAt: Date.now(),
      ...action,
    });

    await AsyncStorage.setItem(
      STORAGE_KEYS.queue,
      JSON.stringify(queue)
    );
  }

  async getQueue() {
    const storedQueue = await AsyncStorage.getItem(STORAGE_KEYS.queue);

    return storedQueue ? JSON.parse(storedQueue) : [];
  }

  async clearQueue() {
    await AsyncStorage.removeItem(STORAGE_KEYS.queue);
  }

  async syncQueue(syncHandler) {
    const queue = await this.getQueue();

    if (queue.length === 0) {
      return {
        synced: 0,
        remaining: 0,
      };
    }

    const remaining = [];

    for (const action of queue) {
      try {
        await syncHandler(action);
      } catch (error) {
        remaining.push(action);
      }
    }

    await AsyncStorage.setItem(
      STORAGE_KEYS.queue,
      JSON.stringify(remaining)
    );

    return {
      synced: queue.length - remaining.length,
      remaining: remaining.length,
    };
  }
}

export const offlineService = new OfflineService();