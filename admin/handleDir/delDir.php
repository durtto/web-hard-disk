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
	//�M�䦳�L�l��Ƨ�
	while($arr = $db->getarray($result)){
		delDir($arr['dir_id']);
	}
	//�R���Ӹ�Ƨ��U�Ҧ��ɮ�
	$sql = "DELETE from file_data
			where file_dir = ".$id;
	$db->query($sql);
	//�R���Ӹ�Ƨ�
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