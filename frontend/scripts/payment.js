const userDisplay = document.getElementById('user-display');
const flightDepartureDisplay = document.getElementById('flight-departure-display');
const flightReturnDisplay = document.getElementById('flight-return-display');
const seatsDisplay = document.getElementById('seats-display');
const totalPriceDisplay = document.getElementById('total-price-display');
const validationDisplay = document.getElementById('payment-validation-display');
const userCoinsDisplay = document.getElementById('user-coins-display');

const checkoutBtn = document.getElementById('checkout-btn');
const cancelBtn = document.getElementById('cancel-btn');

let totalPrice = null;

const populateFlightDetails = () => {
    const departureFlight = JSON.parse(localStorage.getItem('selectedDepartureFlight'));
    const returnFlight = JSON.parse(localStorage.getItem('selectedReturnFlight'));

    flightDepartureDisplay.innerText = `${departureFlight.code} - $${departureFlight.price}`;
    flightReturnDisplay.innerText = returnFlight ? `${returnFlight.code} - $${returnFlight.price}` : 'No Return';
};

const populateSeatsDisplay = () => {
    const seats = JSON.parse(localStorage.getItem('selectedSeats'));
    seatsDisplay.innerText = seats.join(', ');
};

const populateTotalPrice = () => {
    const totalPrice = JSON.parse(localStorage.getItem('totalPrice'));
    totalPriceDisplay.innerText = `$${totalPrice}`;
};

getUser(currentUser.id).then((user) => {
    userDisplay.innerText = `${user.first_name} ${user.last_name}`;
    userCoinsDisplay.innerText = user.coins;
    populateFlightDetails();
    populateSeatsDisplay();
    populateTotalPrice();
});

checkoutBtn.addEventListener('click', async () => {
    try {
        const response = await addPayment(currentUser.id, totalPrice);
        if (response.data.status === 'success') {
            showPopup('Payment Successful');
            setTimeout(() => {
                window.location.href = '/frontend/pages/user.html';
            }, 2000);
        }
    } catch (error) {
        validationDisplay.innerText = error;
    }
});
