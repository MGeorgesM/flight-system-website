<?php
include ('connection.php');

$id = $_POST['id'];


$find_user = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
$find_user->bind_param('i', $id);
$find_user->execute();
$find_user->store_result();

if ($find_user->num_rows == 0) {
    $response['status'] = 0;
    $response['message'] = "User not found";
    echo json_encode($response);
    exit;
}

$query = $mysqli->prepare("DELETE FROM users WHERE id = ?");
$query->bind_param('i', $id);
$query->execute();
$query->close();

$response['status'] = 1;
$response['message'] = "User deleted successfully";