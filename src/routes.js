const auth = require('./auth/router');
const user = require('./user/router');
const authenticate = require('./middlewares/authenticate');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: ":)" });
    });
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
};