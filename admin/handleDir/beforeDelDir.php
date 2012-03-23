<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");

$dirID = $_GET['dirId'];

//判斷該資料夾下有無檔案
$sql = "SELECT *
		FROM `file_data`
		WHERE `file_dir` = ".$dirID;
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
if($db->getcount($sql)){
	echo "haveItem";
	exit;
}

//判斷該資料夾下有無子資料夾
$sql = "SELECT *
		FROM `dir_data`
		WHERE `dir_parent` = ".$dirID;
if($db->getcount($sql)){
	echo "haveItem";
	exit;
}
echo "ok";
$db->close();
?>