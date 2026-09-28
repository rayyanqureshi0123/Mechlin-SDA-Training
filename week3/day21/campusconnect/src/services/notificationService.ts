export type Notification = {
  id: string;
  title: string;
  message: string;
  createdAt: string;
  read: boolean;
};

class NotificationService {
  private notifications: Notification[] = [];

  registerNotification(
    title: string,
    message: string
  ): Notification {
    const notification: Notification = {
      id: `notification-${Date.now()}`,
      title,
      message,
      createdAt: new Date().toISOString(),
      read: false,
    };

    this.notifications.push(notification);

    return notification;
  }

  getNotifications(): Notification[] {
    return [...this.notifications];
  }

  markAsRead(id: string): void {
    const notification = this.notifications.find(
      (item) => item.id === id
    );

    if (notification) {
      notification.read = true;
    }
  }

  getUnreadCount(): number {
    return this.notifications.filter(
      (notification) => !notification.read
    ).length;
  }

  clearNotifications(): void {
    this.notifications = [];
  }
}

export const notificationService = new NotificationService();