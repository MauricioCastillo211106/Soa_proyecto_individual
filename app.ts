import express from 'express';
import bodyParser from 'body-parser';
import './Database/Sequelize'; // Configuración de Sequelize

import { ProductController } from './Products/Infraestructure/controllers/ProductsController';
import { PostgresProductsRepository } from './Products/Infraestructure/repositories/PostgresProductsRepository';
import { ProductService } from './Products/application/services/user-cases/ProductService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const productsRepository = new PostgresProductsRepository();
const productService = new ProductService(productsRepository);
const productController = new ProductController(productService);

// Definición de rutas para Products
app.route('/api/v1/productos')
    .post(productController.createProduct.bind(productController))
    .get(productController.getAllProducts.bind(productController));

app.delete('/api/v1/productos/:id', productController.deleteProductById.bind(productController));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
