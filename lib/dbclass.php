<?php
/*
	$db = new dbClass('username','pass','dbname');
*/
class dbClass{ //開始數據庫類
	var $username;
	var $password;
	var $database;
	var $hostname;
	var $link;
	var $result;

	function dbClass($username,$password,$database,$hostname="localhost",$dbcharset="utf8",$charset="utf8"){
		$this->username = $username;
		$this->password = $password;
		$this->database = $database;
		$this->hostname = $hostname;
		$this->dbcharset = $dbcharset;
		$this->charset = $charset;
	}
	
	function connect(){ //這個函數用於連接數據庫
		if(!$this->link=mysql_connect($this->hostname,$this->username,$this->password))
			$this->halt("Sorry,can not connect to database");
		
		if($this->version() > '4.1') {
			if(!$this->dbcharset && in_array(strtolower($this->charset), array('gbk', 'big5', 'utf-8','utf8'))) {
				$this->dbcharset = str_replace('-', '', $this->charset);
			}			
			if($this->dbcharset) {			    
				mysql_query("SET character_set_connection=$this->dbcharset, character_set_results=$this->dbcharset, character_set_client=binary");
			}		
		}
		if($this->version() > '5.0.1') {
			mysql_query("SET sql_mode=''");
		}		

		return $this->link;
	}
	
	function select(){ //這個函數用於選擇數據庫
		mysql_select_db($this->database,$this->link);
	}
	
	function start(){ //開始連線
		$this->connect();
		$this->select();
	}
	
	function query($sql){ //這個函數用於送出查詢語句並返回結果，常用。
		if($this->result=mysql_query($sql,$this->link)) return $this->result;
		else {
			$this->halt("SQL語句錯誤： <font color=red>$sql</font><br><br>錯誤信息： ".mysql_error());
			return false;
		}
	}

	/*
	以下函數用於從結果取回數組，一般與 while()循環、$db->query($sql) 配合使用，例如：
	$result=query("select * from mytable");
	while($row=$db->getarray($result)){
	echo "$row[id] ";
	}
	*/
	function getarray($result){
		return @mysql_fetch_array($result);
	}

	/*
	以下函數用於取得SQL查詢的第一行，一般用於查詢符合條件的行是否存在，例如：
用戶從表單提交的用戶名$username、密碼$password是否在用戶表「user」中，並返回其相應的數組：
	if($user=$db->getfirst("select * from user where username='$username' and password='$password' "))
	echo "歡迎 $username ，您的ID是 $user[id] 。";
	else
	echo "用戶名或密碼錯誤！";
	*/
	function getfirst($sql){
		return @mysql_fetch_array($this->query($sql));
	}

	/*
	以下函數返回符合查詢條件的總行數，例如用於分頁的計算等要用到，例如：
	$totlerows=$db->getcount("select * from mytable");
	echo "共有 $totlerows 條信息。";
	*/
	function getcount($sql){
		return @mysql_num_rows($this->query($sql)); 
	}

	/*
	以下函數用於更新數據庫，例如用戶更改密碼：
	$db->update("update user set password='$new_password' where userid='$userid' ");
	*/
	function update($sql){
		return $this->query($sql);
	}

	/*
	以下函數用於向數據庫插入一行，例如添加一個用戶：
	$db->insert("insert into user (userid,username,password) values (null,'$username','$password')");
	*/
	function insert($sql){
		return $this->query($sql);
	}
	
	function getid(){ //這個函數用於取得剛插入行的id
		return mysql_insert_id();
	}

	function num_rows($resoult) {
		return mysql_num_rows($resoult);
		//return $query;
	}
	
	function result($resoult,$num,$field_name){
		return mysql_result($resoult,$num,$field_name);
	}
	function num_fields($query) {
		return mysql_num_fields($query);
	}
	
	function free_result($query) {
		return mysql_free_result($query);
	}
		
	function version() {
		return mysql_get_server_info();
	}

	function close() {
		return mysql_close();
	}

	function halt($message = '') {
		return $message;
	}	
}
?>