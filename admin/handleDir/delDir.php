<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");

$dirID = $_GET['dirId'];

function delDir($id){
	global $db;
	$sql = "SELECT *
			FROM `dir_data`
			WHERE `dir_parent` = ".$id;
	$result = $db->query($sql);
	//尋找有無子資料夾
	while($arr = $db->getarray($result)){
		delDir($arr['dir_id']);
	}
	//刪除該資料夾下所有檔案
	$sql = "DELETE from file_data
			where file_dir = ".$id;
	$db->query($sql);
	//刪除該資料夾
	$sql = "DELETE from dir_data
			where dir_id = ".$id;
	$db->query($sql);
	return;
}
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();

delDir($dirID);

echo "ok";
$db->close();
?>