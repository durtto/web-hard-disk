<?php
header('Content-type: text/html; charset=utf-8');
echo "權限尚未設定完成";
exit;

require_once('./lib/config.php');
require_once('./lib/dbclass.php');
header('Content-type: text/html; charset=utf-8');
$colname_file_data = (int)$_GET[id];

//取出檔案名稱

$query_file_data = sprintf("SELECT * FROM file_data WHERE file_id = $colname_file_data");
$resoult = $db->query($query_file_data);
$row_file_data = $db->getarray($resoult);

//insert下載紀錄
if(isset($_SERVER['HTTP_X_FORWARDED_FOR'])){
 $user_ip = $_SERVER['HTTP_X_FORWARDED_FOR']; 
}else{
 $user_ip = $_SERVER['REMOTE_ADDR']; 
}
	$insert_time = date("Y-m-d G:i:s");
	$filename_fix = quotemeta($row_file_data[file_name]);
    $insertSQL = sprintf("INSERT INTO down_log (file_name,down_ip,down_time,down_user) VALUES ('$row_file_data[file_name]','$user_ip','$insert_time','$_SESSION[MM_Username]')");

    if(!$db->insert($insertSQL)){
		echo "<a href=\"mailto:herbjoyce@gmail.com\">伺服器錯誤,請回報管理員</a>";
		exit;
	}


//print_r($row_file_data);

if($row_file_data['file_upname'] != ""){
 
   $filepath = $file_real_path.$row_file_data['file_upname'];
   //$filepath = "c:/t.txt";
   $filename=$row_file_data['file_name'];
   $filetype=filetype($filepath);
   $filesize=filesize($filepath);
   $filest = stat($filepath);
//print_r($filest);

	switch ($row_file_data['file_type']){
	
	  case "pdf": $ctype="application/pdf"; break;
      case "exe": $ctype="application/octet-stream"; break;
      case "zip": $ctype="application/zip"; break;
      case "doc": $ctype="application/msword"; break;
      case "xls": $ctype="application/vnd.ms-excel"; break;
      case "ppt": $ctype="application/vnd.ms-powerpoint"; break;
      case "gif": $ctype="image/gif"; break;
      case "png": $ctype="image/png"; break;
      case "jpeg":
      case "jpg": $ctype="image/jpg"; break;
      case "mp3": $ctype="audio/mpeg"; break;
      case "wav": $ctype="audio/x-wav"; break;
      case "mpeg":
      case "mpg":
      case "mpe": $ctype="video/mpeg"; break;
      case "mov": $ctype="video/quicktime"; break;
      case "avi": $ctype="video/x-msvideo"; break;
/*
      //The following are for extensions that shouldn't be downloaded (sensitive stuff, like php files)
      case "php":
      case "htm":
      case "html":
      case "txt": die("<b>Cannot be used for ". $file_extension ." files!</b>"); break;
*/
      default: $ctype="application/force-download";
	}
	
	//Begin writing headers
    header("Pragma: public");
    header("Expires: 0");
    header("Cache-Control: must-revalidate, post-check=0, pre-check=0");
    header("Cache-Control: public"); 
    header("Content-Description: File Transfer");
    
    //Use the switch-generated Content-Type
    header("Content-Type: $ctype");

    //Force the download
	/* if (ereg("MSIE",$_SERVER["HTTP_USER_AGENT"])){
	//如果是IE那個低能兒就將檔名轉為Big5,再送出檔名
		$header="Content-Disposition: attachment; filename=".iconv('utf-8','big5',$filename);
    }else{
    	$header="Content-Disposition: attachment; filename=".$filename.";";
	} */
	$header="Content-Disposition: attachment; filename=".$filename.";";
    header($header );
    header("Content-Transfer-Encoding: binary");
    header("Content-Length: ".$filesize);
    @readfile($filepath);
	exit;





}else{
  echo "此檔已被刪除";
}
?>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<title>無標題文件</title>
</head>

<body>
</body>
</html>
<?php
mysql_free_result($file_data);
?>
