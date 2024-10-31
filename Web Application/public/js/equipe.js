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