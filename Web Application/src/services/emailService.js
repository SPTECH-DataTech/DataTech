var nodemailer = require('nodemailer');
var transporter = require('./emailConfig');
require('dotenv').config();


function sendEmail(req, res) {
    const email = req.body.emailServer;

    if (!email) {
        return res.status(400).send("Seu email está undefined!");
    }

    const emailOptions = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: "Redefinição de Senha",
        html: "<span>Testando email</span>"
    }

    //Enviando o email
    transporter.sendMail(emailOptions, function (error, info) {
        if (error) {
            res.status(500).json({ message: 'Erro ao enviar e-mail', error });
        }
        console.log("E-mail enviado com sucesso!", info);
        res.status(200).json({ message: 'E-mail enviado com sucesso!', info });
    });
}

module.exports = {
    sendEmail
};



