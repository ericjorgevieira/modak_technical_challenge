import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { View, Text } from "react-native";

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
      <Stack.Screen name="Home" options={{ title: "Products" }}>
        {() => <Placeholder title="Home (lista de produtos)" />}
      </Stack.Screen>
      <Stack.Screen name="Category" options={{ title: "Categoria" }}>
        {() => <Placeholder title="Category (filtrados)" />}
      </Stack.Screen>
      <Stack.Screen name="ProductDetails" options={{ title: "Detalhes" }}>
        {() => <Placeholder title="ProductDetails" />}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
