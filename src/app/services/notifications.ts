import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export async function ensureNotificationPermissions() {
  if (
    !(await Notifications.getPermissionsAsync()) &&
    !(await Notifications.requestPermissionsAsync())
  ) {
    throw new Error("Notifications permission not granted");
  }
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
    });
  }
}

export async function scheduleLocalNotification(title: string, body: string) {
  await ensureNotificationPermissions();
  return Notifications.scheduleNotificationAsync({
    content: { title, body },
    trigger: null,
  });
}
