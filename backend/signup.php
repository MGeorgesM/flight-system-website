<?php
include('connection.php');


$name = $_POST['username'];
$email = $_POST['email'];
$password = $_POST['password'];
$first_name = $_POST['first_name'];
$last_name = $_POST['last_name'];

$check_email = $mysqli->prepare('select email from users where email=?');
$check_email->bind_param('s', $email);
$check_email->execute();
$check_email->store_result();
$email_exists = $check_email->num_rows();


if ($email_exists == 0) {
    $hashed_password = password_hash($password, PASSWORD_BCRYPT);
    $query = $mysqli->prepare('insert into users(username,password,email,first_name,last_name) values(?,?,?,?,?);');
    $query->bind_param('sssss', $name, $hashed_password, $email, $first_name,$last_name);
    $query->execute();
    $response['status'] = "success";
    $response['message'] = "user $name was created successfully";
} else {
    $response["status"] = "user already exists";
    $response["message"] = "user $name wasn't created";
}
echo json_encode($response);
