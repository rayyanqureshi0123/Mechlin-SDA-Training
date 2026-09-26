import NetInfo from '@react-native-community/netinfo';

class NetworkService {
  constructor() {
    this.isOnline = true;
    this.listeners = [];
  }

  startMonitoring() {
    return NetInfo.addEventListener((state) => {
      this.isOnline = state.isConnected ?? false;

      this.listeners.forEach((listener) => {
        listener(this.isOnline);
      });
    });
  }

  addListener(listener) {
    this.listeners.push(listener);

    return () => {
      this.listeners = this.listeners.filter(
        (item) => item !== listener
      );
    };
  }

  async getCurrentStatus() {
    const state = await NetInfo.fetch();

    this.isOnline = state.isConnected ?? false;

    return this.isOnline;
  }

  isConnected() {
    return this.isOnline;
  }
}

export const networkService = new NetworkService();