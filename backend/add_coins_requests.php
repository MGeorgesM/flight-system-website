<?php

include("connection.php");

$user_id = $_POST['user_id'];
$amount = $_POST['amount'];
$status = 'pending';


$find_user = $mysqli->prepare('SELECT * from users  where id = ?');
$find_user->bind_param('i', $user_id);
$find_user->execute();
$find_user->store_result();

// var_dump($user_id,$amount,$status,$amount);
if($find_user->num_rows == 0) {
    $response['status'] = "Error";
    $response['message'] = "User not found";
    echo json_encode($response);
    
}else{
    $insert_coins = $mysqli->prepare('INSERT INTO coin_requests (user_id, amount,status) VALUES (?, ?, ?)');
    $insert_coins->bind_param("iis", $user_id, $amount,$status);
    $insert_coins->execute();

    $response['status'] = "success";
    $response['message'] = "Coins requested successfully";
    echo json_encode($response);

}





