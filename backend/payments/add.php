<?php
include('../connection.php');

if(empty($_POST['user_id']) || empty($_POST['booking_id'])){
    $response['status'] = "error";
    $response['message'] = "All fields are required";
    echo json_encode($response);
    exit();
}

$user_id = $_POST['user_id'];
$booking_id = $_POST['booking_id'];

function get_flight_price($flight_id){
    global $mysqli;
    $get_flight = $mysqli->prepare("SELECT price FROM flights WHERE id = ?;");
    $get_flight->bind_param("i", $flight_id);
    $get_flight->execute();
    $get_flight->store_result();
    $get_flight->bind_result($price);
    $get_flight->fetch();
    return $price;
}

$check_booking = $mysqli->prepare("SELECT * FROM bookings WHERE id = ? AND user_id = ? AND booking_status = 'pending' ;");
$check_booking->bind_param("ii", $booking_id, $user_id);
$check_booking->execute();
$check_booking->store_result();

if($check_booking->num_rows === 0){
    $response['status'] = 'error';
    $response['message'] = "Payment already done or booking does not exist!";
    echo json_encode($response);
    exit();
}    

$flights_id_query = $mysqli->prepare("SELECT departure_flight_id, return_flight_id FROM bookings WHERE id = ?;");
$flights_id_query->bind_param("i", $booking_id);
$flights_id_query->execute();
$flights_id_query->store_result();
$flights_id_query->bind_result($departure_flight_id, $return_flight_id);
$flights_id_query->fetch();

$get_total_passengers = $mysqli->prepare("SELECT passengers_number FROM bookings WHERE id = ?;");
$get_total_passengers->bind_param("i", $booking_id);
$get_total_passengers->execute();
$get_total_passengers->store_result();
$get_total_passengers->bind_result($total_passengers);
$get_total_passengers->fetch();

$total_price = 0;

if($return_flight_id !== null){
    $total_price = (get_flight_price($departure_flight_id) + get_flight_price($return_flight_id)) * $total_passengers;
}else{
    $total_price = get_flight_price($departure_flight_id) * $total_passengers;
}

$check_user_coins = $mysqli->prepare("SELECT * FROM users WHERE id = ? AND coins >= ?;");
$check_user_coins->bind_param("ii", $user_id, $total_price);
$check_user_coins->execute();
$check_user_coins->store_result();


if($check_user_coins->num_rows === 0){
    $response['status'] = 'error';
    $response['message'] = "Insufficient coins";
    echo json_encode($response);
    exit();
}

$add_payment = $mysqli->prepare("INSERT INTO payments (user_id, booking_id, amount) VALUES (?, ?, ?)");
$add_payment->bind_param("iii", $user_id, $booking_id, $total_price);
$add_payment->execute();

$adjust_booking_status = $mysqli->prepare("UPDATE bookings SET booking_status = 'confirmed' WHERE id = ?");
$adjust_booking_status->bind_param("i", $booking_id);
$adjust_booking_status->execute();

$deduct_coins = $mysqli->prepare("UPDATE users SET coins = coins - ? WHERE id = ?");
$deduct_coins->bind_param("ii",$total_price, $user_id);
$deduct_coins->execute();

$response['status'] = 'success';
$response['message'] = "Payment successful";
echo json_encode($response);