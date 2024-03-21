const totalFlights = document.getElementById("total-flights");
const totalBookings = document.getElementById("total-bookings");
const totalUsers = document.getElementById("total-users");
const adminExitBtn = document.getElementById("admin-exit");
const id = 1;
const email = "admin1@example.com";

const showLengthOfUsers = (users) => {
  totalUsers.innerHTML = generateLength(users);
};
const showLengthOfBookings = (bookings) => {
  totalBookings.innerHTML = generateLength(bookings);
};
const showLengthOfFlights = (flights) => {
  totalFlights.innerHTML = generateLength(flights);
};

const generateLength = (array) => {
  return `<h1>${array.length}</h1>`;
};

adminExitBtn.addEventListener("click", () => {
  console.log("exit");
  localStorage.clear();
  window.location.href = "/frontend/pages/signin.html";
});


console.log(adminExitBtn)
getAllFlights(showLengthOfFlights);
getAllBookings(id, email,showLengthOfBookings);
getAllUsers(showLengthOfUsers);
