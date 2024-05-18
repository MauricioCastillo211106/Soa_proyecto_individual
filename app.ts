import express from 'express';
import bodyParser from 'body-parser';
import './Database/Sequelize'; // Configuración de Sequelize

import { OrdenesController } from './Order/infraestructure/controllers/OrderController';
import { PostgresOrdenesRepository } from './Order/infraestructure/repositories/PostgresOrderRepository';
import { OrdenesService } from './Order/application/services/user-cases/OrderService';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

const ordenesRepository = new PostgresOrdenesRepository();
const ordenesService = new OrdenesService(ordenesRepository);
const ordenesController = new OrdenesController(ordenesService);

// Definición de rutas para Ordenes
app.route('/api/v1/ordenes')
    .post(ordenesController.createOrden.bind(ordenesController))
    .get(ordenesController.getAllOrdenes.bind(ordenesController));

app.patch('/api/v1/ordenes/:id/status', ordenesController.updateOrderStatus.bind(ordenesController));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
