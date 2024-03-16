<?php
include ('connection.php');

$id = $_POST['id'];

$updated_username = $_POST['username'];
$updated_email = $_POST['email'];
$updated_first_name = $_POST['first_name'];
$updated_last_name = $_POST['last_name'];
$updated_address = $_POST['address'];
$updated_passport_number = $_POST['passport_number'];
$updated_coins = $_POST['coins'];

$query = $mysqli->prepare("UPDATE users SET username = ?, email = ?, first_name = ?, last_name = ?, address = ?, passport_number = ?, coins = ? WHERE id = ?");
$query->bind_param('sssssssi', $updated_username, $updated_email, $updated_first_name, $updated_last_name, $updated_address, $updated_passport_number, $updated_coins, $id);
$query->execute();
$query->close();

$response['status'] = 1;
$response['message'] = "User updated successfully";
echo json_encode($response);