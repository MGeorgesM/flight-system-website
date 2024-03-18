<?php
include('../connection.php');

if(isset($_POST['id'])) {
    $flight_id = $_POST['id'];

    $query = $mysqli->prepare('DELETE FROM flights WHERE id = ?');
    if($query) {
        $query->bind_param('i', $flight_id);
        
        if($query->execute()){
            $response['status'] = 'success';
            $response['message'] = 'Flight Deleted Successfully';
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Flight Deletion Failed: ' . $mysqli->error;
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Query Preparation Failed: ' . $mysqli->error;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Flight ID not provided';
}

echo json_encode($response);
