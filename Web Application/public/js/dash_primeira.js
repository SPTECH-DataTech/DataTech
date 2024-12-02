function carregarGrafico() {
    const ano = document.getElementById("select-ano").value;  
    const tipoCafe = document.getElementById("select-cafe").value; 

    fetch("/dashboard/listarProducaoCafe", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            anoServer: ano,
            tipoCafeServer: tipoCafe
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erro ao buscar dados.");
        }
    })
    .then(data => {
        console.log("Dados recebidos:", data);
        if (data.length > 0) {
            const estados = data.map(item => item.estado);
            const cafePlantado = data.map(item => parseFloat(item.toneladasPlantadas)); 
            const cafeColhido = data.map(item => parseFloat(item.toneladasColhidas)); 

            console.log(estados, cafePlantado, cafeColhido);
            criarGrafico(estados, cafePlantado, cafeColhido);
        } else {
            alert("Não há dados para o ano e tipo de café selecionados.");
        }
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao buscar os dados da produção de café. O banco de dados não possui esse dado! Ano: " + ano + " ou o tipo de café: " + tipoCafe);
    });
}

function criarGrafico(estados, cafePlantado, cafeColhido) {
    const ctx = document.getElementById("graficoCafe").getContext("2d");

    new Chart(ctx, {
        type: "bar",
        data: {
            labels: estados,
            datasets: [
                {
                    label: "Café Plantado (Toneladas)",
                    data: cafePlantado,
                    backgroundColor: '#a56aec',
                    borderWidth: 1,
                    barThickness: 20
                },
                {
                    label: "Café Colhido (Toneladas)",
                    data: cafeColhido,
                    backgroundColor: '#6c81dd',
                    borderWidth: 1,
                    barThickness: 20
                }
            ]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: "top"
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    title: {
                        display: true,
                        text: "Toneladas"
                    }
                },
                x: {
                    stacked: false,
                    categoryPercentage: 100,
                    barPercentage: 0.5
                }
            },
            plugins: {
                title: {
                    display: true,
                    text: 'Produção de Café por Estado (Toneladas)'
                }
            }
        }
    });
}

function carregarMaiorEficiencia() {
    const ano = document.getElementById("select-ano").value;  
    const tipoCafe = document.getElementById("select-cafe").value; 

    fetch("/dashboard/obterMaiorEficiencia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            anoServer: ano,
            tipoCafeServer: tipoCafe
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erro ao buscar dados.");
        }
    })
    .then(data => {
        document.getElementById("estado_maior_eficiencia").textContent = data.estado;
        document.getElementById("quantidade_perdida_plantada_maior").textContent =  data.quantidadePerdida +  " / " + data.quantidadePlantada + " (t)";
        document.getElementById("maior_eficiencia_porcentagem_perdida").textContent = data.porcentagemPerda + "%";
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao buscar os dados da maior eficiência. O banco de dados não possui esse dado! Ano: " + ano + " ou o tipo de café: " + tipoCafe);
    });
}

function carregarMenorEficiencia() {
    const ano = document.getElementById("select-ano").value;  
    const tipoCafe = document.getElementById("select-cafe").value; 

    fetch("/dashboard/obterMenorEficiencia", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            anoServer: ano,
            tipoCafeServer: tipoCafe
        })
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erro ao buscar dados.");
        }
    })
    .then(data => {
        document.getElementById("estado_menor_eficiencia").textContent = data.estado;
        document.getElementById("quantidade_perdida_plantada_menor").textContent =  data.quantidadePerdida +  " / " + data.quantidadePlantada + " (t)";
        document.getElementById("menor_eficiencia_porcentagem_perdida").textContent = data.porcentagemPerda + "%";
      
    })
    .catch(error => {
        console.error("Erro:", error);
        alert("Erro ao buscar os dados da menor eficiência. O banco de dados não possui esse dado! Ano: " + ano + " ou o tipo de café: " + tipoCafe);
    });
}



document.getElementById("select-ano").addEventListener("change", carregarGrafico);
document.getElementById("select-cafe").addEventListener("change", carregarGrafico);

carregarGrafico();
carregarMaiorEficiencia(); 
carregarMenorEficiencia();