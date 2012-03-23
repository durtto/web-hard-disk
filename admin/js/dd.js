Ext.onReady(function(){
	//var secondGridDropTargetEl = secondGrid.getView().el.dom.childNodes[0].childNodes[1]
	var treeDDGroupTargetEl = treePanel.el.dom.childNodes[0].childNodes[0].childNodes[0].childNodes[0]; //Tree Node Element
	var destGridDropTarget = new Ext.dd.DropTarget(treeDDGroupTargetEl, {
		ddGroup    : 'gridDDGroup',
		copy       : false,
		notifyDrop : function(ddSource, e, data){
			
			function getTargetNode(node){
				var target = node.findChild("text",targetText);
				if(!target){
					if(node.childNodes.length != 0){
						node.eachChild(function(chnode){
							var chtarget = getTargetNode(chnode);
							if(chtarget){
								realTarget = chtarget;
							}
						});
					}else{
						return;
					}
				}else{
					return target;
				}
				return realTarget;
			}
			//targetText = e.getTarget().childNodes[0].data;
			targetText = e.getTarget().innerHTML;
			var rootNode = treePanel.getRootNode();
			
			if(targetText.match(/<\/[a,A]>$/)){
				var targetNode = rootNode;
			}else{
				var targetNode = getTargetNode(rootNode);
			}
			var targetID = targetNode.attributes.id;
			var fileID = ddSource.dragData.selections[0].data.file_id;
			
			//呼叫php
			Ext.Ajax.request({
				url: 'handleFile/fileMovDir.php?fileId='+fileID+'&dirId='+targetID,
				method: 'POST',
				success: function(result) {
						if(result.responseText == 'not_login'){
							alert('請先登入會員!');
							location.href = "login.php";
						}
						if(result.responseText == 'ok'){
							//將grid內資料刪除
							ddSource.grid.store.remove(ddSource.dragData.selections[0]);
							return(true);
						}
						if(result.responseText == 'no'){
							alert('移動失敗!!');
						}
						//alert(result.responseText);
				},
				failure: function() {
				   alert('伺服器錯誤,請聯絡管理員');  
				}
			});
			
		}
	});
	
	treePanel.on('beforemovenode', function(tree,node,oldp,newp,index){
		var oldID = node.attributes.id;
		var newID = newp.attributes.id;
		
		Ext.Ajax.request({
			url: 'handleDir/dirMovDir.php?oldId='+oldID+'&newId='+newID,
			method: 'POST',
			success: function(result) {
					if(result.responseText == 'not_login'){
						alert('請先登入會員!');
						location.href = "login.php";
					}
					if(result.responseText == 'ok'){
						//
					}
					if(result.responseText == 'no'){
						alert('移動失敗!!');
					}
					//alert(result.responseText);
			},
			failure: function() {
			   alert('伺服器錯誤,請聯絡管理員');  
			}
		});
	});
	
});