const loginForm = document.getElementById('login-form');
const loginInput = document.getElementById('login');
const loginPasswordInput = document.getElementById('password');
const loginValidationDisplay = document.getElementById('validationDisplaySignIn');

const signIn = async (login, password) => {
  const data = new FormData();
  data.append('login', login);
  data.append('password', password);

  try {
    const response = await axios.post('/users/signin.php', data);

    if (response.data.status === 'success') {
      console.log(response.data.users);
      localStorage.setItem('user', JSON.stringify(response.data.users));
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


const clearForms = () => {
    loginInput.value = '';
    loginPasswordInput.value = '';
    emailInput.value = '';
    usernameInput.value = '';
    registerPasswordInput.value = '';
  };
