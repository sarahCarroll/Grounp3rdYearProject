<?php
$dsn = 'mysql:dbname=herd;host=35.205.81.28';
	$user = 'SC';
	$pass = 'SC';
	$pdo = new PDO('mysql:dbname=herd', $user, $pass);
	
/*function getHerdNumbers(){
	$mysqli = new mysqli("", "SC", "SC", "herd");
	$query = "SELECT herdNo from herd";
	$dbresult = $mysqli->query($query);
	
	while($row = $dbresult->fetch_array(MYSQLI_ASSOC)){
 
		$data[] = array(
			'herdNo' => $row['herdNo']
		);
	}
	
	return $data;
}*/

function getHerdNumbers(){
	global $pdo;
	
	try{
		$sql = "SELECT `herdNo` FROM `herd`";
		
		$stmt= $pdo->prepare($sql);
		$stmt->execute();
		
		
		
		//row count checks if there was any match in the database
		if($stmt->rowCount() >0){
			$data=[];
			
			//[ short hand way to create an array in php
			//long-return (array('message' => 'Congratulations'));
			//Loop every row from db
			foreach($stmt->fetchAll()as $row){
				$data[] = [
					'herdNo' => $row['herdNo']
				];
			}
			//Return rows
			return $data;
		}
		else{
			return["error"=>'Could not find a user with these details'];
		}
		// Catch any errors in running the prepared statement
	}catch(PDOException $e)
	 {
		return["error"=> $e->getMessage()];
	 }
}

function getNumberOfAnimals(){
	$mysqli = new mysqli("", "SC", "SC", "herd");
	$query = "SELECT herdNo from herd";
	$dbresult = $mysqli->query($query);
	
	while($row = $dbresult->fetch_array(MYSQLI_ASSOC)){
 
		$data[] = array(
			'count' => $row['herdNo']
		);
	}
	
	return count($data);
}


function addAnimal($herdNo,$dob,$breed,$gender){
	global $pdo;

	
	try{
		$sql = "INSERT INTO herd (herdNo, dob, breed,gender)
			VALUES (:herdNo, :dob , :breed , :gender)";
		
		$stmt= $pdo->prepare($sql);
		$stmt->bindParam(':herdNo', $herdNo, PDO::PARAM_STR);
		$stmt->bindParam(':dob', $dob, PDO::PARAM_STR);
		$stmt->bindParam(':breed', $breed, PDO::PARAM_STR);
		$stmt->bindParam(':gender', $gender, PDO::PARAM_STR);
		$stmt->execute();

		
		
		return json_encode(array('message' => 'Congratulations the record ' . $herdNo . ' was added to the database'));
	 }
	 // Catch any errors in running the prepared statement
	 catch(PDOException $e)
	 {
		return $e->getMessage();
	 }
}

function deleteAnimal($herdNo){
	global $pdo;
	try{
		$sql = "DELETE FROM `herd` WHERE `herdNo` = (:herdNo) LIMIT 1";
		
		$stmt= $pdo->prepare($sql);
		$stmt->bindParam(':herdNo', $herdNo, PDO::PARAM_STR);
		$stmt->execute();
		
		return json_encode(array('message' => 'Congratulations the record ' . $herdNo . ' was deleted from the database'));
	}
	// Catch any errors in running the prepared statement
	 catch(PDOException $e)
	 {
		return $e->getMessage();
	 }
	
}

function updateAnimal($herdNo,$dob,$breed,$gender){
	global $pdo;

	try{
		$sql = "UPDATE `herd` SET `herdNo` = :herdNo , `dob` = :dob , `breed` = :breed , `gender` = :gender WHERE `herdNo` = :herdNo LIMIT 1" ;
			
		$stmt= $pdo->prepare($sql);
		$stmt->bindParam(':herdNo', $herdNo, PDO::PARAM_STR);
		$stmt->bindParam(':dob', $dob, PDO::PARAM_STR);
		$stmt->bindParam(':breed', $breed, PDO::PARAM_STR);
		$stmt->bindParam(':gender', $gender, PDO::PARAM_STR);
		$stmt->execute();

		return json_encode(array('message' => 'Congratulations the record ' . $herdNo . ' was updated to the database'));
	 }
	 // Catch any errors in running the prepared statement
	 catch(PDOException $e)
	 {
		return $e->getMessage();
	 }
}

function login($farmNo,$password){
	global $pdo;

	try{
		$sql = "SELECT `farmNo` FROM `user` WHERE `farmNo` = :farmNo AND `password` = :password LIMIT 1";
		//hashes the password and saves it back to $ password
		$password = sha1($password);
		
		$stmt= $pdo->prepare($sql);
		$stmt->bindParam(':farmNo', $farmNo, PDO::PARAM_STR);
		$stmt->bindParam(':password', $password, PDO::PARAM_STR);
		
		$stmt->execute();
		
		//row count checks if there was any match in the database
		if($stmt->rowCount() >0){
			//[ short hand way to create an array in php
			//long-return (array('message' => 'Congratulations'));
			return["success"=> '1'];
		}
		else{
			return["error"=>'Could not find a user with these details'];
		}
		// Catch any errors in running the prepared statement
	}catch(PDOException $e)
	 {
		return["error"=> $e->getMessage()];
	 }


}
?>