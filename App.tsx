import "react-native-gesture-handler";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import AppProvider from "./src/app/AppProvider";

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <AppProvider />
    </GestureHandlerRootView>
  );
}
