import { Product } from "../../domain/entities/Product";

export interface ProductsRepository {
    createProduct(product: Product): Promise<Product>;
    getAllProducts(): Promise<Product[]>;
    deleteProductById(id: string): Promise<void>;
}
