function toggleSidebar() {
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('main');
    sidebar.classList.toggle('active');
    main.classList.toggle('sidebar-active');
}

function logout() {
    localStorage.removeItem('usuario');
    window.location.href = 'login.html';
}

// Verifica autenticação quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    console.log("Verificando autenticação...");
    const usuario = localStorage.getItem('usuario');
    console.log("Usuário:", usuario);
    
    if (!usuario) {
        console.log("Usuário não encontrado, redirecionando...");
        window.location.href = 'login.html';
    } else {
        console.log("Usuário autenticado!");
    }
});
