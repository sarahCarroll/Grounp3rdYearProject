<?php
$server->register(
    'getHerdNumbers',
    array()
);

$server->register(
    'getHerdInfo',
    array('herdNo')
);

$server->register(
   'getNumberOfAnimals',
    array()
);
$server->register(
  'addAnimal', 
  array('herdNo','dob','breed','gender')
);

$server->register(
  'deleteAnimal', 
  array('herdNo')
);

$server->register(
  'updateAnimal', 
  array('herdNo','dob','breed','gender')
);

$server->register(
  'login', 
  array('name','password','farmNo')
);




?>


