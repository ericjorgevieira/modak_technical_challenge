import { useQuery } from "@tanstack/react-query";
import { useProductRepository } from "./useRepositories";
import type {
  ProductListParams,
  SortKey,
  SortOrder,
} from "../store/repositories/ProductRepository";

export type ProductsUIParams = ProductListParams & {
  sortKey?: SortKey;
  sortOrder?: SortOrder;
};

export function useProductsQuery(params: ProductsUIParams = {}) {
  const repo = useProductRepository();

  return useQuery({
    queryKey: ["products", params],
    queryFn: async () => {
      const response = await repo.listProducts({
        category: params.category,
        search: params.search,
        page: params.page,
        limit: params.limit,
      });

      if (params.sortKey) {
        const dir = params.sortOrder === "desc" ? -1 : 1;
        response.items = [...response.items].sort((a: any, b: any) => {
          const va = a[params.sortKey!];
          const vb = b[params.sortKey!];
          if (va === vb) return 0;
          return va > vb ? dir : -dir;
        });
      }

      return response;
    },
  });
}

export function useProductDetailsQuery(id?: number) {
  const repo = useProductRepository();

  return useQuery({
    queryKey: ["product", id],
    queryFn: async () => {
      if (!id && id !== 0) {
        throw new Error("Missing product id");
      }
      return repo.getProductById(id);
    },
    enabled: typeof id === "number",
    staleTime: 5 * 60 * 1000,
  });
}
