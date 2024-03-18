<?php

include("../connection.php");


if(!empty($_GET['id'])) {
    $title = $_GET['is'];
}

if(!empty($_GET['user_id'])) {
    $content = $_GET['user_id'];
}

if(!empty($_GET['amount'])) {
    $title = $_GET['amount'];
}

if(!empty($_GET['status'])) {
    $content = $_GET['status'];
}
if(!empty($_GET['date'])) {
    $content = $_GET['date'];
}


$query = $mysqli->prepare("SELECT * FROM coin_requests");
$query->execute();
$query->store_result();
$num_rows = $query->num_rows();

if($num_rows == 0) {
    $response["status"] = "No record found";
}else{
    $coin_requests = [];
    $query->bind_result($id, $user_id, $amount,$status,$date);
    while($query->fetch()){
        $coin_request = [
            'id' => $id,
            'user_id' => $user_id,
            'amount' => $amount,
            'status' => $status,
            'date' => $date,
            
        ];

        $coin_requests[] = $coin_request;
            }

            $response["status"] = "Success";
            $response["coins_requests"] = $coin_requests;
            echo json_encode($response);
        }
        