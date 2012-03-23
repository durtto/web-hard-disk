<?php
require_once("../lib/config.php");
require_once("../lib/dbclass.php");
require_once("../lib/JSON.php");
$json = new Services_JSON();
//$node = isset($_POST['node']) && $_POST['node'] != 0 ? $_POST['node'] : 0;

$sql = "select *
		from `dir_data`
		order by dir_id asc, dir_parent asc";
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
$result = $db->query($sql);
//根目錄
$array[0] = array("dir_id" => 0,
			 "dir_name" => "根目錄");
while($arr = $db->getarray($result)){
	$array[] = $arr;
}
echo $_GET['callback'].'({"totalCount":"'.count($array).'","data":'.$json->encode($array).'})';

?>