const express = require('express');
const { check } = require('express-validator');
const Auth = require('../auth');
const validate = require('../middlewares/validate');

const router = express.Router();

router.get('/', (req, res) => {
    res.status(200).json({ message: ":)" });
});

router.post('/register', [
    check('email').isEmail().withMessage('Endereço de e-mail inválido'),
    check('password').not().isEmpty().isLength({ min: 6 }).withMessage('A senha deve ter no mínimo 6 caracteres'),
    check('name').not().isEmpty().withMessage('Nome inválido')
], validate, Auth.register);

router.post("/login", [
    check('email').isEmail().withMessage('Endereço de e-mail inválido'),
    check('password').not().isEmpty().withMessage('Senha inválida'),
], validate, Auth.login);

module.exports = router;