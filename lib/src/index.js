import { Platform, NativeModules, DeviceEventEmitter } from "react-native";

const NativeRNNotifications =
  Platform.OS === "ios"
    ? NativeModules.RNBridgeModule
    : NativeModules.WixRNNotifications;

export const eventTypes = [
  "notificationOpened",
  "notificationReceived",
  "notificationReceivedForeground",
  "remoteNotificationsRegistered",
  "remoteNotificationsRegistrationFailed",
  "pushKitRegistered",
  "pushKitNotificationReceived"
];

export const events = {
  addEventListener: (type, handler) => {
    if (eventTypes.indexOf(type) === -1)
      throw new Error("Event Type Not Found");
    return DeviceEventEmitter.addListener(type, handler);
  },
  removeEventListener: (type, handler) => {
    return DeviceEventEmitter.removeListener(type, handler);
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
      return NativeRNNotifications.refreshToken();
    }
  }
};
