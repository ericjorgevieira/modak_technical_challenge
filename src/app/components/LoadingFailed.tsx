import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

type LoadingFailedProps = {
  text?: string;
  onTryAgain: () => void;
};

const LoadingFailed: React.FC<LoadingFailedProps> = ({ text, onTryAgain }) => (
  <View
    style={{
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      padding: 16,
    }}
  >
    <Text>{text}</Text>
    <TouchableOpacity onPress={onTryAgain} style={{ marginTop: 12 }}>
      <Text style={{ color: "blue" }}>Try again</Text>
    </TouchableOpacity>
  </View>
);

export default LoadingFailed;
