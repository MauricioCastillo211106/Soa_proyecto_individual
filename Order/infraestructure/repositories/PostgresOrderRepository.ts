import { Orden } from "../../domain/entities/Order";
import { OrdenesRepository } from "./OrderRepositoy";
import OrdenModel from "../../domain/entities/OrderModel";

export class PostgresOrdenesRepository implements OrdenesRepository {
    async createOrden(orden: Orden): Promise<Orden> {
        try {
            const newOrden = await OrdenModel.create({
                total: orden.total,
                fecha: orden.fecha,
                estatus: orden.estatus
            });
            return newOrden.toJSON() as Orden;
        } catch (error) {
            throw new Error(`Error creating order: ${(error as Error).message}`);
        }
    }

    async getAllOrdenes(): Promise<Orden[]> {
        try {
            const ordenes = await OrdenModel.findAll();
            return ordenes.map(orden => orden.toJSON() as Orden);
        } catch (error) {
            throw new Error(`Error getting all orders: ${(error as Error).message}`);
        }
    }

    async updateOrderStatus(id: string, estatus: string): Promise<Orden> {
        try {
            const order = await OrdenModel.findByPk(id);
            if (!order) {
                throw new Error("Order not found");
            }
            order.estatus = estatus;
            await order.save();
            return order;
        } catch (error) {
            throw new Error(`Error updating order status: ${(error as Error).message}`);
        }
    }
}
