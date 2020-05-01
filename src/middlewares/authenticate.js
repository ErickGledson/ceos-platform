const passport = require('passport');

module.exports = (request, response, next) => {
    passport.authenticate('jwt', function (err, user, info) {
        if (err) return next(err);

        if (!user)
            return response.status(401).json({
                message: 'Acesso não autorizado #9504'
            });

        request.user = user;

        next();
    })(request, response, next);
};