import React, { useMemo } from "react";
import {
  ActivityIndicator,
  ScrollView,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../router/RootNavigator";
import { useProductDetailsQuery } from "../hooks/useProductsQuery";
import ProductImages from "../components/products/ProductImages";
import { scheduleLocalNotification } from "../services/notifications";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const productId = useMemo(() => Number(route.params.id), [route.params.id]);

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useProductDetailsQuery(productId);

  if (isLoading) {
    return (
      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <ActivityIndicator />
        <Text style={{ marginTop: 8 }}>Carregando…</Text>
      </View>
    );
  }

  if (isError || !product) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
        }}
      >
        <Text>Não foi possível carregar este produto.</Text>
        <TouchableOpacity onPress={() => refetch()} style={{ marginTop: 12 }}>
          <Text style={{ color: "blue" }}>Tentar novamente</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
      <ProductImages
        images={product.images?.length ? product.images : [product.thumbnail]}
      />

      <View style={{ paddingHorizontal: 12, paddingTop: 16, gap: 6 }}>
        <Text style={{ fontSize: 20, fontWeight: "700" }}>{product.title}</Text>
        <Text style={{ fontSize: 18 }}>${product.price.toFixed(2)}</Text>
        <Text style={{ color: "#6b7280" }}>
          Rating: {product.rating} • Stock: {product.stock}
        </Text>
        {product.brand ? (
          <Text style={{ color: "#6b7280" }}>Brand: {product.brand}</Text>
        ) : null}
      </View>

      <View style={{ paddingHorizontal: 12, paddingTop: 16 }}>
        <Text style={{ fontWeight: "600", marginBottom: 6 }}>Descrição</Text>
        <Text style={{ lineHeight: 20 }}>{product.description}</Text>
      </View>

      {/* Ação bônus opcional: lembrete de compra (notificação local) */}
      <View style={{ paddingHorizontal: 12, paddingTop: 20 }}>
        <TouchableOpacity
          onPress={async () => {
            await scheduleLocalNotification(
              "Purchase reminder",
              `Lembrar de avaliar compra de: ${product.title}`
            );
          }}
          style={{
            alignSelf: "flex-start",
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 8,
          }}
        >
          <Text>Adicionar lembrete</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
