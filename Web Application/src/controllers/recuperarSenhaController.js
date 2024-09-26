const recuperarSenhaModel = require('../models/recuperarSenhaModel');
const jwt = require('jsonwebtoken');
const { enviarEmail } = require('../services/emailService');


function enviarSenhaTemporaria(req, res) {
    const email = req.body.emailServer;

    if (!email) {
        return res.status(400).send("Seu email está undefined!");
    }

    recuperarSenhaModel.verificarEmail(email)
        .then(
            function (resultado) {
                if (resultado.length > 0) {
                    const token = gerarToken(resultado[0].id, resultado[0].email);
                    const url = `http://localhost:3333/redefinirSenha.html?token=${token}`

                    const assunto = "Recuperação de Senha";
                    const conteudo = `<span> Acesse o seguinte link: <a href="${url}">Redefinir senha</a></span>`;

                    enviarEmail(email, assunto, conteudo);

                    res.status(200).json();
                } else {
                    console.log('Email não encontrado:', email);
                    res.status(404).send("O E-mail informado não está cadastrado!");
                }
            }
        )
        .catch(
            function (erro) {
                console.log(`Houve um erro ao enviar o email (${email}) \n`, erro);
                res.status(500).send("Houve um erro ao enviar o email!");
            }
        );
}

function gerarToken(id, email) {
    const token = jwt.sign({ id: id, email: email }, process.env.JWT_SECRET, { expiresIn: '2m' });
    return token;
}

function atualizarSenha(req, res) {
    const { senha, token } = req.body;

    if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!")
    } else if (token == undefined) {
        res.status(400).send("Token inválido!")
    } else {

        jwt.verify(token, process.env.JWT_SECRET, (erro, decoded) => {
            if (erro) {
                return res.status(401).send("Token inválido");
            }

            const { id } = decoded;
            
            recuperarSenhaModel.atualizarSenha(senha, id)
                .then(
                    function (resultado) {
                        console.log(resultado);

                        res.json(resultado);
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
