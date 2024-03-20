const profile = document.getElementById("profile-section");
const booking = document.getElementById("booking-section");
const profileBtn = document.getElementById("profile-btn");
const bookingBtn = document.getElementById("booking-btn");
const updateBtn= document.getElementById("update-btn");
let userData = {};

const getUser = (id) => {
  axios
    .get(
      `http://localhost/flight-system-website/backend/users/get.php?user_id=${id}`
    )
    .then((response) => {
      const data = response.data;
      if (data.status === "success") {
        const userData = data.users;
        console.log(userData);
        populateUserData(userData);
        return userData;
      } else {
        console.log(data);
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
                console.log(data);
                getUser(id);
            } else {
                console.log(data);
            }
        });
};

profileBtn.addEventListener("click", () => toggleVisibility(true));
bookingBtn.addEventListener("click", () => toggleVisibility(false));
updateBtn.addEventListener("click", () => updateUser(1, userData));

const populateUserData = (userData) => {
  document.getElementById("first-name").value = userData.first_name;
  document.getElementById("last-name").value = userData.last_name;
  document.getElementById("user-name").value = userData.username;
  document.getElementById("email").value = userData.email;
  document.getElementById("password").value = userData.password;
  document.getElementById("passport-number").value = userData.passport_number;
  document.getElementById("address").value = userData.address;
};

const toggleVisibility = (showProfile) => {
  profile.style.display = showProfile ? "block" : "none";
  booking.style.display = showProfile ? "none" : "block";
  profileBtn.classList.toggle("primary-bg", showProfile);
  bookingBtn.classList.toggle("primary-bg", !showProfile);
  profileBtn.classList.toggle("onclick-nav-bg", !showProfile);
  bookingBtn.classList.toggle("onclick-nav-bg", showProfile);
};
const getUserDataFromInputs = () => {
    userData = {
        first_name: document.getElementById("first-name").value,
        last_name: document.getElementById("last-name").value,
        username: document.getElementById("user-name").value,
        email: document.getElementById("email").value,
        password: document.getElementById("password").value,
        passport_number: document.getElementById("passport-number").value,
        address: document.getElementById("address").value
    };
};
getUser(1);
