<?php
include('../connection.php');


if (!empty($_POST['username']) && !empty($_POST['email']) && !empty($_POST['password'])){
    $username = $_POST['username'];
    $email = $_POST['email'];
    $password = $_POST['password'];
} else {
    $response['status'] = 'error';
    $response['message'] = "All fields are required";
    echo json_encode($response);
    exit;
}


$check_username_availability = $mysqli->prepare("SELECT * FROM users WHERE username = ?");
$check_username_availability->bind_param('s', $username);
$check_username_availability->execute();
$check_username_availability->store_result();

if ($check_username_availability->num_rows > 0) {
    $response['status'] = 'error';
    $response['message'] = "Username already taken";
    echo json_encode($response);
    exit;

    $check_email_availability_in_admins = $mysqli->prepare("SELECT * FROM admins WHERE email = ?");
    $check_email_availability_in_admins->bind_param('s', $email);
    $check_email_availability_in_admins->execute();
    $check_email_availability_in_admins->store_result();

    if($check_email_availability_in_admins->num_rows() > 0) {
        $response['status'] = 'error';
        $response['message'] = "Email already taken";
        echo json_encode($response);
        exit;
    }
    
    $check_email_availability = $mysqli->prepare("SELECT * FROM users WHERE email = ?");
    $check_email_availability->bind_param('s', $email);
    $check_email_availability->execute();
    $check_email_availability->store_result();

    if ($check_email_availability->num_rows > 0) {
        $response['status'] = 'error';
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

$response['status'] = 'success';
$response['message'] = "User added successfully";
$response['users'] = [
    'id' => $user_id,
    'email' => $email
];

echo json_encode($response);