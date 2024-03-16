<?php
include('../connection.php');

$id = $_GET['booking_id'];
$user_id = $_GET['user_id'];


if(isset($id) && !empty($id)) {
    $find_booking = $mysqli->prepare("SELECT * FROM bookings WHERE id = ?");
    $find_booking->bind_param('i', $id);
    $find_booking->execute();
    $find_booking->store_result();

    
    if ($find_booking->num_rows == 0) {
        $response['status'] = 0;
        $response['message'] = "Booking not found";
        echo json_encode($response);
        exit;
    }

    $find_booking->bind_result($id, $user_id, $flight_id, $booking_status, $passengers_number, $payment_status);
    $find_booking->fetch();
    $booking = [
        'id' => $id,
        'user_id' => $user_id,
        'flight_id' => $flight_id,
        'booking_status' => $booking_status,
        'passengers_number' => $passengers_number,
        'booking_status' => $booking_status,
        'payment_status' => $payment_status
    ];

    $response['status'] = 1;
    $response['message'] = "Booking found";
    $response['data'] = $booking; 
    echo json_encode($response);

} else {
    $find_bookings = $mysqli->prepare("SELECT * FROM bookings WHERE user_id = ?");
    $find_bookings->bind_param('i', $user_id);
    $find_bookings->execute();
    $find_bookings->store_result();

    if ($find_bookings->num_rows == 0) {
        $response['status'] = 0;
        $response['message'] = "No bookings found";
        echo json_encode($response);
        exit;
    }

    $find_bookings->bind_result($id, $user_id, $flight_id, $booking_status, $passengers_number, $payment_status);
    while ($find_bookings->fetch()) {
        $bookings[] = [
            'id' => $id,
            'user_id' => $user_id,
            'flight_id' => $flight_id,
            'booking_status' => $booking_status,
            'passengers_number' => $passengers_number,
            'booking_status' => $booking_status,
            'payment_status' => $payment_status
        ];
    }
    
    $response['status'] = 1;
    $response['message'] = "Bookings found";
    $response['data'] = $bookings;
    echo json_encode($response);
}