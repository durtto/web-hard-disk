<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");

$fileID = $_GET['fileId'];
$dirID = $_GET['dirId'];

$sql = "UPDATE `file_data` 
		SET `file_dir` = '".$dirID."' 
		WHERE `file_id` = ".$fileID;
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
if($db->query($sql)){
	echo "ok";
}else{
	echo "no";
}
?>