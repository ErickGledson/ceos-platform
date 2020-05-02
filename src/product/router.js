const express = require('express');
const router = express.Router();
const Product = require('../product');

router.get('/find/:id', Product.find);
router.get('/list', Product.list);

module.exports = router;