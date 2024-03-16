<?php
include('../connection.php');

$user_id = $_POST['user_id'];
$flight_id = $_POST['flight_id'];
$passengers_number = $_POST['passengers_number'];

$find_flight = $mysqli->prepare("SELECT * FROM flights WHERE id = ?");
$find_flight->bind_param('i', $flight_id);
$find_flight->execute();
$find_flight->store_result();

$find_user = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
$find_user->bind_param('i', $user_id);
$find_user->execute();
$find_user->store_result();

if($find_flight->num_rows == 0) {
    $response['status'] = 0;
    $response['message'] = "Flight not found";
    echo json_encode($response);
    exit;
}

if($find_user->num_rows == 0) {
    $response['status'] = 0;
    $response['message'] = "User not found";
    echo json_encode($response);
    exit;
}

$add_booking = $mysqli->prepare("INSERT INTO bookings (user_id, flight_id, passengers_number) VALUES (?, ?, ?)");
$add_booking->bind_param('iii', $user_id, $flight_id, $passengers_number);
$add_booking->execute();

$response['status'] = 1;
$response['message'] = "Booking added";
echo json_encode($response);