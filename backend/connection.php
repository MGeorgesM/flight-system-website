<?php

header('Access-Control-Allow-Origin: http://127.0.0.1:5500');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

$host = 'localhost';
$db_user = 'root';
$db_pass = null;
$db_name = 'flightmanagementdb';
$db_port = 3307;

$mysqli = new mysqli($host, $db_user, $db_pass, $db_name,$db_port);

if ($mysqli->connect_error) {
    die('Connection Failed: ' . $mysqli->connect_error);
}else{
    echo "connected";
}
