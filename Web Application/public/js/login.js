let tudoCertoEmail = false;
let tudoCertoSenha = false;

function verificarEmail() {

    const email = input_email.value;

    if (email == "") {

        spanEmail.style.color = "red";
        input_email.style.borderColor = "red";
        tudoCertoEmail = false;
        mensagemErroEmail.innerHTML = "Campo obrigatório!";

    } else if (email.indexOf("@") < 0 || email.indexOf(".") < email.indexOf("@") || email.indexOf(".") == email.length - 1) {

        spanEmail.style.color = "red";
        input_email.style.borderColor = "red";
        tudoCertoEmail = false;
        mensagemErroEmail.innerHTML = "E-mail inválido!";

    } else {

        tudoCertoEmail = true;
        spanEmail.style.color = "black";
        input_email.style.borderColor = "#7F00FF";
        mensagemErroEmail.innerHTML = "";

    }

}

function verificarSenha() {

    const senha = input_senha.value;

    if (senha == "") {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "Campo obrigatório!";

    } else {

        tudoCertoSenha = true;
        spanSenha.style.color = "black";
        input_senha.style.borderColor = "#7F00FF";
        mensagemErroSenha.innerHTML = "";

    }

}

function login() {

    if (tudoCertoEmail && tudoCertoSenha) {

        const email = input_email.value;
        const senha = input_senha.value;

        fetch('usuarios/autenticar', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email,
                senhaServer: senha
            }),
        })
            .then(function (resposta) {
                if (resposta.ok) {
                    const mensagem = "Login realizado com sucesso..."
                    habilitarMensagem(mensagem);
                    setTimeout(function () {
                        ocultarMensagem();
                    }, 3000)
                } else {
                    throw 'Houve um erro ao realizar o login.'
                }
            })
            .catch(function (resposta) {
                console.log(`#ERRO: ${resposta}`);
                habilitarMensagem(resposta);
            });
        return false;
    }
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