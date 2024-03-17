<?php
include('../connection.php');


if (empty($_GET['payment_id'])) {
    $get_payments = $mysqli->prepare("SELECT * FROM payments;");
    $get_payments->execute();
    $get_payments->store_result();
    $get_payments->bind_result($id, $user_id, $booking_id, $amount, $date, $status);
    while ($get_payments->fetch()) {
        $payment = [
            'id' => $id,
            'user_id' => $user_id,
            'booking_id' => $booking_id,
            'amount' => $amount,
            'date' => $date,
            'status' => $status
        ];

        $payments[] = $payment;
    }
    $response['status'] = 1;
    $response['payments'] = $payments;
    echo json_encode($response);
    exit();
}

$payment_id = $_GET['payment_id'];

$check_payment = $mysqli->prepare("SELECT * FROM payments WHERE id = ?;");
$check_payment->bind_param("i", $payment_id);
$check_payment->execute();
$check_payment->store_result();

if($check_payment->num_rows === 0){
    $response['status'] = 0;
    $response['message'] = "Invalid payment id";
    echo json_encode($response);
    exit();
}

$check_payment->bind_result($id, $user_id, $booking_id, $amount, $date, $status);
$check_payment->fetch();
$payment = [
    'id' => $id,
    'user_id' => $user_id,
    'booking_id' => $booking_id,
    'amount' => $amount,
    'date' => $date,
    'status' => $status
];

$response['status'] = 1;
$response['payment'] = $payment;
echo json_encode($response);


