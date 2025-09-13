import { ExpoConfig } from "@expo/config";

const config: ExpoConfig = {
  name: "modak_technical_challenge",
  slug: "modak_technical_challenge",
  version: "1.0.0",
  orientation: "portrait",
  icon: "./assets/icon.png",
  userInterfaceStyle: "light",
  newArchEnabled: true,
  splash: {
    image: "./assets/splash-icon.png",
    resizeMode: "contain",
    backgroundColor: "#ffffff",
  },
  ios: {
    supportsTablet: true,
    bundleIdentifier: "com.jobify.modak-technical-challenge",
  },
  android: {
    adaptiveIcon: {
      foregroundImage: "./assets/adaptive-icon.png",
      backgroundColor: "#ffffff",
    },
    edgeToEdgeEnabled: true,
    predictiveBackGestureEnabled: false,
    package: "com.jobify.modak_technical_challenge",
  },
  web: {
    favicon: "./assets/favicon.png",
  },
};

export default config;
