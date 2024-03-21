const totalFlights = document.getElementById("total-flights");
const totalBookings = document.getElementById("total-bookings");
const totalUsers = document.getElementById("total-users");
const id = 1;
const email = "admin1@example.com";
const getAllFlights = () => {
  axios
    .get(`http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/flights/get.php`)
    .then((response) => {
      const data = response.data;
      if (data.status === "success") {
        showLengthOfFlights(data.flights);
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.error("Error fetching flight details:", error);
      throw error;
    });
};

  const getAllBookings = (id, email) => {
    axios
      .get(`http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/bookings/get.php?user_id=${id}&email=${email}`)
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          const bookings = data.bookings;
          showLengthOfBookings(bookings);
         
        } else {
          throw new Error(data.message); 
        }
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };
  const getAllUsers = () => {
    axios
      .get(`http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/users/get.php`)
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          const users = data.users;
          showLengthOfUsers(users);
         
        } else {
          throw new Error(data.message); 
        }
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
      });
  };
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

getAllFlights();
getAllBookings(id, email);
getAllUsers();
