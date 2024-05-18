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
exports.PostgresProductsRepository = void 0;
const ProductModel_1 = __importDefault(require("../../domain/entities/ProductModel"));
class PostgresProductsRepository {
    createProduct(product) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newProduct = yield ProductModel_1.default.create({
                    nombre: product.nombre,
                    precio: product.precio,
                    stock: product.stock
                });
                return newProduct;
            }
            catch (error) {
                throw new Error(`Error creating product: ${error.message}`);
            }
        });
    }
    getAllProducts() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const products = yield ProductModel_1.default.findAll();
                return products;
            }
            catch (error) {
                throw new Error(`Error retrieving products: ${error.message}`);
            }
        });
    }
    // Implementación de deleteProductById
    deleteProductById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield ProductModel_1.default.destroy({
                    where: { id }
                });
                if (result === 0) {
                    throw new Error("Product not found");
                }
            }
            catch (error) {
                throw new Error(`Error deleting product: ${error.message}`);
            }
        });
    }
}
exports.PostgresProductsRepository = PostgresProductsRepository;
