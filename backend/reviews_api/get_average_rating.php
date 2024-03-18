<?php

include('../connection.php');

if (isset($_GET['flight_id'])) {
    $query = $mysqli->prepare('SELECT AVG(reviews.rating_flight) AS average_flight_rating
        FROM reviews
        JOIN flights ON reviews.flight_id = flights.id
        WHERE reviews.flight_id = ?');
    $query->bind_param('i', $_GET['flight_id']);

} elseif (isset($_GET['airline_id'])) {
    $query = $mysqli->prepare('SELECT  AVG(reviews.rating_airline) AS average_airline_rating
        FROM reviews
        JOIN airlines ON flights.airline_id = airlines.id
        JOIN users ON reviews.user_id = users.id
        WHERE flights.airline_id = ?');
    $query->bind_param('i', $_GET['airline_id']);

} 

$query->execute();
$query->store_result();
$num_row = $query->num_rows;
echo $num_row;
if ($num_row == 0) {
    $response['status'] = 'no reviews found';
} else {
    $query->execute();
    $query->bind_result($average_rating);
    $query->fetch();
    $response['status'] = 'success';
    $response['average_rating'] = $average_rating;
}

echo json_encode($response);
