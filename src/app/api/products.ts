import { api } from "./api";
import type { Product, ProductId } from "../store/models/Product";
import type {
  ProductListParams,
  ProductListResponse,
  ProductRepository,
  ProductListApi,
} from "../store/repositories/ProductRepository";
import { ProductApitoEntity as toEntity } from "../store/repositories/ProductRepository";

export class ApiProducts implements ProductRepository {
  async listCategories(): Promise<string[]> {
    const { data } = await api.get<string[]>("/products/categories");
    return Array.isArray(data) ? data : [];
  }

  async listProducts(
    params: ProductListParams = {}
  ): Promise<ProductListResponse> {
    const page = params.page ?? 1;
    const limit = params.limit ?? 20;
    const skip = (page - 1) * limit;

    const path = params.category
      ? `/products/category/${encodeURIComponent(params.category)}`
      : "/products";

    const query = params.search ? { q: params.search } : undefined;

    const { data } = await api.get<ProductListApi>(path, {
      params: { limit, skip, ...query },
    });

    return {
      items: (data.products ?? []).map(toEntity),
      total: data.total ?? 0,
      page,
      limit,
    };
  }

  async getProductById(id: number): Promise<Product> {
    const { data } = await api.get<Product>(`/products/${id}`);
    return toEntity(data);
  }
}
