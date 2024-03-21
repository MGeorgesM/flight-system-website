<?php

include('../connection.php');

if (isset($_POST['request_id']) && isset($_POST['action'])) {
    $request_id = $_POST['request_id'];
    $action = $_POST['action']; 

    if ($action === 'accept') {
        $status = 'accepted';
    } elseif ($action === 'reject') {
        $status = 'rejected';
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Invalid action. Action must be either "accept" or "reject".';
        echo json_encode($response);
        exit; 
        }

    $query = $mysqli->prepare('UPDATE coins_requests SET status = ? WHERE id = ?');
    $query->bind_param('si', $status, $request_id);
    $query->execute();

    if ($query->affected_rows > 0) {
        $response['status'] = 'success';
        $response['message'] = 'Status updated successfully.';
        $get_request_amount = $mysqli->prepare('SELECT user_id, amount FROM coins_requests WHERE id = ?');
        $get_request_amount->bind_param('i', $request_id);
        $get_request_amount->execute();
        $get_request_amount->store_result();
        $get_request_amount->bind_result($user_id, $amount);
        $get_request_amount->fetch();
        $update_user_balance = $mysqli->prepare('UPDATE users SET coins = coins + ? WHERE id = ?');
        $update_user_balance->bind_param('ii', $amount, $user_id);
        $update_user_balance->execute();
        
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Failed to update status.';
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Missing parameters. Both request_id and action are required.';
}

echo json_encode($response);
?>
