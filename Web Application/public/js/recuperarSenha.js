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
        fetch('/email/sendEmail', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                emailServer: email
            }),
        })
        .then(function (resposta){
            console.log("Resposta do servidor (email): ", resposta);
            
            if (resposta.ok){
                alert("A senha provisória foi enviada no email informado!");
            }else {
                throw "Houve um erro ao enviar o email!"
            }
        })
        .catch(function (resposta){
            console.log(`#ERRO: ${resposta}`);
        });
    

}