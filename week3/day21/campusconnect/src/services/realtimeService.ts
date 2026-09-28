import WebSocket from "ws";

export type RealtimeMessage = {
  type: string;
  payload: unknown;
};

type MessageHandler = (message: RealtimeMessage) => void;

class RealtimeService {
  private socket: WebSocket | null = null;
  private reconnectAttempts = 0;
  private readonly maxReconnectAttempts = 3;
  private messageHandlers: MessageHandler[] = [];

  connect(url: string): void {
    this.socket = new WebSocket(url);

    this.socket.on("open", () => {
      this.reconnectAttempts = 0;
      console.log("CampusConnect realtime connection established");
    });

    this.socket.on("message", (data: WebSocket.RawData) => {
      try {
        const message = JSON.parse(data.toString()) as RealtimeMessage;

        this.messageHandlers.forEach((handler) => {
          handler(message);
        });
      } catch {
        console.error("Received invalid realtime message");
      }
    });

    this.socket.on("close", () => {
      console.log("Realtime connection closed");
      this.tryReconnect(url);
    });

    this.socket.on("error", (error) => {
      console.error("Realtime connection error:", error.message);
    });
  }

  subscribe(handler: MessageHandler): void {
    this.messageHandlers.push(handler);
  }

  unsubscribe(handler: MessageHandler): void {
    this.messageHandlers = this.messageHandlers.filter(
      (registeredHandler) => registeredHandler !== handler
    );
  }

  send(message: RealtimeMessage): void {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      throw new Error("Realtime connection is not open");
    }

    this.socket.send(JSON.stringify(message));
  }

  disconnect(): void {
    this.reconnectAttempts = this.maxReconnectAttempts;

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  private tryReconnect(url: string): void {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      return;
    }

    this.reconnectAttempts += 1;

    setTimeout(() => {
      this.connect(url);
    }, 1000 * this.reconnectAttempts);
  }
}

export const realtimeService = new RealtimeService();