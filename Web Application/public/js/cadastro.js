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
    let cpf = input_cpf.value;
    let email = input_email.value;
    let senha = input_senha.value;
    let confirmacaoSenha = input_confirmacaoSenha.value;
    let token_informado = input_token.value;

    // ERROS DE VERIFICAÇÃO
    let erroNome = nome.length <= 1;
    let erroCPF = cpf.length != 14;
    let erroEmail = email.indexOf("@gmail.com") == -1;
    let erroSenhaNumero = true;
    let erroSenhaQtd = senha.length < 6;
    let erroConfirmacaoSenha = confirmacaoSenha != senha;
    
    // verificação de números 
    for (let i = 0; i < senha.length; i++){
        
        if (!isNaN(senha[i])){
            erroSenhaNumero = false;
            break;
        }
    }

    if (nome === "" || email === "" || senha === "" || token_informado === "" ){
        alert ("Preencha todos os campos para continuar")
        return false;
    }
    else if (erroNome){
        alert ("Nome inválido!")
        return false;
    }
    else if (erroCPF){
        alert ("Erro no CPF. Deve haver 14 dígitos.")
    }
    else if (erroEmail){
        alert("Email inválidol!")
        return false;
    }
    else if(erroSenhaQtd){
        alert("Erro na senha. Deve haver mais de 5 digitos.")
        return false;
    }
    else if (erroSenhaNumero){
        alert("Erro na senha, deve haver números.")
        return false;
    }
    else if (erroConfirmacaoSenha){
        alert("A confirmação de senha deve ser a mesma que a senha.")
        return false;
    }
    // let empresa = validarToken(token_informado);
    //  if (!empresa) {
    //     return ;
    // }
    else {
     window.location.href = "./login.html"   
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