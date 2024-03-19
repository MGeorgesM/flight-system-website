<?php

include("../connection.php");

if(empty($_GET['user_id']) || empty($_GET['email'])) {
    $response['status'] = "error";
    $response['message'] = "No user id or email provided";
    echo json_encode($response);
    exit();
}

$user_id = $_GET['user_id'];
$email = $_GET['email'];

$check_admin_privileges = $mysqli->prepare('SELECT * from admins where id = ? and email = ?');
$check_admin_privileges->bind_param('is', $user_id, $email);
$check_admin_privileges->execute();
$check_admin_privileges->store_result();

if($check_admin_privileges->num_rows === 0){
    $response['status'] = "error";
    $response['message'] = "You do not have admin privileges";
    echo json_encode($response);
    exit();
}

if(empty($_GET['coins_request_id'])){
    $get_all_coins_request = $mysqli->prepare('SELECT * from coins_requests');
    $get_all_coins_request->execute();
    $get_all_coins_request->store_result();

    if($get_all_coins_request->num_rows === 0){
        $response['status'] = "error";
        $response['message'] = "No coin requests found";
        echo json_encode($response);
        exit();
    }

    $get_all_coins_request->bind_result($id, $user_id, $amount, $status, $date);
    while($get_all_coins_request->fetch()){
        $coins_request = [
            'id' => $id,
            'user_id' => $user_id,
            'amount' => $amount,
            'status' => $status,
            'date' => $date
        ];
        $coins_requests[] = $coins_request;
    }
    $response['status'] = "success";
    $response['coins_requests'] = $coins_requests;
    echo json_encode($response);
}

$coins_request_id = $_GET['coins_request_id'];
$get_coin_request = $mysqli->prepare('SELECT * from coins_requests  where id = ?');
$get_coin_request->bind_param('i', $coins_request_id);
$get_coin_request->execute();
$get_coin_request->store_result();

if ($get_coin_request->num_rows === 0) {
    $response['status'] = "error";
    $response['message'] = "Coin request not found";
    echo json_encode($response);
    exit();
}

$get_coin_request->bind_result($id, $user_id, $amount, $status, $date);
$get_coin_request->fetch();
$coins_request = [
    'id' => $id,
    'user_id' => $user_id,
    'amount' => $amount,
    'status' => $status,
    'date' => $date
];

$response['status'] = "success";
$response['coins_request'] = $coins_request;
echo json_encode($response);