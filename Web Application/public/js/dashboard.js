window.onload = function() {
  document.getElementById("b_usuario").innerHTML = `${sessionStorage.NOME_USUARIO}`;
};

const currentPath = window.location.pathname;

// Seleciona os botões do menu lateral
const dashboardButton = document.querySelector('.btn-dashboard');
const fazendaButton = document.querySelector('.btn-fazenda');
const equipeButton = document.querySelector('.btn-equipe');
const recomendacoesButton = document.querySelector('.btn-recomendacoes');
const contaButton = document.querySelector('.btn-conta');
const suporteButton = document.querySelector('.btn-suporte');

function setActiveButton(button) {
  if (button) {
    button.classList.add('active');
  }
}

if (currentPath.includes('dashboard.html') || currentPath.includes('dashProximaTela.html')) {
  setActiveButton(dashboardButton);
} else if (currentPath.includes('fazendas.html')) {
  setActiveButton(fazendaButton);
} else if (currentPath.includes('equipe.html')) {
  setActiveButton(equipeButton);
} else if (currentPath.includes('recomendacoes.html')) {
  setActiveButton(recomendacoesButton);
} else if (currentPath.includes('conta.html')) {
  setActiveButton(contaButton);
} else if (currentPath.includes('suporte.html')) {
  setActiveButton(suporteButton);
}
