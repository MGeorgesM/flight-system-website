<?php
include('../connection.php');

if(!empty($_POST['login']) && !empty($_POST['password'])) {
    $loginInput = $_POST['login'];
    $password = $_POST['password'];
} else {
    $response['status'] = 'error';
    $response['message'] = "All fields are required";
    echo json_encode($response);
    exit;
}

$query = $mysqli->prepare('SELECT id, email, password FROM users WHERE email = ? OR username = ? UNION SELECT id, email, password FROM admins WHERE email = ? OR username = ?;');
$query->bind_param('ssss', $loginInput, $loginInput, $loginInput, $loginInput);
$query->execute();
$query->store_result();

if ($query->num_rows() === 0) {
    $response['status'] = "error";
    $response['message'] = "User not found";
    echo json_encode($response);
    exit();
}

$query->bind_result($id, $email, $hashed_password);
$query->fetch();


if (password_verify($password, $hashed_password)){
    $response['status'] = "success";
    $response['users'] = [
        'id' => $id,
        'email' => $email,
    ];
} else {
    $response['status'] = "error";
    $response['message'] = "Invalid password";
}

echo json_encode($response);
