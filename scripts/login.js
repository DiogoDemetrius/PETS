function toggleSenha() {
    const senhaInput = document.getElementById('senha');
    const mostrarSenha = document.getElementById('mostrar-senha');
    
    if (mostrarSenha.checked) {
        senhaInput.type = 'text';
    } else {
        senhaInput.type = 'password';
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
        console.log('Enviando dados:', dados);
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(dados)
        });

        console.log('Resposta recebida:', response);
        const resultado = await response.json();
        
        if (response.ok) {
            alert('Login realizado com sucesso!');
            // Salva os dados do usuário no localStorage (opcional)
            localStorage.setItem('usuario', JSON.stringify(resultado.usuario));
            // Aqui você pode redirecionar para a página principal
            // window.location.href = 'pagina-principal.html';
        } else {
            alert('Erro: ' + resultado.erro);
        }
    } catch (erro) {
        console.error('Erro completo:', erro);
        alert('Erro ao conectar com o servidor. Verifique se a API está rodando.');
    }
}
