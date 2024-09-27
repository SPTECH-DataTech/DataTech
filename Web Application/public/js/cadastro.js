const listarEmpresasCadastradas = [];

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


function validarToken(token_informado) {
    let id;
    for (let i = 0; i < listarEmpresasCadastradas.length; i++) {
        if (listarEmpresasCadastradas[i].token == token_informado) {
            console.log("Token validado com sucesso!");
            id = listarEmpresasCadastradas[i].id;
            break;
        } else {
            alert("Token inválido!");
            return null;
        }

    }
    return id;
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
    let erroNomeComNumeros = false;
    let erroCPF = cpf.length < 14;
    let erroEmail = email.indexOf("@") < 0 || email.lastIndexOf(".") < email.indexOf("@") || email.lastIndexOf(".") == email.length;
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

    // verificação nome com números
    // for (let i = 0; i < nome.length; i++){

    //     if (!isNaN(nome[i])){
    //         erroNomeComNumeros = true;
    //         break;
    //     }
    // }   


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
    else if (erroNomeComNumeros) {

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

        erro_email.innerText = "Deve haver '@' e '.' ! O ponto não pode ser o último, nem vir antes do '@'.";
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

    if (erroEncontrado) {
        return false;
    }

    const empresa = validarToken(token_informado);
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
            cpfServer: cpf,
            idEmpresaServer: empresa,
        }),
    })
        .then(resposta => {
            resposta.json().then(data => {
                console.log("Resposta do servidor: ", data);

                if (!resposta.ok) {
                    throw new Error(data.erro);
                }
                else {
                    habilitarMensagem(data.message);

                    setTimeout(() => {
                        ocultarMensagem();
                        window.location = "login.html";
                    }, 3000);
                }
            })
        })
        .catch(function (erro) {
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

function verModal() {
    const modal = document.getElementById("div-dica-token");
    modal.classList.add('show');
}

function ocultarModal() {
    const modal = document.getElementById("div-dica-token");
    modal.classList.remove('show');
}

function fomatarCpf(input) {
    // Remove todos os caracteres não numéricos
    let cpf = input.value.replace(/\D/g, '');

    //Formata o CPF em XXX.XXX.XXX.-XX
    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    input.value = cpf;
}


