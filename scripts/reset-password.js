function toggleSenha() {
    const senhaInput = document.getElementById('senha');
    const confirmarSenhaInput = document.getElementById('confirmar_senha');
    const mostrarSenha = document.getElementById('mostrar-senha');
    
    if (mostrarSenha.checked) {
        senhaInput.type = 'text';
        confirmarSenhaInput.type = 'text';
    } else {
        senhaInput.type = 'password';
        confirmarSenhaInput.type = 'password';
    }
}

async function resetarSenha(event) {
    event.preventDefault();
    
    const form = event.target;
    const senha = form.senha.value;
    const confirmarSenha = form.confirmar_senha.value;
    const errorMessage = document.getElementById('error-message');
    
    // Verificar se as senhas são iguais
    if (senha !== confirmarSenha) {
        errorMessage.textContent = 'As senhas não coincidem';
        errorMessage.classList.add('visible');
        return;
    }
    
    // Pegar o email da URL
    const urlParams = new URLSearchParams(window.location.search);
    const email = urlParams.get('email');
    
    if (!email) {
        errorMessage.textContent = 'Email não fornecido';
        errorMessage.classList.add('visible');
        return;
    }

    try {
        const response = await fetch('http://127.0.0.1:5000/atualizar-senha', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email: email,
                nova_senha: senha
            })
        });

        const resultado = await response.json();
        
        if (response.ok) {
            alert('Senha atualizada com sucesso!');
            window.location.href = 'login.html';
        } else {
            errorMessage.textContent = resultado.erro;
            errorMessage.classList.add('visible');
        }
    } catch (erro) {
        console.error('Erro completo:', erro);
        errorMessage.textContent = 'Erro ao conectar com o servidor';
        errorMessage.classList.add('visible');
    }
} 