<?php

include('../connection.php');

$query = $mysqli->prepare('SELECT coins_requests.*, users.username AS username,users.coins As coins
    FROM coins_requests
    JOIN users ON coins_requests.user_id = users.id');
$query->execute();
$query->store_result();
$num_row = $query->num_rows;
if ($num_row == 0) {
    $response['status'] = 'no coin requested found';
}else{
    $coins_requests = [];
    $query->bind_result($id, $user_id, $coins, $status, $created_at, $username, $user_coins);
    while ($query->fetch()) {
        $coins_requests[] = [
            'id' => $id,
            'user_id' => $user_id,
            'coins' => $coins,
            'status' => $status,
            'created_at' => $created_at,
            'username' => $username,
            'user_coins' => $user_coins
        ];
    }
    $response['status'] = 'success';
    $response['coins_requests'] = $coins_requests;
}
echo json_encode($response);