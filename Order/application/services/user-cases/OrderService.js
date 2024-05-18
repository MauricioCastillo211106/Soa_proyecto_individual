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
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdenesService = void 0;
class OrdenesService {
    constructor(ordenesRepository) {
        this.ordenesRepository = ordenesRepository;
    }
    createOrden(orden) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ordenesRepository.createOrden(orden);
            }
            catch (error) {
                throw new Error(`Error creating order: ${error.message}`);
            }
        });
    }
    getAllOrdenes() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ordenesRepository.getAllOrdenes();
            }
            catch (error) {
                throw new Error(`Error getting all orders: ${error.message}`);
            }
        });
    }
    updateOrderStatus(id, estatus) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield this.ordenesRepository.updateOrderStatus(id, estatus);
            }
            catch (error) {
                throw new Error(`Error updating order status: ${error.message}`);
            }
        });
    }
}
exports.OrdenesService = OrdenesService;
