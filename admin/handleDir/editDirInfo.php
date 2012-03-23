<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");
require_once("../../lib/JSON.php");
$json = new Services_JSON();

$dirID = $_GET['dir_id'];
$dirName = $_GET['dir_name'];

$sql = "UPDATE `dir_data` 
		SET `dir_name` = '".$dirName."'
		WHERE `dir_id` = ".$dirID;
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
if($db->query($sql)){
	echo "ok";
}else{
	echo "no";
}
$db->close();
?>