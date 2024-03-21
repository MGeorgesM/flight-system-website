const allFlightsElements = document.querySelectorAll(".all-flights");
const deleteBtn = document.getElementById("delete-btn");
const editBtn = document.getElementById("edit-btn");
const departureLocation= document.getElementById("departure-location");
const destination= document.getElementById("destination");
const departureDate= document.getElementById("departure-date");
const arrivalDate= document.getElementById("arrival-date");
const code= document.getElementById("code");
const price= document.getElementById("price");
const newstatus= document.getElementById("status");
const airlineName= document.getElementById("airline-name");
const addBtn = document.getElementById("add-btn");

const showingAllFlights = (flights, elementIndex) => {
  const index = Array.from(allFlightsElements).indexOf(elementIndex);
  elementIndex.innerHTML = generateFlightHtml(flights, index);
};

const generateFlightHtml = (flights, index) => {
  let html = "";
  flights.forEach((flight) => {
    html += `
            <tr>   
                <td>${flight.departure_location}</td>
                <td>${flight.destination}</td>
                <td>${flight.departure_date}</td>
                <td>${flight.arrival_date}</td>
                <td>${flight.code}</td>
                <td>${flight.price}</td>
                <td>${flight.airline_name}</td>
                <td>${flight.status}</td>`;
    if (index === 1) {
      html += `<td><button  data-flight-id="${flight.id}">Edit</button></td>`;
    } else if (index === 2) {
      html += `<td><button class="delete-btn" onclick="deleteflightwithId(${flight.id})">Delete</button></td>`;
    }
    html += `</tr>`;
  });
  return html;
};

const getFlightDataInputs = () => {
    flightData = {
      departure_location: departureLocation.value,
      destination: destination.value,
      departure_date: departureDate.value,
      arrival_date: arrivalDate.value,
      code: code.value,
      price: price.value,
      status: newstatus.value,
      airline_id: 1
    };
    console.log(flightData);
    return flightData;
  };
allFlightsElements.forEach((element) => {
  getAllFlights((flights) => showingAllFlights(flights, element));
});
const deleteflightwithId = (flightId) => {
  console.log("Deleting flight with ID:", flightId);
  deleteFlight(
    flightId,
    allFlightsElements.forEach((element) => {
      getAllFlights((flights) => showingAllFlights(flights, element));
    })
  );
};
addBtn.addEventListener("click", () => {
  addFlight( getFlightDataInputs(), () => {
    allFlightsElements.forEach((element) => {
      getAllFlights((flights) => showingAllFlights(flights, element));
    });
  });
});
