const auth = require('./auth/router');
const user = require('./user/router');
const chatbot = require('./chatbot/router');
const product = require('./product/router');
const message = require('./message/router');
const authenticate = require('./middlewares/authenticate');
const { cacheRequestMiddleware } = require('./redis');

module.exports = app => {
    app.get('/', (req, res) => {
        res.status(200).send({ message: ":)" });
    });
    app.use('/api/auth', auth);
    app.use('/api/user', authenticate, user);
    app.use('/api/chatbot', chatbot);
    app.use('/api/product', cacheRequestMiddleware, product);
    app.use('/api/message', message);
};