import React, { useMemo } from "react";
import { ScrollView, Text, View, TouchableOpacity } from "react-native";
import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../router/RootNavigator";
import { useProductDetailsQuery } from "../hooks/useProductsQuery";
import ProductImages from "../components/products/ProductImages";
import { scheduleLocalNotification } from "../services/notifications";
import { addPurchaseReminder } from "../native/PurchaseReminder";
import { Product } from "../store/models/Product";
import LoadingSpinner from "../components/LoadingSpinner";
import LoadingFailed from "../components/LoadingFailed";

type Props = NativeStackScreenProps<RootStackParamList, "ProductDetails">;

export default function ProductDetailsScreen({ route, navigation }: Props) {
  const productId = useMemo(() => Number(route.params.id), [route.params.id]);

  const {
    data: product,
    isLoading,
    isError,
    refetch,
  } = useProductDetailsQuery(productId);

  const handlePurchaseReminder = async (product: Product) => {
    try {
      await addPurchaseReminder(
        `Evaluate purchase: ${product.title}`,
        `Category: ${product.category}${
          product.brand ? ` • Brand: ${product.brand}` : ""
        }`,
        60,
        30
      );
      await scheduleLocalNotification(
        "Purchase reminder",
        `Remember to buy: ${product.title}`
      );
      alert(`Reminder created!`);
    } catch (e: any) {
      alert(
        e?.message
          ? `Failed to create reminder: ${e?.message}`
          : "Failed to create reminder"
      );
    }
  };

  if (isLoading) {
    return <LoadingSpinner text="Loading..." />;
  }

  if (isError || !product) {
    return (
      <LoadingFailed
        onTryAgain={() => refetch()}
        text="Unable to load this product."
      />
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

      <View style={{ paddingHorizontal: 12, paddingTop: 20 }}>
        <TouchableOpacity
          onPress={async () => await handlePurchaseReminder(product)}
          style={{
            alignSelf: "flex-start",
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 8,
          }}
        >
          <Text>Add reminder</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
