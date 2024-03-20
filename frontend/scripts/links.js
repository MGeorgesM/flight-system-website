//CHECK BASE URL BEFORE TESTING SORT THE FUNCTIONS BY THEIR TABLENAME

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

// const getData = async (tablename, id) => {
//     try {
//         const params = {};
//         let url = `/${tablename}/get.php`;
//         id && (params.id = id);
//         url = constructGetUrl(url, params);

//         const response = await axios.get(url);

//         if (response.data.status === 'success') {
//             return response.data[tablename];
//         }
//     } catch (error) {
//         console.error(error);
//     }
// }

//Users
const checkCurrentUserisAdmin = async (user_id, email) => {

  try {
    const params = {};
    let url = '/users/get.php';
  
    user_id && (params.user_id = user_id);
    email && (params.email = email);
    url = constructGetUrl(url, params);
  
    const response = await axios.get('/users/get_is_admin.php');
    if (response.data.status === 'success') {
      return response.data.users;
    }
  }catch(error){
    console.error(error);
  }

}


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

const getHighestRating = async (type) => {
  //type can be either 'flight' or 'airline'
  try {
    const params = { type };
    let url = '/reviews/get_highest_rating.php';
    url = constructGetUrl(url, params);

    const response = await axios.get(url);

    if (response.data.status === 'success') {
      return response.data.highest_rating;
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

const user_id = 2;
const user_email = 'user2@example.com';
const departure_flight_id = 1;
const passengers_number = 1;
const return_flight_id = 2;

//Users
  
