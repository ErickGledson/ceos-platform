const Sequelize = require('sequelize');
const sequelize = require('../mysql');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const User = sequelize.define('user', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        unique: true,
        autoIncrement: true
    },
    name: {
        type: Sequelize.STRING(80),
        allowNull: false,
        validate: {
            len: {
                args: [5, 80],
                msg: 'O campo nome precisa ter entre 5 e 80 caracteres.'
            },
            notEmpty: {
                msg: 'O campo nome precisa ser preenchido.'
            }
        }
    },
    email: {
        type: Sequelize.STRING(120),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: {
                msg: 'Digite um e-mail válido.'
            }
        }
    },
    password: {
        type: Sequelize.STRING(120),
        allowNull: false,
        validate: {
            len: [5, 120]
        }
    },
    whatsapp: {
        type: Sequelize.STRING(20),
        allowNull: false
    },
    profileImage: {
        type: Sequelize.STRING(120),
        allowNull: false,
    }
}, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    deletedAt: 'deletedAt',
    paranoid: true,
});

User.addHook('beforeCreate', (user, options) => {
    return bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
        })
        .catch(err => {
            throw new Error(err)
        });
});

User.prototype.validatePassword = async function (password) {
    return await bcrypt.compareSync(password, this.password);
}

User.prototype.generateJWT = function () {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 60);

    let payload = {
        id: this.id,
        email: this.email,
        name: this.name,
        plan: this.plan,
    };

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: parseInt(expirationDate.getTime() / 1000, 10)
    });
};

module.exports = User;