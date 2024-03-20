const loginBtn = document.getElementById('login-btn');
const profileBtn = document.getElementById('profile-link');
const searchBtn = document.getElementById('search-btn');

const departureLocationInput = document.getElementById('departure-location');
const destinationInput = document.getElementById('destination');
const departureDateInput = document.getElementById('departure-date');
const returnDateInput = document.getElementById('return-date');

const topRatedFlightDisplay = document.getElementById('top-flight-display');
const topRatedAirlineDisplay = document.getElementById('top-airline-display');

const flightStatusesContainer = document.getElementById('statuses-container');



let currentUser = null;

const getFlightsStatuses = async () => {
    const flights = await getFlights();
    let flightsStatuses = {};

    flights.forEach((flight) => {
        flightsStatuses[flight.code] = flight.status;
    });

    return flightsStatuses;
};

const clearFilters = () => {
    localStorage.removeItem('departureFlights');
    localStorage.removeItem('returnFlights');
};

// const searchForFlights = async (departure_location, destination, departure_date, return_date = null) => {
//     const flights = JSON.parse(localStorage.getItem('flights'));
//     if (!flights) return false;

//     const departureDateInput = new Date(departure_date);
//     const returnDateInput = return_date ? new Date(return_date) : null;
//     let returnFlights = [];

//     departureFlights = flights.filter((flight) => {
//         const flightDepartureDbDate = new Date(flight.departure_date);
//         return (
//             flight.departure_location === departure_location &&
//             flight.destination === destination &&
//             flightDepartureDbDate.getTime() >= departureDateInput.getTime()
//         );
//     });

//     if (departureFlights.length === 0) return false;

//     if (returnDateInput) {
//         returnFlights = flights.filter((flight) => {
//             const flightReturnDbDate = new Date(flight.departure_date);
//             return (
//                 flight.destination === departure_location &&
//                 flight.departure_location === destination &&
//                 flightReturnDbDate.getTime() >= returnDateInput.getTime()
//             );
//         });

//         if (returnFlights.length === 0) return false;

//         departureFlights = departureFlights.filter((flight) => {
//             const flightDepartureDate = new Date(flight.departure_date);
//             return flightDepartureDate.getTime() < returnDateInput.getTime();
//         });

//         if (departureFlights.length === 0) return false;
//     }

//     localStorage.setItem('departureFlights', JSON.stringify(departureFlights));
//     localStorage.setItem('returnFlights', JSON.stringify(returnFlights));

//     return true;
// };

const populateFlightStatuses = (flight) => {
    return `<div class="status dark-text">
            <div class="status-container flex space-between">
                <h2 class="status-flight-display">${flight.code}</h2>
                <h2 class="status-display">${flight.status}</h2>
            </div>
        </div>`;
};

loginBtn.addEventListener('click', () => {
    if (currentUser) {
        localStorage.clear();
        loginBtn.innerHTML = 'Login';
    }
    window.location.href = '/frontend/pages/signin.html';
});

searchBtn.addEventListener('click', async (event) => {
    event.preventDefault();
    if (!currentUser) {
        window.location.href = '/frontend/pages/signin.html';
    }
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

    if (flightsFound) {
        window.location.href = '/frontend/pages/search.html';
    } else {    
        showPopup('No flights found. Please adjust your search criteria.');
    }

    flightsFound && (window.location.href = '/frontend/pages/search.html');
});

continueBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});

getHighestRating('flight').then((highestRating) => {
    topRatedFlightDisplay.innerHTML = highestRating.code.toUpperCase();
});

getHighestRating('airline').then((highestRating) => {
    topRatedAirlineDisplay.innerHTML = highestRating.airline_name;
});

getFlights().then((flights) => {
    flights.forEach((flight) => {
        flightStatusesContainer.innerHTML += populateFlightStatuses(flight);
    });
    localStorage.setItem('flights', JSON.stringify(flights));
});

clearFilters();
checkCurrentUser();
