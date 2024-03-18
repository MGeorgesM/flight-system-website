<?php
include('../connection.php');


$name = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];
$coins = 0;

$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();


if ($email_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(username,password,email,first_name,last_name,coins) values(?,?,?,?,?,?);');
    $query->bind_param('sssssi', $name, $hashed_password, $email, $first_name,$last_name,$coins);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "user $name was created successfully";
    $response['table'] = "Users";

} else {
    $response["status"] = "user already exists";
    $response["message"] = "user $name wasn't created";
    $response['table'] = "Users";
}
echo json_encode($response);
