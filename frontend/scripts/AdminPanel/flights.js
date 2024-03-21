const allFlightsElements = document.querySelectorAll(".all-flights");
const deleteBtn=document.getElementById("delete-btn");
const editBtn=document.getElementById("edit-btn");
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
            html += `<td><button id="edit-btn">Edit</button></td>`;
        } else if (index === 2) {
            html += `<td><button id="delete-btn">Delete</button></td>`;
        }
        html += `</tr>`;
    });
    return html;
};

allFlightsElements.forEach((element) => {
    getAllFlights((flights) => showingAllFlights(flights, element));
});
