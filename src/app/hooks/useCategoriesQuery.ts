import { useQuery } from "@tanstack/react-query";
import { useProductRepository } from "./useRepositories";

export function useCategoriesQuery() {
  const repo = useProductRepository();
  return useQuery({
    queryKey: ["categories"],
    queryFn: () => repo.listCategories(),
    staleTime: 5 * 60 * 1000,
  });
}
