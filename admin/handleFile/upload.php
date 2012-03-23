<?php
require_once("../../lib/config.php");
require_once("../../lib/dbclass.php");

$owner_id = 1;
$dir_id = $_POST['dirID'];
$ntime = time();
$filename = $_FILES['Filedata']["name"]; //檔案原始名稱
//$filename_fix = str_replace(" ","_",$filename);
$explodestr = explode(".",$filename); //主、副檔案名稱分割
$x = $explodestr[count($explodestr)-1]; //x = 副檔名
$randnum = rand();
$uploadname = $ntime.$randnum.".".$x; //伺服器上檔案名稱

$filesize = $_FILES['Filedata']["size"]; //取得檔案大小
$filetype = $x; //取得檔案型態 = 副檔名
$tempfile = $_FILES['Filedata']["tmp_name"];
$filepath = $file_real_path.$uploadname; //上傳路徑

copy($tempfile,$filepath);

$db = new dbClass($db_username, $db_password, $db_database, $db_hostname);
$db->start();

$sql = "INSERT INTO file_data (`file_owner_id`,	  `file_name`,    `file_size`,    `file_type`,   `file_upname`,   `file_dir`,  `upload_time`) 
		VALUES 				  ('".$owner_id."','".$filename."','".$filesize."','".$filetype."','".$uploadname."','".$dir_id."', NOW())";
		
$db->query($sql);
$db->close();
?>