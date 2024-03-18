<?php
include('../connection.php');

$email = $_POST['email'];
$password = $_POST['password'];

$query = $mysqli->prepare('select id,email,password,username
from users
where email=?');
$query->bind_param('s', $email);
$query->execute();
$query->store_result();
$query->bind_result($id, $email, $hashed_password, $username);
$query->fetch();

$num_rows = $query->num_rows();

// var_dump( $email ,$user_id,$hashed_password,$username);
if ($num_rows == 0) {
    $response['status'] = "user not found";
} else {
    echo $password;
    if (password_verify($password, $hashed_password)){
        $response['status'] = "logged in";
        $response['user_id'] = $id;
        $response['username'] = $username;
        $response['email'] = $email;
    } else {
        $response['status'] = "incorrect credentials";
    }
}
echo json_encode($response);
