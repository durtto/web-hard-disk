store = new Ext.data.JsonStore({
	root: 'data',
	totalProperty: 'totalCount',
	idProperty: 'file_id',
	remoteSort: true,
	
	fields: [
		'file_id',
		'file_owner_id',
		'user_name',
		'file_name',
		'file_upname',
		'file_size',
		'file_type',
		'file_info',
		'file_dir',
		'upload_time',
		'last_edit_time'
	],

	proxy: new Ext.data.HttpProxy({
		url: './getFiles.php'
	})
});

recordCurrentId = "";
function rederId(val){
	recordCurrentId = val;
	return val;
}
function renderType(val){
	var html = '<img src="./images/icon_'+val+'.jpg" border=0 height="25" onerror="javascript:this.src=\'./images/icon_other.jpg\'">';
	return html;
}
function renderName(val){
	var html = '<a href="down.php?id='+recordCurrentId+'" target=_blank>'+val+'</a>';
	return html;
}
function renderSize(val){
	var value = val;
	var unit = " bytes";
	if(value > 1024){
		value = value / 1024;
		unit = " KB";
	}
	if(value > 1024){
		value = value / 1024;
		unit = " MB";
	}
	if(value > 1024){
		value = value / 1024;
		unit = " GB";
	}
	if(value > 1024){
		value = value / 1024;
		unit = " TB";
	}
	return Math.floor(value) + unit;
}
var colModel = [
	new Ext.grid.RowNumberer(),
	{ 
		id:'file_id',
		header: "", 
		hidden: true,
		dataIndex: 'file_id',
		renderer: rederId
	},{
		header: '類型',
		dataIndex: 'file_type',
		width: 30,
		renderer: renderType
	},
	{
		header: "名稱", 
		width: 300,
		dataIndex: 'file_name',
		renderer: renderName
	},{
		header: "大小", 
		dataIndex: 'file_size',
		width: 50,
		renderer: renderSize
	},{
		header: "上傳日期", 
		dataIndex: 'upload_time'
	}
];

searchField = new Ext.form.TextField({
	allowBlank: true,
	name: 'search',
	id: 'search',
	grow: true,
	enableKeyEvents: true,
	growMin: 133
	
});
searchField.on('keyup',function(field, e){
	if(e.getKey() == 13){
		searchFn();
	}
});
searchBTN = new Ext.Button({
	text: '搜尋',
	handler: searchFn
});
function searchFn(){
	var search = Ext.get('search');
	store.setBaseParam('search', search.getValue());
	store.load({params:{start:0, limit:12}});
}
grid = new Ext.grid.GridPanel({
	region: 'center',
	title:'檔案列表',
	store: store,
	trackMouseOver:false,
	loadMask: true,
	columns:colModel,

	viewConfig: {
		forceFit:true,
		enableRowBody:true,
		showPreview:false,
		getRowClass : function(record, rowIndex, p, store){
			var sel = grid.getSelectionModel().getSelected();
			if(sel && sel.id == record.data.file_id){
				var data = record.data.file_info ? record.data.file_info : '';
				p.body = '<p style="color:#FF0000;padding-left:30">'+ data +'</p>';
				return 'x-grid3-row-expanded';
			}
			
			return 'x-grid3-row-collapsed';
		}
	},
	
	tbar: [
		searchField,searchBTN
	],
	bbar: new Ext.PagingToolbar({
		pageSize: 12,
		store: store,
		displayInfo: true,
		displayMsg: '共有 {2} 筆資料，目前顯示第 {0} 到 {1} 筆',
		emptyMsg: "沒有資料可顯示"/*,
		items:[
			'-', {
			pressed: true,
			enableToggle:true,
			text: 'Show Preview',
			cls: 'x-btn-text-icon details',
			toggleHandler: function(btn, pressed){
				var view = grid.getView();
				view.showPreview = pressed;
				view.refresh();
			}
		}]*/
	})
});


	
grid.on('click',function (){
	//Refresh info
	var view = grid.getView();
    view.refresh();
	
	//Refresh detail panel
	var sel = grid.getSelectionModel().getSelected();
	var bd = Ext.getCmp('details-panel').body;
	bd.update('').setStyle('background','#fff');
	detailEl = bd.createChild(); //create default empty div
	
	var html = '<p style="padding: 15px;">';
	if(sel){
		html += '檔案名稱：'+sel.data.file_name+'<br>';
		html += '擁有者：'+sel.data.user_name+'<br>';
		html += '檔案大小：'+renderSize(sel.data.file_size)+'<br>';
		html += '上傳時間：'+sel.data.upload_time+'<br>';
		html += '最後修改時間：'+sel.data.last_edit_time+'<br>';
		html += '詳細資料：'+(sel.data.file_info ? sel.data.file_info : '')+'<br>';
	}
	html += '</p>';
	detailEl.hide().update(html).slideIn('l', {stopFx:true,duration:.2});
});

store.load({params:{start:0, limit:12, search: ''}});
store.on("load",function (){
	var el = grid.getGridEl();
	if (store.getTotalCount() == 0 && typeof el == 'object') {
		el.mask('沒有檔案在此資料夾下', 'x-mask');
	}else{
		el.unmask();
	}
});