const userDisplay = document.getElementById('user-display');
const flightDepartureDisplay = document.getElementById('flight-departure-display');
const flightReturnDisplay = document.getElementById('flight-return-display');
const seatsDisplay = document.getElementById('seats-display');
const totalPriceDisplay = document.getElementById('total-price-display');
const validationDisplay = document.getElementById('payment-validation-display');
const userCoinsDisplay = document.getElementById('user-coins-display');

const checkoutBtn = document.getElementById('checkout-btn');
const cancelBtn = document.getElementById('cancel-btn');

const departureFightId = JSON.parse(localStorage.getItem('selectedDepartureFlightId')) || null;
const returnFightId = JSON.parse(localStorage.getItem('selectedReturnFlightId')) || null;
const bookingId = JSON.parse(localStorage.getItem('bookingId')) || null;

let totalPrice = null;
let departureFlight = null;
let returnFlight = null;

const populateSeatsDisplay = () => {
    const seats = JSON.parse(localStorage.getItem('seatsSelected'));
    seatsDisplay.innerText = seats.join(', ');
};

const populateTotalPrice = () => {
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    totalPriceDisplay.innerText = `${totalPrice}`;
};

getUser(currentUser.id).then((user) => {
    userDisplay.innerText = `${user.first_name} ${user.last_name}`;
    userCoinsDisplay.innerText = user.coins;
    populateSeatsDisplay();
    populateTotalPrice();
});

getFlights(departureFightId).then((flight) => {
    flightDepartureDisplay.innerText = `${flight.code} - $${flight.price}`;
});

getFlights(returnFightId).then((flight) => {
    flightReturnDisplay.innerText = `${flight.code} - $${flight.price}`;
});

checkoutBtn.addEventListener('click', async () => {
    try {
        const response = await addPayment(currentUser.id, bookingId);
        if (response.data.status === 'success') {
            popup.classList.remove('hidden');
            popupMessage.innerText = 'Payment Successful Thank you for choosing Journey';
            setTimeout(() => {
                window.location.href = '../index.html';
            }, 3000);
        }
    } catch (error) {
        popup.classList.remove('hidden');
        popupMessage.innerText = error;
    }
});

cancelBtn.addEventListener('click', () => {
    window.location.href = '../pages/booking.html';
});

continueBtn.addEventListener('click', () => {
    window.location.href = '../index.html';
});
