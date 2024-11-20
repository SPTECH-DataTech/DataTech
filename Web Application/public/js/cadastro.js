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
            Swal.fire({
                icon: "warning",
                title: "Token Inválido",
                timer: 2000,
                timerProgressBar: true,
                confirmButtonText: '',
                confirmButtonColor: '#fff',
                didOpen: () => {
                    timerInterval = setInterval(() => {
                        timer.textContent = `${Swal.getTimerLeft()}`;
                    }, 100);
                },
            }).then((result) => {
                if (result.dismiss === Swal.DismissReason.timer) {
                    console.log("I was closed by the timer");
                }
            });
            return null;
        }

    }
    return id;
}


// Função para quando a mensagem estiver certa, sumir o texto.
function removerErros(erroElemento, inputElemento, spanElemento) {
    erroElemento.style.display = "none"; // Esconder a mensagem de erro
    inputElemento.style.borderColor = "";  // Remover a borda vermelha 
    spanElemento.style.color = ""; // Remover a cor vermelha do span (label)
}

function cadastrar() {
    let nome = input_nome.value.trim();
    let cpf = input_cpf.value.trim();
    let email = input_email.value.trim();
    let senha = input_senha.value.trim();
    let confirmacaoSenha = input_confirmacaoSenha.value.trim();
    let token_informado = input_token.value.trim();
    let campos = [nome, cpf, email, senha, confirmacaoSenha, token_informado];

    // ERROS DE VERIFICAÇÃO
    let erroNome = nome.length <= 1;
    let erroNomeComNumeros = false;
    let erroCPF = cpf.length < 14;
    let erroEmail = email.indexOf("@") < 0 || email.lastIndexOf(".") < email.indexOf("@") || email.lastIndexOf(".") == email.length;
    let erroSenhaNumero = true;
    let erroSenhaMaiusculo = true;
    let erroSenhaEspecial = true;
    let erroSenhaQtd = senha.length < 6;
    let erroConfirmacaoSenha = confirmacaoSenha != senha;
    let erroEncontrado = false;


    // verificação de números na senha
    for (let i = 0; i < senha.length; i++) {

        if (/[0-9]/.test(senha[i])) {
            erroSenhaNumero = false;
        }
        if (/[A-Z]/.test(senha[i])) {
            erroSenhaMaiusculo = false;
        }
        if (/[!@#$.?]/.test(senha[i])) {
            erroSenhaEspecial = false;
        }

    }


    // Para limpar mensagem de erro.
    input_nome.addEventListener("input", function () {
        removerErros(erro_nome, input_nome, spanNome);
    });

    input_cpf.addEventListener("input", function () {
        removerErros(erro_cpf, input_cpf, spanCpf);
    });

    input_email.addEventListener("input", function () {
        removerErros(erro_email, input_email, spanEmail);
    });

    input_senha.addEventListener("input", function () {
        removerErros(erro_senha, input_senha, spanSenha);
    });

    input_confirmacaoSenha.addEventListener("input", function () {
        removerErros(erro_confirmacaoSenha, input_confirmacaoSenha, spanConfirmarSenha);
    });

    input_token.addEventListener("input", function () {
        removerErros(erro_token);
    });


    if (campos.some(campo => campo == "")) {
        Swal.fire({
            icon: "warning",
            title: "Preencha todos os campos para continuar",
            timer: 2000,
            timerProgressBar: true,
            confirmButtonText: '',
            confirmButtonColor: '#fff',
        }).then((result) => {
            if (result.dismiss === Swal.DismissReason.timer) {
                console.log("I was closed by the timer");
            }
        });
        return;
    }
    else if (erroNome) {

        erro_nome.innerHTML = "Nome inválido!";
        erro_nome.style.display = "block";
        input_nome.classList.add("input-erro");
        spanNome.style.color = "red";
        input_nome.style.borderColor = "red";
        erroEncontrado = true;
    }
    else if (erroNomeComNumeros) {

        erro_nome.innerText = "Nome inválido!";
        erro_nome.style.display = "block";
        input_nome.classList.add("input-erro");

        erroEncontrado = true;
    }
    else if (erroCPF) {

        erro_cpf.innerText = "O CPF deve conter 14 dígitos.";
        erro_cpf.style.display = "block";
        input_cpf.classList.add("input-erro");
        spanCpf.style.color = "red";
        input_cpf.style.borderColor = "red";
        erroEncontrado = true;
    }
    else if (erroEmail) {

        erro_email.innerText = "E-mail inválido!";
        erro_email.style.display = "block";
        input_email.classList.add("input-erro");
        spanEmail.style.color = "red";
        input_email.style.borderColor = "red";
        erroEncontrado = true;
    }
    else if (erroSenhaQtd) {

        erro_senha.innerText = "A senha deve ter pelo menos 5 dígitos.";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        erroEncontrado = true;
    }
    else if (erroSenhaEspecial) {

        erro_senha.innerText = "A senha deve conter um caractere especial (ex:!@#$.?)";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        erroEncontrado = true;
    }
    else if (erroSenhaMaiusculo) {

        erro_senha.innerText = "A senha deve incluir uma letra maiúscula.";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        erroEncontrado = true;
    }
    else if (erroSenhaNumero) {

        erro_senha.innerText = "A senha deve conter um número.";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        erroEncontrado = true;
    }
    else if (erroConfirmacaoSenha) {

        erro_confirmacaoSenha.innerText = "A confirmação de senha deve ser a mesma que a senha.";
        erro_confirmacaoSenha.style.display = "block";
        input_confirmacaoSenha.classList.add("input-erro");
        spanConfirmarSenha.style.color = "red";
        input_confirmacaoSenha.style.borderColor = "red";
        erroEncontrado = true;
    }

    if (erroEncontrado) {
        return;
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
                    setTimeout(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Cadastro realizado com sucesso!",
                            text: "Redirecionando para o login...",
                            timer: 2000,
                            timerProgressBar: true,
                            confirmButtonText: '',
                            confirmButtonColor: '#fff',
                            didOpen: () => {
                                Swal.showLoading();
                            },
                            willClose: () => {
                                window.location = "login.html";
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log("I was closed by the timer");
                            }
                        });
                    },
                    );
                }
            })
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            habilitarMensagem(erro.message);
        });

    return false;
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


