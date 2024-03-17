<?php

include('../connection.php');

if (isset($_GET['flight_id'])) {
    $query = $mysqli->prepare('SELECT reviews.*, flights.code AS flight_code, airlines.airline_name AS airline_name, users.username AS username
        FROM reviews
        JOIN flights ON reviews.flight_id = flights.id
        JOIN airlines ON flights.airline_id = airlines.id
        JOIN users ON reviews.user_id = users.id
        WHERE reviews.flight_id = ?');
    $query->bind_param('i', $_GET['flight_id']);

} elseif (isset($_GET['airline_id'])) {
    $query = $mysqli->prepare('SELECT reviews.*, flights.code AS flight_code, airlines.airline_name AS airline_name, users.username AS username
        FROM reviews
        JOIN flights ON reviews.flight_id = flights.id
        JOIN airlines ON flights.airline_id = airlines.id
        JOIN users ON reviews.user_id = users.id
        WHERE flights.airline_id = ?');
    $query->bind_param('i', $_GET['airline_id']);

} else {

    $query = $mysqli->prepare('SELECT reviews.*, flights.code AS flight_code, airlines.airline_name AS airline_name, users.username AS username
        FROM reviews
        JOIN flights ON reviews.flight_id = flights.id
        JOIN airlines ON flights.airline_id = airlines.id
        JOIN users ON reviews.user_id = users.id');
}

$query->execute();
$query->store_result();
$num_row = $query->num_rows;

if ($num_row == 0) {
    $response['status'] = 'no reviews found';
} else {
    $reviews = [];
    $query->bind_result($id, $user_id, $flight_id, $rating_flight, $rating_airline, $review_text,$airline_id, $flight_code, $airline_name, $username);
    while ($query->fetch()) {
        $reviews[] = [
            'id' => $id,
            'user_id' => $user_id,
            'username' => $username,
            'flight_id' => $flight_id,
            'flight_code' => $flight_code,
            'rating_flight' => $rating_flight,
            'airline_id' => $airline_id,
            'review_text' => $review_text,
            'rating_airline' => $rating_airline,
            'airline_name' => $airline_name
        ];
    }
    $response['status'] = 'success';
    $response['reviews'] = $reviews;
}

echo json_encode($response);
