import React from "react";
import { FlatList, Text, View, TouchableOpacity, Image } from "react-native";

type ProductsListProps = {
  data?: any;
  onPressItem: (item: any) => void;
};

const ProductsList: React.FC<ProductsListProps> = ({ data, onPressItem }) => (
  <FlatList
    data={data?.items}
    keyExtractor={(item) => String(item.id)}
    contentContainerStyle={{ padding: 12 }}
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() => onPressItem(item)}
        style={{
          flexDirection: "row",
          borderWidth: 1,
          borderColor: "#e5e5e5",
          borderRadius: 8,
          padding: 12,
          marginBottom: 10,
          alignItems: "center",
        }}
      >
        <Image
          source={{ uri: item.thumbnail }}
          style={{ width: 64, height: 64, borderRadius: 8, marginRight: 12 }}
          resizeMode="cover"
        />
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} style={{ fontWeight: "600" }}>
            {item.title}
          </Text>
          <Text style={{ marginTop: 4 }}>${item.price.toFixed(2)}</Text>
          <Text style={{ marginTop: 2, fontSize: 12, color: "#666" }}>
            Rating: {item.rating}
          </Text>
        </View>
      </TouchableOpacity>
    )}
  />
);

export default ProductsList;
