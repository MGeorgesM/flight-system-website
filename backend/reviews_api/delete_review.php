<?php
include('../connection.php');

if(isset($_POST['id'])) {
    $review_id = $_POST['id'];

    $query = $mysqli->prepare('DELETE FROM reviews WHERE id = ?');
    if($query) {
        $query->bind_param('i', $review_id);
        
        if($query->execute()){
            $response['status'] = 'success';
            $response['message'] = 'Review Deleted Successfully';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Review Deletion Failed: ' . $mysqli->error;
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Review Preparation Failed: ' . $mysqli->error;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Review ID not provided';
}

echo json_encode($response);
