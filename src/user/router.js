const express = require('express');
const router = express.Router();
const User = require('../user');

router.get('/:id', User.find);
router.post('/', User.create);
router.put('/:id', User.update);
router.delete('/:id', User.destroy);
router.post('/upload', User.upload);

module.exports = router;