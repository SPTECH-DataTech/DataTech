const recuperarSenhaModel = require('../models/recuperarSenhaModel');
const jwt = require('jsonwebtoken');
const { enviarEmail } = require('../services/emailService');
require

function enviarSenhaTemporaria(req, res) {
    const email = req.body.emailServer;

    if (!email) {
        res.status(400).send("Seu email está undefined!");
    }

    recuperarSenhaModel.verificarEmail(email)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    const token = gerarToken(resultado[0].id, resultado[0].email);
                    const IP = process.env.IP_CONEXAO;
                    console.log(IP);

                    const url = `http://${IP}:3333/redefinirNovaSenha.html?token=${token}`
                    const assunto = "Recuperação de Senha";
                    const conteudo = `
                                        <div style="font-family: 'Arial', sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; color: #333; text-align: center;">
                                            <div style="width: 100%; max-width: 600px; margin: 50px auto; background-color: #ffffff; padding: 20px; border-radius: 8px; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);">
                                                <div style="margin-bottom: 20px;">
                                                    <h1 id="texto-logo" style="font-family: 'Poppins', sans-serif; font-weight: bold; font-style: normal; margin: 0; margin-top: 5vh;">
                                                        <span style="color: #000000;">Data</span><span style="color: #7F00FF;">Tech</span>
                                                    </h1>
                                                </div>

                                                <div style="margin-bottom: 20px;">
                                                    <h2>Redefinição de Senha</h2>
                                                    <p>Recebemos uma solicitação para redefinir sua senha. Se você não fez essa solicitação, por favor, ignore este e-mail.</p>
                                                    <p>Para redefinir sua senha, clique no botão abaixo:</p>
                                                    <a href="${url}" style="display: inline-block; background-color: #007BFF; color: #ffffff; padding: 10px 20px; border-radius: 5px; text-decoration: none; font-size: 16px; border: none;">Redefinir Senha</a>
                                                    <p style="margin-top: 15px; font-size: 12px; color: #f00;">Este link expira em 10 minutos. Por favor, utilize-o o mais rápido possível.</p>
                                                </div>
                                                <div style="font-size: 12px; color: #555; margin-top: 20px;">
                                                    <p>Se você tiver alguma dúvida, entre em contato com nossa equipe de suporte.</p>
                                                    <p>&copy; 2024 DataTech Empresa. Todos os direitos reservados.</p>
                                                </div>
                                            </div>
                                        </div>`;

                    enviarEmail(email, assunto, conteudo);

                    res.status(200).json({ message: "E-mail enviado com sucesso! Siga as instruções.", resultado });
                } else {
                    console.log('Email não encontrado:', email);
                    res.status(404).json({ erro: "O E-mail informado não está cadastro!" });
                }
            }
        )
        .catch(
            function (erro) {
                console.log(`Houve um erro ao enviar o email (${email}) \n`, erro);
                res.status(500).json({ erro: "Houve um erro ao enviar o email!" });
            }
        );
}

function gerarToken(id, email) {
    const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, { expiresIn: '10m' });
    return token;
}

function atualizarSenha(req, res) {
    const { senha, token } = req.body;

    if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!")
    } else if (token == undefined) {
        res.status(400).send("Seu token está undefined!")
    } else {

        jwt.verify(token, process.env.JWT_SECRET, (erro, decoded) => {
            if (erro) {
                res.status(401).json({ erro: "Token inválido!" });
            }

            const { id } = decoded;

            recuperarSenhaModel.atualizarSenha(senha, id)
                .then(
                    function (resultado) {
                        console.log(resultado);

                        res.status(200).json({ message: "Senha atualizada com sucesso!", resultado });
                    })
                .catch(
                    function (erro) {
                        console.log(erro);
                        console.log("\nHouve um erro ao realizar ao atualizar a senha! Erro: ",
                            erro.sqlMessage);

                        res.status(500).json(erro.sqlMessage);
                    })
        });
    }
}


module.exports = {
    enviarSenhaTemporaria,
    atualizarSenha
}
