<?php
include('../connection.php');

$bookings = []; // Initialize $bookings as an empty array

if(!empty($_GET['user_id'])) {
    $user_id = $_GET['user_id'];
}

if(!empty($_GET['email'])) {
    $user_email = $_GET['email'];
}

if(!empty($_GET['booking_id'])) {
    $booking_id = $_GET['booking_id'];
}

$check_user_is_admin = $mysqli->prepare("SELECT * FROM admins WHERE id = ? AND email = ?");
$check_user_is_admin->bind_param('is', $user_id, $user_email);
$check_user_is_admin->execute();
$check_user_is_admin->store_result();

if($check_user_is_admin->num_rows > 0) {
    $get_all_bookings = $mysqli->prepare("SELECT * FROM bookings");
    $get_all_bookings->execute();
    $get_all_bookings->store_result();
    $get_all_bookings->bind_result($id, $user_id, $departure_flight_id, $return_flight_id , $booking_status, $passengers_number);
    while ($get_all_bookings->fetch()) {
        $booking = [
            'id' => $id,
            'user_id' => $user_id,
            'departure_flight_id' => $departure_flight_id,
            'return_flight_id' => $return_flight_id,
            'booking_status' => $booking_status,
            'passengers_number' => $passengers_number,
        ];
        $bookings[] = $booking;
    }

    $response['status'] = 'success';
    $response['message'] = "All bookings found";
    $response['bookings'] = $bookings;
    echo json_encode($response);
    exit;
}

$check_user_available = $mysqli->prepare("SELECT * FROM users WHERE id = ? AND email = ?");
$check_user_available->bind_param('is', $user_id, $user_email);
$check_user_available->execute();
$check_user_available->store_result();

if($check_user_available->num_rows == 0) {
    $response['status'] = 'error';
    $response['message'] = "User not found";
    echo json_encode($response);
    exit;
}

if(isset($booking_id) && !empty($booking_id)) {
    $find_booking = $mysqli->prepare("SELECT * FROM bookings WHERE id = ?");
    $find_booking->bind_param('i', $booking_id);
    $find_booking->execute();
    $find_booking->store_result();

    
    if ($find_booking->num_rows == 0) {
        $response['status'] = 'error';
        $response['message'] = "Booking not found";
        echo json_encode($response);
        exit;
    }

    $find_booking->bind_result($id, $user_id, $departure_flight_id, $return_flight_id , $booking_status, $passengers_number);
    $find_booking->fetch();
    $booking = [
        'id' => $id,
        'user_id' => $user_id,
        'flight_id' => $flight_id,
        'booking_status' => $booking_status,
        'passengers_number' => $passengers_number,
        'booking_status' => $booking_status,
    ];

    $response['status'] = 'success';
    $response['message'] = "Booking found";
    $response['bookings'] = $booking; 
    echo json_encode($response);

} else {
    $find_bookings = $mysqli->prepare("SELECT * FROM bookings WHERE user_id = ?");
    $find_bookings->bind_param('i', $user_id);
    $find_bookings->execute();
    $find_bookings->store_result();

    if ($find_bookings->num_rows == 0) {
        $response['status'] = 'error';
        $response['message'] = "No bookings found";
        echo json_encode($response);
        exit;
    }

    $find_bookings->bind_result($id, $user_id, $departure_flight_id, $return_flight_id , $booking_status, $passengers_number);
    while ($find_bookings->fetch()) {
        $booking = [
            'id' => $id,
            'user_id' => $user_id,
            'departure_flight_id' => $departure_flight_id,
            'return_flight_id' => $return_flight_id,
            'booking_status' => $booking_status,
            'passengers_number' => $passengers_number,
        ];
        $bookings[] = $booking;
    }
    
    $response['status'] = 'success';
    $response['message'] = "Bookings found";
    $response['bookings'] = $bookings;
    echo json_encode($response);
}
?>
