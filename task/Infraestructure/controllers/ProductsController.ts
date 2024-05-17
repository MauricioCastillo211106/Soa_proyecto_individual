import { Request, Response } from 'express';
import { ProductService } from "../../application/services/user-cases/ProductService";

export class ProductController {
    constructor(private productService: ProductService){}

    async createProduct(req: Request, res: Response) {
        try {
            const product = await this.productService.createProduct(req.body);
            res.status(201).json(product);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({error: err.message})
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async getAllProducts(req: Request, res: Response) {
        try {
            const product = await this.productService.getAllProducts();
            res.status(200).json(product);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({error: err.message})
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }
    
    // Método para eliminar un producto por ID
    async deleteProductById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            await this.productService.deleteProductById(id);
            res.status(204).json({});
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }
}