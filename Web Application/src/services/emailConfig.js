const nodemailer = require('nodemailer');

require('dotenv').config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

transporter.verify().then(() => {
    console.log("Transporte de email está pronto para enviar mensagens");
})
    .catch((erro) => {
        console.log("Erro ao verificar o transporte: ", erro);

    })

module.exports = transporter;