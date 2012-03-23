<?php
require_once("./lib/config.php");
require_once("./lib/dbclass.php");
require_once("./lib/JSON.php");
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
/*
// from php manual page
function formatBytes($val, $digits = 3, $mode = "SI", $bB = "B"){ //$mode == "SI"|"IEC", $bB == "b"|"B"
   $si = array("", "K", "M", "G", "T", "P", "E", "Z", "Y");
   $iec = array("", "Ki", "Mi", "Gi", "Ti", "Pi", "Ei", "Zi", "Yi");
   switch(strtoupper($mode)) {
       case "SI" : $factor = 1000; $symbols = $si; break;
       case "IEC" : $factor = 1024; $symbols = $iec; break;
       default : $factor = 1000; $symbols = $si; break;
   }
   switch($bB) {
       case "b" : $val *= 8; break;
       default : $bB = "B"; break;
   }
   for($i=0;$i<count($symbols)-1 && $val>=$factor;$i++)
       $val /= $factor;
   $p = strpos($val, ".");
   if($p !== false && $p > $digits) $val = round($val);
   elseif($p !== false) $val = round($val, $digits-$p);
   return round($val, $digits) . " " . $symbols[$i] . $bB;
}

$dir = isset($_REQUEST['lib'])&&$_REQUEST['lib'] == 'yui' ? '../../../' : '../../';
$node = isset($_REQUEST['node'])?$_REQUEST['node']:"";
if(strpos($node, '..') !== false){
    die('Nice try buddy.');
}
$nodes = array();
$d = dir($dir.$node);
while($f = $d->read()){
    if($f == '.' || $f == '..' || substr($f, 0, 1) == '.')continue;
    $lastmod = date('M j, Y, g:i a',filemtime($dir.$node.'/'.$f));
    if(is_dir($dir.$node.'/'.$f)){
        $qtip = 'Type: Folder<br />Last Modified: '.$lastmod;
        $nodes[] = array('text'=>$f, 'id'=>$node.'/'.$f, 'qtip'=>$qtip, 'cls'=>'folder');
    }else{
        $size = formatBytes(filesize($dir.$node.'/'.$f), 2);
        $qtip = 'Type: JavaScript File<br />Last Modified: '.$lastmod.'<br />Size: '.$size;
        $nodes[] = array('text'=>$f, 'id'=>$node.'/'.$f, 'leaf'=>true, 'qtip'=>$qtip, 'qtipTitle'=>$f , 'cls'=>'file');
    }
}
$d->close();
echo json_encode($nodes);
*/
