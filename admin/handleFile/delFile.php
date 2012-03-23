<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");

$fileID = $_GET['fileId'];
$file_upname = $_GET['fileUpName'];

if(@unlink($file_real_path.$file_upname)){
	$sql = "delete from file_data
			where file_id = ".$fileID;
	$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
	$db->start();

	if($db->query($sql)){
		echo "ok";
	}else{
		echo "no";
	}
}else{
	echo "no";
}
$db->close();
?>