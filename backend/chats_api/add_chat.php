<?php

include("../connection.php");

$user_id = $_POST['user_id'];
$admin_id = $_POST['admin_id'];
$user_text = $_POST['user_text'];
$user_text_date = $_POST['user_text_date'];
$message_type = $_POST['message_type'];

if (!empty($user_id)) {
    $query = $mysqli->prepare("INSERT INTO chats (user_id, user_text, user_text_date, message_type) VALUES (?, ?, ?, ?)");
    $query->bind_param('isss', $user_id, $user_text, $user_text_date, $message_type);
} else if (!empty($admin_id)) {
    $query = $mysqli->prepare("INSERT INTO chats (admin_id, user_text, message_type) VALUES (?, ?, ?)");
    $query->bind_param('isss', $admin_id, $user_text, $user_text_date, $message_type);
}
if($query->execute()){
    $inserted_id = $mysqli->insert_id;
    $chat_details = [
        'id' => $inserted_id,
        'user_id' => $user_id,
        'admin_id' => $admin_id,
        'user_text' => $user_text,
        'user_text_date' => $user_text_date,
        'message_type' => $message_type
    ];
    $response['status'] = 'success';
    $response['chats'] = $chat_details;
}else{  
    $response['status'] = 'error' . $mysqli->error;
}
echo json_encode($response);
