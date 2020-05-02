const express = require('express');
const router = express.Router();
const Chatbot = require('../chatbot');

router.post('/webhook', Chatbot.whatsAppWebhook);
router.get('/chat', Chatbot.awnser);

module.exports = router;