let tudoCertoEmail = false;

function verificarEmail() {

    const email = input_email.value;

    if (email == "") {

        spanEmail.style.color = "red";
        input_email.style.borderColor = "red";
        tudoCertoEmail = false;
        mensagemErroEmail.innerHTML = "Campo obrigatório!";

    } else if (email.indexOf("@") < 0 || email.lastIndexOf(".") < email.indexOf("@") || email.lastIndexOf(".") == email.length - 1) {

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

function enviarEmail() {
    const email = input_email.value;

    if (!tudoCertoEmail) {
        return;
    }
    fetch('/recuperarSenha/enviarSenha', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email
        }),
    })
        .then(resposta => {
            return resposta.json().then(data => {
                console.log("Resposta do servidor: ", data);

                if (!resposta.ok) {
                    console.log("Houve um erro ao enviar o email: ", data.erro);
                    throw new Error(data.erro);
                }
                else {
                    habilitarMensagem(data.message);
                    setTimeout(() => {
                        window.location = "./login.html";
                    }, 4000);
                }
            })
        })
        .catch(erro => {
            console.log(`#ERRO: ${erro}`);
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