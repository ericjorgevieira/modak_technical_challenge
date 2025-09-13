import React from "react";
import { ActivityIndicator, Text, View } from "react-native";

type LoadingSpinnerProps = {
  text?: string;
};

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ text }) => (
  <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
    <ActivityIndicator />
    <Text style={{ marginTop: 8 }}>{text}</Text>
  </View>
);

export default LoadingSpinner;
