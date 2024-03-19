const loginBtn = document.getElementById('login-btn');
const searchSectionDeparture = document.getElementById('select-departure');
const searchSectionReturn = document.getElementById('select-return');

let selectBtns = [];
let departureFlights = [];
let returnFlights = [];

const resetSearchSection = () => {
  return `<div class="select-section-title dark-text">
            <h1>Select Departure</h1>
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
            <button flight-id="${flight.id}" class="select-btn box-shadow primary-bg off-white-text border-radius">Select</button>
        </div>
        </div>`;
};

const adjustBtn = (btn) => {
  console.log('adjusting');
  btn.innerHTML === 'Selected' ? 'Select' : 'Selected';
  btn.classlist.toggle('clicked');
};

const getSearchResult = () => {
  departureFlights = JSON.parse(localStorage.getItem('departureFlights'));
  returnFlights = JSON.parse(localStorage.getItem('returnFlights'));

  departureFlights &&
    departureFlights.forEach((flight) => {
      populateSearchCard(flight).then((html) => {
        searchSectionDeparture.innerHTML += html;
      });
    });

  returnFlights &&
    returnFlights.forEach((flight) => {
      populateSearchCard(flight).then((html) => {
        searchSectionReturn.innerHTML += html;
      });
    });
    

    addEventListener();  
};

const populateCards = ()


selectBtns = document.querySelectorAll('.select-btn');
const addEventListener = () => {
  selectBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      console.log('clicked');
      adjustBtn(btn);
    });
  });
};
getSearchResult();

setTimeout(() => {
  console.log(selectBtns);
}, 2000);

