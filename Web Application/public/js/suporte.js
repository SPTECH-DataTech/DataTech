async function enviarEmail(event) {
    event.preventDefault();
    const nameInput = document.querySelector('#name').value;
    const emailSESSION = sessionStorage.EMAIL_USUARIO
    const phoneInput = document.querySelector('#phone').value;
    const tipoProblemaInput = document.querySelector('#tipo').value;
    const messageInput = document.querySelector('#message').value;

    try {
        fetch('/enviarEmailSuporte', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                toName: nameInput,
                toEmail: emailSESSION,
                toPhone: phoneInput,
                toTipo: tipoProblemaInput,
                toMessage: messageInput,
            }),
        });

        Swal.fire({
            icon: 'sucess',
            title: 'Enviado!',
            html: 'Confira sua caixa de entrada!',
            confirmButtonText: 'OK',
            confirmButtonColor: "#20BF55",
        })
    } catch (error) {
        console.error('Erro ao enviar e-mail:', error);
        alert('Erro ao enviar e-mail.');
    }
}

function mascaraTelefone() {
    var phone = document.querySelector("#phone");

    phone.value = phone.value.replace(/\D+/g, '')
        .replace(/(\d{2})(\d)/, '($1) $2')
        .replace(/(\d{5})(\d)/, '$1-$2')
        .replace(/(-\d{4})\d+?$/, '$1')
}