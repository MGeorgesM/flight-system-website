<?php
include('../connection.php');

$booking_id = $_POST['booking_id'];
$booking_status = $_POST['booking_status'];


$allowed_statuses = ['pending', 'confirmed', 'cancelled'];
if(!in_array($booking_status, $allowed_statuses)) {
    $response['status'] = 0;
    $response['message'] = "Invalid booking status";
    echo json_encode($response);
    exit;
}

$find_booking = $mysqli->prepare("SELECT * FROM bookings WHERE id = ?");
$find_booking->bind_param('i', $booking_id);
$find_booking->execute();
$find_booking->store_result();

if($find_booking->num_rows == 0) {
    $response['status'] = 0;
    $response['message'] = "Booking not found";
    echo json_encode($response);
    exit;
}

$update_booking = $mysqli->prepare("UPDATE bookings SET booking_status = ? WHERE id = ?");
$update_booking->bind_param('si', $booking_status, $booking_id);
$update_booking->execute();

$find_booking->execute();
$find_booking->store_result();
$find_booking->bind_result($booking_id, $user_id, $flight_id, $booking_status, $passengers_number);
$find_booking->fetch();
$updated_booking = [
    'id' => $booking_id,
    'user_id' => $user_id,
    'flight_id' => $flight_id,
    'booking_status' => $booking_status,
    'passengers_number' => $passengers_number,
    'booking_status' => $booking_status,
];

$response['status'] = 1;
$response['message'] = "Booking updated";
$response['data'] = $updated_booking;

echo json_encode($response);
