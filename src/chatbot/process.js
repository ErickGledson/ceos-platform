const Message = require('../message/model');
const Chatbot = require('../chatbot');

exports.awnsers = async () => {
    const message = await Message.findOne({ where: { message: null }, raw: true });
    console.log({ question: message.question });

    const awnser = await Chatbot.awnser(message);
    console.log(awnser);
}