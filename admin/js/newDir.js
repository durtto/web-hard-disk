function newDir(){
	addDirWin = new Ext.Window({
		title    : '新增資料夾',
		closable : true,
		closeAction : 'close',
		width    : 420,
		height	 : 180,
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
				width: 		380,
				autoHeight: true,
				//height:		120,
				labelWidth: 75,	
				fileUpload: true,
				frame: true,
				id:			'dirEditForm',
				xtype:	'form',
				items: [{
					xtype: 'textfield',
					hidden: true,
					value: current_dir,
					name: 'parent_id'
				},{               
					xtype: 'textfield',
					fieldLabel: '名稱',
					name: 'dir_name',
					allowBlank: false,
					anchor: '95%'                     
				}],
				 buttons: [{
					text: '新增',
					handler:	function(){
						if(Ext.getCmp('dirEditForm').getForm().isValid()){
							Ext.getCmp('dirEditForm').getForm().submit({
								url:	'./handleDir/addDir.php',
								waitMsg:'新增中...',
										success: function(form, action){ 
											var msg = action.result.msg.split("||");
											if(msg[0] == 'ok'){																							
												var selectedNode = treePanel.selModel.selNode;
												if(!selectedNode){
													selectedNode = treePanel.getRootNode();
												}
												
												var newNode = new Ext.tree.TreeNode({id: msg[2], text: msg[1], qtip: msg[3], cls: 'folder', icon: '../images/default/tree/folder.gif'});
												selectedNode.appendChild(newNode);
												addDirWin.hide();
												Ext.Msg.alert("Success", "新增成功！ ");
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
	
	addDirWin.show();
}