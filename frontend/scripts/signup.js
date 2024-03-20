const signupForm = document.getElementById('register-form');
const emailInput = document.getElementById('email');
const usernameInput = document.getElementById('username');
const passwordInput = document.getElementById('register-password');
const registerValidationDisplay = document.getElementById('validationDisplaySignUp');


const clearRegisterForm = () => {
    emailInput.value = '';
    usernameInput.value = '';
    passwordInput.value = '';
  };

const register = async (email, username, password) => {
  const data = new FormData();
  data.append('email', email);
  data.append('username', username);
  data.append('password', password);

  try {
    const response = await axios.post('/users/signup.php', data);

    if (response.data.status === 'success') {
      localStorage.setItem('user', JSON.stringify(response.data.users));
      window.location.href = '../index.html';
      clearRegisterForm();
      return;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    registerValidationDisplay.innerHTML = error.message;
  }
}

signupForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  registerValidationDisplay.innerHTML = '';
  const email = signupForm.email.value;
  const username = signupForm.username.value;
  const password = signupForm.password.value;
  register(email, username, password);
});