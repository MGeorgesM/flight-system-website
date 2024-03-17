<?php
include('../connection.php');

$user_id = $_POST['user_id'];
$email = $_POST['email'];
$payment_id = $_POST['payment_id'];

$check_admin = $mysqli->prepare("SELECT * FROM admins WHERE id = ? AND email = ?;");
$check_admin->bind_param("is", $user_id, $email);
$check_admin->execute();
$check_admin->store_result();

if($check_admin->num_rows === 0){
    $response['status'] = 'error';
    $response['message'] = "Sorry you are not an admin, access denied";
    echo json_encode($response);
    exit();
}

$check_payment = $mysqli->prepare("SELECT user_id, booking_id, amount FROM payments WHERE id = ? AND status = 'accepted';");
$check_payment->bind_param("i", $payment_id);
$check_payment->execute();
$check_payment->store_result();

if($check_payment->num_rows === 0){
    $response['status'] = 'error';
    $response['message'] = "Invalid payment, no refund possible";
    echo json_encode($response);
    exit();
}

$check_payment->bind_result($user_id, $booking_id, $amount);
$check_payment->fetch();

$refund_user_coins = $mysqli->prepare("UPDATE users SET coins = coins + ? WHERE id = ?;");
$refund_user_coins->bind_param("ii", $amount, $user_id);
$refund_success = $refund_user_coins->execute();

$adjust_payment_status = $mysqli->prepare("UPDATE payments SET status = 'refunded' WHERE id = ?;");
$adjust_payment_status->bind_param("i", $payment_id);
$status_update_success = $adjust_payment_status->execute();

$adjust_booking_status = $mysqli->prepare("UPDATE bookings SET booking_status = 'cancelled' WHERE id = ? AND user_id = ?;");
$adjust_booking_status->bind_param("ii", $booking_id, $user_id);
$status_booking_success = $adjust_booking_status->execute();

if($refund_success && $status_update_success && $status_booking_success){
    $response['status'] = 'success';
    $response['message'] = "Refund successful";
    echo json_encode($response);
    exit();
}else{
    $response['status'] = 'error';
    $response['message'] = "Refund failed";
    echo json_encode($response);
    exit();
}