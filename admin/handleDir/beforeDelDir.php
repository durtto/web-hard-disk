<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");

$dirID = $_GET['dirId'];

//�P�_�Ӹ�Ƨ��U���L�ɮ�
$sql = "SELECT *
		FROM `file_data`
		WHERE `file_dir` = ".$dirID;
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
if($db->getcount($sql)){
	echo "haveItem";
	exit;
}

//�P�_�Ӹ�Ƨ��U���L�l��Ƨ�
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