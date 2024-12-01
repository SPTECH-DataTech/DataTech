let idFazenda = sessionStorage.FAZENDA;
let idEmpresa = sessionStorage.ID_EMPRESA;
let idMunicipio = sessionStorage.MUNICIPIO_FAZENDA;
let cargos;

function conultarNomeFazenda() {
    fetch('cargo/consultarFazenda', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idServer: idFazenda,
        })
    })
        .then(resposta => {
            resposta.json.then(data => {
                if (!resposta.ok) {
                    throw new Error(data.erro);
                }
                else {
                    console.log("Nome da fazenda: ", data);
                    document.getElementById("nome_fazenda1") = data;
                }
            })
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

    return false;
}

function listarCargos() {

    fetch('/cargo/listar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fazendaServer: idFazenda,
        }),
    })
        .then(resposta => {
            resposta.json().then(data => {

                if (!resposta.ok) {
                    throw new Error(data.erro);
                }
                else {
                    console.log("Resposta do servidor: ", data);
                    cargos = data;
                    setTimeout(exibirCargosNaTela(data), 3000);
                }
            })
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });
    return false;
}

function exibirCargosNaTela(data) {

    for (i = 0; i < cargos.length; i++) {
        const container = document.querySelector('.lista_cargos');
        container.innerHTML = '';

        data.forEach(cargo => {
            const div = document.createElement('div');
            div.classList.add('campo');

            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.classList.add('checkbox-class');
            checkbox.id = `check_cargo_${cargo.id}`
            checkbox.setAttribute('data-nome', cargo.nomeCargo);
            checkbox.setAttribute('data-permissao-cargos', cargo.permissaoCargos)
            checkbox.setAttribute('data-permissao-fazenda', cargo.permissaoFazendas)
            checkbox.setAttribute('data-permissao-funcionarios', cargo.permissaoFuncionarios)

            const nomeSpan = document.createElement('span');
            nomeSpan.classList.add('nome');
            nomeSpan.innerText = cargo.nomeCargo;

            const temPermissaoCargos = document.createElement('img');
            temPermissaoCargos.src = './assets/check-cargos.svg';
            temPermissaoCargos.alt = 'check icon';
            temPermissaoCargos.classList.add('check-permissao');

            const naoTemPermissaoCargos = document.createElement('img');
            naoTemPermissaoCargos.src = './assets/X-cargos.svg';
            naoTemPermissaoCargos.alt = 'check icon';
            naoTemPermissaoCargos.classList.add('check-permissao');

            const temPermissaoFazendas = document.createElement('img');
            temPermissaoFazendas.src = './assets/check-cargos.svg';
            temPermissaoFazendas.alt = 'check icon';
            temPermissaoFazendas.classList.add('check-permissao');

            const naoTemPermissaoFazendas = document.createElement('img');
            naoTemPermissaoFazendas.src = './assets/X-cargos.svg';
            naoTemPermissaoFazendas.alt = 'check icon';
            naoTemPermissaoFazendas.classList.add('check-permissao');

            const temPermissaoFuncionarios = document.createElement('img');
            temPermissaoFuncionarios.src = './assets/check-cargos.svg';
            temPermissaoFuncionarios.alt = 'check icon';
            temPermissaoFuncionarios.classList.add('check-permissao');

            const naoTemPermissaoFuncionarios = document.createElement('img');
            naoTemPermissaoFuncionarios.src = './assets/X-cargos.svg';
            naoTemPermissaoFuncionarios.alt = 'check icon';
            naoTemPermissaoFuncionarios.classList.add('check-permissao');

            div.appendChild(checkbox);
            div.appendChild(nomeSpan);

            if (cargo.permissaoCargos == 1) {
                div.appendChild(temPermissaoCargos);
            } else {
                div.appendChild(naoTemPermissaoCargos);
            }
            if (cargo.permissaoFazendas == 1) {
                div.appendChild(temPermissaoFazendas);
            } else {
                div.appendChild(naoTemPermissaoFazendas);

            }
            if (cargo.permissaoFuncionarios == 1) {
                div.appendChild(temPermissaoFuncionarios);
            } else {
                div.appendChild(naoTemPermissaoFuncionarios);
            }

            container.appendChild(div);

            checkbox.addEventListener('change', () => {
                var idCargo = checkbox.getAttribute('data-id');
                const nomeCargo = checkbox.getAttribute('data-nome');

                sessionStorage.setItem('ID_CARGO', idCargo);

                if (checkbox.checked) {
                    sessionStorage.setItem(`cargo_${idCargo}`, JSON.stringify({ id: idCargo, nome: nomeCargo }));
                } else {
                    sessionStorage.removeItem(`cargo_${idCargo}`);
                }

                console.log('Cargo atualizado no sessionStorage:', idCargo, nomeCargo);
            });

        });
    }
}

function procurarCargo() {
    const input = document.getElementById('input-search');
    const filter = input.value.toLowerCase();
    const funcionarios = document.querySelectorAll('.campo');

    funcionarios.forEach(cargo => {
        const nome = cargo.querySelector('.nome').innerText.toLowerCase();
        if (nome.startsWith(filter)) {
            cargo.style.display = '';
        } else {
            cargo.style.display = 'none';
        }
    });

    document.getElementById('input-search').addEventListener('keyup', procurarCargo);
}

function modalAdicionarCargo() {
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal') {
            modal.classList.remove('abrir')
        }
    });
}

