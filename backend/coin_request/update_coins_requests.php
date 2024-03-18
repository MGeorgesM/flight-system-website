<?php

include("../connection.php");

$user_id = $_POST['user_id'];
$status = $_POST['status'];
$id = $_POST['id'];
$find_user = $mysqli->prepare('SELECT * from users  where id = ?');
$find_user->bind_param('i', $user_id);
$find_user->execute();
$find_user->store_result();

if($find_user->num_rows == 0) {
    $response['status'] = "Error";
    $response['message'] = "User not found";
    echo json_encode($response);
    
}else{

   if($status == "success"){
    $get_amount = $mysqli->prepare("SELECT amount FROM coin_requests WHERE user_id = ?");
    $get_amount->bind_param('i', $user_id);
    $get_amount->execute();
    $get_amount->store_result();
    
    if ($get_amount->num_rows > 0) {
        $get_amount->bind_result($requested_amount);
        $get_amount->fetch();
        $update_balance = $mysqli->prepare("UPDATE users SET coins = coins + ? WHERE id = ?");
        $update_balance->bind_param('ii', $requested_amount, $user_id);
        $update_balance->execute();
        $update_status = $mysqli->prepare("UPDATE coin_requests SET status = ? WHERE user_id = ? AND id=?");
        $update_status->bind_param("sii", $status, $user_id,$id);
        $update_status->execute();
    
    $response['status'] = "success";
    $response['message'] = "Coins added successfully";
    echo json_encode($response);
   }
   
   else{
    $response['status'] = "Error";
    $response['message'] = "No request found";
    echo json_encode($response);
   }
}
   else{
    $update_status = $mysqli->prepare("UPDATE coin_requests SET status = ? WHERE user_id = ? AND id=?");
    $update_status->bind_param("sii", $status, $user_id,$id);
    $update_status->execute();
    $response['status'] = "Error";
    $response['message'] = "Coins request reject";
    echo json_encode($response);
   }
}




