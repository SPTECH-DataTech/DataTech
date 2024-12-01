async function enviarEmail(event) {
    event.preventDefault();
    const nameInput = document.querySelector('#name').value;
    const emailSESSION = sessionStorage.EMAIL_USUARIO
    const phoneInput = document.querySelector('#phone').value;
    const tipoProblemaInput = document.querySelector('#tipo').value;
    const messageInput = document.querySelector('#message').value;

    try {
        const response = await fetch('/enviarEmailSuporte', {
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

        const message = await response.text();
        alert(message); 
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