

function openModal() {
    document.getElementById('modal-fazenda').style.display = 'block';
    document.getElementById('modal-overlay').style.display = 'block';
    document.getElementById('modal-fazenda').style.opacity = 1;
    document.getElementById('modal-fazenda').style.zIndex = 1000;
}

function closeModal() {
    document.getElementById('modal-fazenda').style.display = 'none';
    document.getElementById('modal-overlay').style.display = 'none';
}

const closeBtn = document.getElementById('close-btn');
closeBtn.onclick = closeModal;


function habilitarMensagem(mensagem) {
    const p = document.getElementById('message');
    p.style.display = "block"
    p.innerHTML = mensagem;
}

function ocultarMensagem() {
    const p = document.getElementById('message');
    p.style.display = "none"
}

function adicionarFazenda() {
    const nomeFazenda = input_nome_fazenda.value;
    const inputTipoCafe = select_tipo_cafe.value;
    const idEmpresa = sessionStorage.ID_EMPRESA;
    const idEstado = select_estado_fazenda.value;
    const idMunicipio = select_municipio_fazenda.value;
    let tipoCafe;
    const estadoMunicipio = buscarIdPorEstadoMunicipio(idEstado, idMunicipio);

    console.log(idEstado, idMunicipio);

    if (!estadoMunicipio) {
        return false;
    }

    if (inputTipoCafe) {
        tipoCafe = 1;
    } else {
        tipoCafe = 2;
    }

    fetch('fazenda/adicionarFazenda', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeFazenda: nomeFazenda,
            tipoCafe: tipoCafe,
            estadoMunicipio: estadoMunicipio,
            idEmpresa: idEmpresa
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
                        listarFazendas();
                        closeModal();
                        limparCampos();
                        mudarTela();
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

function mudarTela() {
    document.getElementById('container').style.display = "none";
    document.getElementById('farmList').style.display = "block";
}

function limparCampos() {
    input_nome_fazenda.value = '';
    select_tipo_cafe.value = '';
    select_estado_fazenda.value = '';
    message.innerHTML = '';
}
window.listaEstadoMunicipio = [];
listarEstados();
function listarEstados() {
    fetch("/fazenda/listarEstados", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((fazenda) => {
                const estadosUnicos = new Set();

                fazenda.forEach((fazendaEstado) => {
                    estadosUnicos.add(fazendaEstado.estado);
                });

                estadosUnicos.forEach((estadosUnico) => {
                    const estado = fazenda.find(item => item.estado == estadosUnico);
                    select_estado_fazenda.innerHTML += `<option value='${estado.idUf}'>${estado.estado}</option>`;
                });

                listaEstadoMunicipio = fazenda;
                console.log('Lista de Estados e Municípios:\n', listaEstadoMunicipio);

            });

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}

listarTipoCafe()
function listarTipoCafe() {
    fetch("/fazenda/listarTipoCafe", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((fazenda) => {
                fazenda.forEach((fazendaTipoCafe) => {
                    select_tipo_cafe.innerHTML += `<option value='${fazendaTipoCafe.id}'>${fazendaTipoCafe.nome}</option>`
                });
            });

        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}


function buscarIdPorEstadoMunicipio(estado, municipio) {
    const resultado = listaEstadoMunicipio.find(item =>
                                                
        item.idUf == estado || item.idMunicipio == municipio

    );

    if (resultado) {
        console.log("ID encontrado:", resultado.id);
        return resultado.id;
    } else {
        console.log("Estado e município não encontrados.");
        return null;
    }
}

function listarFazendas() {
    let content = '';
    const container = document.getElementById('container');

    let empresa = sessionStorage.ID_EMPRESA;
    fetch("/fazenda/listarFazendas", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            empresaServer: empresa
        }),
    })
        .then(function (resposta) {
            resposta.json().then((fazendas) => {
                if (fazendas.length == 0) {
                    container.style.display = "block";
                    container.style.display = "flex";
                } else {
                    farmList.style.display = "block";
                    console.log('Lista de fazendas: ', fazendas);
                    
                    fazendas.forEach((fazenda) => {

                        content += `<div class="div-fazenda" id="div-fazenda"
                        data-fazenda-id=${fazenda.id} data-fazenda-nome=${fazenda.nome} data-fazenda-estado=${fazenda.estado}
                        data-fazenda-municipio=${fazenda.municipio}
                        data-fazenda-estado-id=${fazenda.estado_id}
                        data-fazenda-tipo-cafe=${fazenda.fkTipoCafe}
                        data-fazenda-municipio-id=${fazenda.estado_municipio_id}
                        > 
                        <span class="nomeFazenda">Fazenda ${fazenda.nome} - ${fazenda.estado}</span>
                        <span class="tipoFazenda">Café ${fazenda.tipo_cafe_nome}</span>
                        <img src="./assets/imgs/Group 413 (1).png" alt="" class="image-buttonn"> </div>`;
                    });

                    content += `<div class="adcionarFazenda" id="adcionarFazenda">
                                <img src="./assets/imgs/Group 413 (1).png" alt="" class="image-button">
                                <button class="botton-add-farm" onclick="openModal()"><img src="./assets/imgs/add (1).png" alt=""></button>
                                </div>`

                    document.getElementById('farmList').innerHTML = content;

                    const fazendasDivs = document.querySelectorAll('.div-fazenda');

                    fazendasDivs.forEach((div) => {
                        div.addEventListener('click', function () {
                            window.location.href = "fazendasProximaTela.html";
                        });
                    });

                    fazendasDivs.forEach((div) => {
                        div.addEventListener('click', function () {
                            const idFazenda = div.getAttribute('data-fazenda-id');
                            const nomeFazenda = div.getAttribute('data-fazenda-nome');
                            const nomeEstadoFazenda = div.getAttribute('data-fazenda-estado');
                            const nomeMucipioFazenda = div.getAttribute('data-fazenda-municipio');
                            const tipoCafeFazenda = div.getAttribute('data-fazenda-tipo-cafe');
                            const estadoFazenda = div.getAttribute('data-fazenda-estado-id');
                            const municipioFazenda = div.getAttribute('data-fazenda-municipio-id');

                            sessionStorage.setItem('ID_FAZENDA', idFazenda);
                            sessionStorage.setItem('NOME_FAZENDA', nomeFazenda);
                            sessionStorage.setItem('TIPO_CAFE_FAZENDA', tipoCafeFazenda);
                            sessionStorage.setItem('ESTADO_FAZENDA', estadoFazenda);
                            sessionStorage.setItem('MUNICIPIO_FAZENDA', municipioFazenda);


                        });
                    });
                    verificarPermissoes();
                }
            })
                .catch(function (erro) {
                    console.log(`#ERRO: ${erro}`);
                });
        })
}


select_estado_fazenda.addEventListener('change', function (e) {
    const estadoSelecionado = e.target.value;
    const select_municipio = document.getElementById('select_municipio_fazenda');

    select_municipio.innerHTML = "<option value='#'>Selecione o município</option>";

    if (estadoSelecionado !== "#") {
        select_municipio.disabled = false;
        const municipiosFiltrados = listaEstadoMunicipio.filter(item => item.idUf == estadoSelecionado);

        municipiosFiltrados.forEach(item => {
            select_municipio.innerHTML += `<option value='${item.id}'>${item.municipio}</option>`;
        });
    } else {

        select_municipio.innerHTML = "<option value='#'>Selecione o município</option>";
    }
});

function verificarPermissoes() {
    let botoesEdicao = document.getElementById("adcionarFazenda");
    const permissaoFazendas = parseInt(sessionStorage.PERMISSAO_FAZENDAS);
    if (permissaoFazendas != 1) {
        botoesEdicao.style.display = "none";
        return;
    }
    botoesEdicao.style.display = 'flex';
}

