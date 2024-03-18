axios.defaults.baseURL = 'http://localhost/flight-system-website/backend';

const constructGetUrl = (url, params) => {
  let constructedUrl = url;
  if (params) {
    constructedUrl += '?';
    for (const key in params) {
      constructedUrl += `${key}=${params[key]}&`;
    }
  }
  console.log(constructedUrl);
  return constructedUrl;
};

//Bookings

const getbookings = async (user_id, email, booking_id) => {
  try {
    const params = {};
    let url = '/bookings/get.php';

    user_id && (params.user_id = user_id);
    email && (params.email = email);
    booking_id && (params.booking_id = booking_id);
    url = constructGetUrl(url, params);

    const response = await axios.get(url);

    if (response.data.status === 'success') {
      return response.data.bookings;
    }
  } catch (error) {
    console.error(error);
  }
};

const addBooking = async (user_id, departure_flight_id, passengers_number, return_flight_id = null) => {
  const data = new FormData();
  data.append('user_id', user_id);
  data.append('departure_flight_id', departure_flight_id);
  data.append('passengers_number', passengers_number);
  return_flight_id && data.append('return_flight_id', return_flight_id);

  try {
    const response = await axios.post('/bookings/add.php', data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

const updateBooking = async (booking_id, booking_status) => {
  const data = new FormData();
  data.append('booking_id', booking_id);
  data.append('booking_status', booking_status);

  try {
    const response = await axios.post('/bookings/update.php', data);
    if (response.data.status === 'success') {
      return response.data.bookings;
    } else {
      return response.data;
    }
  } catch (error) {
    console.error(error);
  }
};

//Reviews

const getFlightOrAirlineAverageRating = async (id, type) => {
  //type can be either 'flight' or 'airline'
  try {
    const params = { [`${type}_id`]: id };
    let url = '/reviews/get_average_rating.php';
    url = constructGetUrl(url, params);

    const response = await axios.get(url);

    if (response.data.status === 'success') {
      return response.data.average_rating;
    }
  } catch (error) {
    console.error(error);
  }
};

//Flights

const getFlights = async (id) => {
  try {
    const params = {};
    let url = '/flights/get.php';
    id && (params.id = id);
    url = constructGetUrl(url, params);

    const response = await axios.get(url);

    console.log(response.data);
    if (response.data.status === 'success') {
      return response.data.flights;
    }
  } catch (error) {
    console.error(error);
  }
};

const departureDate = '2024-03-20';
const returnDate = '2024-03-21';
const departure_location = 'New York';
const destination = 'Los Angeles';

const searchForFlights = async (departure_location, destination, departure_date, return_date = null) => {
  const flights = await getFlights();
  const departureDateInput = new Date(departure_date);
  const returnDateInput = new Date(return_date);
  let returnFlights = [];
  let departureFlights = [];

  departureFlights = flights.filter(
    (flight) => flight.departure_location === departure_location && flight.destination === destination
  );

  departureFlights = departureFlights.filter((flight) => {
    const flightDepartureDbDate = new Date(flight.departure_date);
    return flightDepartureDbDate.getTime() >= departureDateInput.getTime();
  });

  if (return_date) {
    returnFlights = flights.filter(
      (flight) => flight.destination === departure_location && flight.departure_location === destination
    );

    returnFlights = returnFlights.filter((flight) => {
      const flightReturnDbDate = new Date(flight.departure_date);
      return flightReturnDbDate.getTime() >= returnDateInput.getTime();
    });

    return { departureFlights, returnFlights };
  }

    return { departureFlights };
};

user_id = 2;
user_email = 'user2@example.com';
departure_flight_id = 1;
passengers_number = 1;
return_flight_id = 2;

searchForFlights(departure_location, destination, departureDate, returnDate);
// console.log(searchResults);

// const updatedBooking = updateBooking(2, 'cancelled');
// console.log(updatedBooking);
// const booking = addBooking(user_id, departure_flight_id, passengers_number);
// console.log(booking);
