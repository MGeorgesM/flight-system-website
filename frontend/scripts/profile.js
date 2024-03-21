const profile = document.getElementById("profile-section");
const booking = document.getElementById("booking-section");
const profileTab = document.getElementById("profile-btn");
const bookingBtn = document.getElementById("booking-btn");
const updateBtn = document.getElementById("update-btn");
const firstNameInput = document.getElementById("first-name");
const lastNameInput = document.getElementById("last-name");
const userNameInput = document.getElementById("user-name");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const passportNumberInput = document.getElementById("passport-number");
const addressInput = document.getElementById("address");

let userData = {};
profileTab.addEventListener("click", () => toggleVisibility(true));
bookingBtn.addEventListener("click", () => toggleVisibility(false));
updateBtn.addEventListener("click", () => updateUser(1, userData));

const getUserToProfile = (id) => {
  axios
    .get(
      `http://localhost/flight-system-website/backend/users/get.php?user_id=${id}`
    )
    .then((response) => {
      const data = response.data;
      if (data.status === "success") {
        const userData = data.users;
        populateUserData(userData);
        return userData;
      } else {
      }
    });
};
const updateUser = (id) => {
  getUserDataFromInputs();
  const formData = new FormData();
  formData.append("user_id", id);
  Object.entries(userData).map(([key, value]) => formData.append(key, value));

  axios
    .post(
      `http://localhost/flight-system-website/backend/users/update.php`,
      formData
    )
    .then((response) => {
      const data = response.data;
      if (data.status === "success") {
        getUserToProfile(id);
      } else {
      }
    });
};



const populateUserData = ({
  first_name,
  last_name,
  username,
  email,
  password,
  passport_number,
  address,
}) => {
  firstNameInput.value = first_name;
  lastNameInput.value = last_name;
  userNameInput.value = username;
  emailInput.value = email;
  passwordInput.value = password;
  passportNumberInput.value = passport_number;
  addressInput.value = address;
};

const toggleVisibility = (showProfile) => {
  profile.style.display = showProfile ? "block" : "none";
  booking.style.display = showProfile ? "none" : "block";
  profileTab.classList.toggle("primary-bg", showProfile);
  bookingBtn.classList.toggle("primary-bg", !showProfile);
  profileTab.classList.toggle("onclick-nav-bg", !showProfile);
  bookingBtn.classList.toggle("onclick-nav-bg", showProfile);
};
const getUserDataFromInputs = () => {
  userData = {
    first_name: firstNameInput.value,
    last_name: lastNameInput.value,
    username: userNameInput.value,
    email: emailInput.value,
    password: passwordInput.value,
    passport_number: passportNumberInput.value,
    address: addressInput.value,
  };
};

currentUser = JSON.parse(localStorage.getItem("user")) || null;
getUserToProfile(currentUser.id);
