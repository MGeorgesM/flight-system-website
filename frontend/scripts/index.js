const departureLocationInput = document.getElementById('departure-location');
const destinationInput = document.getElementById('destination');
const departureDateInput = document.getElementById('departure-date');
const returnDateInput = document.getElementById('return-date');

const topRatedFlightDisplay = document.getElementById('top-flight-display');
const topRatedAirlineDisplay = document.getElementById('top-airline-display');

const flightStatusesContainer = document.getElementById('statuses-container');

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

const populateFlightStatuses = (flight) => {
    return `<div class="status dark-text">
            <div class="status-container flex space-between">
                <h2 class="status-flight-display">${flight.code}</h2>
                <h2 class="status-display">${flight.status}</h2>
            </div>
        </div>`;
};

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
        console.log(matchReturnDate);
        return matchDeparture && matchDestination && matchDepartureDate && matchReturnDate;
    });

    if (returnDate) {
        const filteredReturnFlights = flights.filter((flight) => {
            const flightDepartureDate = new Date(flight.departure_date);

            const matchDeparture = flight.departure_location.toLowerCase() === destination;
            const matchDestination = flight.destination.toLowerCase() === departureLocation;
            const matchDepartureDate = flightDepartureDate >= returnDate;

            return matchDeparture && matchDestination && matchDepartureDate;
        });
    }
});
