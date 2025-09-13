import { ApiProducts } from "../api/products";
import { ProductRepository } from "../store/repositories/ProductRepository";

const productRepository: ProductRepository = new ApiProducts();

export function useProductRepository() {
  return productRepository;
}
