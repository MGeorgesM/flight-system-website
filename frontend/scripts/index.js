const loginbtn = document.getElementById('login-btn');


let currentUser = checkCurrentUser();


const checkCurrentUser =  () => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
    loginbtn.innerHTML = 'Logout';
  }
  return user;
}


const getFlightsStatuses = async () => {
  const flights = await getFlights();
  let flightsStatuses = {};

  flights.forEach((flight) => {
    flightsStatuses[flight.code] = flight.status;
  });

  return flightsStatuses;
};

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


  loginbtn.addEventListener('click', () => {
    if (currentUser) {
      localStorage.removeItem('user');
      currentUser = null;
      loginbtn.innerHTML = 'Login';
      window.location.href = '../pages/signin.html.html';
    });
