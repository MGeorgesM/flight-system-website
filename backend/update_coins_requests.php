<?php

include("connection.php");
include("add_coins_requests.php");

$user_id = $_POST['user_id'];
$status = $_POST['status'];
// $amount = $_POST['amount'];

$find_user = $mysqli->prepare('SELECT * from users  where id = ?');
$find_user->bind_param('i', $user_id);
$find_user->execute();
$find_user->store_result();

if($find_user->num_rows == 0) {
    $response['status'] = "Error";
    $response['message'] = "User not found";
    echo json_encode($response);
    
}
else{
   $update_balance = $mysqli->prepare("UPDATE coin_requests SET status = ? WHERE id = ?");
   $update_balance->bind_param('si', $status, $user_id);
   $update_balance->execute();

   if($status == "success"){
    
    $new_coins = isset($amount); 
    $update_balance = $mysqli->prepare("UPDATE users SET coins = coins + ? WHERE id = ?");
    $update_balance->bind_param('ii', $new_coins, $user_id);
    $update_balance->execute();

    $response['status'] = "success";
    $response['message'] = "Coins added successfully";
    echo json_encode($response);
   }
   else{
    $response['status'] = "Error";
    $response['message'] = "Coins requeste reject";
    echo json_encode($response);
   }
}




