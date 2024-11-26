// var ambiente_processo = 'producao';
var ambiente_processo = 'desenvolvimento';

var caminho_env = ambiente_processo === 'producao' ? '.env' : '.env.dev';


require("dotenv").config({ path: caminho_env });

var express = require("express");
var cors = require("cors");
var path = require("path");
var PORTA_APP = process.env.APP_PORT;
var HOST_APP = process.env.APP_HOST;

var app = express();

var indexRouter = require("./src/routes/index");
var usuarioRouter = require("./src/routes/usuarios");
var empresasRouter = require("./src/routes/empresas");
var recuperarSenhaRouter = require("./src/routes/recuperarSenha");
var equipeRouter = require("./src/routes/equipe");
var fazendaRouter = require("./src/routes/fazenda");
var dashContaRouter = require("./src/routes/dashConta");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(cors());

app.use("/", indexRouter);
app.use("/usuarios", usuarioRouter);
app.use("/empresas", empresasRouter);
app.use("/recuperarSenha", recuperarSenhaRouter);
app.use("/equipe", equipeRouter);
app.use("/fazenda", fazendaRouter);
app.use("/dashConta", dashContaRouter);



var emailService = require('./src/services/emailService');
app.post('/enviarEmailSuporte', async (req, res) => {
    const { toName, toEmail, toPhone, toTipo, toMessage } = req.body;
    try {
        await emailService.enviarEmailSuporte(toName, toEmail, toPhone, toTipo, toMessage);
        res.status(200).send('Solicitação de suporte enviado com sucesso! Verifique sua caixa de e-mail.');
    } catch (error) {
        console.error('Erro ao enviar solicitação de suporte :', error);
        res.status(500).send('Erro ao enviar Solicitação de suporte.');
    }
});

app.listen(PORTA_APP, function () {
    console.log(`
    ##   ##  ######   #####             ####       ##     ######     ##              ##  ##    ####    ######  
    ##   ##  ##       ##  ##            ## ##     ####      ##      ####             ##  ##     ##         ##  
    ##   ##  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##        ##   
    ## # ##  ####     #####    ######   ##  ##   ######     ##     ######   ######   ##  ##     ##       ##    
    #######  ##       ##  ##            ##  ##   ##  ##     ##     ##  ##            ##  ##     ##      ##     
    ### ###  ##       ##  ##            ## ##    ##  ##     ##     ##  ##             ####      ##     ##      
    ##   ##  ######   #####             ####     ##  ##     ##     ##  ##              ##      ####    ######  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
