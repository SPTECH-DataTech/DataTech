var idEmpresa = sessionStorage.getItem("ID_EMPRESA");
var nomeUsuario = sessionStorage.getItem("NOME_USUARIO");
var idCargo = sessionStorage.ID_CARGO;
var idUsuario = sessionStorage.ID_USUARIO;
var b_usuario = document.getElementById("b_usuario");

function procurarFuncionario() {
    const input = document.getElementById('input-search');
    const filter = input.value.toLowerCase();
    const funcionarios = document.querySelectorAll('.campo');

    funcionarios.forEach(funcionario => {
        const nome = funcionario.querySelector('.nome').innerText.toLowerCase();
        if (nome.startsWith(filter)) {
            funcionario.style.display = '';
        } else {
            funcionario.style.display = 'none';
        }
    });

    document.getElementById('input-search').addEventListener('keyup', procurarFuncionario);
}

function carregarCargos() {

    const select_cargos_editar = document.getElementById("select_cargos_editar");
    const select_cargos = document.getElementById("select_cargos");

    if (!select_cargos_editar || !select_cargos) {
        console.error("Elementos <select> não encontrados no DOM.");
        return;
    }

    select_cargos_editar.innerHTML = "";
    select_cargos.innerHTML = "";

    fetch("/equipe/carregarCargos", {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(function (resposta) {
            resposta.json().then((equipe) => {
                equipe.forEach((cargos) => {
                    select_cargos_editar.innerHTML += `<option value='${cargos.id}'>${cargos.nomeCargo}</option>`;
                    select_cargos.innerHTML += `<option value='${cargos.id}'>${cargos.nomeCargo}</option>`;

                    sessionStorage.ID_CARGO = cargos.id;
                    sessionStorage.NOME_CARGO = cargos.nomeCargo;
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

function modalAdicionarFuncionario() {
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal') {
            modal.classList.remove('abrir')
        }
    });
}

function removerErros(erroElemento, inputElemento, spanElemento) {
    erroElemento.style.display = "none";
    inputElemento.style.borderColor = "";
    spanElemento.style.color = "";
}

function adicionar() {

    let nome = input_nome.value.trim();
    let cpf = input_cpf.value.trim();
    let email = input_email.value.trim();
    let senha = input_senha.value.trim();
    let cargos = select_cargos.value;
    let campos = [nome, cpf, email, senha, cargos];

    let erroNome = nome.length <= 1;
    let erroNomeComNumeros = false;
    let erroCPF = cpf.length < 14;
    let erroEmail = email.indexOf("@") < 0 || email.lastIndexOf(".") < email.indexOf("@") || email.lastIndexOf(".") == email.length;
    let erroSenhaNumero = true;
    let erroSenhaMaiusculo = true;
    let erroSenhaEspecial = true;
    let erroSenhaQtd = senha.length < 6;
    let erroCargos = cargos == "#";
    let erroEncontrado = false;

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

    select_cargos.addEventListener("change", function () {
        removerErros(erro_cargo, select_cargos, spanCargo);
    });

    if (campos.some(campo => campo == "")) {
        alert("Preencha todos os campos para continuar!")
        return;

    } else if (erroNome) {

        erro_nome.innerHTML = "Nome inválido!";
        erro_nome.style.display = "block";
        input_nome.classList.add("input-erro");
        spanNome.style.color = "red";
        input_nome.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroNomeComNumeros) {

        erro_nome.innerText = "Nome inválido!";
        erro_nome.style.display = "block";
        input_nome.classList.add("input-erro");
        erroEncontrado = true;

    } else if (erroCPF) {

        erro_cpf.innerText = "O CPF deve conter 14 dígitos.";
        erro_cpf.style.display = "block";
        input_cpf.classList.add("input-erro");
        spanCpf.style.color = "red";
        input_cpf.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroEmail) {

        erro_email.innerText = "E-mail inválido!";
        erro_email.style.display = "block";
        input_email.classList.add("input-erro");
        spanEmail.style.color = "red";
        input_email.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroSenhaQtd) {

        erro_senha.innerText = "A senha deve ter pelo menos 5 dígitos.";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroSenhaEspecial) {

        erro_senha.innerText = "A senha deve conter um caractere especial (ex:!@#$.?)";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroSenhaMaiusculo) {

        erro_senha.innerText = "A senha deve incluir uma letra maiúscula.";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroSenhaNumero) {

        erro_senha.innerText = "A senha deve conter um número.";
        erro_senha.style.display = "block";
        input_senha.classList.add("input-erro");
        spanSenha.style.color = "red";
        input_senha.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroCargos) {

        erro_cargo.innerHTML = "Selecione algum cargo"
        erro_cargo.style.display = "block"
        select_cargos.classList.add("input-erro");
        spanCargo.style.color = "red";
        select_cargos.style.borderColor = "red";
        erroEncontrado = true;
    }

    if (erroEncontrado) {
        return;
    }

    const idCargo = select_cargos.value;

    fetch('equipe/adicionar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idCargoServer: idCargo,
            nomeServer: nome,
            cpfServer: cpf,
            emailServer: email,
            senhaServer: senha,
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

                    const popup = document.getElementById('popup-adicionar');
                    popup.style.display = 'flex';
                    
                }
            })
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            habilitarMensagem(erro.message);
        });

    return false;
}

function fomatarCpf(input) {
    let cpf = input.value.replace(/\D/g, '');

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    input.value = cpf;
}

var funcionariosParaRemover = [];

function modalRemoverFuncionario() {
    const modal = document.getElementById('janela-modal-remover');
    const checkboxes = document.querySelectorAll('.campo .checkbox-class');
    const names = document.querySelectorAll('.campo .nome');
    const modalContent = document.getElementById('funcionarios-para-remover');

    modalContent.innerHTML = '';
    modal.classList.add('abrir');

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const name = names[index].textContent;
            const nameElement = document.createElement('p');
            nameElement.textContent = name;
            modalContent.appendChild(nameElement);
            funcionariosParaRemover.push(name);
        }
    });
    console.log("usuario para excluir:", funcionariosParaRemover)

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal-remover') {
            modal.classList.remove('abrir')
        }
    });

}

