<?php
include('../connection.php');

$id = $_GET['user_id'];


if(isset($id) && !empty($id)) {
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
    
    $find_user->bind_result($id, $username, $email, $password, $first_name, $last_name, $address, $passport_number, $coins);
    $find_user->fetch();
    $user = [
        'id' => $id,
        'username' => $username,
        'email' => $email,
        'first_name' => $first_name,
        'last_name' => $last_name,
        'address' => $address,
        'passport_number' => $passport_number,
        'coins' => $coins];

    $response['status'] = 1;
    $response['message'] = "User found";
    $response['data'] = $user;

    echo json_encode($response);
    exit;

} else {

    $find_users = $mysqli->prepare("SELECT * FROM users");
    $find_users->execute();
    $find_users->store_result();
    $find_users->bind_result($id, $username, $email, $password, $first_name, $last_name, $address, $passport_number, $coins);

    while ($find_users->fetch()) {
        $user = [
            'id' => $id,
            'username' => $username,
            'email' => $email,
            'first_name' => $first_name,
            'last_name' => $last_name,
            'address' => $address,
            'passport_number' => $passport_number,
            'coins' => $coins
        ];
        $users[] = $user;
    }

    $response['status'] = 1;
    $response['message'] = "Users found";
    $response['data'] = $users;
    echo json_encode($response);
}