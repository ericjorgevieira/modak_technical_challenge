import React, { useEffect, useState } from "react";
import { View, Text, ActivityIndicator } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { NavigationContainer, LinkingOptions } from "@react-navigation/native";
import * as Linking from "expo-linking";
import RootNavigator, { RootStackParamList } from "./router/RootNavigator";
import { checkIfUserIsInUS } from "./services/location";

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
  const [userIsOnUs, setUserIsOnUs] = useState<boolean | undefined>();
  useEffect(() => {
    const func = async () => {
      const userIsOnUS = await checkIfUserIsInUS();
      setUserIsOnUs(userIsOnUS);
    };
    func();
  }, []);
  if (userIsOnUs === undefined) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  }
  if (!userIsOnUs) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Sorry, this app is only available in the US</Text>
      </View>
    );
  }
  return (
    <QueryClientProvider client={queryClient}>
      <NavigationContainer linking={linking}>
        <RootNavigator />
      </NavigationContainer>
    </QueryClientProvider>
  );
}
