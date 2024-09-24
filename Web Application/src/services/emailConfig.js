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


transporter.verify((err, success) => {
    if (err) {
        console.error('Erro na verificação de transporte:', err.stack);
    }else {
        console.log('Transporte de email está pronto para enviar mensagens:', success);
    }
});

module.exports = transporter;