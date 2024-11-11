

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
    const tipoCafe = select_tipo_cafe.value;
    const estadoFazenda = select_estado_fazenda.value;
    const idEmpresa = sessionStorage.ID_EMPRESA;

    fetch('fazenda/adicionarFazenda', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nomeFazenda: nomeFazenda,
            tipoCafe: tipoCafe,
            estadoFazenda: estadoFazenda,
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

listarEstados();

function listarEstados() {
    fetch("/fazenda/listarEstados", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((fazenda) => {
                fazenda.forEach((fazendaEstado) => {
                    select_estado_fazenda.innerHTML += `<option value='${fazendaEstado.id}'>${fazendaEstado.estado}</option>`;
                });
            });
        })
        .catch(function (resposta) {
            console.log(`#ERRO: ${resposta}`);
        });
}


listarFazendas()
function listarFazendas() {
    let content = '';
    const container = document.getElementById('container');
    fetch("/fazenda/listarFazendas", {
        method: "GET",
    })
        .then(function (resposta) {
            resposta.json().then((fazendas) => {

                if (fazendas.length == 0) {
                    container.style.display = "block";
                    container.style.display = "flex";
                } else {
                    farmList.style.display = "block";
                    fazendas.forEach((fazenda) => {
                        content += `<div class="div-fazenda" id="div-fazenda">
                        <span class="nomeFazenda">Fazenda ${fazenda.nome} - ${fazenda.estado}</span>
                         
                        <span class="tipoFazenda">Café ${fazenda.tipoCafe}</span>
                        <img src="./assets/imgs/Group 413 (1).png" alt="" class="image-buttonn"> </div>`;
                    });

                    content += `<div class="adcionarFazenda" id="adcionarFazenda">
                            <img src="./assets/imgs/Group 413 (1).png" alt="" class="image-button">

                            <button class="botton-add-farm" onclick="openModal()"><img src="./assets/imgs/add (1).png" alt=""></button>
                        </div>`
                    document.getElementById('farmList').innerHTML = content;
                }
            })
                .catch(function (erro) {
                    console.log(`#ERRO: ${erro}`);
                });
        }
        )
}