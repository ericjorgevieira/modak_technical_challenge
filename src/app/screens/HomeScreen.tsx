import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { useProductsQuery } from "../hooks/useProductsQuery";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../router/RootNavigator";
import LoadingSpinner from "../components/LoadingSpinner";
import ProductsList from "../components/products/ProductsList";

type Props = NativeStackScreenProps<RootStackParamList, "Home">;

export default function HomeScreen({ navigation }: Props) {
  const { data, isLoading, isError, refetch } = useProductsQuery({
    page: 1,
    limit: 20,
  });

  if (isLoading) {
    return <LoadingSpinner text="Carregando produtos…" />;
  }

  if (isError || !data) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <Text>Falha ao carregar. Verifique sua conexão.</Text>
        <TouchableOpacity onPress={() => refetch()} style={{ marginTop: 12 }}>
          <Text style={{ color: "blue" }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
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
