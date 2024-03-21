<?php
include('../connection.php');

if(isset($_POST['id'])) {
    $flight_id = $_POST['id'];

    $check_query = $mysqli->prepare('SELECT id FROM flights WHERE id = ?');
    if($check_query) {
        $check_query->bind_param('i', $flight_id);
        $check_query->execute();
        $check_query->store_result();
        
        if($check_query->num_rows > 0) {
            $delete_query = $mysqli->prepare('DELETE FROM flights WHERE id = ?');
            if($delete_query) {
                $delete_query->bind_param('i', $flight_id);
                
                if($delete_query->execute()){
                    $response['status'] = 'success';
                    $response['message'] = 'Flight Deleted Successfully';
                } else {
                    $response['status'] = 'error';
                    $response['message'] = 'Flight Deletion Failed: ' . $mysqli->error;
                }
            } else {
                $response['status'] = 'error';
                $response['message'] = 'Deletion Query Preparation Failed: ' . $mysqli->error;
            }
        } else {
            $response['status'] = 'error';
            $response['message'] = 'Flight with ID ' . $flight_id . ' does not exist';
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Check Query Preparation Failed: ' . $mysqli->error;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Flight ID not provided';
}

echo json_encode($response);
?>
