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

