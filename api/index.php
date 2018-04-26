<?php
//For outputting the answer
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PATCH, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Origin, Content-Type, X-Auth-Token');
header('Content-type: application/json');

//Import rest server
require_once __DIR__ . "/rest.php";

//Create a new server
$server = new RestServer(false);


//Import the functions
require_once __DIR__ . "/api/functions.php";
//Import function registrations
require_once __DIR__ . "/api/registers.php";

//Begin the HTTP listener service and exit.
if (!isset($HTTP_RAW_POST_DATA)) {
    $HTTP_RAW_POST_DATA = file_get_contents("php://input");
}
$server->serve($HTTP_RAW_POST_DATA);
exit();
