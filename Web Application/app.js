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
var cargoRouter = require("./src/routes/cargo")

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
app.use("/cargo", cargoRouter);



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
    DDDDDDDDDDDDD                                 tttt                         TTTTTTTTTTTTTTTTTTTTTTT                                   hhhhhhh             
    D::::::::::::DDD                           ttt:::t                         T:::::::::::::::::::::T                                   h:::::h             
    D:::::::::::::::DD                         t:::::t                         T:::::::::::::::::::::T                                   h:::::h             
    DDD:::::DDDDD:::::D                        t:::::t                         T:::::TT:::::::TT:::::T                                   h:::::h             
    D:::::D    D:::::D  aaaaaaaaaaaaa  ttttttt:::::ttttttt      aaaaaaaaaaaaaTTTTTT  T:::::T  TTTTTTeeeeeeeeeeee        cccccccccccccccch::::h hhhhh       
    D:::::D     D:::::D a::::::::::::a t:::::::::::::::::t      a::::::::::::a       T:::::T      ee::::::::::::ee    cc:::::::::::::::ch::::hh:::::hhh    
    D:::::D     D:::::D aaaaaaaaa:::::at:::::::::::::::::t      aaaaaaaaa:::::a      T:::::T     e::::::eeeee:::::ee c:::::::::::::::::ch::::::::::::::hh  
    D:::::D     D:::::D          a::::atttttt:::::::tttttt               a::::a      T:::::T    e::::::e     e:::::ec:::::::cccccc:::::ch:::::::hhh::::::h 
    D:::::D     D:::::D   aaaaaaa:::::a      t:::::t              aaaaaaa:::::a      T:::::T    e:::::::eeeee::::::ec::::::c     ccccccch::::::h   h::::::h
    D:::::D     D:::::D aa::::::::::::a      t:::::t            aa::::::::::::a      T:::::T    e:::::::::::::::::e c:::::c             h:::::h     h:::::h
    D:::::D     D:::::Da::::aaaa::::::a      t:::::t           a::::aaaa::::::a      T:::::T    e::::::eeeeeeeeeee  c:::::c             h:::::h     h:::::h
    D:::::D    D:::::Da::::a    a:::::a      t:::::t    tttttta::::a    a:::::a      T:::::T    e:::::::e           c::::::c     ccccccch:::::h     h:::::h
    DDD:::::DDDDD:::::D a::::a    a:::::a      t::::::tttt:::::ta::::a    a:::::a    TT:::::::TT  e::::::::e          c:::::::cccccc:::::ch:::::h     h:::::h
    D:::::::::::::::DD  a:::::aaaa::::::a      tt::::::::::::::ta:::::aaaa::::::a    T:::::::::T   e::::::::eeeeeeee   c:::::::::::::::::ch:::::h     h:::::h
    D::::::::::::DDD     a::::::::::aa:::a       tt:::::::::::tt a::::::::::aa:::a   T:::::::::T    ee:::::::::::::e    cc:::::::::::::::ch:::::h     h:::::h
    DDDDDDDDDDDDD         aaaaaaaaaa  aaaa         ttttttttttt    aaaaaaaaaa  aaaa   TTTTTTTTTTT      eeeeeeeeeeeeee      cccccccccccccccchhhhhhh     hhhhhhh  
    \n\n\n                                                                                                 
    Servidor do seu site já está rodando! Acesse o caminho a seguir para visualizar .: http://${HOST_APP}:${PORTA_APP} :. \n\n
    Você está rodando sua aplicação em ambiente de .:${process.env.AMBIENTE_PROCESSO}:. \n\n
    \tSe .:desenvolvimento:. você está se conectando ao banco local. \n
    \tSe .:producao:. você está se conectando ao banco remoto. \n\n
    \t\tPara alterar o ambiente, comente ou descomente as linhas 1 ou 2 no arquivo 'app.js'\n\n`);
});
