const Product = require('./model');

exports.find = async function (request, response) {
    try {
        const { id } = request.params;

        const product = await Product.findByPk(id);

        if (!product) return response.status(401).json({ message: 'Produto não encontrado' });

        response.status(200).json({ product });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

exports.list = async function (request, response) {
    try {
        const products = await Product.findAll();

        if (!products) return response.status(401).json({ message: 'Não há produtos disponiveis' });

        response.status(200).json({ products });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}