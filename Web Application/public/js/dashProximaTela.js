function obterDadosGrafico() {

    // if (proximaAtualizacao != undefined) {

    //     clearTimeout(proximaAtualizacao);
    // }

    fetch(`/dash2/pegarDadosArabicaVsRobusta`, { cache: 'no-store' }).then(function (response) {
        if (response.ok) {
            response.json().then(function (resposta) {
                console.log(`Dados recebidos: ${JSON.stringify(resposta)}`);
                resposta.reverse();

                plotarGrafico(resposta);

            });
        } else {
            console.error('Nenhum dado encontrado ou erro na API');
        }
    })
        .catch(function (error) {
            console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
        });

}

function plotarGrafico(resposta) {

    console.log('iniciando plotagem do gráfico...');

    let labels = [resposta.estado];

    let dados = {
        labels: labels,
        datasets: [{
            label: [resposta.nome],
            data: [resposta.toneladasColhidas],
            backgroundColor: '#46351e', // Cor para o plantio
            borderWidth: 1,
            barThickness: 20 // Define a espessura da barra (ajuste conforme necessário)
        },
        {
            label: [resposta.nome],
            data: [resposta.toneladasColhidas],
            backgroundColor: '#E0D5BA', // Cor para o plantio
            borderWidth: 1,
            barThickness: 20 // Define a espessura da barra (ajuste conforme necessário)
        }
        ]
    };

    console.log('----------------------------------------------')
    console.log('Estes dados foram recebidos pela funcao "obterDadosGrafico" e passados para "plotarGrafico":')
    console.log(resposta)

    for (i = 0; i < resposta.length; i++) {
        var registro = resposta[i];
        labels.push(registro.estado);
        dados.datasets[0].data.push(registro.toneladasColhidas);
    }

    console.log('----------------------------------------------')
    console.log('O gráfico será plotado com os respectivos valores:')
    console.log('Labels:')
    console.log(labels)
    console.log('Dados:')
    console.log(dados.datasets)
    console.log('----------------------------------------------')

    const config = {
        type: 'bar',
        data: dados,
        options: {
            scales: {
                y: {
                    beginAtZero: false, // Inicia o eixo Y em 0
                    title: {
                        display: true,
                        text: 'Toneladas'
                    }
                },
                x: {
                    stacked: false, // Configura para não empilhar as barras
                    categoryPercentage: 100, // Ajuste para controlar o espaço das categorias
                    barPercentage: 0.5 // Ajuste para controlar o espaço das barras
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Produção de Café por Estado (Toneladas)'
                }
            }
        }
    };

    // Adicionando gráfico criado em div na tela
    let myChart = new Chart(
        document.getElementById(`graficoCafe`),
        config
    );

}

// function mostrarValoresKpi() {

//     fetch(`/medidas/pegarValoresKpi`, { cache: 'no-store' }).then(function (response) {
//         if (response.ok) {
//             response.json().then(json => {
//                 console.log(`Dados recebidos: ${JSON.stringify(json)}`);

//                 const funcao = json.funcao[0].funcao;
//                 const qtdFuncao = json.funcao[0].contador;

//                 const personagem = json.personagem[0].nome;
//                 const qtdPersonagem = json.personagem[0].total;

//                 kpi_FuncaoMaisEscolhida.innerHTML = `
//                 <span class="tituloKpi">Função mais escolhida</span>
//                 <div class="card"
//                 style="background-image: url('./assets/${funcao.trim()}_icon.png'); background-size: 85%; background-position: 50% 10%;">
//                 <span>${funcao.toUpperCase()}</span>
//             </div>
//             <span>Escolhida <span class="quantidade">${qtdFuncao}</span> vezes!</span>`;

//                 for (let contador = 0; contador < listaNomesPersonagens.length; contador++) {

//                     if (listaNomesPersonagens[contador] == personagem) {


//                         kpi_PersonagemMaisEscolhido.innerHTML = `<span class="tituloKpi">Personagem mais escolhido</span>
//             <div class="card" style="background-image: url('${listaImagensPersonagens[contador]}');">
//                 <span>${personagem.toUpperCase()}</span>
//             </div>
//             <span>Escolhido <span class="quantidade">${qtdPersonagem}</span> vezes!</span>`;

//                         break;

//                     }

//                 }

//             });
//         } else {
//             console.error('Nenhum dado encontrado ou erro na API');
//         }
//     })
//         .catch(function (error) {
//             console.error(`Erro na obtenção dos dados p/ gráfico: ${error.message}`);
//         });

// }
