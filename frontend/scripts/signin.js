const loginForm = document.getElementById('login-form');
const loginInput = document.getElementById('login');
const loginPasswordInput = document.getElementById('password');
const loginValidationDisplay = document.getElementById('validationDisplaySignIn');

const clearLoginForm = () => {
  loginInput.value = '';
  loginPasswordInput.value = '';
};

const signIn = async (login, password) => {
  const data = new FormData();
  data.append('login', login);
  data.append('password', password);

  try {
    const response = await axios.post('/users/signin.php', data);

    if (response.data.status === 'success') {
      localStorage.setItem('user', JSON.stringify(response.data.users));
      clearLoginForm();
      window.location.href = '../index.html';
      return;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    loginValidationDisplay.innerHTML = error.message;
  }
};

loginForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  loginValidationDisplay.innerHTML = '';
  const login = loginForm.login.value;
  const password = loginForm.password.value;
  signIn(login, password);
});

window.addEventListener('DOMContentLoaded', () => {
  const currentUser = JSON.parse(localStorage.getItem('user'));
  if (currentUser) {
      window.location.href = '../index.html';
  }
});
