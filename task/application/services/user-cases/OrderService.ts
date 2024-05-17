import { Orden } from '../../../domain/entities/Order';
import { OrdenesRepository } from '../../../infraestructure/repositories/OrdenesRepositoy';

export class OrdenesService {
    constructor(
        private ordenesRepository: OrdenesRepository
    ) {}

    async createOrden(orden: Orden): Promise<Orden> {
        try {
            return await this.ordenesRepository.createOrden(orden);
        } catch (error) {
            throw new Error(`Error creating order: ${(error as Error).message}`);
        }
    }

    async getAllOrdenes(): Promise<Orden[]> {
        try {
            return await this.ordenesRepository.getAllOrdenes();
        } catch (error) {
            throw new Error(`Error getting all orders: ${(error as Error).message}`);
        }
    }

    async updateOrderStatus(id: string, estatus: string): Promise<Orden> {
        try {
            return await this.ordenesRepository.updateOrderStatus(id, estatus);
        } catch (error) {
            throw new Error(`Error updating order status: ${(error as Error).message}`);
        }
    }
}
