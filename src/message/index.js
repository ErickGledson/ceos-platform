const Message = require('./model');
const Product = require('../product/model');

exports.list = async function (request, response) {
    try {
        const messages = await Message.findAll({ raw: true });

        if (!messages) return response.status(401).json({ message: 'Mensagens não disponiveis' });

        const data = [];
        for(let message of messages) {
            const product = await Product.findByPk(message.product_id, { raw: true });
            message.product = product;

            data.push(message);
        }

        response.status(200).json({ messages: data });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

exports.awnser = async function (request, response) {
    try {
        const { id } = request.params;
        const { awnser } = request.body;

        const message = await Message.findByPk(id);

        if (!message) return response.status(401).json({ message: 'Mensagem não encontrada' });

        await Message.update({ message: awnser }, { where: { id } })

        response.status(200).json({ message: 'updated' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}