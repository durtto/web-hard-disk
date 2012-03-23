<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");
require_once("../../lib/JSON.php");
$json = new Services_JSON();

$user_id = 1;
$user_name = "admin";
$parentID = $_POST['parent_id'];
$dir_name = $_POST['dir_name'];

$sql = "insert into dir_data (`dir_owner_id`, `dir_name`, `dir_parent`, `dir_creat_time`)
		values ('".$user_id."', '".$dir_name."', '".$parentID."', NOW())";
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
					 
if($db->query($sql)){
	$insert_id = $db->getid();
	$qtip = '擁有者：'.$user_name."<br>
			 建立日期：".date("Y-m-d H:i:s");
	$msg = "ok||".$dir_name."||".$insert_id."||".$qtip;
	$callBack['success'] = true;
	$callBack['msg'] = $msg;
	echo $json->encode($callBack);
}else{
	$callBack['success'] = true;
	$callBack['msg'] = "新增失敗";
	echo $json->encode($callBack);
}
$db->close();
?>