<?php
include('../connection.php');

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = $_GET['id'];

    $query = $mysqli->prepare('SELECT airlines.* FROM airlines WHERE id = ?');
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();
    $num_row = $query->num_rows;

    if ($num_row == 0) {
        $response['status'] = 'error';
        $response['message'] = 'no airline found with the specified ID';
    } else {
        $query->bind_result($id, $airline_name);
        $query->fetch();
        $response['status'] = 'success';
        $response['airlines'] = [
            'id' => $id,
            'airline_name' => $airline_name,
        ];
    }
} else {
    $query = $mysqli->prepare('SELECT * FROM airlines');
    $query->execute();
    $query->store_result();
    $num_row = $query->num_rows;

    if ($num_row == 0) {
        $response['status'] = 'no airlines found';
    } else {
        $airlines = [];
        $query->bind_result($id, $airline_name);
        while ($query->fetch()) {
            $airlines[] = [
                'id' => $id,
                'airline_name' => $airline_name,
            ];
        }
        $response['status'] = 'success';
        $response['airlines'] = $airlines;
    }
}

echo json_encode($response);