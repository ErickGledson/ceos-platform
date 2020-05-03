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
    size_w: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    size_h: {
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
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
});

module.exports = Product;