function lerPermissoesSelecionadas() {
    let check_cargo = false;
    let fazenda = false;
    let funcionario = false;
    const nomeCargo = document.getElementById("input_nome_cargo").value.trim();
    const checkCargos = document.getElementById("check_permissao_cargos");
    const checkFazendas = document.getElementById("check_permissao_fazendas");
    const checkFuncionarios = document.getElementById("check_permissao_funcionarios");

    if (checkCargos.checked) {
        check_cargo = true;
    }

    if (checkFazendas.checked) {
        check_fazenda = true;
    }

    if (checkFuncionarios.checked) {
        check_funcionario = true;
    }
    adicionarCargo(nomeCargo, check_cargo, check_fazenda, check_funcionario);
}
function adicionarCargo(nomeCargo, check_cargo, check_fazenda, check_funcionario) {
    fetch('/cargo/adicionar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeCargoServer: nomeCargo,
            permissaoCargosServer: check_cargo,
            permissaoFazendasServer: check_fazenda,
            permissaoFuncionariosServer: check_funcionario,
            fazendaServer: idFazenda,
            empresaServer: idEmpresa,
            municipioServer: idMunicipio
        }),
    }).then(resposta => {
        resposta.json().then(data => {

            if (!resposta.ok) {
                throw new Error(data.erro);
            }
            else {
                console.log("Resposta do servidor: ", data)
            }
        })
    }).catch(function (erro) {
        console.log(`#ERRO: ${erro}`);
    })

    document.getElementById("janela-modal").style.display = 'none';
    location.reload();
    return false;
}

function modalRemoverCargo() {
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

function lerCargosSelecionados() {
    let listaIds = [];
    for (i = 0; i < cargos.length; i++) {
        let checkAtual = cargos[i].id;
        let idCheck = document.getElementById(`check_cargo_${checkAtual}`)
        if (idCheck.checked) {
            listaIds.push(checkAtual)
        }
    }
    removerCargo(listaIds)
}

function removerCargo(listaIds) {
    if (listaIds == null || listaIds == undefined || listaIds.length == 0) {
        console.log("Não foram selecionados cargos para remover");
    } else {
        fetch('/cargo/remover', {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                listarIdsServer: listaIds
            }),
        }).then(resposta => {
            resposta.json().then(data => {
                if (!resposta.ok) {
                    throw new Error(data.erro);
                }
                else {
                    console.log("Cargos removidos com sucesso");
                }
            })
        }).catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        });

        document.getElementById("janela-modal-remover").style.display = 'none';
        document.getElementById("modal-remover").style.display = 'none';
        location.reload();

        return false;
    }
}

function modalEditarCargo() {
    const modal = document.getElementById('janela-modal-editar');
    const checkboxes = document.querySelectorAll('.campo .checkbox-class');

    const checkboxesSelecionadas = Array.from(checkboxes).filter(checkbox => checkbox.checked);

    if (checkboxesSelecionadas.length === 0) {
        Swal.fire({
            icon: 'info',
            title: 'Atenção!',
            text: 'Selecione um cargo para editar',
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

    const nomeCargo = checkboxSelecionado.getAttribute('data-nome');

    document.getElementById('nome_cargo_editar').textContent = nomeCargo;

    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal-editar') {
            modal.classList.remove('abrir')
        }
    });
}

function editarCargo() {
    let cargoParaEditar;

    for (i = 0; i < cargos.length; i++) {
        let cargoAtual = document.getElementById(`check_cargo_${cargos[i].id}`);

        if (cargoAtual.checked) {
            cargoParaEditar = cargos[i];
        }
    }

    const checkPermissaoCargos = document.getElementById("check_permissao_cargos_editar");
    const checkPermissaoFazendas = document.getElementById("check_permissao_fazendas_editar");
    const checkPermissaoFuncionarios = document.getElementById("check_permissao_funcionarios_editar");

    let permissaoCargos = 0;
    let permissaoFazendas = 0;
    let permissaoFuncionarios = 0;

    if (checkPermissaoCargos.checked) {
        permissaoCargos = 1;
    }
    if (checkPermissaoFazendas.checked) {
        permissaoFazendas = 1;
    }
    if (checkPermissaoFuncionarios.checked) {
        permissaoFuncionarios = 1;
    }

    fetch('/cargo/editar', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            idServer: cargoParaEditar.id,
            nomeServer: document.getElementById("input_nome_cargo_editar").value.trim(),
            permissaoCargosServer: permissaoCargos,
            permissaoFazendasServer: permissaoFazendas,
            permissaoFuncionariosServer: permissaoFuncionarios,
            fazendaServer: idFazenda
        }),
    }).then(resposta => {
        resposta.json().then(data => {

            if (!resposta.ok) {
                throw new Error(data.erro);
            }
            else {
                console.log("cargo editado com sucesso" + cargoParaEditar)
            }
        })
    }).catch(function (erro) {
        console.log(`#ERRO: ${erro}`);
    })

    document.getElementById("janela-modal").style.display = 'none';
    location.reload();
    return false;
}

function verificarPermissoes() {
    let botoesEdicao = document.getElementById("botoes-add-remove");
    const permissaoCargos = parseInt(sessionStorage.PERMISSAO_CARGOS);
    if (permissaoCargos != 1) {
        botoesEdicao.style.display = 'none';
    }
}
