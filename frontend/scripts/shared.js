const loginBtn = document.getElementById('login-btn');
const profileBtn = document.getElementById('profile-link');

const departureLocationInput = document.getElementById('departure-location');
const destinationInput = document.getElementById('destination');
const departureDateInput = document.getElementById('departure-date');
const returnDateInput = document.getElementById('return-date');

const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');

const continueBtn = document.getElementById('continue-btn');

let currentUser = null;

const checkCurrentUser = () => {
    currentUser = JSON.parse(localStorage.getItem('user')) || null;
    if (currentUser) {
        loginBtn.innerHTML = 'Logout';
    }
};

const showPopup = (message) => {
    popup.classList.remove('hidden');
    popupMessage.innerText = message;
};

continueBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});

profileBtn.addEventListener('click', () => {
    if (profileBtn.innerHTML === 'Profile') {
        window.location.href = '../frontend/pages/user.html';
    } else {
        window.location.href = './admin.html';
    }
});

loginBtn.addEventListener('click', () => {
    if (currentUser) {
        localStorage.clear();
        loginBtn.innerHTML = 'Login';
    }
    window.location.href = '/frontend/pages/signin.html';
});

checkCurrentUser();
checkCurrentUserisAdmin(currentUser.id, currentUser.email).then((isAdmin) => {
    if (isAdmin) {
        profileBtn.innerHTML = 'Admin Panel';
    } else {
        profileBtn.innerHTML = 'Profile';
    }
});

if (document.title === 'Journey - Search Results' || document.title === 'Jouney - Welcome') {
    document.getElementById('flight-search-form').addEventListener('submit', function (event) {
        event.preventDefault();

        const departureLocation = document.getElementById('departure-location').value.toLowerCase();
        const destination = document.getElementById('destination').value.toLowerCase();
        const departureDate = new Date(document.getElementById('departure-date').value);
        const returnDate = document.getElementById('return-date').value
            ? new Date(document.getElementById('return-date').value)
            : null;

        const flights = JSON.parse(localStorage.getItem('flights'));

        const filteredDepartureFlights = flights.filter((flight) => {
            const flightDepartureDate = new Date(flight.departure_date);
            const matchDeparture = flight.departure_location.toLowerCase() === departureLocation;
            const matchDestination = flight.destination.toLowerCase() === destination;
            const matchDepartureDate = flightDepartureDate >= departureDate;

            const matchReturnDate = returnDate ? new Date(flight.arrival_date) <= returnDate : true;
            return matchDeparture && matchDestination && matchDepartureDate && matchReturnDate;
        });

        localStorage.setItem('departureFlights', JSON.stringify(filteredDepartureFlights));

        if (returnDate) {
            const filteredReturnFlights = flights.filter((flight) => {
                const flightDepartureDate = new Date(flight.departure_date);

                const matchDeparture = flight.departure_location.toLowerCase() === destination;
                const matchDestination = flight.destination.toLowerCase() === departureLocation;
                const matchDepartureDate = flightDepartureDate >= returnDate;

                return matchDeparture && matchDestination && matchDepartureDate;
            });

            localStorage.setItem('returnFlights', JSON.stringify(filteredReturnFlights));
        } else {
            localStorage.removeItem('returnFlights');
        }

        if (filteredDepartureFlights.length > 0) {
            window.location.href = '/frontend/pages/search.html';
        } else {
            showPopup('No flights found. Please adjust your search criteria.');
        }
    });
}
