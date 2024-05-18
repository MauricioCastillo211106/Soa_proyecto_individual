import { Product } from "../../../domain/entities/Product";
import { ProductsRepository } from "../../../Infraestructure/repositories/ProductsRepository";

export class ProductService {
    constructor(
        private productsRepositoy: ProductsRepository
    ) {}

    async createProduct(product: Product): Promise<Product> {
        try {
            return await this.productsRepositoy.createProduct(product);
        } catch (error) {
            throw new Error(`Error creating order: ${(error as Error).message}`);
        }
    }

    async getAllProducts(): Promise<Product[]> {
        try {
            return await this.productsRepositoy.getAllProducts();
        } catch (error) {
            throw new Error(`Error getting all orders: ${(error as Error).message}`);
        }
    }

    // Método para eliminar un producto por ID
    async deleteProductById(id: string): Promise<void> {
        try {
            await this.productsRepositoy.deleteProductById(id);
        } catch (error) {
            throw new Error(`Error deleting product: ${(error as Error).message}`);
        }
    }
}