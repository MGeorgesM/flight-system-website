<?php

include("../connection.php");

$departure_location = $_POST['departure_location'];
$destination = $_POST['destination'];
$departure_date = $_POST['departure_date'];
$arrival_date = $_POST['arrival_date'];
$price = $_POST['price'];
$status = $_POST['status'];
$airline_id = $_POST["airline_id"];

$query = $mysqli->prepare("INSERT INTO flights (departure_location, destination, departure_date, arrival_date, price, status, airline_id) VALUES (?, ?, ?, ?, ?, ?, ?)");
$query->bind_param('ssssdsi', $departure_location, $destination, $departure_date, $arrival_date, $price, $status, $airline_id);



if ($query->execute()) {
    $inserted_id = $mysqli->insert_id;
    $flight_details = [
        'id' => $inserted_id,
        'deprature_location' => $departure_location,
        'destination' => $destination,
        'departure_date' => $departure_date,
        'arrival_date' => $arrival_date,
        'price' => $price,
        'status' => $status,
        'airline_id' => $airline_id
    ];
    $response['status'] = 'success';
    $response['flights'] = $flight_details;
} else {
    $response['status'] = 'error';
}
echo json_encode($response);
