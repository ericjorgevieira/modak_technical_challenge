import React from "react";
import { ScrollView, Image, View } from "react-native";

type Props = { images: string[]; height?: number };

export default function ProductImages({ images, height = 240 }: Props) {
  if (!images?.length) return null;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: 12, gap: 8 }}
      snapToAlignment="center"
      decelerationRate="fast"
    >
      {images.map((uri) => (
        <View
          key={uri}
          style={{
            width: height * (4 / 3),
            height,
            borderRadius: 12,
            overflow: "hidden",
            borderWidth: 1,
            borderColor: "#e5e7eb",
          }}
        >
          <Image
            source={{ uri }}
            style={{ width: "100%", height: "100%" }}
            resizeMode="cover"
          />
        </View>
      ))}
    </ScrollView>
  );
}
