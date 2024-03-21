const getFlightDetails = (flightId) => {
    return axios
      .get(`http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/flights/get.php?id=${flightId}`)
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          // console.log(data.flights);

          return data.flights; 
        } else {
          throw new Error(data.message);
        }
      })
      .catch((error) => {
        console.log("Error fetching flight details:", error);
        throw error; 
      });
  };
  const getBookingsAndFlightDetails = (id, email) => {
    axios
      .get(`http://localhost/FLIGHT-SYSTEM-WEBSITE/backend/bookings/get.php?user_id=${id}&email=${email}`)
      .then((response) => {
        const data = response.data;
        if (data.status === "success") {
          const bookings = data.bookings;
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
        console.log("Error fetching bookings:", error);
      });
  };
  
  const showBooking = (flightList) => {
    const bookingCard = document.getElementById("booking-section");
    bookingCard.innerHTML = generateBookingCardHtml(flightList);
  };
  
  const generateBookingCardHtml = (flightList) => {
    let html = "";
    flightList.forEach((flight, index) => {
      html += `
          <div class="flex align-center booking-card onclick-nav-bg border-radius space space-evenly">
              <p class="dark-text">From ${flight.departure_location}</p>
              <div class="line primary-bg flex"></div>
              <p class="dark-text">To ${flight.destination}</p>
              <p>${flight.code}</p>
              <p class="dark-text">${flight.airline_name}</p>
              <button class="add-review-btn box-shadow primary-bg off-white-text border-radius" id="add-review-btn">Add Review</button>
          </div>
      `;
    });
    return html;
  };
  
  currentUser = JSON.parse(localStorage.getItem("user")) || null;
  getBookingsAndFlightDetails(currentUser.id, currentUser.email);
