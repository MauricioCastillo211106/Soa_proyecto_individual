import express from 'express';
import bodyParser from 'body-parser';
// Importar la configuración de Sequelize antes de cualquier controlador o servicio que utilice los modelos
import './Database/Sequelize';

import { ProductController } from "./task/Infraestructure/controllers/ProductsController";
import { PostgresProductsRepository } from "./task/Infraestructure/repositories/PostgresOrdenesRepository";
import { ProductService } from "./task/application/services/user-cases/ProductService";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const productsRepository = new PostgresProductsRepository();
const productService = new ProductService(productsRepository);
const productController = new ProductController(productService);

// Definición de rutas para Products
app.post('/api/v1/productos', (req, res) => productController.createProduct(req, res));
app.get('/api/v1/productos', (req, res) => productController.getAllProducts(req, res));
app.delete('/api/v1/productos/:id',(req, res) => productController.deleteProductById(req,res));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});