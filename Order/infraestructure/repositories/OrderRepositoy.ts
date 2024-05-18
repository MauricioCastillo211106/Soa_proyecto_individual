import { Orden } from "../../domain/entities/Order";

export interface OrdenesRepository {
    createOrden(orden: Orden): Promise<Orden>;
    getAllOrdenes(): Promise<Orden[]>;
    updateOrderStatus(id: string, estatus: string): Promise<Orden>;
}
