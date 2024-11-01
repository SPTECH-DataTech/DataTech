function procurarFuncionario() {
    const input = document.getElementById('input-search');
    const filter = input.value.toLowerCase();
    const funcionarios = document.querySelectorAll('.campo');

    funcionarios.forEach(funcionario => {
        const nome = funcionario.querySelector('#nome').innerText.toLowerCase();
        if (nome.includes(filter)) {
            funcionario.style.display = ''; 
        } else {
            funcionario.style.display = 'none';
        }
    });

    document.getElementById('input-search').addEventListener('keyup', procurarFuncionario);
}

function fomatarCpf(input) {
    let cpf = input.value.replace(/\D/g, '');

    cpf = cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

    input.value = cpf;
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


function modalRemoverFuncionario() {
    const modal = document.getElementById('janela-modal-remover');
    modal.classList.add('abrir');

    modal.addEventListener('click', (e) => {
        if (e.target.id == 'fechar' || e.target.id == 'janela-modal-remover') {
            modal.classList.remove('abrir')
        }
    });

    const checkboxes = document.querySelectorAll('.campo .checkbox-class');
    const names = document.querySelectorAll('.campo .nome');

    const modalContent = document.getElementById('funcionarios-para-remover');
    modalContent.innerHTML = '';

    checkboxes.forEach((checkbox, index) => {
        if (checkbox.checked) {
            const name = names[index].textContent;
            const nameElement = document.createElement('p');
            nameElement.textContent = name;
            modalContent.appendChild(nameElement);
        }

    });

}

document.addEventListener("DOMContentLoaded", function() {
    const botaoRemover = document.getElementById('remover-funcionario');
    const checkboxes = document.querySelectorAll('.checkbox-class');

    botaoRemover.disabled = true; 

    function atualizarEstadoBotao() {
        const algumaCheckboxMarcada = Array.from(checkboxes).some(checkbox => checkbox.checked);
        botaoRemover.disabled = !algumaCheckboxMarcada; 
    }

    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', atualizarEstadoBotao);
    });
});