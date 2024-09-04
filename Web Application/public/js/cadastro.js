const listarEmpresasCadastradas = [];

function validarToken(token_informado) {
    const empresa = listarEmpresasCadastradas.find(comparar => comparar.token === token_informado);
    if (!empresa) {
        alert("O Token informado é inválido!");
        return false;
    } else {
        console.log("Token válidado com sucesso!");
        return empresa.id;
    }
}

function cadastrar() {
    let nome = input_nome.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let token_informado = input_token.value;

    let empresa = validarToken(token_informado);
    if (!empresa) {
        return;
    }

    fetch('usuarios/cadastrar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            senhaServer: senha,
            idEmpresaServer: empresa,
        }),
    })
        .then(function (resposta) {
            console.log("Resposta do servidor de cadastro:", resposta);

            if (resposta.ok) {
                habilitarMensagemSucesso();

                setTimeout(() => {
                    ocultarMensagemSucesso();
                    window.location = "login.html";
                }, 2000)
            } else {
                throw "Houve um erro ao tentar realizar o cadastro!";
            }
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });

    return false;
}

function habilitarMensagemSucesso() {
    const p = document.getElementById('message');
    p.style.display = "block"
    p.innerHTML = "Cadastro realizado com sucesso! Redirecionando para tela de Login...";
}

function ocultarMensagemSucesso() {
    const p = document.getElementById('message');
    p.style.display = "none"
}


function listarEmpresas() {
    fetch('empresas/listar', {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((empresas) => {
                empresas.forEach(empresa => {
                    listarEmpresasCadastradas.push(empresa);
                    console.log("Empresas cadastradas:");
                    console.log(listarEmpresasCadastradas[0]);
                });
            });
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
}