
window.onload = function() {
    select_estado_fazenda.value = sessionStorage.NOME_ESTADO_FAZENDA;
    select_municipio_fazenda.value = sessionStorage.MUNICIPIO_FAZENDA;
    input_nome_fazenda.value = sessionStorage.NOME_FAZENDA;
    select_tipo_cafe.value = sessionStorage.TIPO_CAFE_FAZENDA;
    b_usuario.innerHTML = sessionStorage.NOME_USUARIO;
    };


let listaEstadoMunicipio = [];
listarEstados(); 
function listarEstados() {
    fetch("/fazenda/listarEstadosUnicos", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((fazenda) => {
                console.log('Lista de Estados: ', fazenda);
        
                fazenda.forEach((estadosUnico) => {
                    select_estado_fazenda.innerHTML += `<option value='${estadosUnico.idUf}'>${estadosUnico.estado}</option>`;
                });

                select_estado_fazenda.value = sessionStorage.ESTADO_FAZENDA;
                var estado = sessionStorage.ESTADO_FAZENDA;
                listarMunicipios(estado);
            });

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

const botton = document.getElementById('button-editar');
botton.addEventListener('click', function () {
    select_estado_fazenda.disabled = false;
    select_municipio_fazenda.disabled = false;
    select_tipo_cafe.disabled = false;
    input_nome_fazenda.disabled = false;

    const button = document.getElementById('button-editar');
    button.textContent = 'Enviar';

    button.addEventListener('click', function () {
        editarFazenda();
    });
});

function habilitarMensagem(mensagem) {
    const p = document.getElementById('message');
    p.style.display = "block"
    p.innerHTML = mensagem;
}

function ocultarMensagem() {
    const p = document.getElementById('message');
    p.style.display = "none";
}

function removerFazenda() {
    const idFazenda = sessionStorage.ID_FAZENDA;

    fetch('fazenda/removerFazenda', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idFazenda: idFazenda,
            idEmpresa: sessionStorage.ID_EMPRESA,
            idEstadoMunicipio: sessionStorage.MUNICIPIO_FAZENDA
        }),
    })
        .then(function (resposta) {
            return resposta.json().then(data => {
                console.log("Resposta do servidor: ", data);

                if (!resposta.ok) {
                    throw new Error(data.erro);
                }
                else {
                    habilitarMensagem(data.message);

                    setTimeout(() => {
                        window.location = "fazendas.html";
                    }, 2000);
                }
            });
        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
            habilitarMensagem(erro.message);
        });

    return false;
}

const equipe = document.getElementById('card-cargos');
equipe.addEventListener('click', function () {
    window.location.href = "equipe.html";
});

const cargos = document.getElementById('card-equipe');
cargos.addEventListener('click', function () {
    window.location.href = "cargos.html";
});

function editarFazenda() {
    const nomeFazenda = document.getElementById('input_nome_fazenda').value;
    const tipoCafe = document.getElementById('select_tipo_cafe').value;
    const estadoFazenda = sessionStorage.ID_ESTADO;
    const idFazenda = sessionStorage.ID_FAZENDA;
    const idEstado = select_estado_fazenda.value;
    const idMunicipio = select_municipio_fazenda.value;

    fetch('fazenda/editarFazenda', {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            idFazenda: idFazenda,
            tipoCafe: tipoCafe,
            estadoMunicipio: idMunicipio,
            nomeFazenda: nomeFazenda
        }),
    })
        .then(function (resposta) {
            return resposta.json().then(data => {
                console.log("Resposta do servidor: ", data);

                if (!resposta.ok) {
                    throw new Error(data.erro);
                }
                else {
                    habilitarMensagem(data.message);
                    bloquearCampos();
                    sessionStorage.setItem('TIPO_CAFE_FAZENDA', tipoCafe);
                    sessionStorage.setItem('ESTADO_FAZENDA', idEstado);
                    sessionStorage.setItem('MUNICIPIO_FAZENDA', idMunicipio);
                    sessionStorage.setItem('NOME_FAZENDA', nomeFazenda);

                }
                setTimeout(() => {
                    ocultarMensagem();
                }, 2000)
            });

        })
        .catch(function (erro) {
            console.log(`#ERRO: ${erro}`);
        }).finally(() => {
            select_tipo_cafe.value = sessionStorage.TIPO_CAFE_FAZENDA;
            select_estado_fazenda.value = sessionStorage.ESTADO_FAZENDA;
            select_municipio_fazenda.value = sessionStorage.MUNICIPIO_FAZENDA;
            input_nome_fazenda.value = sessionStorage.NOME_FAZENDA;
        });

    return false;
}
function buscarIdPorEstadoMunicipio(estado, municipio) {
    const resultado = listaEstadoMunicipio.find(item =>
        item.idUf == estado && item.id == municipio
    );

    if (resultado) {
        console.log("ID encontrado:", resultado.id);
        return resultado.id;
    } else {
        console.log("Estado e município não encontrados.");
        return null;
    }
}

function bloquearCampos() {
    const nomeFazenda = document.getElementById('input_nome_fazenda');
    const tipoCafe = document.getElementById('select_tipo_cafe');
    const estadoFazenda = document.getElementById('select_estado_fazenda');
    const municipioFazenda = document.getElementById('select_municipio_fazenda');

    nomeFazenda.disabled = true;
    tipoCafe.disabled = true;
    estadoFazenda.disabled = true;
    municipioFazenda.disabled = true;

    const buttonEditar = document.getElementById("button-editar");
    buttonEditar.innerHTML = "Editar";
}

listarTipoCafe();
function listarTipoCafe() {
    fetch("/fazenda/listarTipoCafe", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((fazenda) => {
                console.log('Tipo Cafe:', fazenda)
                fazenda.forEach((fazendaTipoCafe) => {
                    select_tipo_cafe.innerHTML += `<option value='${fazendaTipoCafe.id}'>${fazendaTipoCafe.nome}</option>`
                });
                select_tipo_cafe.value = sessionStorage.TIPO_CAFE_FAZENDA;
            });

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

select_estado_fazenda.addEventListener('change', function (e) {
    const estadoSelecionado = e.target.value;

    listarMunicipios(estadoSelecionado)
});

function listarMunicipios(estadoSelecionado) {
    select_municipio_fazenda.innerHTML = "<option value='#'>Selecione o município</option>";

    fetch(`/fazenda/listarMunicipios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body:JSON.stringify({
            estado: estadoSelecionado
        })
    })
        .then(function (resposta) {
            resposta.json().then((fazenda) => {
                console.log('Lista de Municipios: ', fazenda)
                fazenda.forEach((fazendaMunicipio) => {
                    select_municipio_fazenda.innerHTML += `<option value='${fazendaMunicipio.id}'>${fazendaMunicipio.municipio}</option>`
                });
                select_municipio_fazenda.value = sessionStorage.MUNICIPIO_FAZENDA;
            });
           
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}
