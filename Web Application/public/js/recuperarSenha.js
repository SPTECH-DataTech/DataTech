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
        .then(function (resposta) {
            console.log("Resposta do servidor (Senha provisória): ", resposta);

            if (resposta.ok) {
                alert("A senha provisória foi enviada no email informado!");
            } else if (resposta.status === 404) {
                alert("Email não encontrado. Por favor, verifique se o email está correto.");
            }
            else {
                throw "Houve um erro ao enviar o email!";
            }
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            alert(erro);
        });


}