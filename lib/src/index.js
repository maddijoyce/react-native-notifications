import { Platform, NativeModules, DeviceEventEmitter } from "react-native";

const NativeRNNotifications =
  Platform.OS === "ios"
    ? NativeModules.RNBridgeModule
    : NativeModules.WixRNNotifications;

export const registrationEventTypes = [
  "remoteNotificationsRegistered",
  "remoteNotificationsRegistrationFailed",
  "pushKitRegistered",
  "pushKitNotificationReceived"
];
export const notificationEventTypes = [
  "notificationOpened",
  "notificationReceived",
  "notificationReceivedForeground"
];

export const events = {
  registration: {
    addEventListener: (type, handler) => {
      if (registrationEventTypes.indexOf(type) === -1)
        throw new Error("Event Type Not Found");
      return DeviceEventEmitter.addListener(type, handler);
    },
    removeEventListener: (type, handler) => {
      return DeviceEventEmitter.removeListener(type, handler);
    }
  },
  notifications: {
    getInitialNotification: NativeRNNotifications.getInitialNotification,
    addEventListener: (type, handler) => {
      if (notificationEventTypes.indexOf(type) === -1)
        throw new Error("Event Type Not Found");
      return DeviceEventEmitter.addListener(type, handler);
    },
    removeEventListener: (type, handler) => {
      return DeviceEventEmitter.removeListener(type, handler);
    }
  }
};

export const badge = {
  setNumber: count => {
    NativeRNNotifications.setBadgesCount(count);
  }
};

export const permissions = {
  request: () => {
    if (Platform.OS === "ios") {
      return NativeRNNotifications.requestPermissionsWithCategories([]);
    } else {
      NativeRNNotifications.refreshToken();
      return Promise.resolve([]);
    }
  }
};
