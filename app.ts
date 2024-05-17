import express from 'express';
import bodyParser from 'body-parser';
// Importar la configuración de Sequelize antes de cualquier controlador o servicio que utilice los modelos
import './Database/Sequelize';

import { OrdenesController } from "./task/infraestructure/controllers/OrdenesController";
import { PostgresOrdenesRepository } from "./task/infraestructure/repositories/PostgresOrdenesRepository";
import { OrdenesService } from "./task/application/services/user-cases/OrderService";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const ordenesRepository = new PostgresOrdenesRepository();
const ordenesService = new OrdenesService(ordenesRepository);
const ordenesController = new OrdenesController(ordenesService);

// Definición de rutas para Ordenes
app.post('/api/v1/ordenes', (req, res) => ordenesController.createOrden(req, res));
app.get('/api/v1/ordenes', (req, res) => ordenesController.getAllOrdenes(req, res));
app.patch('/api/v1/ordenes/:id/status', (req, res) => ordenesController.updateOrderStatus(req,res));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});