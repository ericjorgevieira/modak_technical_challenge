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
      const res = await repo.listProducts({
        category: params.category,
        search: params.search,
        page: params.page,
        limit: params.limit,
      });

      // Sort client-side (pragmático para o teste)
      if (params.sortKey) {
        const dir = params.sortOrder === "desc" ? -1 : 1;
        res.items = [...res.items].sort((a: any, b: any) => {
          const va = a[params.sortKey!];
          const vb = b[params.sortKey!];
          if (va === vb) return 0;
          return va > vb ? dir : -dir;
        });
      }

      return res;
    },
  });
}
