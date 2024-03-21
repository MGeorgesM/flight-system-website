const allbookings = document.getElementById("all-bookings");
const DeleteBtn = document.getElementById("delete-btn");
const getFlightDetails = (flightId) => {
  return axios
    .get(
      `http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/flights/get.php?id=${flightId}`
    )
    .then((response) => {
      const data = response.data;
      if (data.status === "success") {
        console.log(data.flights);

        return data.flights;
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.error("Error fetching flight details:", error);
      throw error;
    });
};
const getBookingsAndFlightDetails = (id, email) => {
  axios
    .get(
      `http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/bookings/get.php?user_id=${id}&email=${email}`
    )
    .then((response) => {
      const data = response.data;
      if (data.status === "success") {
        const bookings = data.bookings;
        console.log(bookings);
        const flightPromises = bookings.map((booking) => {
          const departureFlightId = booking.departure_flight_id;
          return getFlightDetails(departureFlightId);
        });
        return Promise.all(flightPromises);
      } else {
        throw new Error(data.message);
      }
    })
    .then((flightDetails) => {
      showBooking(flightDetails);
    })
    .catch((error) => {
      console.error("Error fetching bookings:", error);
    });
};
const deletebooking = (id, handler) => {
  const formData = new FormData();
  formData.append("id", id);
  axios
    .post(
      `http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/bookings/delete.php`,
      formData
    )
    .then((response) => {
      const data = response.data;
      if (data.status === "success") {
        getBookingsAndFlightDetails(1, "admin1@example.com");
      } else {
        throw new Error(data.message);
      }
    })
    .catch((error) => {
      console.error("Error deleting flight:", error);
    });
};
const showBooking = (flightList) => {
  allbookings.innerHTML = generateBookingCardHtml(flightList);
};

const generateBookingCardHtml = (flightList) => {
  let html = "";
  flightList.forEach((flight, index) => {
    html += `
      <tr>
      <td>${flight.departure_location}</td>
      <td>${flight.destination}</td>
      <td>${flight.code}</td>
      <td>${flight.price}</td>
      <td>${flight.status}</td>
      <td>${flight.airline_name}</td>
      <td>${flight.departure_date}</td>
      <td>${flight.arrival_date}</td>
      <td><button class="delete-btn" onclick="deletebooking(${flight.id})">Delete</button></td>
        </tr>
      `;
  });
  return html;
};

currentUser = JSON.parse(localStorage.getItem("user")) || null;
getBookingsAndFlightDetails(1, "admin1@example.com");
