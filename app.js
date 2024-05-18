"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// Importar la configuración de Sequelize antes de cualquier controlador o servicio que utilice los modelos
require("./Database/Sequelize");
const OrdenesController_1 = require("./Order/infraestructure/controllers/OrderController");
const PostgresOrdenesRepository_1 = require("./Order/infraestructure/repositories/PostgresOrderRepository");
const OrderService_1 = require("./Order/application/services/user-cases/OrderService");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
const ordenesRepository = new PostgresOrdenesRepository_1.PostgresOrdenesRepository();
const ordenesService = new OrderService_1.OrdenesService(ordenesRepository);
const ordenesController = new OrdenesController_1.OrdenesController(ordenesService);
// Definición de rutas para Ordenes
app.post('/api/v1/ordenes', (req, res) => ordenesController.createOrden(req, res));
app.get('/api/v1/ordenes', (req, res) => ordenesController.getAllOrdenes(req, res));
app.patch('/api/v1/ordenes/:id/status', (req, res) => ordenesController.updateOrderStatus(req, res));
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
