document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');
    const loginForm = document.getElementById('login-form');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');

    let currentUser = null;
    let currentManga = 'onePiece'; // Default manga

    loginButton.addEventListener('click', handleLogin);

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        currentUser = savedUsername;
        usernameInput.value = savedUsername;
        userInfo.textContent = `Bem Vindo de Volta ${currentUser}`;
        loadUserData(currentManga);
    }

    function handleLogin() {
        const username = usernameInput.value.trim();
        if (username) {
            currentUser = username;
            localStorage.setItem('username', username);
            userInfo.textContent = `Bem Vindo de Volta ${currentUser}`;
            loadUserData(currentManga);
        }
    }
});
