const multer = require('multer');
const User = require('./model');

const multer_upload = multer().single('profileImage');

exports.find = async function (request, response) {
    try {
        const { id } = request.params;
        const user_id = request.user._id;

        if (user_id.toString() !== id.toString())
            return response.status(401).json({ message: 'Não autorizado' });

        const user = await User.findByPk(id);

        if (!user) return response.status(401).json({ message: 'Usuário não existe' });

        response.status(200).json({ user });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

exports.create = async function (request, response) {
    try {
        const { name, email, password } = request.body;

        const user = await User.create({ name, email, password });
        const modelErr = user.validate();

        if (modelErr) {
            response.status(500).json(modelErr);
        } else {
            response.status(200).json({ user, message: 'Dados atualizados' });
        }

    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

exports.update = async function (request, response) {
    try {
        const update = request.body;
        const { id } = request.params;
        const user_id = request.user.id;

        if (user_id.toString() !== id.toString())
            return response.status(401).json({ message: 'Não autorizado' });

        const user = await User.findByIdAndUpdate(id, { $set: update }, { new: true });

        response.status(200).json({ user, message: 'Dados atualizados' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
}

exports.destroy = async function (request, response) {
    try {
        const id = request.params.id;
        const user_id = request.user._id;

        if (user_id.toString() !== id.toString())
            return response.status(401).json({ message: "Não autorizado" });

        await User.destroy({ id });
        response.status(200).json({ message: 'Dados apagados' });
    } catch (error) {
        response.status(500).json({ message: error.message });
    }
};

exports.upload = function (request, response) {
    multer_upload(request, response, function (err) {
        if (err) return response.status(500).json({ message: err.message });

        const { id } = request.user;
        const dUri = new Datauri();
        let image = dUri.format(path.extname(request.file.originalname).toString(), request.file.buffer);

        S3.upload(image.content)
            .then((result) => User.findByIdAndUpdate(id, { $set: { profileImage: result.url } }, { new: true }))
            .then(user => response.status(200).json({ user }))
            .catch((error) => response.status(500).json({ message: error.message }))
    })
};