import React from "react";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../router/RootNavigator";
import ProductsList from "../components/products/ProductsList";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  return (
    <ProductsList
      onPressItem={(item) =>
        navigation.navigate("ProductDetails", { id: String(item.id) })
      }
    />
  );
}
