var idFazenda = sessionStorage.ID_FAZENDA;
var nomeFazenda = sessionStorage.NOME_FAZENDA;
var idFuncionario = sessionStorage.ID_FUNCIONARIO;
var nomeUsuario = sessionStorage.NOME_USUARIO;
var idUsuario = sessionStorage.ID_USUARIO;
var idEmpresa = sessionStorage.ID_EMPRESA;
var cpfSessionStorage = sessionStorage.CPF_USUARIO;

nome_fazenda1.innerHTML = `${nomeFazenda}`;
nome_fazenda2.innerHTML = `${nomeFazenda}`;
b_usuario.innerHTML = `${nomeUsuario}`;

gerenciarPermissoes()
function gerenciarPermissoes(){
    if (sessionStorage.permissaoFuncionarios == 0){
        document.getElementById("botoes").style.display = 'none';
        document.getElementById("input-search").style.height = '40px';

        const checkboxes = document.querySelectorAll('.checkbox-class');

        checkboxes.forEach(checkbox => {
            checkbox.style.display = 'none';
        })
    }
}

function listarFuncionarios() {
    fetch(`/equipe/listarFuncionarios/${idFazenda}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(function (resposta) {
            resposta.json().then((dados) => {
                const container = document.querySelector('.funcionarios');
                container.innerHTML = ''; 

                dados.forEach(funcionario => {
                    const div = document.createElement('div');
                    div.classList.add('campo');


                    if (sessionStorage.permissaoFuncionarios != 0) {
                        const checkbox = document.createElement('input');
                        checkbox.type = 'checkbox';
                        checkbox.classList.add('checkbox-class');
                        checkbox.setAttribute('data-id', funcionario.id);
                        checkbox.setAttribute('data-nome', funcionario.nome);
                        checkbox.setAttribute('data-email', funcionario.email);
                        checkbox.setAttribute('data-cargo', funcionario.nomeCargo);

                        checkbox.addEventListener('change', () => {
                            const idFuncionario = checkbox.getAttribute('data-id');
                            const nomeFuncionario = checkbox.getAttribute('data-nome');

                            sessionStorage.setItem('ID_FUNCIONARIO', idFuncionario);

                            if (checkbox.checked) {
                                sessionStorage.setItem(`funcionario_${idFuncionario}`, JSON.stringify({ id: idFuncionario, nome: nomeFuncionario }));
                            } else {
                                sessionStorage.removeItem(`funcionario_${idFuncionario}`);
                            }

                            console.log('Funcionário atualizado no sessionStorage:', idFuncionario, nomeFuncionario);
                        });

                        div.appendChild(checkbox);
                    }

                    const nomeSpan = document.createElement('span');
                    nomeSpan.classList.add('nome');
                    nomeSpan.innerText = funcionario.nome;

                    const emailSpan = document.createElement('span');
                    emailSpan.classList.add('email');
                    emailSpan.innerText = funcionario.email;

                    const cargoSpan = document.createElement('span');
                    cargoSpan.classList.add('cargo');

                    if (funcionario.nomeCargo == undefined) {
                        cargoSpan.innerText = funcionario.nomeCargo;   
                    } else {
                        cargoSpan.innerText = "";
                    }

                    div.appendChild(checkbox);
                    div.appendChild(img);

                    div.appendChild(nomeSpan);
                    div.appendChild(emailSpan);
                    div.appendChild(cargoSpan);

                    container.appendChild(div);

                    checkbox.addEventListener('change', () => {
                        var idFuncionario = checkbox.getAttribute('data-id');
                        const nomeFuncionario = checkbox.getAttribute('data-nome');

                        sessionStorage.setItem('ID_FUNCIONARIO', idFuncionario);

                        if (checkbox.checked) {
                            sessionStorage.setItem(`funcionario_${idFuncionario}`, JSON.stringify({ id: idFuncionario, nome: nomeFuncionario }));
                        } else {
                            sessionStorage.removeItem(`funcionario_${idFuncionario}`);
                        }

                        console.log('Funcionário atualizado no sessionStorage:', idFuncionario, nomeFuncionario);
                    });

                });
                verificarPermissoes();
            });
        })
        .catch(error => console.error('Erro ao listar funcionários:', error));
}


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

    if (cpf != cpfSessionStorage) {

        fetch(`equipe/adicionar/${idFazenda}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                idCargoServer: idCargo,
                idEmpresaServer: idEmpresa,
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
    
                        Swal.fire({
                            title: 'Funcionário Adicionado',
                            text: 'Avise para alterar a senha!',
                            icon: 'success',
                            confirmButtonText: 'OK',
                            confirmButtonColor: "#20BF55",
                            didOpen: () => {
                                document.querySelector('.menu-lateral').classList.add('ajuste-modal');
                            },
                            willClose: () => {
                                document.querySelector('.menu-lateral').classList.remove('ajuste-modal');
                            }
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

    } else {

    fetch(`equipe/editarExistente/${idUsuario}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idCargoServer: idCargo,
            idFazendaServer: idFazenda,
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

                    Swal.fire({
                        icon: 'info',
                        title: 'Funcionário Editado!',
                        text: 'Fucionário já existente, editamos seu cargo e sua fazenda!',
                        confirmButtonText: 'OK',
                        confirmButtonColor: "#20BF55",
                        didOpen: () => {
                            document.querySelector('.menu-lateral').classList.add('ajuste-modal');
                        },
                        willClose: () => {
                            document.querySelector('.menu-lateral').classList.remove('ajuste-modal');
                        }
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
    const funcionariosParaRemover = [];

    const algumSelecionado = Array.from(checkboxes).some(checkbox => checkbox.checked);
    if (!algumSelecionado) {
        Swal.fire({
            icon: 'info',
            title: 'Atenção!',
            html: 'Selecione pelo menos <b>um</b> funcionário para remover',
            confirmButtonText: 'OK',
            confirmButtonColor: "#20BF55",
            didOpen: () => {
                document.querySelector('.menu-lateral').classList.add('ajuste-modal');
            },
            willClose: () => {
                document.querySelector('.menu-lateral').classList.remove('ajuste-modal');
            }
        })
    } else {

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
    const checkboxes = document.querySelectorAll('.campo .checkbox-class');

    const checkboxesSelecionadas = Array.from(checkboxes).filter(checkbox => checkbox.checked);

    if (checkboxesSelecionadas.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Atenção!',
            text: 'Selecione um funcionário para editar',
            confirmButtonText: 'OK',
            confirmButtonColor: "#20BF55",
            didOpen: () => {
                document.querySelector('.menu-lateral').classList.add('ajuste-modal');
            },
            willClose: () => {
                document.querySelector('.menu-lateral').classList.remove('ajuste-modal');
            }
        })
        return;
    } else if (checkboxesSelecionadas.length !== 1) {
        Swal.fire({
            icon: 'info',
            title: 'Atenção!',
            html: 'Selecione apenas <b>um</b> funcionário para editar',
            confirmButtonText: 'OK',
            confirmButtonColor: "#20BF55",
            didOpen: () => {
                document.querySelector('.menu-lateral').classList.add('ajuste-modal');
            },
            willClose: () => {
                document.querySelector('.menu-lateral').classList.remove('ajuste-modal');
            }
        })
        return;
    }

    const checkboxSelecionado = checkboxesSelecionadas[0];

    const funcionario = {
        nome: checkboxSelecionado.getAttribute('data-nome'),
        email: checkboxSelecionado.getAttribute('data-email'),
        cargo: checkboxSelecionado.getAttribute('data-cargo'),
    };

    document.getElementById('nome_usuario_editar').textContent = funcionario.nome;
    document.getElementById('input_nome_editar').value = funcionario.nome;
    document.getElementById('input_email_editar').value = funcionario.email;
    document.getElementById('select_cargos_editar').value = '';

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
    let cargos = select_cargos_editar.value;

    let erroNome = nome.length <= 1;
    let erroNomeComNumeros = false;
    let erroEmail = email.indexOf("@") < 0 || email.lastIndexOf(".") < email.indexOf("@") || email.lastIndexOf(".") == email.length;
    let erroCargos = cargos == "#";
    let erroEncontrado = false;

    input_nome_editar.addEventListener("input", function () {
        removerErros(erro_nome_editar, input_nome_editar, spanNomeEditar);
    });

    input_email_editar.addEventListener("input", function () {
        removerErros(erro_email_editar, input_email_editar, spanEmailEditar);
    });

    select_cargos_editar.addEventListener("change", function () {
        removerErros(erro_cargo_editar, select_cargos_editar, spanCargoEditar);
    });

    if (nome == "" || email == "" || cargos == "") {
        alert("Preencha todos os campos para continuar!")
        return;

    } else if (erroNome) {

        erro_nome_editar.innerHTML = "Nome inválido!";
        erro_nome_editar.style.display = "block";
        input_nome_editar.classList.add("input-erro");
        spanNomeEditar.style.color = "red";
        input_nome_editar.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroNomeComNumeros) {

        erro_nome_editar.innerText = "Nome inválido!";
        erro_nome_editar.style.display = "block";
        input_nome_editar.classList.add("input-erro");
        erroEncontrado = true;

    } else if (erroEmail) {

        erro_email_editar.innerText = "E-mail inválido!";
        erro_email_editar.style.display = "block";
        input_email_editar.classList.add("input-erro");
        spanEmailEditar.style.color = "red";
        input_email_editar.style.borderColor = "red";
        erroEncontrado = true;

    } else if (erroCargos) {

        erro_cargo_editar.innerHTML = "Selecione algum cargo"
        erro_cargo_editar.style.display = "block"
        select_cargos_editar.classList.add("input-erro");
        spanCargoEditar.style.color = "red";
        select_cargos_editar.style.borderColor = "red";
        erroEncontrado = true;
    }

    if (erroEncontrado) {
        return;
    }

    const idFuncionario = sessionStorage.getItem("ID_FUNCIONARIO");

    const idCargo = select_cargos_editar.value;

    fetch(`equipe/editar/${idFuncionario}`, {
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

                    Swal.fire({
                        title: 'Funcionário Editado!',
                        text: 'Avise sobre as alterações',
                        icon: 'success',
                        confirmButtonText: 'OK',
                        confirmButtonColor: "#20BF55",
                        didOpen: () => {
                            document.querySelector('.menu-lateral').classList.add('ajuste-modal');
                        },
                        willClose: () => {
                            document.querySelector('.menu-lateral').classList.remove('ajuste-modal');
                        }
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


function excluir() {
    const checkboxes = document.querySelectorAll('.campo .checkbox-class:checked');
    const idsFuncionarios = Array.from(checkboxes).map(checkbox => checkbox.getAttribute('data-id'));

    Swal.fire({
        icon: "warning",
        title: "Tem certeza?",
        text: "Essa ação não poderá ser revertida",
        showCancelButton: true,
        confirmButtonColor: "#20BF55",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sim",
        cancelButtonText: "Cancelar",
        didOpen: () => {
            document.querySelector('.menu-lateral').classList.add('ajuste-modal');
        },
        willClose: () => {
            document.querySelector('.menu-lateral').classList.remove('ajuste-modal');
        }
    }).then((result) => {
        if (result.isConfirmed) {
            idsFuncionarios.forEach(idFuncionario => {
                fetch(`/equipe/excluir/${idFuncionario}`, {
                    method: 'DELETE',
                })
                    .then(response => {
                        if (response.ok) {
                            Swal.fire({
                                title: "Funcionário removido!",
                                icon: "success",
                                confirmButtonText: "Ok",
                                didOpen: () => {
                                    document.querySelector('.menu-lateral').classList.add('ajuste-modal');
                                },
                                willClose: () => {
                                    document.querySelector('.menu-lateral').classList.remove('ajuste-modal');
                                }
                            }).then(() => {
                                location.reload();
                            });
                            console.log(`Funcionário ${idFuncionario} removido com sucesso`);
                        } else {
                            console.error(`Erro ao remover o funcionário ${idFuncionario}:`, response.status);
                        }
                    })
                    .catch(error => console.error('Erro ao remover funcionário:', error));
            });
        } else {
            console.log("Ação de exclusão cancelada.");
        }
    });
}



window.onload = function () {
    listarFuncionarios();
    carregarCargos();
}

window.addEventListener("load", function () {
    sessionStorage.removeItem("ID_FUNCIONARIO");

    for (let key in sessionStorage) {
        if (key.startsWith("funcionario_")) {
            sessionStorage.removeItem(key);
        }
    }
});

function verificarPermissoes() {
    let botoesEdicao = document.getElementById("botoes-add-remove");
    const permissaoFazendas = parseInt(sessionStorage.PERMISSAO_FUNCIONARIOS);
    if (permissaoFazendas != 1) {
        botoesEdicao.style.display = "none";
        return;
    }
    botoesEdicao.style.display = 'flex';
}