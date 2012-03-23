function openWindow(){
	var window = new Ext.Window({
		//height: 500,
		id: 'uploadWindow',
		width: 400,
		autoHeight: true,
		plain: true,
		layout: 'fit',
		autoScroll: true,
		constrain: true,
		bodyBorder: false,
		modal	 : true,
		border: false,
		closeAction: 'close',
		resizable: true,
		shadow: true,
		title: '<img src="../images/131.gif" border="0" width="30"> 檔案上傳',
		items:[{
			xtype: 'panel',
			height: 300,
			id: 'progressPanel',
			//autoHeight: true,
			autoScroll: true,
			html: '<span id="spanButtonPlaceHolder"></span><div id="fsUploadProgress"></div>'
		}],
		buttonAlign: 'center',
		buttons:[{
			text: '<img src="../images/19.gif" border="0" width="13"> 開始上傳',
			handler: startall
		},{
			text: '<img src="../images/116.gif" border="0" width="13"> 全部取消',
			handler: stopall
		}]
	});
	
	window.on("show",function (){
		
		var settings_object = {
			upload_url : "./handleFile/upload.php",
			flash_url : "../lib/swfupload.swf",
			//button settings
			button_image_url: "../images/XPButtonNoText_61x22.png",
			button_width: "61",
			button_height: "22",
			button_placeholder_id: "spanButtonPlaceHolder",
			button_text: '<span class="theFont">選擇檔案</span>',
			button_text_style: ".theFont { font-size: 12px;color: #000000;}",
			button_text_left_padding: 5,
			button_text_top_padding: 3,
			
			custom_settings : {
						progressTarget : "fsUploadProgress"
			},
			// The event handler functions are defined in handlers.js
			file_queued_handler : fileQueued,
			file_dialog_complete_handler : fileDialogComplete,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_success_handler : uploadSuccess,
			upload_complete_handler : uploadComplete,
			queue_complete_handler : queueComplete	// Queue plugin event
		};
	
		swfu = new SWFUpload(settings_object);
		
	});
	
	window.show();
}