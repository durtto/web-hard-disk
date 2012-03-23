<?php
require_once("../lib/config.php");
require_once("../lib/dbclass.php");
require_once("../lib/JSON.php");
$json = new Services_JSON();
$node = isset($_POST['node']) && $_POST['node'] != 0 ? $_POST['node'] : 0;

$sql = "select dir.*, user.user_name 
		from `dir_data` dir, `user_data` user
		where dir.dir_parent = ".$node."
		and dir.dir_owner_id = user.user_id";
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
$result = $db->query($sql);
while($arr = $db->getarray($result)){
	$qtip = '擁有者：'.$arr['user_name']."<br>
			 建立日期：".$arr['dir_creat_time'];
    $nodes[] = array('text'=>$arr['dir_name'], 
					 'id'=>$arr['dir_id'], 
					 'qtip'=>$qtip, 
					 'cls'=>'folder');
}
echo $json->encode($nodes);