document.addEventListener("DOMContentLoaded", function () {
    const botaoRemover = document.getElementById('button-modal');
    const checkbox = document.querySelector('.checkbox_confirmacao .checkbox-class');

    function atualizarEstadoBotao() {
        botaoRemover.disabled = !checkbox.checked;
    }

    checkbox.addEventListener('change', atualizarEstadoBotao);

    atualizarEstadoBotao();
});

function modalEditarFuncionario() {
    const modal = document.getElementById('janela-modal-editar');
    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal-editar') {
            modal.classList.remove('abrir')
        }
    });
}

function editar() {

    let nome = input_nome_editar.value.trim();
    let email = input_email_editar.value.trim();

    // let erroNome = nome.length <= 1;
    // let erroNomeComNumeros = false;
    // let erroEmail = email.indexOf("@") < 0 || email.lastIndexOf(".") < email.indexOf("@") || email.lastIndexOf(".") == email.length;
    // let erroCargos = cargos == "#";
    // let erroEncontrado = false;

    // input_nome_editar.addEventListener("input", function () {
    //     removerErros(erro_nome_editar, input_nome_editar, spanNomeEditar);
    // });

    // input_email_editar.addEventListener("input", function () {
    //     removerErros(erro_email_editar, input_email_editar, spanEmailEditar);
    // });

    // select_cargos_editar.addEventListener("change", function () {
    //     removerErros(erro_cargo_editar, select_cargos_editar, spanCargoEditar);
    // });

    // if (nome == "" || email == "" || cargos == "") {
    //     alert("Preencha todos os campos para continuar!")
    //     return;

    // } else if (erroNome) {

    //     erro_nome_editar.innerHTML = "Nome inválido!";
    //     erro_nome_editar.style.display = "block";
    //     input_nome_editar.classList.add("input-erro");
    //     spanNomeEditar.style.color = "red";
    //     input_nome_editar.style.borderColor = "red";
    //     erroEncontrado = true;

    // } else if (erroNomeComNumeros) {

    //     erro_nome_editar.innerText = "Nome inválido!";
    //     erro_nome_editar.style.display = "block";
    //     input_nome_editar.classList.add("input-erro");
    //     erroEncontrado = true;

    // } else if (erroEmail) {

    //     erro_email_editar.innerText = "E-mail inválido!";
    //     erro_email_editar.style.display = "block";
    //     input_email_editar.classList.add("input-erro");
    //     spanEmailEditar.style.color = "red";
    //     input_email_editar.style.borderColor = "red";
    //     erroEncontrado = true;

    // } else if (erroCargos) {

    //     erro_cargo_editar.innerHTML = "Selecione algum cargo"
    //     erro_cargo_editar.style.display = "block"
    //     select_cargos_editar.classList.add("input-erro");
    //     spanCargoEditar.style.color = "red";
    //     select_cargos_editar.style.borderColor = "red";
    //     erroEncontrado = true;
    // }

    // if (erroEncontrado) {
    //     return;
    // }

    const idCargo = select_cargos_editar.value;
    
    fetch(`equipe/editar/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeServer: nome,
            emailServer: email,
            idCargoServer: idCargo,
        }),
    })
        .then(resposta => {
            resposta.json().then(data => {
                console.log("Resposta do servidor: ", data);

                if (!resposta.ok) {
                    throw new Error(data.erro);
                }
                else {
                    document.getElementById('janela-modal-editar').style.display = 'none';

                    const popup = document.getElementById('popup-editar');
                    popup.style.display = 'flex';
                    
                }
            })
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            habilitarMensagem(erro.message);
        });

    return false;
}

function listarFuncionarios() {

    fetch(`/equipe/listarFuncionarios/1`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        }
    })
        .then(function (resposta) {
            resposta.json().then((dados) => {
                const container = document.querySelector('.funcionarios');
                container.innerHTML = '';
                dados.forEach(funcionario => {
                    const div = document.createElement('div');
                    div.classList.add('campo');

                    const checkbox = document.createElement('input');
                    checkbox.type = 'checkbox';
                    checkbox.classList.add('checkbox-class');

                    const img = document.createElement('img');
                    img.src = './assets/Group 376.png';
                    img.alt = 'perfil icon';
                    img.classList.add('icon');

                    const nomeSpan = document.createElement('span');
                    nomeSpan.classList.add('nome');
                    nomeSpan.innerText = funcionario.nome;

                    const emailSpan = document.createElement('span');
                    emailSpan.classList.add('email');
                    emailSpan.innerText = funcionario.email;

                    const cargoSpan = document.createElement('span');
                    cargoSpan.classList.add('cargo');
                    cargoSpan.innerText = funcionario.nomeCargo;

                    div.appendChild(checkbox);
                    div.appendChild(img);
                    div.appendChild(nomeSpan);
                    div.appendChild(emailSpan);
                    div.appendChild(cargoSpan);

                    container.appendChild(div);

                    sessionStorage.ID_USUARIO = funcionario.id;
                });
            });
        })
        .catch(error => console.error('Erro ao listar funcionários:', error));
}

function excluir() {
    const checkboxes = document.querySelectorAll('.campo .checkbox-class:checked');
    const funcionariosSelecionados = Array.from(checkboxes).map(checkbox => {
        const campo = checkbox.closest('.campo');
        if (campo) {
            const nameElement = campo.querySelector('.nome');
            return nameElement ? nameElement.textContent.trim() : null;
        }
        return null;
    }).filter(name => name !== null);
    
    funcionariosSelecionados.forEach(funcionario => {
        fetch(`/equipe/excluir/${idUsuario}`, {
            method: 'DELETE',
        })
            .then(response => {
                if (response.ok) {
                    console.log(`Funcionário ${nomeFuncionario} removido com sucesso`);
                    document.getElementById('popup-remover').style.display = 'flex';
                } else {
                    console.error(`Erro ao remover o funcionário ${nomeFuncionario}:`, response.status);
                }
            })
            .catch(error => console.error('Erro ao remover funcionário:', error));
    });


    document.getElementById('janela-modal-remover').classList.remove('abrir');
}

window.onload = function () {
    listarFuncionarios();
    excluir();
    carregarCargos();
}