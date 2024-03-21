<?php
include('../connection.php');

if(isset($_POST['id'])) {
    $flight_id = $_POST['id'];

    $check_query = $mysqli->prepare('SELECT id FROM bookings WHERE id = ?');
    if($check_query) {
        $check_query->bind_param('i', $flight_id);
        $check_query->execute();
        $check_query->store_result();
        
        if($check_query->num_rows > 0) {
            $delete_query = $mysqli->prepare('DELETE FROM bookings WHERE id = ?');
            if($delete_query) {
                $delete_query->bind_param('i', $flight_id);
                
                if($delete_query->execute()){
                    $response['status'] = 'success';
                    $response['message'] = 'booking Deleted Successfully';
                } else {
                    $response['status'] = 'error';
                    $response['message'] = 'booking Deletion Failed: ' . $mysqli->error;
                }
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Deletion Query Preparation Failed: ' . $mysqli->error;
            }
        } else {
            $response['status'] = 'error';
            $response['message'] = 'booking with ID ' . $flight_id . ' does not exist';
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Check Query Preparation Failed: ' . $mysqli->error;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'booking ID not provided';
}

echo json_encode($response);
?>
