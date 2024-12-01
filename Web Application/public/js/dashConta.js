// window.onload = function() {
//     document.getElementById("b_usuario").innerHTML = `${sessionStorage.NOME_USUARIO}`;
//     // document.getElementById("nome_usuario").innerHTML = `${sessionStorage.NOME_USUARIO}`;

// };

var nomeUsuario = sessionStorage.NOME_USUARIO;
document.getElementById("b_usuario").innerHTML = `${nomeUsuario}`;

var idUsuario = sessionStorage.ID_USUARIO;

function modalAlterarSenha() {
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');

    const fechar = document.getElementById('fechar');
    fechar.addEventListener('click', () => {
        modal.classList.remove('abrir');
    });

}

function habilitarMensagem(mensagem) {
    const mensagemErro = document.getElementById('message');

    mensagemErro.innerHTML = mensagem;
}

function removerErros(erroElemento, inputElemento, spanElemento) {
    erroElemento.style.display = "none";
    inputElemento.style.borderColor = "";
    spanElemento.style.color = "";
}

function alterarSenha() {
    const novaSenha = input_nova_senha.value.trim();
    const confirmacaoSenha = input_confirmacao_senha.value.trim();

    let campos = [novaSenha, confirmacaoSenha];
    
    let erroSenhaQtd = novaSenha.length < 5;
    let erroSenhaEspecial = true;
    let erroSenhaMaiusculo = true;
    let erroSenhaNumero = true;
    let erroEncontrado = false;

    for (let i = 0; i < novaSenha.length; i++) {

        if (/[0-9]/.test(novaSenha[i])) {
            erroSenhaNumero = false;
        }
        if (/[A-Z]/.test(novaSenha[i])) {
            erroSenhaMaiusculo = false;
        }
        if (/[!@#$.?]/.test(novaSenha[i])) {
            erroSenhaEspecial = false;
        }

    }

    input_nova_senha.addEventListener("input", function () {
        removerErros(mensagemErroNovaSenha, input_nova_senha, spanNovaSenha);
    });

    input_confirmacao_senha.addEventListener("input", function () {
        removerErros(erroConfirmacaoSenha, input_confirmacao_senha, spanConfirmarSenha);
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

    } else if (erroSenhaQtd) {

        mensagemErroNovaSenha.innerText = "A senha deve ter pelo menos 5 dígitos.";
        mensagemErroNovaSenha.style.display = "block";
        input_nova_senha.classList.add("input-erro");
        spanNovaSenha.style.color = "red";
        input_nova_senha.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroSenhaEspecial) {

        mensagemErroNovaSenha.innerText = "A senha deve conter um caractere especial (ex:!@$.?)";
        mensagemErroNovaSenha.style.display = "block";
        input_nova_senha.classList.add("input-erro");
        spanNovaSenha.style.color = "red";
        input_nova_senha.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroSenhaMaiusculo) {

        mensagemErroNovaSenha.innerText = "A senha deve incluir uma letra maiúscula.";
        mensagemErroNovaSenha.style.display = "block";
        input_nova_senha.classList.add("input-erro");
        spanNovaSenha.style.color = "red";
        input_nova_senha.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroSenhaNumero) {

        mensagemErroNovaSenha.innerText = "A senha deve conter um número.";
        mensagemErroNovaSenha.style.display = "block";
        input_nova_senha.classList.add("input-erro");
        spanNovaSenha.style.color = "red";
        input_nova_senha.style.borderColor = "red";
        erroEncontrado = true;

    } 
    
    else if (novaSenha != confirmacaoSenha) {

        erroConfirmacaoSenha.innerText = "As senhas devem ser iguais.";
        erroConfirmacaoSenha.style.display = "block";
        input_confirmacao_senha.classList.add("input-erro");
        spanConfirmarSenha.style.color = "red";
        input_confirmacao_senha.style.borderColor = "red";
        erroEncontrado = true;

    }

    if (erroEncontrado) {
        return;
    }

    fetch(`dashConta/alterarSenha/${idUsuario}/${novaSenha}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            novaSenhaServer: novaSenha
        }),
    })

        .then(resposta => {
            resposta.json().then(data => {
                console.log("Resposta do servidor: ", data);

                if (!resposta.ok) {
                    throw new Error(data.erro);
                }
                else {

                    document.getElementById('janela-modal').style.display = 'none';

                    Swal.fire({
                        title: 'Senha alterada com sucesso!',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: "#20BF55",
                    }).then((result) => {
                        if (result.isConfirmed) {
                            location.reload();
                        }
                    });

                }
            })
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            habilitarMensagem(erro.message);
        });

    return false;
}

function mostrarInformacoesConta() {
    fetch(`/dashConta/mostrarInformacoesConta/${idUsuario}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(function (resposta) {
            if (!resposta.ok) {
                throw new Error('Erro na resposta da API');
            }
            resposta.json().then((dashConta) => {
                dashConta.forEach((funcionario) => {
                    nome_funcionario.innerHTML = funcionario.nome || 'Não informado';
                    cpf_funcionario.innerHTML = funcionario.cpf || 'Não informado';
                    equipe_funcionario.innerHTML = funcionario.nomeFazenda || 'Ainda não está em nenhuma equipe';
                    cargo_funcionario.innerHTML = funcionario.nomeCargo || 'Ainda não tem cargo';
                    email_funcionario.innerHTML = funcionario.email || 'Não informado';
                });
            });
        })
        .catch(error => console.error('Erro ao listar as informações:', error));
}
window.onload = mostrarInformacoesConta;






