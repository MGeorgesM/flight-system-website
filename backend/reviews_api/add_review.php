<?php

include("../connection.php");

$user_id = $_POST['user_id'];
$flight_id = $_POST['flight_id'];
$airline_id = $_POST['airline_id'];
$rating_flight = $_POST['rating_flight'];
$rating_airline = $_POST['rating_airline'];
$review_text = $_POST['review_text'];


if (!empty($flight_id)) {
    $query = $mysqli->prepare("INSERT INTO reviews (user_id, flight_id, rating_flight, review_text) VALUES (?, ?, ?, ?)");
    $query->bind_param('iids', $user_id, $flight_id, $rating_flight, $review_text);
} else if (!empty($airline_id)) {
    $query = $mysqli->prepare("INSERT INTO reviews (user_id, airline_id, rating_airline, review_text) VALUES (?, ?, ?, ?)");
    $query->bind_param('iids', $user_id, $airline_id, $rating_airline, $review_text);
}




if ($query->execute()) {
    $inserted_id = $mysqli->insert_id;
    $review_details = [
        'id' => $inserted_id,
        'user_id' => $user_id,
        'flight_id' => $flight_id,
        'airline_id' => $airline_id,
        'rating_flight' => $rating_flight,
        'rating_airline' => $rating_airline,
        'review_text' => $review_text
    ];
    $response['status'] = 'success';
    $response['reviews'] = $review_details;
} else {
    $response['status'] = 'error' . $mysqli->error;
}
echo json_encode($response);
