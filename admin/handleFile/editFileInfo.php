<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");
require_once("../../lib/JSON.php");
$json = new Services_JSON();

$fileID = $_POST['file_id'];
$fileName = $_POST['file_name'];
$dirID = $_POST['dir'];
$fileInfo = $_POST['file_info'];
$owner_id = $_POST['owner_id'];

$sql = "UPDATE `file_data` 
		SET `file_name` = '".$fileName."',
		file_dir = '".$dirID."',
		file_owner_id = '".$owner_id."',
		file_info = '".$fileInfo."'
		WHERE `file_id` = ".$fileID;
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
if($db->query($sql)){
	$callBack['success'] = true;
	$callBack['msg'] = "ok";
	echo $json->encode($callBack);
}else{
	$callBack['failer'] = true;
	$callBack['msg'] = "no";
	echo $json->encode($callBack);
}
$db->close();
?>