var recuperarSenhaModel = require('../models/recuperarSenhaModel');
var { enviarEmail } = require('../services/emailService');


function enviarSenhaTemporaria(req, res) {
    var email = req.body.emailServer;

    if (!email) {
        return res.status(400).send("Seu email está undefined!");
    }

    var subject = "Recuparação de Senha";
    var htmlContent = "<span> Senha provisória: 121321 </span>";

    recuperarSenhaModel.verificarEmail(email)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    enviarEmail(email, subject, htmlContent);
                    res.status(200).json();
                } else {
                    console.log('Email não encontrado:', email);
                    return res.status(404).json({ message: "Email não encontrado." });
                }
            }
        )
        .catch(
            function (erro) {
                console.log("Houve um erro ao enviar a senha provisória \n" + email);
                res.status(500).json({ message: 'Erro ao enviar e-mail', erro });
            }
        );
}


module.exports = {
    enviarSenhaTemporaria
}
