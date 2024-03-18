<?php

include('../connection.php');

if (!empty($_GET['flight_id'])) {
    $query = $mysqli->prepare('SELECT AVG(reviews.rating_flight) AS average_flight_rating
        FROM reviews
        WHERE reviews.flight_id = ?');
    $query->bind_param('i', $_GET['flight_id']);
} elseif (!empty($_GET['airline_id'])) {
    $query = $mysqli->prepare('SELECT AVG(reviews.rating_airline) AS average_airline_rating
        FROM reviews
        JOIN flights ON reviews.flight_id = flights.id
        WHERE flights.airline_id = ?');
    $query->bind_param('i', $_GET['airline_id']);
} else {
    $response['status'] = 'error';
    $response['message'] = 'Please provide either flight_id or airline_id.';
    echo json_encode($response);
    exit;
}

$query->execute();
$query->store_result();

$num_row = $query->num_rows;

if ($num_row == 0) {
    $response['status'] = 'no reviews found';
} else {
    $query->execute();
    $query->bind_result($average_rating);
    $query->fetch();
    if ($average_rating === null) {
        $response['status'] = 'error';
        $response['average_rating'] = 'no rating';
    } else {
        $response['status'] = 'success';
        $response['average_rating'] = $average_rating;
    }
}

echo json_encode($response);
