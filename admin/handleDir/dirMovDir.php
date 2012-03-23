<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");

$oldID = $_GET['oldId'];
$newID = $_GET['newId'];

$sql = "UPDATE `dir_data` 
		SET `dir_parent` = '".$newID."' 
		WHERE `dir_id` = ".$oldID;
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
if($db->query($sql)){
	echo "ok";
}else{
	echo "no";
}
?>