function toggleSenha() {
    const senhaInput = document.getElementById('senha');
    const mostrarSenha = document.getElementById('mostrar-senha');
    
    if (mostrarSenha.checked) {
        senhaInput.type = 'text';
    } else {
        senhaInput.type = 'password';
    }
}

// Verifica quando a página carrega
window.onload = function() {
    // Verificar se já está logado
    const usuario = localStorage.getItem('usuario');
    if (usuario) {
        window.location.replace('loged_menu.html');
    }
}

async function loginUsuario(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const dados = {
        nome_usuario: formData.get('nome_usuario'),
        senha: formData.get('senha')
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        const resultado = await response.json();
        
        if (response.ok) {
            // Salvar usuário no localStorage
            localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
            console.log('Login bem sucedido, redirecionando...');
            
            // Forçar o redirecionamento
            window.location.href = 'loged_menu.html';
            return false; // Garantir que o form não seja submetido
        } else {
            alert('Erro: ' + resultado.erro);
        }
    } catch (erro) {
        console.error('Erro completo:', erro);
        alert('Erro ao conectar com o servidor: ' + erro);
    }
}
