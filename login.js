document.addEventListener('DOMContentLoaded', () => {
    const userInfo = document.getElementById('user-info');
    const loginForm = document.getElementById('login-form');
    const volumeList = document.getElementById('volume-list');
    const loginButton = document.getElementById('login-button');
    const usernameInput = document.getElementById('username');

    let currentUser = null;

    loginButton.addEventListener('click', () => {
        const username = usernameInput.value.trim();
        if (username) {
            currentUser = username;
            localStorage.setItem('username', username);
            loadUserData(username);
            userInfo.textContent = `Bem Vindo de Volta ${currentUser}`;
        }
    });

    const savedUsername = localStorage.getItem('username');
    if (savedUsername) {
        currentUser = savedUsername;
        usernameInput.value = savedUsername;
        loadUserData(savedUsername);
        userInfo.classList.add('font-bold', 'pt-14');

        userInfo.textContent = `Bem Vindo de Volta ${currentUser}`;
    } else {
        renderVolumes(onePiece);
    }

    function loadUserData(username) {
        const userData = loadFromLocalStorage(username) || onePiece;
        renderVolumes(userData);
    }

    function saveToLocalStorage(username, data) {
        localStorage.setItem(`onePieceRatings_${username}`, JSON.stringify(data));
    }

    function loadFromLocalStorage(username) {
        const data = localStorage.getItem(`onePieceRatings_${username}`);
        return data ? JSON.parse(data) : null;
    }
