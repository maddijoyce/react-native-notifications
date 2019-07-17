import { NativeEventEmitter } from "react-native";
export type RegistrationEventType =
  | "remoteNotificationsRegistered"
  | "remoteNotificationsRegistrationFailed"
  | "pushKitRegistered"
  | "pushKitNotificationReceived";
export type NotificationEventType =
  | "notificationOpened"
  | "notificationReceived"
  | "notificationReceivedForeground";

export type EventType = RegistrationEventType | NotificationEventType;
export type EventHandler<A extends {}> = (e: A) => void;

interface NotificationsEventEmitter<E extends EventType, A extends {}> {
  addEventListener: (type: E, handler: EventHandler<A>) => void;
  removeEventListener: (type: E, handler: EventHandler<A>) => void;
}
export const events: {
  registration: NotificationsEventEmitter<
    RegistrationEventType,
    { deviceToken: string }
  >;
  notifications: NotificationsEventEmitter<NotificationEventType, any>;
};

export const badge: {
  setNumber: (count: number) => void;
};

export const permissions: {
  request: () => Promise<string[]>;
};
