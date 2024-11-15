var nodemailer = require('nodemailer');
var transporter = require('./emailConfig');
require('dotenv').config();

function enviarEmail(to, subject, htmlContent) {
    return new Promise((resolve, reject) => {
        const emailOptions = {
            from: process.env.EMAIL_USER,
            to: to,
            subject: subject,
            html: htmlContent
        }

        // Enviando o e-mail
        transporter.sendMail(emailOptions, function (erro, success) {
            if (erro) {
                return reject(erro);
            }
            resolve(success);
        });
    });
}

function enviarEmailSuporte(name, email, phone, tipoProblema, descricao) {
    return new Promise((resolve, reject) => {
        const emailOptions = {
            from: process.env.EMAIL_USER,
            to: process.env.EMAIL_USER,
            subject: `Solicitação de Suporte: ${tipoProblema}`,
            html: `
            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h1 style="color: #333;">Nova Solicitação de Suporte</h1>
                <hr style="border: 0; border-top: 2px solid #7F00FF; margin: 20px 0;">
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Telefone:</strong> ${phone}</p>
                <hr style="border: 0; border-top: 1px solid #333; margin: 20px 0;">
                <p><strong>Tipo de Problema:</strong> ${tipoProblema}</p>
                <p><strong>Descrição:</strong></p>
                <p style="background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
                    ${descricao}
                </p>
                <hr style="border: 0; border-top: 2px solid #7F00FF; margin: 30px 0;">
                <footer style="font-size: 0.9em; color: #777; display: flex; align-items: center; justify-content: space-between; padding: 20px 0;">
                    <!-- Logo -->
                    <div style="text-align: start; margin-right: 20px;">
                        <img src="https://lh3.googleusercontent.com/pw/AP1GczPkuou3SKc21i8vsKILECf4spmkoG7iXNNWeW8td2KpOeG5Yoe3oWKYTwCLemxXPcMKgQditsxx9YluBiuZdYrSQrHRcARc4tWc9bCwfeunmXqaeQ5IWC6U490KRdOEFVcAyTtESMSETRL4qz1XHP4=w55-h58-s-no-gm?authuser=0" alt="Logo da DataTech" style="max-width: 500px;" />
                    </div>
                    <!-- Informações da Empresa -->
                    <div style="flex: 1;">
                        <p style="margin: 0; font-size: 1.1em; color: #333;"><strong>DataTech</strong></p>
                        <p style="margin: 0;">Endereço: </p>
                        <p style="margin: 0;">Telefone: (11) 1111-1111</p>
                        <p style="margin: 0;">E-mail: datatech.suporte@datatech.com</p>
                    </div>
                </footer>
            </div>
            `
        };

        // Enviar o e-mail
        transporter.sendMail(emailOptions, function (erro, success) {
            if (erro) {
                return reject(erro);
            }
            // Enviar o e-mail de confirmação para o usuário
            enviarEmailConfirmacao(name, email, tipoProblema, descricao).then(() => {
                resolve(success);
            }).catch((err) => {
                reject(err);
            });
        });
    });
}

function enviarEmailConfirmacao(name, email, tipoProblema, descricao) {
    return new Promise((resolve, reject) => {
        const emailOptions = {
            from: process.env.EMAIL_USER,
            to: email,
            subject: 'Solicitação de Suporte Recebida',
            html: `

            <div style="font-family: Arial, sans-serif; color: #333; line-height: 1.6;">
                <h1 style="color: #333;">Sua Solicitação de Suporte Foi Recebida!</h1>
                <p style="color: #333;">Olá ${name},</p>
                <p style="color: #333;">Recebemos sua solicitação de suporte com as seguintes informações:</p>
        
                <h3 style="color: #333;">Detalhes da Solicitação:</h3>
                <p style="color: #333;"><strong>Status:</strong> Aguardando atendimento N1</p>
                <p style="color: #333;"><strong>Tipo de Problema:</strong> ${tipoProblema}</p>
                <p style="color: #333;"><strong>Descrição:</strong></p>
                <p style="color: #333; background-color: #f9f9f9; padding: 15px; border-radius: 5px; border: 1px solid #ddd;">
                    ${descricao}
                </p>
        
                <p style="color: #333;">Sua solicitação está aguardando atendimento de nossa equipe de primeiro nível. Em breve,
                    entraremos em contato para resolver o seu problema.</p>
                <p style="color: #333;">Agradecemos por utilizar nossos serviços.</p>
                <p style="color: #333;"><strong>Atenciosamente,</strong></p>
                <p style="color: #333;">Equipe de Suporte da DataTech</p>
            </div>
    
                <hr style="border: 0; border-top: 2px solid #7F00FF; margin: 30px 0;">
                <footer
                    style="font-size: 0.9em; color: #777; display: flex; align-items: center; justify-content: space-between; padding: 20px 0;">
                    <!-- Logo -->
                    <div style="text-align: start; margin-right: 20px;">
                        <img src="https://lh3.googleusercontent.com/pw/AP1GczPkuou3SKc21i8vsKILECf4spmkoG7iXNNWeW8td2KpOeG5Yoe3oWKYTwCLemxXPcMKgQditsxx9YluBiuZdYrSQrHRcARc4tWc9bCwfeunmXqaeQ5IWC6U490KRdOEFVcAyTtESMSETRL4qz1XHP4=w55-h58-s-no-gm?authuser=0"
                            alt="Logo da DataTech" style="max-width: 500px;" />
                    </div>
                    <!-- Informações da Empresa -->
                    <div style="flex: 1;">
                        <p style="margin: 0; font-size: 1.1em; color: #333;"><strong>DataTech</strong></p>
                        <p style="margin: 0;">Endereço: </p>
                        <p style="margin: 0;">Telefone: (11) 1111-1111</p>
                        <p style="margin: 0;">E-mail: datatech.suporte@datatech.com</p>
                    </div>
                </footer>
            </div>
            `
        };

        // Enviar o e-mail
        transporter.sendMail(emailOptions, function (erro, success) {
            if (erro) {
                return reject(erro);
            }
            resolve(success);
        });
    });
}

module.exports = {
    enviarEmail,
    enviarEmailSuporte,
    enviarEmailConfirmacao
};




