const loginBtn = document.getElementById('login-btn');
const profileBtn = document.getElementById('profile-link');

const searchBtn = document.getElementById('search-btn');

const popup = document.getElementById('popup');
const popupMessage = document.getElementById('popup-message');

const continueBtn = document.getElementById('continue-btn');

let currentUser = null;




// const searchForFlights = (departure_location, destination, departure_date, return_date) => {
//     const flights = JSON.parse(localStorage.getItem('flights'));
    
//     if (!flights) return false;

//     const departureDateInput = new Date(departure_date);
//     const returnDateInput = return_date ? new Date(return_date) : null;
//     let returnFlights = [];

//     departureFlights = flights.filter((flight) => {
//         const flightDepartureDbDate = new Date(flight.departure_date);
//         return (
//             flight.departure_location.toLowerCase() === departure_location.toLowerCase() &&
//             flight.destination.toLowerCase() === destination.toLowerCase() &&
//             flightDepartureDbDate.getTime() >= departureDateInput.getTime()
//         );
//     });

//     console.log('departure found 1', departureFlights)

//     if (departureFlights.length === 0) return false;

//     if (returnDateInput) {
//         returnFlights = flights.filter((flight) => {
//             const flightReturnDbDate = new Date(flight.departure_date);
//             return (
//                 flight.destination.toLowerCase() === departure_location.toLowerCase() &&
//                 flight.departure_location.toLowerCase() === destination.toLowerCase() &&
//                 flightReturnDbDate.getTime() >= returnDateInput.getTime()
//             );
//         });

//         if (returnFlights.length === 0) return false;

//         departureFlights = departureFlights.filter((flight) => {
//             const flightDepartureDate = new Date(flight.departure_date);
//             return flightDepartureDate.getTime() < returnDateInput.getTime();
//         });

//         console.log('departure found 2', departureFlights)

//         if (departureFlights.length === 0) return false;
//     }

//     departureFlights.sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date));
//     returnFlights.sort((a, b) => new Date(a.departure_date) - new Date(b.departure_date));
    

//     localStorage.setItem('departureFlights', JSON.stringify(departureFlights));
//     localStorage.setItem('returnFlights', JSON.stringify(returnFlights));

//     return true;
// };

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

// searchBtn && searchBtn.addEventListener('submit', (event) => {
//     event.preventDefault();
//     if (!currentUser) {
//         window.location.href = '/frontend/pages/signin.html';
//         localStorage.clear();
//     }
//     const departureLocationInputValue = departureLocationInput.value;
//     const destinationInputValue = destinationInput.value;
//     const departureDateInputValue = new Date(departureDateInput.value);
//     const returnDateInputValue = returnDateInput.value
//         ? new Date(returnDateInput.value) : null;

//     console.log(departureLocationInputValue)
//     console.log(destinationInputValue)
//     console.log(departureDateInputValue)
//     console.log(returnDateInputValue)

//     let flightsFound = searchForFlights(
//         destinationInputValue,
//         departureLocationInputValue,
//         departureDateInputValue,
//         returnDateInputValue
//     );

//     if (flightsFound) {
//         // window.location.href = '/frontend/pages/search.html';
//     } else {    
//         showPopup('No flights found. Please adjust your search criteria.');
//     }

//     flightsFound && (window.location.href = '/frontend/pages/search.html');
// });

checkCurrentUser();
checkCurrentUserisAdmin(currentUser.id, currentUser.email).then((isAdmin) => {
    if (isAdmin) {
        console.log('im her')
        profileBtn.innerHTML = 'Admin Panel';
    } else {
        profileBtn.innerHTML = 'Profile';
    }
});


