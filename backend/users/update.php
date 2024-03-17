<?php
include('../connection.php');

$user_id = $_POST['user_id'];

$fields_to_update = [];

if (!empty($_POST['first_name'])) {
    $updated_first_name = $_POST['first_name'];
    $fields_to_update[] = "first_name = '$updated_first_name'";
}

if (!empty($_POST['last_name'])) {
    $updated_last_name = $_POST['last_name'];
    $fields_to_update[] = "last_name = '$updated_last_name'";
}

if (!empty($_POST['address'])) {
    $updated_address = $_POST['address'];
    $fields_to_update[] = "address = '$updated_address'";
}

if (!empty($_POST['passport_number'])) {
    $updated_passport_number = $_POST['passport_number'];
    $fields_to_update[] = "passport_number = '$updated_passport_number'";
}

if (!empty($_POST['coins'])) {
    $updated_coins = $_POST['coins'];
    $fields_to_update[] = "coins = '$updated_coins'";
}

if (empty($fields_to_update)) {
    $response['status'] = 0;
    $response['message'] = "No fields to update";
    echo json_encode($response);
    exit;
}

$find_user = $mysqli->prepare("SELECT * FROM users WHERE id = ?");
$find_user->bind_param('i', $user_id);
$find_user->execute();
$find_user->store_result();

if ($find_user->num_rows == 0) {
    $response['status'] = 0;
    $response['message'] = "User not found";
    echo json_encode($response);
    exit;
}

$update_query = "UPDATE users SET " . implode(', ', $fields_to_update) . " WHERE id = ?";

$query = $mysqli->prepare($update_query);
$query->bind_param('i', $user_id);
$query->execute();

$find_user->execute();
$find_user->store_result();
$find_user->bind_result($id, $username, $email, $first_name, $password, $last_name, $address, $passport_number, $coins);
$find_user->fetch();
$updated_user = [
    'id' => $id,
    'username' => $username,
    'email' => $email,
    'first_name' => $first_name,
    'last_name' => $last_name,
    'address' => $address,
    'passport_number' => $passport_number,
    'coins' => $coins
];

$response['status'] = 1;
$response['message'] = "User updated successfully";
$response['user'] = $updated_user;
echo json_encode($response);