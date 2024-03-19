const loginBtn = document.getElementById('login-btn');
const profileBtn = document.getElementById('profile-link');
const searchBtn = document.getElementById('search-btn');

const departureLocationInput = document.getElementById('departure-location');
const destinationInput = document.getElementById('destination');
const departureDateInput = document.getElementById('departure-date');
const returnDateInput = document.getElementById('return-date');

const checkCurrentUser = () => {
  const user = JSON.parse(localStorage.getItem('user'));

  if (user) {
    loginBtn.innerHTML = 'Logout';
    profileBtn.innerHTML = 'Profile';
  }
  return user;
};

const getFlightsStatuses = async () => {
  const flights = await getFlights();
  let flightsStatuses = {};

  flights.forEach((flight) => {
    flightsStatuses[flight.code] = flight.status;
  });

  return flightsStatuses;
};

const clearLocalStorage = () => {
  localStorage.removeItem('departureFlights');
  localStorage.removeItem('returnFlights');
};

const searchForFlights = async (departure_location, destination, departure_date, return_date = null) => {
  console.log('searchForFlights')
  const flights = JSON.parse(localStorage.getItem('flights'));
  if (!flights) return false;

  const departureDateInput = new Date(departure_date);
  const returnDateInput = return_date ? new Date(return_date) : null;
  let returnFlights = [];

  departureFlights = flights.filter((flight) => {
    const flightDepartureDbDate = new Date(flight.departure_date);
    return (
      flight.departure_location === departure_location &&
      flight.destination === destination &&
      flightDepartureDbDate.getTime() >= departureDateInput.getTime()
    );
  });

  if (departureFlights.length === 0) return false;

  if (returnDateInput) {
    returnFlights = flights.filter((flight) => {
      const flightReturnDbDate = new Date(flight.departure_date);
      return (
        flight.destination === departure_location &&
        flight.departure_location === destination &&
        flightReturnDbDate.getTime() >= returnDateInput.getTime()
      );
    });

    if (returnFlights.length === 0) return false;

    departureFlights = departureFlights.filter((flight) => {
      const flightDepartureDate = new Date(flight.departure_date);
      return flightDepartureDate.getTime() < returnDateInput.getTime();
    });

    if (departureFlights.length === 0) return false;
  }

  localStorage.setItem('departureFlights', JSON.stringify(departureFlights));
  localStorage.setItem('returnFlights', JSON.stringify(returnFlights));

  return true;
};

getFlights().then((flights) => {
  localStorage.setItem('flights', JSON.stringify(flights));
});

loginBtn.addEventListener('click', () => {
  if (currentUser) {
    clearLocalStorage();
    localStorage.removeItem('user');
    localStorage.removeItem('flights');
    currentUser = null;
    loginBtn.innerHTML = 'Login';
    window.location.href = '/frontend/pages/signin.html';
  }
  window.location.href = '/frontend/pages/signin.html';
});

searchBtn.addEventListener('click', async (event) => {
  event.preventDefault();
  const departureLocationInputValue = departureLocationInput.value;
  const destinationInputValue = destinationInput.value;
  const departureDateInputValue = departureDateInput.value;
  const returnDateInputValue = returnDateInput.value;

  let flightsFound = await searchForFlights(
    destinationInputValue,
    departureLocationInputValue,
    departureDateInputValue,
    returnDateInputValue
  );

  flightsFound && (window.location.href = '/frontend/pages/search.html');
});

let currentUser = checkCurrentUser();
clearLocalStorage();
