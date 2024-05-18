"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orden = void 0;
const sequelize_1 = require("sequelize");
const Sequelize_1 = require("../../../Database/Sequelize"); // Asegúrate de ajustar la ruta según tu estructura de proyecto
class Orden extends sequelize_1.Model {
}
exports.Orden = Orden;
Orden.init({
    id: {
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: sequelize_1.DataTypes.INTEGER, // Ajustar según la precisión necesaria
        allowNull: false
    },
    fecha: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    },
    estatus: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize: Sequelize_1.sequelize,
    tableName: 'ordenes' // Nombre de la tabla en la base de datos
});
