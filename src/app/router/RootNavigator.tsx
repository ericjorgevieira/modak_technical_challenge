import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";
import HomeScreen from "../screens/HomeScreen";
import ProductDetailsScreen from "../screens/ProductDetailsScreen";

export type RootStackParamList = {
  Home: undefined;
  Category: { category?: string };
  ProductDetails: { id: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function Placeholder({ title }: { title: string }) {
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text>{title}</Text>
    </View>
  );
}

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Home"
        options={{ title: "Products" }}
        component={HomeScreen}
      />
      <Stack.Screen
        name="ProductDetails"
        options={{ title: "Details" }}
        component={ProductDetailsScreen}
      />
    </Stack.Navigator>
  );
}
