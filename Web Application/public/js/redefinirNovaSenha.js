
setInterval(() => {
    verificarToken()
    console.log('Veficicando acesso...');
}, 60000);

function getToken() {
    const parametroUrl = new URLSearchParams(window.location.search); // Objeto que contém a parte da URL após o ?
    return parametroUrl.get('token');
}

function verificarToken() {
    const token = getToken();   

    const payload = JSON.parse(atob(token.split('.')[1])); // Acessa a carga útil do token
    const horaAtual = new Date().getTime() / 1000;

    if (horaAtual > payload.exp) {
        alert("Token expirado. Solicite a redefinição de senha novamente!");
        window.location.href = "./recuperarSenha.html";
    } else {
        document.getElementById('container').style.display = "block";
    }
}


function redefinirSenha() {
    const senha = input_senha.value;
    const confirmarSenha = input_confirmacaoSenha.value;
    const token = getToken();

    if (senha != confirmarSenha) {
        alert("Senhas diferentes!");
        return;
    }
    //Arrumar backend
    fetch('/recuperarSenha/atualizarSenha', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            senha: senha,
            token: token
        }),
    })
        .then(function (resposta) {
            return resposta.json().then(data => {
                console.log("Resposta do servidor: ", data);

                if (!resposta.ok) {
                    throw new Error(data.erro);
                }
                else {
                    habilitarMensagem(data.message);
                    setTimeout(() => {
                        ocultarMensagem();
                        window.location = "./login.html";
                    }, 3000)
                }
            })
        })
        .catch(function (erro) {
            console.error(`#ERRO: ${erro}`);
            habilitarMensagem(erro.message);
        });

    return false;
}

function habilitarMensagem(mensagem) {
    const p = document.getElementById('message');
    p.style.display = "block"
    p.innerHTML = mensagem;
}

function ocultarMensagem() {
    const p = document.getElementById('message');
    p.style.display = "none"
}