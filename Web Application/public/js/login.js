function login(){

    const email = input_email.value;
    const senha = input_senha.value;

    fetch('usuairos/autenticar', {
        method: "POST", 
        headers: {
            'Content-Type': 'application/json'
        }, 
        body: {
            emailServer: email,
            senhaServer: senha
        },
    })
    .then(function(resposta){
        if(resposta.ok){
            alert("OK")
        }else{
            throw 'Houve um erro ao realizar o login.'
        }
    })
    .catch(function (resposta) {
        console.log(`#ERRO: ${resposta}`);
    });
    return false;
}