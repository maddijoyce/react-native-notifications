import { NativeEventEmitter } from "react-native";
export type EventType =
  | "notificationOpened"
  | "notificationReceived"
  | "notificationReceivedForeground"
  | "remoteNotificationsRegistered"
  | "remoteNotificationsRegistrationFailed"
  | "pushKitRegistered"
  | "pushKitNotificationReceived";
export type EventHandlerArgs = {
  remoteNotificationsRegistered: { deviceToken: string };
};
export type EventHandler<E extends EventType> = (
  e: EventHandlerArgs[E]
) => void;

interface NotificationsEventEmitter extends NativeEventEmitter {
  addEventListener: <E extends EventType>(
    type: E,
    handler: EventHandler<E>
  ) => void;
  removeEventListener: <E extends EventType>(
    type: E,
    handler: EventHandler<E>
  ) => void;
}
export const events: NotificationsEventEmitter;

export const badge: {
  setNumber: (count: number) => void;
};

export const permissions: {
  request: () => Promise<string[]>;
};
