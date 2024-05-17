import { Request, Response } from 'express';
import { OrdenesService } from '../../application/services/user-cases/OrderService';

export class OrdenesController {
    constructor(private ordenesService: OrdenesService) {}

    async createOrden(req: Request, res: Response) {
        try {
            const orden = await this.ordenesService.createOrden(req.body);
            res.status(201).json(orden);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({error: err.message})
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async getAllOrdenes(req: Request, res: Response) {
        try {
            const ordenes = await this.ordenesService.getAllOrdenes();
            res.status(200).json(ordenes);
        } catch (err) {
            if (err instanceof Error) {
                res.status(400).json({error: err.message})
            } else {
                res.status(500).json({ error: "Internal server error" });
            }
        }
    }

    async updateOrderStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { estatus } = req.body;
            const order = await this.ordenesService.updateOrderStatus(id, estatus);
            res.status(200).json(order);
        } catch (err) {
            if (err instanceof Error) {
                res.status(500).json({ message: err.message });
            }
        }
    }
}
