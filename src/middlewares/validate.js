const { validationResult } = require('express-validator');

module.exports = (request, response, next) => {
    const errors = validationResult(request);

    if (!errors.isEmpty()) {
        let error = {};
        errors.array().map(err => error[err.param] = err.msg);
        return response.status(422).json({ error });
    }

    next();
}