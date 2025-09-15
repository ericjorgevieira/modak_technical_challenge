import { Category } from "../models/Category";
import { Product } from "../models/Product";

export type ProductListParams = {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
};

export type SortKey = "price" | "rating";
export type SortOrder = "asc" | "desc";

export type ProductListResponse = {
  items: Product[];
  total: number;
  page: number;
  limit: number;
};

export type ProductListApi = {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
};

export function ProductApiToEntity(p: Product): Product {
  return {
    id: p.id,
    title: p.title,
    description: p.description,
    price: p.price,
    discountPercentage: p.discountPercentage,
    rating: p.rating,
    stock: p.stock,
    brand: p.brand,
    category: p.category,
    thumbnail: p.thumbnail,
    images: p.images ?? [],
  };
}

export interface ProductRepository {
  listCategories(): Promise<Category[]>;
  listProducts(params?: ProductListParams): Promise<ProductListResponse>;
  getProductById(id: number): Promise<Product>;
}
