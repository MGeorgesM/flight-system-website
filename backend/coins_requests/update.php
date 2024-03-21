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
