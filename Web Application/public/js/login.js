function login() {

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

function habilitarMensagem(mensagem) {
    const p = document.getElementById('message');
    p.style.display = "block"
    p.innerHTML = mensagem;
}

function ocultarMensagem() {
    const p = document.getElementById('message');
    p.style.display = "none"
}