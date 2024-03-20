const flightDetailsContainer = document.getElementById('flight-details-container');
const selectSeatsBtns = document.querySelectorAll('.letter');

let selectedDepartureFlight = null;
let selectedReturnFlight = null;
let seatSelected = 1;

const getSelectedFlights = () => {
    const selectedDepartureFlightId = JSON.parse(localStorage.getItem('selectedDepartureFlight'));
    const selectedReturnFlightId = JSON.parse(localStorage.getItem('selectedReturnFlight'));

    getFlights(selectedDepartureFlightId).then((flight) => {
        selectedDepartureFlight = flight;
        populateFlightDetails(flight, 'Departure');
    });

    selectedReturnFlightId &&
        getFlights(selectedReturnFlightId).then((flight) => {
            selectedReturnFlight = flight;
            populateFlightDetails(flight, 'Return');
        });
};

const populateFlightDetails = (flight, direction) => {
    flightDetailsContainer.innerHTML += populateFlightDetailElement(flight, direction);
};

const populateFlightDetailElement = (flight, direction) => {
    return `<div class="flight-details" id="flight-details-container">
                <div class="flight-details-card flex column center">
                    <div class="flight-details-card-title dark-text">
                        <h2>${direction}</h2>
                    </div>
                    <div class="flight-details-card-content flex column center">
                        <div class="flight-details-card-content-item dark-text">
                            <p>Flight Number: <span id="departure-flight-number">${flight.code}</span></p>
                        </div>
                        <div class="flight-details-card-content-item dark-text">
                            <p>Departure Time: <span id="departure-departure-time">${flight.departure_date}</span></p>
                        </div>
                        <div class="flight-details-card-content-item dark-text">
                            <p>Arrival Time: <span id="departure-arrival-time">${flight.arrival_date}</span></p>
                        </div>
                        <div class="flight-details-card-content-item dark-text">
                            <p>Price: <span id="departure-price">${flight.price}</span></p>
                        </div>
                    </div>
                </div>`;
};

const calculateTotalPrice = () => {
    const departurePrice = parseInt(selectedDepartureFlight.price);
    const returnPrice = selectedReturnFlight ? parseInt(selectedReturnFlight.price) : 0;
    const totalPrice = (departurePrice + returnPrice) * seatSelected;
    console.log(totalPrice);
};

const handleSeatSelect = (event) => {
    const seat = event.target;

    if (seat.classList.contains('clicked')) {
        seat.classList.remove('clicked');
        seatSelected--;
    } else {
        seat.classList.add('clicked');
        seatSelected++;
    }

    calculateTotalPrice();

    console.log(seatSelected);
};

selectSeatsBtns.forEach((btn) => {
    btn.addEventListener('click', handleSeatSelect);
});

// getSelectedFlights();
