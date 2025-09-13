export type ProductId = number;

export type Product = {
  id: ProductId;
  title: string;
  description: string;
  price: number; // em USD (DummyJSON)
  discountPercentage?: number;
  rating: number; // 0..5
  stock: number;
  brand?: string;
  category: string;
  thumbnail: string;
  images: string[];
};
