<?php
include('../connection.php');

$user_id = $_POST['user_id'];
$booking_id = $_POST['booking_id'];
// $payment_amount = $_POST['payment_amount'];


$check_user = $mysqli->prepare("SELECT * FROM users WHERE user_id = ?;");
$check_user->bind_param("i", $user_id);
$check_user->execute();
$check_user->store_result();

$check_booking = $mysqli->prepare("SELECT * FROM bookings WHERE booking_id = ? AND user_id = ?;");
$check_booking->bind_param("ii", $booking_id, $user_id);
$check_booking->execute();
$check_booking->store_result();


if($check_user->num_rows === 0 || $check_booking->num_rows === 0){
    $response['status'] = 0;
    $response['message'] = "Invalid user or booking";
    echo json_encode($response);
    exit();
}

$get_departure_flight = $mysqli->prepare("SELECT price FROM flights JOIN bookings ON flights.id = bookings.departure_flight_id WHERE b.id = ?;");
$get_departure_flight->bind_param("i", $booking_id);
$get_departure_flight->execute();
$get_departure_flight->store_result();
$get_departure_flight->bind_result($departure_flight_price);
$get_departure_flight->fetch();

$get_return_flight = $mysqli->prepare("SELECT price FROM flights JOIN bookings ON flights.id = bookings.return_flight_id WHERE b.id = ?;");
$get_return_flight->bind_param("i", $booking_id);
$get_return_flight->execute();
$get_return_flight->store_result();

if($get_return_flight->num_rows === 0){
    $return_flight_price = 0;
}else{
    $get_return_flight->bind_result($return_flight_price);
    $get_return_flight->fetch();
}

$check_user_coins = $mysqli->prepare("SELECT * FROM users WHERE user_id = ? AND coins >= ? + ?;");
$check_user_coins->bind_param("ii", $user_id, $departure_flight_price, $return_flight_price);
$check_user_coins->execute();
$check_user_coins->store_result();


if($check_user_coins->num_rows === 0){
    $response['status'] = 0;
    $response['message'] = "Insufficient coins";
    echo json_encode($response);
    exit();
}

$add_payment = $mysqli->prepare("INSERT INTO payments (user_id, booking_id, amount) VALUES (?, ?, ?)");
$add_payment->bind_param("iii", $user_id, $booking_id, $payment_amount);
$add_payment->execute();

$adjust_booking_status = $mysqli->prepare("UPDATE bookings SET booking_status = 'confirmed' WHERE booking_id = ?");
$adjust_booking_status->bind_param("i", $booking_id);
$adjust_booking_status->execute();

$deduct_coins = $mysqli->prepare("UPDATE users SET coins = coins - ? WHERE user_id = ?");
$deduct_coins->bind_param("ii", $payment_amount, $user_id);
$deduct_coins->execute();

$response['status'] = 1;
$response['message'] = "Payment successful";
echo json_encode($response);