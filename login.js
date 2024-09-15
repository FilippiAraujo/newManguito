// login.js

// Variável global para o usuário atual
window.currentUser = null;

// Referências aos elementos do DOM
const loginButton = document.getElementById('login-button');
const logoutButton = document.getElementById('logout-button');
const registerButton = document.getElementById('register-button');
const userAvatar = document.getElementById('user-avatar');
const userInfo = document.getElementById('user-info');
const loginModal = document.getElementById('loginModal');
const loginSubmitButton = document.getElementById('login-submit-button');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const registerModal = document.getElementById('registerModal');
const registerSubmitButton = document.getElementById('register-submit-button');
const registerEmail = document.getElementById('register-email');
const registerPassword = document.getElementById('register-password');

// Função para exibir mensagens
function showMessage(message) {
  userInfo.textContent = message;
}

// Evento de clique no botão de login
loginSubmitButton.addEventListener('click', () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  // Autenticação com Firebase
  firebase.auth().signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Login bem-sucedido
      const user = userCredential.user;
      showMessage(`Bem-vindo, ${user.email}!`);
      loginModal.close(); // Fecha o modal após login
    })
    .catch((error) => {
      // Tratar erros
      const errorMessage = error.message;
      showMessage(`Erro: ${errorMessage}`);
    });
});

// Evento de clique no botão de logout
logoutButton.addEventListener('click', () => {
  firebase.auth().signOut().then(() => {
    showMessage('Você saiu com sucesso.');
  }).catch((error) => {
    showMessage(`Erro ao sair: ${error.message}`);
  });
});

// Evento de clique no botão de registro
registerSubmitButton.addEventListener('click', () => {
  const email = registerEmail.value;
  const password = registerPassword.value;

  // Criação de novo usuário com Firebase
  firebase.auth().createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      // Registro bem-sucedido
      const user = userCredential.user;
      showMessage(`Usuário registrado: ${user.email}`);
      registerModal.close(); // Fecha o modal após registro
    })
    .catch((error) => {
      // Tratar erros
      const errorMessage = error.message;
      showMessage(`Erro: ${errorMessage}`);
    });
});

// Monitorar o estado de autenticação
firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    // Usuário está logado
    currentUser = user; // Armazenar o objeto do usuário
    showMessage(`Usuário logado: ${user.email}`);
    logoutButton.classList.remove('hidden');
    loginButton.classList.add('hidden');
    registerButton.classList.add('hidden');
    userAvatar.classList.remove('hidden');
    // Opcional: Atualizar a imagem do avatar se disponível
    // if (user.photoURL) {
    //   const avatarImg = userAvatar.querySelector('img');
    //   avatarImg.src = user.photoURL;
    // }
  } else {
    // Usuário não está logado
    currentUser = null;
    showMessage('Nenhum usuário logado.');
    logoutButton.classList.add('hidden');
    loginButton.classList.remove('hidden');
    registerButton.classList.remove('hidden');
    userAvatar.classList.add('hidden');
  }
});
