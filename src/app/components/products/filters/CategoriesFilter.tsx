import React from "react";
import { ScrollView, TouchableOpacity, Text, View } from "react-native";
import { Category } from "../../../store/models/Category";

type Props = {
  categories: Category[];
  selected?: string;
  onSelect: (categorySlug?: string) => void;
};

export default function CategoryFilter({
  categories,
  selected,
  onSelect,
}: Props) {
  return (
    <View style={{ paddingVertical: 8 }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 8 }}
      >
        <CategoryItem
          label="All"
          active={!selected}
          onPress={() => onSelect(undefined)}
        />
        {categories.map((c: Category, key: any) => (
          <CategoryItem
            key={key}
            label={c.name}
            active={selected === c.slug}
            onPress={() => onSelect(c.slug)}
          />
        ))}
      </ScrollView>
    </View>
  );
}

function CategoryItem({
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
        borderRadius: 16,
        marginRight: 8,
        borderWidth: 1,
        borderColor: active ? "#2563eb" : "#e5e7eb",
        backgroundColor: active ? "#dbeafe" : "#fff",
      }}
    >
      <Text
        style={{
          textTransform: "capitalize",
          color: active ? "#1d4ed8" : "#111827",
        }}
      >
        {label}
      </Text>
    </TouchableOpacity>
  );
}
