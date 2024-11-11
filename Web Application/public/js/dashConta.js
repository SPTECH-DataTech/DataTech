function modalAlterarSenha() {
    const modal = document.getElementById('janela-modal');
    modal.classList.add('abrir');

    // Fechar o modal quando clicar no botão de fechar
    const fechar = document.getElementById('fechar');
    fechar.addEventListener('click', () => {
        modal.classList.remove('abrir');
    });
}