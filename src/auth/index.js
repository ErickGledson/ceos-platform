const User = require('../user/model');

exports.register = (request, response) => {
    User.findOne({ email: request.body.email })
        .then(user => {
            if (user) return response.status(401).json({
                message: 'Este e-mail está associado a outro usuário'
            });

            const createdUser = new User(request.body);
            createdUser.save()
                .then(user => response.status(200).json({ token: user.generateJWT(), user: user }))
                .catch(err => response.status(500).json({ message: err.message }));
        })
        .catch(err => response.status(500).json({ success: false, message: err.message }));
};

exports.login = (request, response) => {
    User.findOne({ email: request.body.email })
        .then(user => {
            if (!user) return response.status(401).json({ message: 'Usuário e/ou senha inválido(s)' });

            if (!user.validatePassword(request.body.password))
                return response.status(401).json({ message: 'Usuário e/ou senha inválido(s)' });

            response.status(200).json({
                token: user.generateJWT(),
                user: user
            });
        })
        .catch(err => response.status(500).json({ message: err.message }));
}