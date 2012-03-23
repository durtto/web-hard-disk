//關閉預設右鍵選單
//document.oncontextmenu=new Function("return false");

//資料夾datastore
dirStore = new Ext.data.JsonStore({
	root: 'data',
	totalProperty: 'totalCount',
	idProperty: 'dir_id',
	remoteSort: true,
	autoLoad: true,
	
	fields: [
		'dir_id',
		'dir_name',
		'dir_parent'
	],

	proxy: new Ext.data.HttpProxy({
		url: './getAllDir.php'
	})
});
//使用者datastore
userStore = new Ext.data.JsonStore({
	root: 'data',
	totalProperty: 'totalCount',
	idProperty: 'user_id',
	remoteSort: true,
	autoLoad: true,
	
	fields: [
		'user_id',
		'user_name',
		'user_group',
		'group_name'
	],

	proxy: new Ext.data.HttpProxy({
		url: './getAllUser.php'
	})
});

//呼叫編輯檔案視窗
function editFileWinFn(dom){
	if(selectedFileIndex == -1){
		alert('請先選擇檔案!');
		return;
	}
	//alert(grid.store.data.items[selectedFileIndex].data.file_name);
	var editFileWin = "";
	
	var editDir = new Ext.form.ComboBox({
			fieldLabel: '所在資料夾',
			hiddenName: 'dir',
			mode: 'remote',
			store: dirStore,
			displayField:'dir_name',
			valueField:'dir_id',
			value: grid.store.data.items[selectedFileIndex].data.file_dir,
			allowBlank :false,
			typeAhead: true,
			triggerAction:'all',
			editable: false,
			forceSelection: true
	});
	var editUser = new Ext.form.ComboBox({
			fieldLabel: '擁有者',
			hiddenName: 'owner_id',
			mode: 'remote',
			store: userStore,
			displayField:'user_name',
			valueField:'user_id',
			value: grid.store.data.items[selectedFileIndex].data.file_owner_id,
			allowBlank :false,
			typeAhead: true,
			triggerAction:'all',
			editable: false,
			forceSelection: true
	});
	
	editFileWin = new Ext.Window({
		title    : '修改檔案',
		closable : true,
		closeAction : 'close',
		width    : 640,
		height	 : 520,
		modal	 : true,
		plain    : true,
		layout   : 'border',
		items    : [{
			region      : 'center',
			frame		: true,
			width       : 200,
			margins     : '3 0 3 3',
			cmargins    : '3 3 3 3',
			autoScroll : true,
			items		: [{
				width: 		580,
				autoHeight: true,
				//height:		120,
				labelWidth: 75,	
				fileUpload: true,
				frame: true,
				id:			'fileEditForm',
				xtype:	'form',
				items: [{
					xtype:			'textfield',
					name:			'file_id',
					value: grid.store.data.items[selectedFileIndex].data.file_id,
					hidden: true
				},{               
					xtype:			'textfield',
					fieldLabel: 	'名稱',
					name:			'file_name',
					allowBlank:		false,
					value: grid.store.data.items[selectedFileIndex].data.file_name,
					anchor:			'95%'                     
				},
				editDir,
				editUser,{               
					xtype:			'htmleditor',
					fieldLabel: 	'檔案描述',
					name:			'file_info',
					allowBlank:		false,
					value: grid.store.data.items[selectedFileIndex].data.file_info,
					anchor:			'95%'                     
				}],
				 buttons: [{
					text: '修改',
					handler:	function(){
						if(Ext.getCmp('fileEditForm').getForm().isValid()){
							Ext.getCmp('fileEditForm').getForm().submit({
								url:	'./handleFile/editFileInfo.php',
								waitMsg:'編輯資料中...',
										success: function(form, action){ 	
											if(action.result.msg == 'ok'){																							
												store.reload();
												editFileWin.hide();
												Ext.Msg.alert("Success", "編輯成功！ ");
											}else{
												alert(action.result.msg);
											}
										}
							});
						}else{
							Ext.Msg.alert("警告","請填寫完整");
						}
						
					}
				}]
				
			}]
		}]
	});
	
	editFileWin.show();
}

function delFileFn(id, upname){
	if(selectedFileIndex == -1){
		alert('請先選擇檔案!');
		return;
	}
	
	Ext.Ajax.request({
		url: 'handleFile/delFile.php?fileId='+id+'&fileUpName='+upname,
		method: 'POST',
		success: function(result) {
				if(result.responseText == 'not_login'){
					alert('請先登入會員!');
					location.href = "login.php";
				}
				if(result.responseText == 'ok'){
					grid.store.removeAt(selectedFileIndex);
				}
				if(result.responseText == 'no'){
					Ext.Msg.alert('刪除失敗!!');
				}
		},
		failure: function() {
		   alert('伺服器錯誤,請聯絡管理員');  
		}
	});
}
Ext.onReady(function(){
	grid.on('contextmenu',function (e){
		e.preventDefault();
		var target = e.getTarget();
		selectedFileIndex = -1;
		if(target.childNodes[0].innerHTML){
			if(target.childNodes[0].innerHTML.match(/<\/[a,A]>$/)){
				var text = target.childNodes[0].childNodes[0].innerHTML;
			}else{
				var text = target.childNodes[0].innerHTML;
			}
		}else{
			return;
		}
		//auto select row data
		for(var i=0; i < grid.store.data.length; i++){
			if(grid.store.data.items[i].data.file_name == text){
				selectedFileIndex = i;
			}
		}
		if(selectedFileIndex == -1){
			return;
		}
		grid.getSelectionModel().selectRow(selectedFileIndex);
		if(!this.contextMenu){
			this.contextMenu = new Ext.menu.Menu({
				id: 'gridCtxMenu',
				items: [
					{
						text: '編輯',
						handler: function (){
							editFileWinFn(target);
						}
					},{
						text: '刪除',
						handler: function (){
							Ext.Msg.confirm('警告','確定要刪除嗎?',function (btn){
								if(btn == "yes"){
									delFileFn(grid.store.data.items[selectedFileIndex].data.file_id, grid.store.data.items[selectedFileIndex].data.file_upname);
								}
							})
						}
					}
				]
			}); 
		}
		
		var xy = e.getXY();
		this.contextMenu.showAt(xy);
	});
});