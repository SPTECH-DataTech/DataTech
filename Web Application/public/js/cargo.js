// let idFazenda = sessionStorage.ID_FAZENDA;
let idFazenda = 1;
let cargos;

function listarCargos() {

    fetch('/cargo/listar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            fazendaServer: 3
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
    document.getElementById("lista_cargos").innerHTML = "";

    console.log(cargos.length);

    for (i = 0; i < cargos.length; i++) {

        const checkCargoDaVez = document.querySelector(`#check_permissao_cargos_${data[i].id}`);
        const checkFazendaDaVez = document.querySelector(`#check_permissao_fazendas_${data[i].id}`);
        const checkFuncionarioDaVez = document.querySelector(`#check_permissao_funcionarios_${data[i].id}`);

        let checkadoCargo = "";
        let checkadoFazenda = "";
        let checkadoFuncionario = "";

        if (cargos[i].permissaoCargos == 1) {
            console.log("Esse funcionário ta podendo editar cargo");
            checkadoCargo = "checked";
            // checkCargoDaVez.checked = true;
        }
        if (cargos[i].permissaoFazenda == 1) {
            console.log("Esse funcionário ta podendo editar fazenda");
            checkadoFazenda = "checked";
            // checkFazendaDaVez.checked = true;
        }
        if (cargos[i].permissaoFuncionarios == 1) {
            console.log("Esse funcionário ta podendo editar funcionario");
            checkadoFuncionario = "checked";
            // checkFuncionarioDaVez.checked = true;
        }



        document.getElementById("lista_cargos").innerHTML += `
        <div class="cargo" id="${data[i].id}">
            <input type="checkbox" id="check_cargo_${data[i].id}">
            <div class="permissao">
                <h1 id="nome_cargo">${data[i].nomeCargo}</h1>
            </div>
            <div class="permissao">
                <input type="checkbox" id="check_permissao_cargos_${data[i].id} ${checkadoCargo}">
                <h1>Cargos</h1>
            </div>
            <div class="permissao">
                <input type="checkbox" id="check_permissao_fazendas_${data[i].id} ${checkadoFazenda}">
                <h1>Fazendas</h1>
            </div>
            <div class="permissao">
                <input type="checkbox" id="check_permissao_funcionarios_${data[i].id} ${checkadoFuncionario}">
                <h1>Funcionários</h1>
            </div>
        </div>
        `

       

        console.log(cargos[i].permissaoCargos);
        console.log(cargos[i].permissaoFazenda);
        console.log(cargos[i].permissaoFuncionario);

        console.log("--------------------");
        
        console.log(checkCargoDaVez);
        console.log(checkFazendaDaVez);
        console.log(checkFuncionarioDaVez);

    }
}

function abrirModalAdicionarCargo() {
    document.getElementById("modal_add_cargo").style.display = 'block';
    document.getElementById("formulario_add_cargo").style.display = 'block';
}

function lerPermissoesSelecionadas() {
    let cargo = false;
    let fazenda = false;
    let funcionario = false;
    const nomeCargo = document.getElementById("input_nome_cargo").value;
    const checkCargos = document.getElementById("check_permissao_cargos");
    const checkFazendas = document.getElementById("check_permissao_fazendas");
    const checkFuncionarios = document.getElementById("check_permissao_funcionarios");

    if (checkCargos.checked) {
        cargo = true;
    }

    if (checkFazendas.checked) {
        fazenda = true;
    }

    if (checkFuncionarios.checked) {
        funcionario = true;
    }
    adicionarCargo(nomeCargo, cargo, fazenda, funcionario);
}
function adicionarCargo(nomeCargo, cargo, fazenda, funcionario) {
    fetch('/cargo/adicionar', {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            nomeCargoServer: nomeCargo,
            permissaoCargosServer: cargo,
            permissaoFazendasServer: fazenda,
            permissaoFuncionariosServer: funcionario,
            fazendaServer: 3
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

    document.getElementById("modal_add_cargo").style.display = 'none';
    document.getElementById("formulario_add_cargo").style.display = 'none';

    listarCargos();
    return false;
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

        return false;
    }
}
