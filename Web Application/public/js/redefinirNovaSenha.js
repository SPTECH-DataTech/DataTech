
setInterval(() => {
    verificarToken()
    console.log('Verificando acesso...');
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
        document.body.style.display = 'block';
    }
}

let tudoCertoSenha = false;

function verificarSenha() {
    const senha = input_senha.value.trim();
    const confirmarSenha = input_confirmacaoSenha.value;

    let erroSenhaNumero = true;
    let erroSenhaMaiusculo = true;
    let erroSenhaEspecial = true;



    for (let i = 0; i < senha.length; i++) {

        if (/[0-9]/.test(senha[i])) {
            erroSenhaNumero = false;
        }
        if (/[A-Z]/.test(senha[i])) {
            erroSenhaMaiusculo = false;
        }
        if (/[!@#$.?]/.test(senha[i])) {
            erroSenhaEspecial = false;
        }

    }

    if (senha == "") {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "Campo obrigatório!";

    }
    if (confirmarSenha == "") {

        spanConfirmacaoSenha.style.color = "red";
        input_confirmacaoSenha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroConfirmacaoSenha.innerHTML = "Campo obrigatório!";

    }
    else if (senha.length < 5) {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "A senha deve ter pelo menos 5 dígitos.";

    }
    else if (erroSenhaEspecial) {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "A senha deve conter um caractere especial (ex:!@#$.?)";

    }
    else if (erroSenhaMaiusculo) {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "A senha deve incluir uma letra maiúscula.";

    }
    else if (erroSenhaNumero) {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "A senha deve conter um número.";

    }
    else if (senha != confirmarSenha) {
        spanConfirmacaoSenha.style.color = "red";
        input_confirmacaoSenha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroConfirmacaoSenha.innerHTML = "As senhas são diferentes!";
    }
    else {

        tudoCertoSenha = true;
        spanSenha.style.color = "black";
        input_senha.style.borderColor = "#7F00FF";
        spanConfirmacaoSenha.style.color = "black";
        input_confirmacaoSenha.style.borderColor = "#7F00FF";
        mensagemErroSenha.innerHTML = "";
        mensagemErroConfirmacaoSenha.innerHTML = "";

    }

}



function redefinirSenha() {

    const token = getToken();
    const senha = input_senha.value;

    verificarSenha();
    if (!tudoCertoSenha) {
        return;
    }

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