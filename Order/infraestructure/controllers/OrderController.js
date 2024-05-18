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
exports.OrdenesController = void 0;
class OrdenesController {
    constructor(ordenesService) {
        this.ordenesService = ordenesService;
    }
    createOrden(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const orden = yield this.ordenesService.createOrden(req.body);
                res.status(201).json(orden);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(500).json({ error: "Internal server error" });
                }
            }
        });
    }
    getAllOrdenes(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const ordenes = yield this.ordenesService.getAllOrdenes();
                res.status(200).json(ordenes);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(400).json({ error: err.message });
                }
                else {
                    res.status(500).json({ error: "Internal server error" });
                }
            }
        });
    }
    updateOrderStatus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const { estatus } = req.body;
                const order = yield this.ordenesService.updateOrderStatus(id, estatus);
                res.status(200).json(order);
            }
            catch (err) {
                if (err instanceof Error) {
                    res.status(500).json({ message: err.message });
                }
            }
        });
    }
}
exports.OrdenesController = OrdenesController;
