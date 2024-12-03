window.onload = function() {
    document.getElementById("b_usuario").innerHTML = `${sessionStorage.NOME_USUARIO}`;
};
document.getElementById("name_empresa").innerHTML = `${sessionStorage.NOME_EMPRESA}`;