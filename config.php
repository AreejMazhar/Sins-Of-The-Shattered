<?php
// Database configuration - INFINITYFREE
define('DB_HOST', 'sql104.infinityfree.com');
define('DB_USER', 'if0_41381007');
define('DB_PASS', 'G7KAkHs8Lyug'); // Replace with the actual password
define('DB_NAME', 'if0_41381007_dnd_campaign');

function getDB()
{
    $conn = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);
    if ($conn->connect_error) {
        error_log("Database connection failed: " . $conn->connect_error);
        http_response_code(500);
        die(json_encode(['error' => 'Unable to connect to database. Please try again later.']));
    }
    $conn->set_charset('utf8mb4');
    return $conn;
}
?>