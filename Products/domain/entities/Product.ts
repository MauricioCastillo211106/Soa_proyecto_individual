import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../../../Database/Sequelize';

export class Product extends Model {
    public id!: number;
    public nombre!: string;
    public precio!: number;
    public stock!: number;
}

Product.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false
    },
    precio: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    stock: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
}, {
    sequelize,
    tableName: 'productos' // Nombre de la tabla en la base de datos
});