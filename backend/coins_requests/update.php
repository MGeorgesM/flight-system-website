<?php

include("../connection.php");


if (empty($_POST['user_id']) || empty($_POST['user_email']) || empty($_POST['coins_request_id']) || empty($_POST['status'])){
    $response['status'] = "error";
    $response['message'] = "All fields are required";
    echo json_encode($response);
    exit();
} else {
    $current_user_id = $_POST['user_id'];
    $current_user_email = $_POST['user_email'];
    $coins_request_id = $_POST['coins_request_id'];
    $status = $_POST['status'];
}

$allowed_statuses = ['rejected', 'accepted'];

if(!in_array($status, $allowed_statuses)) {
    $response['status'] = 'error';
    $response['message'] = "Invalid coin request status";
    echo json_encode($response);
    exit;
}

$check_admin_privileges = $mysqli->prepare('SELECT * from admins where id = ? and email = ?');
$check_admin_privileges->bind_param('is', $current_user_id, $current_user_email);
$check_admin_privileges->execute();
$check_admin_privileges->store_result();

if ($check_admin_privileges->num_rows === 0) {
    $response['status'] = "error";
    $response['message'] = "You do not have admin privileges";
    echo json_encode($response);
    exit();
}

$check_coin_request = $mysqli->prepare('SELECT user_id, amount, status from coins_requests where id = ?');
$check_coin_request->bind_param('i', $coins_request_id);
$check_coin_request->execute();
$check_coin_request->store_result();

if ($check_coin_request->num_rows === 0) {
    $response['status'] = "error";
    $response['message'] = "Coin request not found";
    echo json_encode($response);
    exit();
}

$check_coin_request->bind_result($user_id, $requested_amount, $current_status);
$check_coin_request->fetch();

if ($status === 'accepted') {

    if ($current_status === 'accepted') {
        $response['status'] = "error";
        $response['message'] = "Coin request already accepted";
        echo json_encode($response);
        exit();
    }

    $update_balance = $mysqli->prepare("UPDATE users SET coins = coins + ? WHERE id = ?");
    $update_balance->bind_param('ii', $requested_amount, $user_id );
    $update_balance->execute();

    $update_status = $mysqli->prepare("UPDATE coins_requests SET status = ? WHERE user_id = ? AND id=?");
    $update_status->bind_param("sii", $status, $user_id, $coins_request_id);
    $update_status->execute();

    $response['status'] = "success";
    $response['message'] = "Coins added successfully";
    echo json_encode($response);

    
} else {

    $update_status = $mysqli->prepare("UPDATE coins_requests SET status = ? WHERE user_id = ? AND id=?");
    $update_status->bind_param("sii", $status, $user_id, $coins_request_id);
    $update_status->execute();
    $response['status'] = "error";
    $response['message'] = "Coins request rejected";
    echo json_encode($response);
}





