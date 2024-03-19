<?php
include("../connection.php");

$user_id = $_POST['user_id'];
$amount = $_POST['amount'];

$find_user = $mysqli->prepare('SELECT * from users  where id = ?');
$find_user->bind_param('i', $user_id);
$find_user->execute();
$find_user->store_result();

if($find_user->num_rows == 0) {
    $response['status'] = "error";
    $response['message'] = "User not found";
    echo json_encode($response);
    exit();
}

$insert_coins = $mysqli->prepare('INSERT INTO coins_requests (user_id, amount) VALUES (?, ?)');
$insert_coins->bind_param("ii", $user_id, $amount);
$insert_coins->execute();

$response['status'] = "success";
$response['message'] = "Coins added successfully";
echo json_encode($response);