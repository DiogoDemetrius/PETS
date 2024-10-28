async function registrarUsuario(event) {
    event.preventDefault();
    
    const form = event.target;
    const formData = new FormData(form);
    
    const dados = {
        nome_usuario: formData.get('nome_usuario'),
        nome: formData.get('nome'),
        cpf: formData.get('cpf'),
        email: formData.get('email'),
        senha: formData.get('senha')
    };

    try {
        console.log('Enviando dados:', dados);
        const response = await fetch('http://127.0.0.1:5000/registrar', {
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
            alert('Usuário registrado com sucesso!');
            form.reset();
        } else {
            alert('Erro: ' + resultado.erro);
        }
    } catch (erro) {
        console.error('Erro completo:', erro);
        alert('Erro ao conectar com o servidor. Verifique se a API está rodando.');
    }
}
