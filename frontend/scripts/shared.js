const loginBtn = document.getElementById('login-btn');
const profileBtn = document.getElementById('profile-link');

const searchBtn = document.getElementById('search-btn');
const departureLocationInput = document.getElementById('departure-location');
const destinationInput = document.getElementById('destination');
const departureDateInput = document.getElementById('departure-date');
const returnDateInput = document.getElementById('return-date');


const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');
const continueBtn = document.getElementById('continue-btn');

const searchForFlights = async (departure_location, destination, departure_date, return_date = null) => {
    const flights = JSON.parse(localStorage.getItem('flights'));
    if (!flights) return false;

    const departureDateInput = new Date(departure_date);
    const returnDateInput = return_date ? new Date(return_date) : null;
    let returnFlights = [];

    departureFlights = flights.filter((flight) => {
        const flightDepartureDbDate = new Date(flight.departure_date);
        return (
            flight.departure_location.toLowerCase() === departure_location.toLowerCase() &&
            flight.destination.toLowerCase() === destination.toLowerCase() &&
            flightDepartureDbDate.getTime() >= departureDateInput.getTime()
        );
    });

    if (departureFlights.length === 0) return false;

    if (returnDateInput) {
        returnFlights = flights.filter((flight) => {
            const flightReturnDbDate = new Date(flight.departure_date);
            return (
                flight.destination.toLowerCase() === departure_location.toLowerCase() &&
                flight.departure_location.toLowerCase() === destination.toLowerCase() &&
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

const checkCurrentUser = () => {
    currentUser = JSON.parse(localStorage.getItem('user')) || null;
    if (currentUser) {
        loginBtn.innerHTML = 'Logout';
        profileBtn.innerHTML = 'Profile';
    }
};

const showPopup = (message) => {
    popup.classList.remove('hidden');
    popupMessage.innerText = message;
};