<?php
require_once("../lib/config.php");
require_once("../lib/dbclass.php");
require_once("../lib/JSON.php");
$json = new Services_JSON();

$sql = "select user_data.*, user_group.group_name
		from `user_data`, `user_group`
		where user_data.user_group = user_group.group_id
		order by user_data.user_id asc";
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
$result = $db->query($sql);
while($arr = $db->getarray($result)){
	$array[] = $arr;
}
echo $_GET['callback'].'({"totalCount":"'.count($array).'","data":'.$json->encode($array).'})';

?>