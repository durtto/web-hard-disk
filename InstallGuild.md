# Introduction #

How to install the system.
簡易手動安裝教學


# Details #

1. Get the source or unzip the archive from download label and put them to your http server's document root.<br>
2. Create a database named "webhd", if you want to change what you like, don't forget to edit lib/config.php file and replace the dbname variable value.<br>
3. Import the webhd.sql file using phpmyadmin or mysql tools <br>
4. Edit lib/config.php, then enter your database login info.<br>
5. visit <a href='http://your.website.com/webhd/'>http://your.website.com/webhd/</a> or <a href='http://your.website.com/webhd/admin'>http://your.website.com/webhd/admin</a>
<br><br>
1. 取得source code或下載壓縮檔，並解壓縮至網頁伺服器下的根目錄<br>
2. 利用phpmyadmin或其他工具建立一個叫 "webhd" 的資料庫，如果要改成自己喜歡的名子，記得修改 lib/config.php 檔案內的dbname 變數。<br>
3. 匯入 webhd.sql 檔案<br>
4. 修改 lib/config.php 填入資料庫登入資訊<br>
5. 訪問 <a href='http://your.website.com/webhd/'>http://your.website.com/webhd/</a> 瀏覽或 ttp://your.website.com/webhd/admin 管理