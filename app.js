"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// Importar la configuración de Sequelize antes de cualquier controlador o servicio que utilice los modelos
require("./Database/Sequelize");
const ProductsController_1 = require("./task/Infraestructure/controllers/ProductsController");
const PostgresOrdenesRepository_1 = require("./task/Infraestructure/repositories/PostgresOrdenesRepository");
const ProductService_1 = require("./task/application/services/user-cases/ProductService");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
const productsRepository = new PostgresOrdenesRepository_1.PostgresProductsRepository();
const productService = new ProductService_1.ProductService(productsRepository);
const productController = new ProductsController_1.ProductController(productService);
// Definición de rutas para Products
app.post('/api/v1/productos', (req, res) => productController.createProduct(req, res));
app.get('/api/v1/productos', (req, res) => productController.getAllProducts(req, res));
app.delete('/api/v1/productos/:id', (req, res) => productController.deleteProductById(req, res));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
