<?php

include("connection.php");

$user_id = $_POST['user_id'];
$amount = $_POST['amount'];


$find_user = $mysqli->prepare('select * from users where id = ?');
$find_user->bind_param('i', $user_id);
$find_user->execute();
$find_user->store_result();

// var_dump($user_id,$amount,$status,$amount);
if($find_user->num_rows == 0) {
    $response['status'] = 0;
    $response['message'] = "User not found";
    echo json_encode($response);
    
}
$insert_coins = $mysqli->prepare('INSERT INTO coin_requests (user_id, amount) VALUES (?, ?)');
$insert_coins->bind_param("ii", $user_id, $amount);
$insert_coins->execute();
    

$new_coins = $amount; 
$update_balance = $mysqli->prepare("UPDATE users SET coins = coins + ? WHERE id = ?");
$update_balance->bind_param('ii', $new_coins, $user_id);
$update_balance->execute();

$response['status'] = 1;
$response['message'] = "Coins added successfully";
} else {
    $response['status'] = 0;
    $response['message'] = "Error adding coins: " . $mysqli->error;
}

echo json_encode($response);






