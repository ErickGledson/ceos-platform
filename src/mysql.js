const Sequelize = require('sequelize');

const { DATABASE, DATABASE_USER, DATABASE_PASS, DATABASE_HOST } = process.env;

const sequelize = new Sequelize(
    DATABASE,
    DATABASE_USER,
    DATABASE_PASS,
    {
        host: DATABASE_HOST,
        dialect: 'mysql',
        define: {
            timestamps: true
        }
    }
);

module.exports = sequelize;