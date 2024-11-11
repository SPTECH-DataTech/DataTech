// var nodemailer = require('nodemailer');
// var transporter = require('./emailConfig');
// require('dotenv').config();


// function enviarEmail(to, subject, htmlContent) {
//     return new Promise((resolve, reject) => {
//         const emailOptions = {
//             from: process.env.EMAIL_USER,
//             to: to,
//             subject: subject,
//             html: htmlContent
//         }
    
//         //Enviando o email
//         transporter.sendMail(emailOptions, function (erro, success) {
//             if (erro) {
//                 return reject(erro);
//             } 
//             resolve(success);
//         });
//     })
// }

// module.exports = {
//     enviarEmail
// };



