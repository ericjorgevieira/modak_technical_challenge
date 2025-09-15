import React from "react";
import { View, TouchableOpacity, Text } from "react-native";
import type {
  SortKey,
  SortOrder,
} from "../../../store/repositories/ProductRepository";

type Props = {
  sortKey?: SortKey;
  sortOrder?: SortOrder;
  onChange: (next: { sortKey?: SortKey; sortOrder?: SortOrder }) => void;
};

export default function SortControl({
  sortKey,
  sortOrder = "asc",
  onChange,
}: Props) {
  const setKey = (k?: SortKey) => onChange({ sortKey: k, sortOrder });
  const toggleOrder = () =>
    onChange({ sortKey, sortOrder: sortOrder === "asc" ? "desc" : "asc" });

  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 12,
        paddingVertical: 8,
        gap: 8,
      }}
    >
      <Segment
        label="None"
        active={!sortKey}
        onPress={() => setKey(undefined)}
      />
      <Segment
        label="Price"
        active={sortKey === "price"}
        onPress={() => setKey("price")}
      />
      <Segment
        label="Rating"
        active={sortKey === "rating"}
        onPress={() => setKey("rating")}
      />

      <TouchableOpacity
        onPress={toggleOrder}
        style={{
          marginLeft: "auto",
          paddingHorizontal: 12,
          paddingVertical: 8,
          borderWidth: 1,
          borderColor: "#e5e7eb",
          borderRadius: 8,
        }}
      >
        <Text>{sortOrder === "asc" ? "Asc ↑" : "Desc ↓"}</Text>
      </TouchableOpacity>
    </View>
  );
}

function Segment({
  label,
  active,
  onPress,
}: {
  label: string;
  active?: boolean;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: active ? "#2563eb" : "#e5e7eb",
        backgroundColor: active ? "#dbeafe" : "#fff",
      }}
    >
      <Text style={{ color: active ? "#1d4ed8" : "#111827" }}>{label}</Text>
    </TouchableOpacity>
  );
}
