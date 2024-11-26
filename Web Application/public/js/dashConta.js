// window.onload = function() {
//     document.getElementById("b_usuario").innerHTML = `${sessionStorage.NOME_USUARIO}`;
//     // document.getElementById("nome_usuario").innerHTML = `${sessionStorage.NOME_USUARIO}`;

// };

var nomeUsuario = sessionStorage.NOME_USUARIO;
document.getElementById("b_usuario").innerHTML = `${nomeUsuario}`;

var idUsuario = 1;

function modalAlterarSenha() {
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');

    const fechar = document.getElementById('fechar');
    fechar.addEventListener('click', () => {
        modal.classList.remove('abrir');
    });

}

function alterarSenha() {
    const senhaAtual = input_senha.value.trim();
    const novaSenha = input_nova_senha.value.trim();
    const confirmacaoSenha = input_confirmacaoSenha.value.trim();

    let tudoCerto = true;

    // Resetando mensagens de erro
    mensagemErroSenha.innerHTML = "";
    mensagemErroNovaSenha.innerHTML = "";
    erro_confirmacaoSenha.innerText = "";

    // Validação de senha atual
    if (senhaAtual === "") {
        mensagemErroSenha.innerHTML = "Campo obrigatório!";
        input_senha.style.borderColor = "red";
        tudoCerto = false;
    } else {
        input_senha.style.borderColor = "#7F00FF";
    }

    // Validação de nova senha
    if (novaSenha.length < 5) {
        mensagemErroNovaSenha.innerHTML = "A senha deve ter pelo menos 5 dígitos.";
        input_nova_senha.style.borderColor = "red";
        tudoCerto = false;
    } else if (!/[0-9]/.test(novaSenha)) {
        mensagemErroNovaSenha.innerHTML = "A senha deve conter um número.";
        input_nova_senha.style.borderColor = "red";
        tudoCerto = false;
    } else if (!/[A-Z]/.test(novaSenha)) {
        mensagemErroNovaSenha.innerHTML = "A senha deve incluir uma letra maiúscula.";
        input_nova_senha.style.borderColor = "red";
        tudoCerto = false;
    } else if (!/[!@#$.?]/.test(novaSenha)) {
        mensagemErroNovaSenha.innerHTML = "A senha deve conter um caractere especial (ex: !@#$.?)";
        input_nova_senha.style.borderColor = "red";
        tudoCerto = false;
    } else {
        input_nova_senha.style.borderColor = "#7F00FF";
    }

    // Validação de confirmação de senha
    if (novaSenha !== confirmacaoSenha) {
        erro_confirmacaoSenha.innerText = "A confirmação de senha deve ser a mesma que a nova senha.";
        input_confirmacaoSenha.style.borderColor = "red";
        tudoCerto = false;
    } else {
        input_confirmacaoSenha.style.borderColor = "#7F00FF";
    }

    // Verificar se tudo está correto
    if (tudoCerto) {
        alert("Senha alterada com sucesso!");
        // Aqui você pode adicionar o código para enviar as informações ao servidor.
    }

    

    fetch(`dashConta/alterarSenha/${idUsuario}/${novaSenha}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
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
                dashConta.forEach((usuario) => {
                    nome_usuario.innerHTML = usuario.nome || 'Não informado';
                    cpf_usuario.innerHTML = usuario.cpf || 'Não informado';
                    equipe_usuario.innerHTML = usuario.nome || 'Não informado';
                    cargo_usuario.innerHTML = usuario.nomeCargo || 'Não informado';
                    email_usuario.innerHTML = usuario.email || 'Não informado';
                });
            });
        })
        .catch(error => console.error('Erro ao listar as informações:', error));
}
window.onload = mostrarInformacoesConta;






