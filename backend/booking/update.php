<?php
include('../connection.php');

$id = $_POST['booking_id'];
$booking_status = $_POST['booking_status'];
$payment_status = $_POST['payment_status'];

$find_booking = $mysqli->prepare("SELECT * FROM bookings WHERE id = ?");
$find_booking->bind_param('i', $id);
$find_booking->execute();
$find_booking->store_result();

if($find_booking->num_rows == 0) {
    $response['status'] = 0;
    $response['message'] = "Booking not found";
    echo json_encode($response);
    exit;
}

$update_booking = $mysqli->prepare("UPDATE bookings SET booking_status = ?, payment_status = ? WHERE id = ?");
$update_booking->bind_param('ssi', $booking_status, $payment_status, $id);
$update_booking->execute();


$find_booking->execute();
$find_booking->store_result();
$find_booking->bind_result($id, $user_id, $flight_id, $booking_status, $passengers_number, $payment_status);
$find_booking->fetch();
$updated_booking = [
    'id' => $id,
    'user_id' => $user_id,
    'flight_id' => $flight_id,
    'booking_status' => $booking_status,
    'passengers_number' => $passengers_number,
    'booking_status' => $booking_status,
    'payment_status' => $payment_status
];

$response['status'] = 1;
$response['message'] = "Booking updated";
$response['data'] = $updated_booking;

echo json_encode($response);
