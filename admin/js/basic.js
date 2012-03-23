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
	var html = '<img src="../images/icon_'+val+'.jpg" border=0 height="25" onerror="javascript:this.src=\'../images/icon_other.jpg\'">';
	return html;
}
function renderName(val){
	var html = '<a href="../down.php?id='+recordCurrentId+'" target=_blank>'+val+'</a>';
	return html;
}
function renderSize(val){
	var value = val;
	var unit_array = new Array("bytes", "KB", "MB", "GB", "TB");
	var unit = 0;
	
	while(value > 1024){
		value = value / 1024;
		unit++;
	}
	return Math.floor(value) + unit_array[unit];
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
	if(e.getKey() == 13){ //press enter
		searchFn();
	}
});
searchBTN = new Ext.Button({
	text: '搜尋',
	handler: searchFn
});
function searchFn(){
	var search = Ext.get('search');
	if(search.getValue()){
		//Disable newDir, upload buttons
		Ext.getCmp("newDirBtnID").disable();
		Ext.getCmp("uploadBtnID").disable();
	}
	store.setBaseParam('search', search.getValue());
	store.load({params:{start:0, limit:12}});
	
}
newDirBtn = new Ext.Button({
	text: '新增資料夾',
	id: 'newDirBtnID',
	handler: newDir
});
uploadBtn = new Ext.Button({
	text: '上傳檔案',
	id: 'uploadBtnID',
	handler: openWindow
});

grid = new Ext.grid.GridPanel({
	region: 'center',
	title:'檔案列表',
	store: store,
	trackMouseOver:false,
	loadMask: true,
	columns:colModel,
	enableDragDrop: true, //for admin
	ddGroup: 'gridDDGroup',
	
	viewConfig: {
		forceFit:true,
		enableRowBody:true,
		showPreview:false
	},
	
	tbar: [
		searchField,
		searchBTN,
		newDirBtn,
		uploadBtn
	],
	bbar: new Ext.PagingToolbar({
		pageSize: 12,
		store: store,
		displayInfo: true,
		displayMsg: '共有 {2} 筆資料，目前顯示第 {0} 到 {1} 筆',
		emptyMsg: "沒有資料可顯示"
	})
});


	
grid.on('click', reFreshinfo);

function reFreshinfo(e){
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
}

store.on("load",function (){
	var el = grid.getGridEl();
	if (store.getTotalCount() == 0 && typeof el == 'object') {
		el.mask('沒有檔案在此資料夾下', 'x-mask');
	}else{
		el.unmask();
	}
	
	reFreshinfo();
});