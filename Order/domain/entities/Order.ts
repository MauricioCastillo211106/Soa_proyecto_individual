import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../Database/Sequelize'; // Asegúrate de ajustar la ruta según tu estructura de proyecto

export class Orden extends Model {
    public id!: number;
    public total!: number;
    public fecha!: Date;
    public estatus!: string;
}

Orden.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    total: {
        type: DataTypes.INTEGER, // Ajustar según la precisión necesaria
        allowNull: false
    },
    fecha: {
        type: DataTypes.DATE,
        allowNull: false
    },
    estatus: {
        type: DataTypes.STRING,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'ordenes' // Nombre de la tabla en la base de datos
});