async function recuperarSenha(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    const email = formData.get('email');
    const errorMessage = document.getElementById('error-message');
    
    try {
        const response = await fetch('http://127.0.0.1:5000/recuperar-senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({ email: email })
        });

        const resultado = await response.json();
        
        if (response.ok) {
            alert('Um email de recuperação foi enviado para o seu endereço de email.');
            window.location.replace('login.html');
        } else {
            errorMessage.textContent = 'Email não encontrado no sistema.';
            errorMessage.classList.add('visible');
        }
    } catch (erro) {
        console.error('Erro completo:', erro);
        errorMessage.textContent = 'Erro ao conectar com o servidor. Tente novamente mais tarde.';
        errorMessage.classList.add('visible');
    }
} 