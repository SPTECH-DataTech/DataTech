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

// Função para quando a mensagem estiver certa, sumir o texto.
function removerErros(erroElemento) {
    erroElemento.style.display = "none"; // Esconder a mensagem de erro
}

function cadastrar() {


    let nome = input_nome.value.trim();
    let cpf = input_cpf.value.trim();
    let email = input_email.value.trim();
    let senha = input_senha.value.trim();
    let confirmacaoSenha = input_confirmacaoSenha.value.trim();
    let token_informado = input_token.value.trim();

    // ERROS DE VERIFICAÇÃO
    let erroNome = nome.length <= 1;
    let erroCPF = cpf.length != 14;
    let erroEmail = email.indexOf("@") == -1 || email.indexOf(".com") == -1;
    let erroSenhaNumero = true;
    let erroSenhaQtd = senha.length < 6;
    let erroConfirmacaoSenha = confirmacaoSenha != senha;
    let erroEncontrado = false;


    // verificação de números na senha
    for (let i = 0; i < senha.length; i++) {

        if (!isNaN(senha[i])) {
            erroSenhaNumero = false;
            break;
        }
    }

    // Para limpar mensagem de erro.
    input_nome.addEventListener("input", function () {
        removerErros(erro_nome);
    });

    input_cpf.addEventListener("input", function () {
        removerErros(erro_cpf);
    });

    input_email.addEventListener("input", function () {
        removerErros(erro_email);
    });

    input_senha.addEventListener("input", function () {
        removerErros(erro_senha);
    });

    input_confirmacaoSenha.addEventListener("input", function () {
        removerErros(erro_confirmacaoSenha);
    });

    input_token.addEventListener("input", function () {
        removerErros(erro_token);
    });


    if (nome == "" || email == "" || senha == "" || token_informado == "" || cpf == "" || confirmacaoSenha == "") {
        alert("Preencha todos os campos para continuar")
        return false;
    }
    else if (erroNome) {

        erro_nome.innerText = "Nome inválido!";
        erro_nome.style.display = "block";
        input_nome.classList.add("input-erro");
        erroEncontrado = true;
    }
    else if (erroCPF) {

        erro_cpf.innerText = "Erro no CPF. Deve haver 14 dígitos.";
        erro_cpf.style.display = "block";
        input_cpf.classList.add("input-erro");
        erroEncontrado = true;
    }
    else if (erroEmail) {

        erro_email.innerText = "Email inválido! Deve haver @ e .com!";
        erro_email.style.display = "block";
        input_email.classList.add("input-erro");
        erroEncontrado = true;
    }
    else if (erroSenhaQtd) {

        erro_senha.innerText = "Erro na senha. Deve haver mais de 5 dígitos.";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        erroEncontrado = true;
    }
    else if (erroSenhaNumero) {

        erro_senha.innerText = "Erro na senha. Deve haver números.";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        erroEncontrado = true;
    }
    else if (erroConfirmacaoSenha) {

        erro_confirmacaoSenha.innerText = "A confirmação de senha deve ser a mesma que a senha.";
        erro_confirmacaoSenha.style.display = "block";
        input_confirmacaoSenha.classList.add("input-erro");
        erroEncontrado = true;
    }
    // let empresa = validarToken(token_informado);
    //  if (!empresa) {
    //     return ;
    // }

    if (erroEncontrado) {
        return false;
    }

    else {
        alert("Cadastro realizado com sucesso. Redirecionando para tela de Login!")
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