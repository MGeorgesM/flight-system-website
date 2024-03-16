<?php
include('../connection.php');

$id = $_POST['user_id'];
$updated_first_name = $_POST['first_name'];
$updated_last_name = $_POST['last_name'];
$updated_address = $_POST['address'];
$updated_passport_number = $_POST['passport_number'];
$updated_coins = $_POST['coins'];

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

$query = $mysqli->prepare("UPDATE users SET first_name = ?, last_name = ?, address = ?, passport_number = ?, coins = ? WHERE id = ?");
$query->bind_param('sssssi', $updated_first_name, $updated_last_name, $updated_address, $updated_passport_number, $updated_coins, $id);
$query->execute();
$query->close();

$response['status'] = 1;
$response['message'] = "User updated successfully";
echo json_encode($response);