<?php

include('../connection.php');

$id = $_POST['id'];
$departure_location = $_POST['departure_location'];
$destination = $_POST['destination'];
$departure_date = $_POST['departure_date'];
$arrival_date = $_POST['arrival_date'];
$price = $_POST['price'];
$status = $_POST['status'];
$airline_id = $_POST['airline_id'];

$query = $mysqli->prepare("UPDATE flights
    SET departure_location=?, destination=?, departure_date=?, arrival_date=?, price=?, status=?, airline_id=?
    WHERE id=?");

$query->bind_param('ssssdiii', $departure_location, $destination, $departure_date, $arrival_date, $price, $status, $airline_id, $id); 

if ($query->execute()) {    
    $flightData = [
        'id' => $id,
        'departure_location' => $departure_location,
        'destination' => $destination,
        'departure_date' => $departure_date,
        'arrival_date' => $arrival_date,
        'price' => $price,
        'status' => $status,
        'airline_id' => $airline_id
    ];

    $response['status'] = 'success';
    $response['message'] = 'Flight updated successfully.';
    $response['flight_data'] = $flightData;

} else {
    $response['status'] = 'error';
    $response['message'] = 'Failed to update flight.';
}

echo json_encode($response);
?>
