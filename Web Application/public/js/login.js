
let tudoCertoEmail = false;
let tudoCertoSenha = false;

function verificarEmail() {

    const email = input_email.value.trim();

    if (email == "") {

        spanEmail.style.color = "red";
        input_email.style.borderColor = "red";
        tudoCertoEmail = false;
        mensagemErroEmail.innerHTML = "Campo obrigatório!";

    }
    else if (email.indexOf("@") < 0 || email.lastIndexOf(".") < email.indexOf("@") || email.lastIndexOf(".") == email.length - 1) {

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

function verificarSenha() {

    const senha = input_senha.value.trim();
    let erroSenhaNumero = true;
    let erroSenhaMaiusculo = true;
    let erroSenhaEspecial = true;

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

    if (senha == "") {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "Campo obrigatório!";

    }
    else if (senha.length < 5) {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "A senha deve ter pelo menos 5 dígitos.";

    }
    else if (erroSenhaEspecial) {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "A senha deve conter um caractere especial (ex:!@#$.?)";

    }
    else if (erroSenhaMaiusculo) {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "A senha deve incluir uma letra maiúscula.";

    }
    else if (erroSenhaNumero) {

        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        tudoCertoSenha = false;
        mensagemErroSenha.innerHTML = "A senha deve conter um número.";

    }
    else {

        tudoCertoSenha = true;
        spanSenha.style.color = "black";
        input_senha.style.borderColor = "#7F00FF";
        mensagemErroSenha.innerHTML = "";

    }

}

function login() {
    const email = input_email.value.trim();
    const senha = input_senha.value.trim();

    verificarEmail();
    verificarSenha();

    if (!tudoCertoEmail && !tudoCertoSenha) {
        return;
    }

    fetch('usuarios/autenticar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            emailServer: email,
            senhaServer: senha
        }),
    })
        .then(function (resposta) {
            return resposta.json().then(data => {
                console.log("Resposta do servidor: ", data);

                if (!resposta.ok) {
                    throw new Error(data.erro)
                }
                else {
                    console.log(data)

                    sessionStorage.EMAIL_USUARIO = data.email;
                    sessionStorage.NOME_USUARIO = data.nome;
                    sessionStorage.ID_USUARIO = data.id;
                    sessionStorage.ID_EMPRESA = data.idEmpresa;
                    sessionStorage.CARGO = data.idCargo;
                    sessionStorage.FAZENDA = data.idFazenda;
                    sessionStorage.PERMISSAO_CARGOS = data.permissaoCargos;
                    sessionStorage.PERMISSAO_FAZENDAS = data.permissaoFazendas;
                    sessionStorage.PERMISSAO_FUNCIONARIOS = data.permissaoFuncionarios;

                    setTimeout(() => {
                        Swal.fire({
                            icon: "success",
                            title: "Login feito com sucesso!",
                            text: "Redirecionando para sua dashboard...",
                            timer: 2000,
                            timerProgressBar: true,
                            confirmButtonText: '',
                            confirmButtonColor: '#fff',
                            didOpen: () => {
                                Swal.showLoading();
                            },
                            willClose: () => {
                                window.location = "dashboard.html";
                            }
                        }).then((result) => {
                            if (result.dismiss === Swal.DismissReason.timer) {
                                console.log("I was closed by the timer");
                            }
                        });
                    },
                    );
                }
            });
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            habilitarMensagem(erro.message);
        });

    return false;
}