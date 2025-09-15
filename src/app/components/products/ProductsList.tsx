import React, { useState, useEffect, useMemo } from "react";
import {
  FlatList,
  Text,
  View,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { SortKey, SortOrder } from "../../store/repositories/ProductRepository";
import { useCategoriesQuery } from "../../hooks/useCategoriesQuery";
import { useProductsQuery } from "../../hooks/useProductsQuery";
import CategoryFilter from "./filters/CategoriesFilter";
import SortControl from "./filters/SortControl";
import LoadingSpinner from "../LoadingSpinner";
import LoadingFailed from "../LoadingFailed";

type ProductsListProps = {
  data?: any;
  isFetching?: boolean;
  onPressItem: (item: any) => void;
};

const ProductsList: React.FC<ProductsListProps> = ({ onPressItem }) => {
  const [category, setCategory] = useState<string | undefined>(undefined);
  const [page, setPage] = useState(1);
  const [sortKey, setSortKey] = useState<SortKey | undefined>(undefined);
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");

  const { data: categoriesData, isLoading: loadingCategories } =
    useCategoriesQuery();
  const { data, isLoading, isError, isFetching, refetch } = useProductsQuery({
    category,
    page,
    limit: 20,
    sortKey,
    sortOrder,
  });

  const [items, setItems] = useState(data?.items ?? []);
  const total = data?.total ?? 0;

  useEffect(() => {
    setPage(1);
    setItems([]);
  }, [category, sortKey, sortOrder]);

  useEffect(() => {
    if (data?.items) {
      setItems((prev: any) =>
        page === 1 ? data.items : [...prev, ...data.items]
      );
    }
  }, [data, page]);

  const canLoadMore = items.length < total;

  const header = () => (
    <View>
      <Text
        style={{ paddingHorizontal: 12, paddingTop: 12, fontWeight: "600" }}
      >
        Categories
      </Text>
      {loadingCategories ? (
        <View style={{ padding: 12 }}>
          <ActivityIndicator />
        </View>
      ) : (
        <CategoryFilter
          categories={categoriesData ?? []}
          selected={category}
          onSelect={setCategory}
        />
      )}

      <SortControl
        sortKey={sortKey}
        sortOrder={sortOrder}
        onChange={({ sortKey: k, sortOrder: o }) => {
          setSortKey(k);
          if (o) {
            setSortOrder(o);
          }
        }}
      />
    </View>
  );

  const footer = () => (
    <View style={{ paddingVertical: 16 }}>
      {isFetching ? (
        <ActivityIndicator />
      ) : canLoadMore ? (
        <TouchableOpacity
          onPress={() => setPage((p) => p + 1)}
          style={{
            alignSelf: "center",
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderWidth: 1,
            borderColor: "#e5e7eb",
            borderRadius: 8,
          }}
        >
          <Text>Load more</Text>
        </TouchableOpacity>
      ) : (
        <Text style={{ textAlign: "center", color: "#6b7280" }}>
          End of list
        </Text>
      )}
    </View>
  );

  return (
    <>
      {header()}
      {isLoading ? (
        <LoadingSpinner text="Loading products…" />
      ) : isError || !data ? (
        <LoadingFailed
          text="Failed to load. Check your network."
          onTryAgain={() => refetch()}
        />
      ) : (
        <FlatList
          data={items}
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
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: 8,
                  marginRight: 12,
                }}
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
      )}
      {footer()}
    </>
  );
};

export default ProductsList;
function onPressItem(item: any): void {
  throw new Error("Function not implemented.");
}
