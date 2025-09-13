import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useProductsQuery } from "../hooks/useProductsQuery";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../router/RootNavigator";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductsList from "../components/products/ProductsList";
import LoadingFailed from "../components/LoadingFailed";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { data, isLoading, isError, refetch } = useProductsQuery({
    page: 1,
    limit: 20,
  });

  if (isLoading) {
    return <LoadingSpinner text="Loading products…" />;
  }

  if (isError || !data) {
    return (
      <LoadingFailed
        text="Failed to load. Check your network."
        onTryAgain={() => refetch()}
      />
    );
  }

  return (
    <ProductsList
      data={data}
      onPressItem={(item) =>
        navigation.navigate("ProductDetails", { id: String(item.id) })
      }
    />
  );
}
