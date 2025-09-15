import { NativeModules, Platform } from "react-native";

type AddReminderResult = { eventId: string };

const { PurchaseReminder } = NativeModules as {
  PurchaseReminder: {
    addReminder: (
      title: string,
      notes: string | undefined,
      startTimestampMs: number,
      durationMinutes: number
    ) => Promise<AddReminderResult>;
  };
};

export async function addPurchaseReminder(
  title: string,
  notes?: string,
  minutesFromNow: number = 60,
  durationMinutes: number = 60
): Promise<AddReminderResult> {
  if (Platform.OS !== "ios") {
    throw new Error(
      "addPurchaseReminder is only available on iOS in this build."
    );
  }
  const start = Date.now() + minutesFromNow * 60_000;
  return PurchaseReminder.addReminder(title, notes, start, durationMinutes);
}
