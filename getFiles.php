<?php
require_once("./lib/config.php");
require_once("./lib/dbclass.php");
require_once("./lib/JSON.php");
$json = new Services_JSON();
$dir = isset($_POST['dir']) && $_POST['dir'] != 0 ? $_POST['dir'] : 0;
$start = $_POST['start'];
$limit = $_POST['limit'];
$search = $_POST['search'];

if(empty($search)){
	$count_sql = "select * from file_data
				  WHERE file_dir = ".$dir;
	$sql = "SELECT file . * , user.user_name
			FROM `file_data` file , `user_data` user
			WHERE file.file_dir = ".$dir."
			and file.file_owner_id = user.user_id
			order by file.file_id DESC
			LIMIT ".$start." , ".$limit;
}else{
	$count_sql = "select * from file_data
				  WHERE `file_name` LIKE '%".$search."%'";
	$sql = "SELECT file . * , user.user_name
			FROM `file_data` file , `user_data` user
			WHERE file.file_owner_id = user.user_id
			AND `file_name` LIKE '%".$search."%'
			order by file.file_id DESC
			LIMIT ".$start." , ".$limit;
}		
		
$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();
$count = $db->getcount($count_sql);
$result = $db->query($sql);
while($arr = $db->getarray($result)){
	$array[] = $arr;
}
if($count){
	echo $_GET['callback'].'({"totalCount":"'.$count.'","data":'.$json->encode($array).'})';
}else{
	echo $_GET['callback'].'({"totalCount":"'.$count.'","data":""})';
}
?>