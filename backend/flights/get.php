<?php

include('../connection.php');

if (isset($_GET['id']) && !empty($_GET['id'])) {
    $id = $_GET['id'];

    $query = $mysqli->prepare('SELECT flights.*, airlines.airline_name AS airline_name
        FROM flights
        JOIN airlines ON flights.airline_id = airlines.id
        WHERE flights.id = ?');
    $query->bind_param('i', $id);
    $query->execute();
    $query->store_result();
    $num_row = $query->num_rows;

    if ($num_row == 0) {
        $response['status'] = 'no flight found with the specified ID';
    } else {
        $query->bind_result($id, $airline_id, $departure_location, $destination, $departure_date,$arrival_date, $price, $status,$code,$airline_name);
        $query->fetch();
        $response['status'] = 'success';
        $response['flights'] = [
            'id' => $id,
            'airline_id' => $airline_id,
            'departure_location' => $departure_location,
            'destination' => $destination,
            'departure_date' => $departure_date,
            'arrival_date' => $arrival_date,
            'code' => $code,
            'price' => $price,
            'status' => $status,
            'airline_name' => $airline_name
        ];
    }
} else {
    $query = $mysqli->prepare('SELECT flights.*, airlines.airline_name AS airline_name
        FROM flights
        JOIN airlines ON flights.airline_id = airlines.id
        ORDER BY flights.departure_date;
    ');

    $query->execute();
    $query->store_result();
    $num_row = $query->num_rows;

    if ($num_row == 0) {
        $response['status'] = 'no flights found';
    } else {
        $flights = [];
        $query->bind_result($flight_id,$airline_id, $departure_location, $destination, $departure_date,$arrival_date, $price, $status,$code, $airline_name);
        while ($query->fetch()) {
            $flights[] = [
                'id' => $flight_id,
                'airline_id' => $airline_id,
                'departure_location' => $departure_location,
                'destination' => $destination,
                'departure_date' => $departure_date,
                'arrival_date' => $arrival_date,
                'code' => $code,
                'price' => $price,
                'status' => $status,
                'airline_name' => $airline_name
            ];
        }
        $response['status'] = 'success';
        $response['flights'] = $flights;
    }
}

echo json_encode($response);
