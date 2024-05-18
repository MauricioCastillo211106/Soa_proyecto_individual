"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostgresOrdenesRepository = void 0;
const OrderModel_1 = __importDefault(require("../../domain/entities/OrderModel"));
class PostgresOrdenesRepository {
    createOrden(orden) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newOrden = yield OrderModel_1.default.create({
                    total: orden.total,
                    fecha: orden.fecha,
                    estatus: orden.estatus
                });
                return newOrden.toJSON();
            }
            catch (error) {
                throw new Error(`Error creating order: ${error.message}`);
            }
        });
    }
    getAllOrdenes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ordenes = yield OrderModel_1.default.findAll();
                return ordenes.map(orden => orden.toJSON());
            }
            catch (error) {
                throw new Error(`Error getting all orders: ${error.message}`);
            }
        });
    }
    updateOrderStatus(id, estatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const order = yield OrderModel_1.default.findByPk(id);
                if (!order) {
                    throw new Error("Order not found");
                }
                order.estatus = estatus;
                yield order.save();
                return order;
            }
            catch (error) {
                throw new Error(`Error updating order status: ${error.message}`);
            }
        });
    }
}
exports.PostgresOrdenesRepository = PostgresOrdenesRepository;
