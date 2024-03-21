const allFlights = document.getElementById("all-flights");

showingAllFlights = (flights) => {
  return (allFlights.innerHTML = generateFlightHtml(flights));
};
const generateFlightHtml = (flights) => {
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
            <td>${flight.status}</td>
        </tr>`;
  });
  return html;
};
getAllFlights(showingAllFlights);
