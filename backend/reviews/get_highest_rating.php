<?php

include('../connection.php');

if(isset($_GET['type']) && !empty($_GET['type'])){
    $type = $_GET['type'];
    if($type == 'airline'){

        $query = $mysqli->prepare('SELECT airlines.airline_name, AVG(reviews.rating_airline) AS avg_airline_rating
        FROM reviews
        JOIN flights ON reviews.flight_id = flights.id
        JOIN airlines ON flights.airline_id = airlines.id
        GROUP BY airlines.airline_name
        ORDER BY avg_airline_rating DESC
        LIMIT 1;');

        $query->execute();
        $query->store_result();
        if ($query->num_rows > 0) {
            $query->bind_result($airline_name, $avg_airline_rating);
            $query->fetch();
            $response['status'] = 'success';
            $response['reviews'] = [
                'airline_name' => $airline_name,
                'avg_airline_rating' => $avg_airline_rating
            ];
            echo json_encode($response);
            exit;
        } else {
            $response['status'] = 'no reviews found';
            echo json_encode($response);
            exit;
        }
    } elseif($type == 'flight'){
        
        $query = $mysqli->prepare('SELECT flights.code, flights.departure_location, flights.destination, AVG(reviews.rating_flight) AS avg_flight_rating
        FROM reviews
        JOIN flights ON reviews.flight_id = flights.id
        GROUP BY flights.id, flights.departure_location, flights.destination
        ORDER BY avg_flight_rating DESC
        LIMIT 1;');

        $query->execute();
        $query->store_result();
        if ($query->num_rows > 0) {
            $query->bind_result($code, $departure_location, $destination, $avg_flight_rating);
            $query->fetch();
            $response['status'] = 'success';
            $response['reviews'] = [
                'code' => $code,
                'departure_location' => $departure_location,
                'destination' => $destination,
                'avg_flight_rating' => $avg_flight_rating
            ];
            echo json_encode($response);
            exit;
        } else {
            $response['status'] = 'no reviews found';
            echo json_encode($response);
            exit;
        }
    } else {
        $response['status'] = 'error';
        $response['message'] = 'Invalid type';
        echo json_encode($response);
        exit;
    }
} else {
    $response['status'] = 'error';
    $response['message'] = 'Please provide type';
    echo json_encode($response);
    exit;
}


