const express = require('express');
const router = express.Router();
const Message = require('../message');
const { cacheRequestMiddleware } = require('../redis');

router.get('/list', cacheRequestMiddleware, Message.list);
router.post('/awnser/:id', Message.awnser);

module.exports = router;