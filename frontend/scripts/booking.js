const userDetailsContainer = document.getElementById('user-details-container');
const flightDetailsContainer = document.getElementById('flight-details-container');
const totalPriceDisplay = document.getElementById('total-price-display');
const validationDisplay = document.getElementById('booking-validation-display');
const checkOutBtn = document.getElementById('checkout-btn');
const selectSeatsBtns = document.querySelectorAll('.letter');
const cancelBtn = document.getElementById('cancel-btn');

let selectedDepartureFlight = null;
let selectedReturnFlight = null;
let seatsSelected = ['A1'];
let totalPrice = null;

const getSelectedFlights = () => {
    const selectedDepartureFlightId = JSON.parse(localStorage.getItem('selectedDepartureFlightId'));
    const selectedReturnFlightId = JSON.parse(localStorage.getItem('selectedReturnFlightId'));
    selectedReturnFlightId &&
        getFlights(selectedReturnFlightId).then((flight) => {
            selectedReturnFlight = flight;
            populateFlightDetails(flight, 'Return');
        });

    getFlights(selectedDepartureFlightId).then((flight) => {
        selectedDepartureFlight = flight;
        populateFlightDetails(flight, 'Departure');
    });
};

const populateFlightDetails = (flight, direction) => {
    flightDetailsContainer.innerHTML += populateFlightDetailElement(flight, direction);
};

const populateFlightDetailElement = (flight, direction) => {
    return `<div class="flight-details-card flex column">
                <div class="flight-details-card-title dark-text">
                    <h2>${direction}</h2>
                </div>
                <div class="flight-details-card-content flex column">
                    <div class="flight-details-card-content-item dark-text">
                        <p>Flight Number: <span id="departure-flight-number">${flight.code}</span></p>
                    </div>
                    <div class="flight-details-card-content-item dark-text">
                        <p>Departure Time: <span id="departure-departure-time">${flight.departure_date}</span>
                        </p>
                    </div>
                    <div class="flight-details-card-content-item dark-text">
                        <p>Arrival Time: <span id="departure-arrival-time">${flight.arrival_date}</span></p>
                    </div>
                    <div class="flight-details-card-content-item dark-text">
                        <p>Price: <span id="departure-price">$${flight.price}</span></p>
                    </div>
                </div>
            </div>`;
};

const populateUserDetails = (user) => {
    userDetailsContainer.innerHTML += populateUserDetailsElement(user);
};

const populateUserDetailsElement = (user) => {
    return `<h1 id="username-dislpay">${user.first_name ? user.first_name : ''}</h1>
            <p id="address-display">${user.address ? user.address : ''}</p>
            <p id="passport-display">${user.passport_number ? user.passport_number : ''}</p>`;
};

const calculateTotalPrice = () => {
    const departurePrice = parseInt(selectedDepartureFlight.price);
    const returnPrice = selectedReturnFlight ? parseInt(selectedReturnFlight.price) : 0;
    totalPrice = (departurePrice + returnPrice) * seatsSelected.length;
};

const handleSeatSelect = (event) => {
    const seat = event.target;
    const seatId = seat.textContent;

    const seatIndex = seatsSelected.indexOf(seatId);

    if (seatIndex !== -1) {
        seatsSelected.splice(seatIndex, 1);
        seat.classList.remove('clicked');
    } else {
        seatsSelected.push(seatId);
        seat.classList.add('clicked');
    }

    calculateTotalPrice();
};

selectSeatsBtns.forEach((btn) => {
    btn.addEventListener('click', handleSeatSelect);
});

checkOutBtn.addEventListener('click', async (event) => {
    event.preventDefault();

    if (seatsSelected.length === 0) {
        popup.classList.remove('hidden');
        popupMessage.innerText = 'Please select at least one seat';
        return;
    }
    calculateTotalPrice();
    try {
        const response = await addBooking(
            currentUser.id,
            selectedDepartureFlight.id,
            seatsSelected.length,
            selectedReturnFlight.id
        );
        if (response) {
            localStorage.setItem('bookingId', response);
        }
    } catch (error) {
        popup.classList.remove('hidden');
        popupMessage.innerText = error;
    }

    localStorage.setItem('seatsSelected', JSON.stringify(seatsSelected));
    localStorage.setItem('totalPrice', JSON.stringify(totalPrice));
    window.location.href = '/frontend/pages/payment.html';
});

loginBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '../pages/signin.html';
});

cancelBtn.addEventListener('click', () => {
    localStorage.removeItem('selectedDepartureFlight');
    localStorage.removeItem('selectedReturnFlight');
    window.location.href = '../pages/search.html';
});

getSelectedFlights();
getUser(currentUser.id).then((user) => {
    populateUserDetails(user);
});
