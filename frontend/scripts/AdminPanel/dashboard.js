const totalFlights = document.getElementById("total-flights");
const totalBookings = document.getElementById("total-bookings");
const totalUsers = document.getElementById("total-users");
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

getAllFlights(showLengthOfFlights);
getAllBookings(id, email,showLengthOfBookings);
getAllUsers(showLengthOfUsers);
