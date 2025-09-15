# Project Modak Products App

Mobile app in React Native + Expo (TypeScript) for product listing, based on the [DummyJSON](https://dummyjson.com/docs/products) API.

The app allows you to:

- List products (title, price, thumbnail).
- Filter by category (obtained from the API).
- Sort by price or rating.
- View product details (description, brand, inventory, images).
- (Bonus) Add purchase reminder to the calendar (**iOS**, native module).
- (Bonus) Deep link to open directly to a product or category.

---

## 🚀 Quick Setup

```bash
git clone https://github.com/your-username/products-app.git
cd products-app
npm install

# run in Expo Go (without native module)
npm start

# run with Dev Client (required for iOS native module)
npx expo run:ios # or npx expo run:android
npx expo start --dev-client
```

---

## 📦 Main Dependencies

- [expo](https://docs.expo.dev/) — app base
- [react-navigation](https://reactnavigation.org/) — navigation
- [@tanstack/react-query](https://tanstack.com/query) — data cache / loading / error states
- [axios](https://axios-http.com/) — HTTP client
- [expo-notifications](https://docs.expo.dev/versions/latest/sdk/notifications/) — local/push notifications
- [expo-linking](https://docs.expo.dev/versions/latest/sdk/linking/) — deep links
- **iOS Native Module** `PurchaseReminder` — creates calendar reminders

---

## 📂 Folder Structure

```
src/
app/ # Global providers (React Query, Navigation)
router/ # Main navigator
store/ # Entities + repository interfaces
data/ # Repository implementations (DummyJSON API)
api/ # HTTP client (axios)
components/ # UI components
hooks/ # Data hooks
screens/ # Screens (Home, ProductDetails, etc.)
native/ # iOS native module wrapper
services/ # Notification handler (expo-notifications)
```

---

## 📱 Running in **Expo Go** (no native code)

If you don't need the native reminder module:

```bash
npm start
```

And scan the QR code in the **Expo Go** app.

---

## 🛠️ Running with **native code** (Dev Client)

Required to use the reminder module on iOS.

### iOS

1. Make sure you've prebuilt:

```bash
npx expo prebuild
```

2. Add permission to `Info.plist`:

```xml
<key>NSCalendarsUsageDescription</key>
<string>We need access to your calendar to add a purchase reminder.</string>
```

3. Compile and install on the simulator/device:

```bash
npx expo run:ios
```

4. Start with Dev Client:

```bash
npx expo start --dev-client
```

5. Open a product → tap **Add reminder**. iOS will ask for access to the calendar.

### Android

The app runs normally in Dev Client, but the reminder module is implemented only for iOS.

For Android, it would need to be implemented with `CalendarContract`.

```bash
npx expo run:android
npx expo start --dev-client
```

---

## 🔔 Notifications

The app uses `expo-notifications` for local notifications.
Handler updated for SDK 50+:

```ts
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});
```

---

## 🔗 Deep Links

The app is configured with the `productsapp://` scheme.

Examples:

- Open specific product: `productsapp://product/1`
- Open category: `productsapp://category/electronics`

Test on the iOS simulator:

```bash
xcrun simctl openurl booted "productsapp://product/1"
```

Test on the Android emulator:

```bash
adb shell am start -W -a android.intent.action.VIEW -d "productsapp://product/1"
```

At **Expo Go**, use links in the format `exp://…/--/product/1`.

---

## 📜 Useful Scripts

- `npm start` — starts in Expo Go (managed mode).
- `npm run ios` — build/run on iOS (Dev Client).
- `npm run android` — build/run on Android (Dev Client).
- `npm run dev` — starts Metro server for Dev Client.
- `npm run prebuild` — generates native files (iOS/Android).

---

## 📌 Notes

- The native `PurchaseReminder` module is implemented **only for iOS**.
- To run on **Expo Go**, disable/remove the call to the native module.
- Android can be extended in the future by adding an equivalent module via `CalendarContract`.

---

## 📄 License

MIT
