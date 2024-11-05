var idEmpresa = sessionStorage.getItem("ID_EMPRESA");
var nomeUsuario = sessionStorage.getItem("NOME_USUARIO");
b_usuario.innerHTML = `${nomeUsuario}`;

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

function adicionarFuncionario() {

    const modal = document.getElementById('janela-modal');

    let nome = input_nome.value.trim();
    let sobrenome = input_sobrenome.value.trim();
    let cpf = input_cpf.value.trim();
    let email = input_email.value.trim();
    let senha = input_senha.value.trim();
    let cargos = select_cargos.value;
    let campos = [nome, sobrenome, cpf, email, senha, cargos];

    let erroNome = nome.length <= 1;
    let erroNomeComNumeros = false;
    let erroSobrenome = sobrenome.length <= 1;
    let erroSobrenomeComNumeros = false;
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

    input_sobrenome.addEventListener("input", function () {
        removerErros(erro_sobrenome, input_sobrenome, spanSobrenome);
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
        spanSobrenome.style.color = "red";
        input_sobrenome.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroSobrenome) {

        erro_sobrenome.innerText = "Sobrenome inválido!";
        erro_sobrenome.style.display = "block";
        input_sobrenome.classList.add("input-erro");
        spanSobrenome.style.color = "red";
        input_sobrenome.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroSobrenomeComNumeros) {

        erro_sobrenome.innerText = "Sobrenome inválido!";
        erro_sobrenome.style.display = "block";
        input_sobrenome.classList.add("input-erro");
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

    modal.classList.remove('abrir');

}

function fomatarCpf(input) {
    let cpf = input.value.replace(/\D/g, '');

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    input.value = cpf;
}

function modalRemoverFuncionario() {
    const modal = document.getElementById('janela-modal-remover');
    const checkboxes = document.querySelectorAll('.campo .checkbox-class');
    const names = document.querySelectorAll('.campo .nome');

    const modalContent = document.getElementById('funcionarios-para-remover');
    modalContent.innerHTML = '';

    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal-remover') {
            modal.classList.remove('abrir')
        }
    });


    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const name = names[index].textContent;
            const nameElement = document.createElement('p');
            nameElement.textContent = name;
            modalContent.appendChild(nameElement);
        }

    });

}

// Função para abrir a modal apenas se tiver pelo menos um funcionário com o check ativo

// document.addEventListener("DOMContentLoaded", function () {
//     const botaoRemover = document.getElementById('remover-funcionario');
//     const checkboxes = document.querySelectorAll('.checkbox-class');

//     botaoRemover.disabled = true;

//     function atualizarEstadoBotao() {
//         const algumaCheckboxMarcada = Array.from(checkboxes).some(checkbox => checkbox.checked);x
//         botaoRemover.disabled = !algumaCheckboxMarcada;
//     }

//     checkboxes.forEach(checkbox => {
//         checkbox.addEventListener('change', atualizarEstadoBotao);
//     });
// });


// Função para o botão de remover funcionário só estiver clicável se o checkbox da modal estiver ativo

document.addEventListener("DOMContentLoaded", function () {
    const botaoRemover = document.getElementById('button-modal');
    const checkbox = document.querySelector('.checkbox_confirmacao .checkbox-class');

    function atualizarEstadoBotao() {
        botaoRemover.disabled = !checkbox.checked;
    }

    checkbox.addEventListener('change', atualizarEstadoBotao);

    atualizarEstadoBotao();
});

function removerFuncionario() {
    const checkbox = document.querySelector('.checkbox_confirmacao .checkbox-class');
    const modal = document.getElementById('janela-modal-remover');
    const botaoRemover = document.getElementById('button-modal');
    const popup = document.getElementById('popup-remover');

    checkbox.checked = false;
    botaoRemover.disabled = true;

    console.log("Funcionário removido")
    modal.classList.remove('abrir');
    popup.style.display = "flex";

}

// CONEXÃO COM WEB-DATA-VIZ

function listarFuncionarios(idEmpresa) {
    if (!idEmpresa) {
        console.error('idEmpresa está undefined!');
        return;
    }

    fetch(`/equipe/listarFuncionarios/${idEmpresa}`, {
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
                    cargoSpan.innerText = funcionario.cargo;

                    div.appendChild(checkbox);
                    div.appendChild(img);
                    div.appendChild(nomeSpan);
                    div.appendChild(emailSpan);
                    div.appendChild(cargoSpan);

                    container.appendChild(div);
                });
            });
        })
        .catch(error => console.error('Erro ao listar funcionários:', error));
}

window.onload = function () {
    if (idEmpresa) {
        listarFuncionarios(idEmpresa);
    } else {
        console.error("idEmpresa está undefined no window.onload");
    }
}