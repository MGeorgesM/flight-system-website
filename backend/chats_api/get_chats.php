<?php
include("../connection.php");
$user_id = $_GET['user_id'];
$admin_id = $_GET['admin_id'];
if (!empty($user_id)){
   
    $query = $mysqli->prepare('SELECT * FROM chats WHERE user_id = ?');
    $query->bind_param('i', $_GET['user_id']);
} else if (!empty($admin_id)) {
 
    $query = $mysqli->prepare('SELECT * FROM chats WHERE admin_id = ?');
    $query->bind_param('i', $_GET['admin_id']);
} 
$query->execute();
$query->store_result();
$num_row = $query->num_rows;
if($num_row ==0){
    $response['status'] = 'no chats found';

}else{
    $chats = [];
    $query->bind_result($id, $user_id, $admin_id, $user_text, $user_text_date, $message_type);

    while($query->fetch()){
        $chats[] = [
            'id' => $id,
            'user_id' => $user_id,
            'admin_id' => $admin_id,
            'user_text' => $user_text,
            'user_text_date' => $user_text_date,
            'message_type' => $message_type
        ];
    }
    $response['status'] = 'success';
    $response['chats'] = $chats;
}
echo json_encode($response);