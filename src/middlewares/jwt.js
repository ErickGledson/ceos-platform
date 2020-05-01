const JWT_STRATEGY = require('passport-jwt').Strategy;
const JWT_EXTRACT = require('passport-jwt').ExtractJwt;

const User = require('../user/model');

const opts = {
    jwtFromRequest: JWT_EXTRACT.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET
};

module.exports = passport => {
    passport.use(
        new JWT_STRATEGY(opts, (payload, done) => {
            User.findById(payload.id)
                .then(user => {
                    return done(null, user ? user : false);
                })
                .catch(err => {
                    return done(err, false, { message: 'Server error' });
                });
        })
    );
};