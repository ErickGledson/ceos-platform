const Sequelize = require('sequelize');
const sequelize = require('../mysql');

const Message = sequelize.define("messages", {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true,
    },
    name: {
        type: Sequelize.STRING(40),
        allowNull: false,
    },
    lastname: {
        type: Sequelize.STRING(80),
        allowNull: false,
    },
    order: {
        type: Sequelize.STRING(20),
        allowNull: false,
    },
    question: {
        type: Sequelize.TEXT,
        allowNull: false,
    },
    message: {
        type: Sequelize.TEXT,
    },
    product_id: {
        type: Sequelize.INTEGER,
        references: {
            model: "products",
            key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
        allowNull: false,
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    paranoid: true,
});

module.exports = Message;