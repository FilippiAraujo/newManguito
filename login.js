document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');

    let currentUser = null;

    loginButton.addEventListener('click', handleLogin);

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        currentUser = savedUsername;
        usernameInput.value = savedUsername;
        userInfo.classList.add('font-bold', 'pt-8');
        userInfo.textContent = `Bem Vindo de Volta ${currentUser}`;
        loadUserData(savedUsername);
    }

    function handleLogin() {
        const username = usernameInput.value.trim();
        if (username) {
            currentUser = username;
            localStorage.setItem('username', username);
            userInfo.textContent = `Bem Vindo de Volta ${currentUser}`;
            loadUserData(username);
        }
    }
});
