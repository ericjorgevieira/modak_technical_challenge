import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import RootNavigator, { RootStackParamList } from "./router/RootNavigator";

const queryClient = new QueryClient();

const prefix = Linking.createURL("/");
const linking: LinkingOptions<RootStackParamList> = {
  prefixes: [prefix, "productsapp://"],
  config: {
    screens: {
      Home: "",
      Category: "category/:category?",
      ProductDetails: "product/:id",
    },
  },
};

export default function AppProvider() {
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={linking}>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
