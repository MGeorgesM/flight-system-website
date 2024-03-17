<?php
include('../connection.php');

$username = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];

$check_username_availability = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
$check_username_availability->bind_param('s', $username);
$check_username_availability->execute();
$check_username_availability->store_result();

if ($check_username_availability->num_rows > 0) {
    $response['status'] = 0;
    $response['message'] = "Username already taken";
    echo json_encode($response);
    exit;
} else {
    $check_email_availability = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    $check_email_availability->bind_param('s', $email);
    $check_email_availability->execute();
    $check_email_availability->store_result();

    if ($check_email_availability->num_rows > 0) {
        $response['status'] = 0;
        $response['message'] = "Email already taken";
        echo json_encode($response);
        exit;
    }
} 

$hashed_password = password_hash($password, PASSWORD_BCRYPT);
$add_user = $mysqli->prepare("INSERT INTO users (username, email, password) VALUES (?, ?, ?)");
$add_user->bind_param('sss', $username, $email, $hashed_password);
$add_user->execute();
$add_user->close();

$user_id = $mysqli->insert_id;

$response['status'] = 1;
$response['message'] = "User added successfully";
$response['user_id'] = $user_id;
echo json_encode($response);