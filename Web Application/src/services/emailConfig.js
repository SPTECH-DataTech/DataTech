const nodemailer = require('nodemailer');

require('dotenv').config();

console.log('EMAIL_USER:', process.env.EMAIL_USER);
console.log('EMAIL_PASS:', process.env.EMAIL_PASS);

var transporter = nodemailer.createTransport({
    host: "smtp.gmail.com", 
    port: 587,             
    secure: false,         
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
    tls: {
        rejectUnauthorized: false, 
      },
});

transporter.verify().then(() => {
    console.log("Transporte de email está pronto para enviar mensagens");
})
    .catch((erro) => {
        console.log("Erro ao verificar o transporte: ", erro);

    })

module.exports = transporter;