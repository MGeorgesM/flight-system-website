const loginBtn = document.getElementById('login-btn');
const searchSectionDeparture = document.getElementById('select-departure');
const searchSectionReturn = document.getElementById('select-return');
const proceedSection = document.getElementById('proceed');

let selectBtns = [];
let departureFlights = [];
let returnFlights = [];
let departureClicked = false;
let returnClicked = false;

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
                <h2 class="departure-location-display">${flight.departure_location}</h2>
                <div class="arrow-img flex center">
                    <img src="/frontend/assets/Arrow.svg" alt="arrow">
                </div>
                <h2 class="destination-location-display">${flight.destination}</h2>
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
    searchSectionDeparture.innerHTML = resetSearchSection('Departure');
    searchSectionReturn.innerHTML = resetSearchSection('Return');
    departureFlights = JSON.parse(localStorage.getItem('departureFlights'));
    returnFlights = JSON.parse(localStorage.getItem('returnFlights'));

    departureFlights &&
        departureFlights.forEach(async (flight) => {
            const html = await populateSearchCard(flight);
            searchSectionDeparture.innerHTML += html;
            addSelectBtnEventListener(searchSectionDeparture);
        });

    returnFlights &&
        returnFlights.forEach(async (flight) => {
            const html = await populateSearchCard(flight);
            searchSectionReturn.innerHTML += html;
            addSelectBtnEventListener(searchSectionReturn);
        });
};

const addSelectBtnEventListener = (section) => {
    const selectBtns = section.querySelectorAll('.select-btn');

    selectBtns.forEach((btn) => {
        btn.removeEventListener('click', handleButtonClick);
    });

    selectBtns.forEach((btn) => {
        btn.addEventListener('click', handleButtonClick);
    });
};

const handleButtonClick = (event) => {
    const flightId = parseInt(event.target.getAttribute('flight-id'));
    const sectionId = event.target.closest('section').id;
    const selectBtns = document.querySelectorAll(`#${sectionId} .select-btn`);

    if (event.target.classList.contains('clicked')) {
        event.target.innerHTML = 'Select';
        event.target.classList.remove('clicked');
    } else {
        selectBtns.forEach((btn) => {
            btn.innerHTML = 'Select';
            btn.classList.remove('clicked');
        });

        event.target.innerHTML = 'Selected';
        event.target.classList.add('clicked');
    }

    departureFlights.forEach((flight) => {
        if (flight.id === flightId) {
            localStorage.setItem('selectedDepartureFlight', JSON.stringify(flightId));
            departureClicked = !departureClicked;
        } else {
            localStorage.setItem('selectedReturnFlight', JSON.stringify(flightId));
            returnClicked = !returnClicked;
        }

        if (departureClicked && returnClicked) {
            proceedSection.classList.remove('hidden');
        } else {
            proceedSection.classList.add('hidden');
        }
    });
};

loginBtn.addEventListener('click', () => {
    localStorage.clear();
    window.location.href = '../pages/signin.html';
});

getSearchResult();
