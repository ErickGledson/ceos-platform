const request = require('request');
const twilio = require('twilio');
const { promisify } = require('util');
const Product = require('../product/model');
const Message = require('../message/model');
const { client: RedisClient } = require('../redis');

const { ACCOUNT_SID, ASSISTANT_SID, REST_API_ACCOUNT_SID, AUTH_TOKEN, BOT_WHATSAPP_NUMBER } = process.env;
const MessagingResponse = twilio.twiml.MessagingResponse;
const client = twilio(
    ACCOUNT_SID,
    AUTH_TOKEN
);
const CHATBOT_URL = `https://channels.autopilot.twilio.com/v2/${ACCOUNT_SID}/${ASSISTANT_SID}/custom/chat`;

const awnser = async function (messageId) {
    try {
        const send_whatsapp_question = await RedisClient.get('send_whatsapp');
        if (send_whatsapp_question) return;

        const message = await Message.findByPk(messageId);
        if (!message) return { code: 500, message: 'Mensagem não encontrada' };

        const product = await Product.findByPk(message.product_id);
        if (!product) return { code: 500, message: 'Produto não encontrado' };

        const questionBody = `Language=en-US&UserId=${message.id}-${product.id}&Text=${question}`;
        const authorization = new Buffer(`${REST_API_ACCOUNT_SID}:${AUTH_TOKEN}`).toString('base64');
        
        const requestService = promisify(request.post);
        const botResponse = await requestService(CHATBOT_URL, {
            headers: {
                'content-type': 'application/x-www-form-urlencoded',
                'accept': 'application/json',
                'authorization': `Basic ${authorization}`
            },
            body: questionBody
        });

        const botResponseData = JSON.parse(botResponse.body);
        const {
            response: {
                says
            },
            dialogue: {
                current_task,
                user_identifier
            }
         } = botResponseData;
         const chatbotText = says[0].text;

         if (chatbotText.includes("_HELP")) {
            questionWhatsapp({ product, message, whatsappNumber });

            return {
                code: 200,
                send_whatsapp: true
            };
         }

        return {
            code: 200,
            text: chatbotText,
            current_task,
            user_identifier,
            send_whatsapp: false
        };
    } catch (error) {
        return {
            code: 500,
            message: error.message
        };
    }
};

const questionWhatsapp = async function ({ product, message, whatsappNumber }) {
    try {
        client.messages.create({
            from: `whatsapp:${BOT_WHATSAPP_NUMBER}`,
            to: `whatsapp:${whatsappNumber}`,
            body: `Preciso de ajuda com a seguinte dúvida do produto ${product.name}: ${message.question}`
        })
        .then(data => {
            RedisClient.set('send_whatsapp', message.id);
        })
        .catch(error => {
            console.log(error);
        });
    } catch (error) {
        return null;
    }
};

exports.awnser = awnser;
exports.question = questionWhatsapp;
exports.whatsAppWebhook = async function (req, res) {
    const message = req.body.Body;
    const twiml = new MessagingResponse();
    RedisClient.del('send_whatsapp');
    twiml.message(`Agradeço pela sua ajuda! :)`);
    res.send(twiml.toString());
} 