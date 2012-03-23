function delDir(node){
	Ext.Ajax.request({
		url: 'handleDir/delDir.php?dirId='+node.attributes.id,
		method: 'POST',
		success: function(result) {
				if(result.responseText == 'not_login'){
					alert('請先登入會員!');
					location.href = "login.php";
				}
				if(result.responseText == 'ok'){
					var parent = node.parentNode;
					parent.removeChild(node);
				}
		},
		failure: function() {
		   alert('伺服器錯誤,請聯絡管理員');  
		}
	});
}

Ext.onReady(function(){
	treePanel.on('contextmenu',function (node, e){
		e.preventDefault();
		node.select();
		this.contextMenu = new Ext.menu.Menu({
			items: [{
					text: '展開',
					handler: function (){
						node.expand(true);
					}
				},{
					text: '縮合',
					handler: function (){
						node.collapse(true);
					}
				},
				{
					text: '重新命名',
					handler: function (){
						Ext.getCmp("treeEditor").triggerEdit(node);
					}
				},{
					text: '刪除',
					handler: function(){
						Ext.Ajax.request({
							url: 'handleDir/beforeDelDir.php?dirId='+node.attributes.id,
							method: 'POST',
							success: function(result) {
									if(result.responseText == 'not_login'){
										alert('請先登入會員!');
										location.href = "login.php";
									}
									if(result.responseText == 'haveItem'){
										Ext.Msg.confirm('警告','該資料夾下仍有檔案或資料夾<br>確定要無條件刪除嗎?',function(btn){
											if(btn == "yes"){
												delDir(node);
											}
										});
									}
									if(result.responseText == 'ok'){
										Ext.Msg.confirm('警告','確定要刪除嗎?',function(btn){
											if(btn == "yes"){
												delDir(node);
											}
										});
									}
							},
							failure: function() {
							   alert('伺服器錯誤,請聯絡管理員');  
							}
						});
					}
				}
			]
		}); 
		
		
		var xy = e.getXY();
		this.contextMenu.showAt(xy);
		
		
	});
});