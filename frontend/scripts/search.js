const sectionDeparture = document.getElementById('select-departure');
const sectionReturn = document.getElementById('select-return');

const proceedBtn = document.getElementById('proceed-btn');

let selectBtns = [];
let departureFlights = [];
let returnFlights = [];
let selectedDepartureFlightId = null;
let selectedReturnFlightId = null;

const deleteClickedFlightsFromLocalStorage = () => {
    localStorage.removeItem('selectedDepartureFlightId');
    localStorage.removeItem('selectedReturnFlightId');
}

const loadClickedFlightsFromLocalStorage = () => {
    selectedDepartureFlightId = JSON.parse(localStorage.getItem('selectedDepartureFlightId'));
    selectedReturnFlightId = JSON.parse(localStorage.getItem('selectedReturnFlightId'));
}

const resetSearchSection = (direction) => {
    const color = direction === 'Departure' ? 'dark-text' : 'off-white-text';
    return `<div class="select-section-title ${color}">
            <h1>Select ${direction}</h1>
        </div>`;
};

const populateRatingStars = (rating) => {
    let ratingStars = '';

    for (let i = 0; i < Math.round(rating); i++) {
        ratingStars += `<i class="fa-solid fa-star"></i>`;
    }

    for (let i = 0; i < 5 - Math.round(rating); i++) {
        ratingStars += `<i class="fa-regular fa-star"></i>`;
    }

    return ratingStars;
};

const formatDate = (date) => {
    const newDate = new Date(date);
    return newDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
    });
};

const populateSearchCard = async (flight) => {
    const airlineName = await getAirlines(flight.airline_id);
    const airlineRating = await getFlightOrAirlineAverageRating(flight.airline_id, 'airline');
    const airlineRatingStars = populateRatingStars(airlineRating);

    const flightRating = await getFlightOrAirlineAverageRating(flight.id, 'flight');
    const flightRatingStars = populateRatingStars(flightRating);

    return populateSearchCardHtml(airlineName.airline_name, airlineRatingStars, flight, flightRatingStars);
};

const populateSearchCardHtml = (airlineName, airlineRatingStars, flight, flightRatingStars) => {
    return `<div class="result-card flex off-white-bg box-shadow primary-text border-radius">
            <div class="result-card-location flex space-around">
                <div class="display-time-location flex column center">
                    <h2 class="departure-location-display">${flight.departure_location}</h2>
                    <h2 class="departure-location-display">${formatDate(flight.departure_date)}</h2>
                </div>
                <div class="arrow-img flex center">
                    <img src="/frontend/assets/Arrow.svg" alt="arrow">
                </div>
                <div class="display-time-location flex column center">
                <h2 class="destination-location-display">${flight.destination}</h2>
                <h2 class="destination-location-display">${formatDate(flight.arrival_date)}</h2>
                </div>
            </div>
            <div class="result-card-ratings flex space-around">
                <div class="rating-flight flex column center">
                    <h2 class="flight-code-display">${flight.code}</h2>
                    <div class="rating-stars flex center">${flightRatingStars}</div>
            </div>
            <div class="rating-airline flex column center">
                <h2 class="airline-name-display">${airlineName}</h2>
                <div class="rating-stars flex center">${airlineRatingStars}</div>
            </div>
        </div>
        <div class="result-card-price flex">
            <h1 class="price-display">$${flight.price}</h1>
            <button flight-id="${flight.id}" class="select-btn box-shadow border-radius">Select</button>
        </div>
        </div>`;
};

const getSearchResult = async () => {
    sectionDeparture.innerHTML = resetSearchSection('Departure');
    sectionReturn.innerHTML = resetSearchSection('Return');
    departureFlights = JSON.parse(localStorage.getItem('departureFlights'));
    returnFlights = JSON.parse(localStorage.getItem('returnFlights'));

    departureFlights &&
        departureFlights.forEach(async (flight) => {
            const html = await populateSearchCard(flight);
            sectionDeparture.innerHTML += html;
            addSelectBtnEventListener(sectionDeparture);
        });

    if (returnFlights) {
        returnFlights.forEach(async (flight) => {
            const html = await populateSearchCard(flight);
            sectionReturn.innerHTML += html;
            addSelectBtnEventListener(sectionReturn);
            sectionReturn.classList.remove('hidden');
        });
    } else {
        returnClicked = true;
        sectionReturn.classList.add('hidden');
    }
};


const addSelectBtnEventListener = () => {
    const selectBtns = document.querySelectorAll('.select-btn');

    selectBtns.forEach((btn) => {
        btn.addEventListener('click', (event) => {
            const flightId = parseInt(btn.getAttribute('flight-id'));
            const sectionId = event.target.closest('section').id;

            const section = sectionId === 'select-departure' ? sectionDeparture : sectionReturn;
            section.querySelectorAll('.select-btn').forEach((btn) => {
                btn.classList.remove('clicked');
            });

            btn.classList.toggle('clicked');

            if (sectionId === 'select-departure') {
                localStorage.setItem('selectedDepartureFlightId', flightId);
            } else {
                localStorage.setItem('selectedReturnFlightId', flightId);
            }
        });
    });
};

proceedBtn.addEventListener('click', () => {
    loadClickedFlightsFromLocalStorage();

    if (returnFlights && returnFlights.length > 0) {

        if (!selectedDepartureFlightId || !selectedReturnFlightId) {
            showPopup('Please select both departure and return flights.');
            return;
        }
    } else {

        if (!selectedDepartureFlightId) {
            showPopup('Please select a departure flight.');
            return;
        }
    }
    window.location.href = '/frontend/pages/booking.html';
});

continueBtn.addEventListener('click', () => {
    popup.classList.add('hidden');
});

deleteClickedFlightsFromLocalStorage();
getSearchResult();
