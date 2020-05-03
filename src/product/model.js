const Sequelize = require('sequelize');
const sequelize = require('../mysql');

const Product = sequelize.define("products", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    code: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    stock: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING(120),
        allowNull: false,
    },
    price: {
        type: Sequelize.FLOAT,
        allowNull: false,
    },
    color: {
        type: Sequelize.STRING(50),
        allowNull: false,
    },
    sizeW: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sizeH: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    image: {
        type: Sequelize.STRING(120),
        allowNull: false,
    },
    user_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "users",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
    },
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    paranoid: true,
});

module.exports = Product;

