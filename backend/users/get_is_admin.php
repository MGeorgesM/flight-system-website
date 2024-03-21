<?php
include('../connection.php');

if(!empty($_GET['user_id']) && !empty($_GET['email'])) {
    $user_id = $_GET['user_id'];
    $email = $_GET['email'];
} else {
    $response['status'] = 'error';
    $response['message'] = "All fields are required";
    echo json_encode($response);
    exit;
}

$query = $mysqli->prepare('SELECT * FROM admins WHERE id = ? AND email = ?;');
$query->bind_param('is', $user_id, $email);
$query->execute();
$query->store_result();

if ($query->num_rows() > 0) {
    $response['status'] = "success";
    $response['users'] = true;
} else {
    $response['status'] = "success";
    $response['users'] = false;
}

echo json_encode($response);