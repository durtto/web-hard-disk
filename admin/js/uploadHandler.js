function fileQueued(file){
	var target = Ext.get(this.customSettings.progressTarget);
	var child = target.createChild({tag:"div",id:"div_"+file.id});
	
	var progress = new Ext.ProgressBar({
        text:file.name,
        id: file.id,
		width: '50%',
		columnWidth: .80,
        cls:'left-align'
    });
	var pp = new Ext.Panel({
		border: false,
		layout: 'column',
		items:[
			progress,
			{
				html: '<input type="button" onClick="cancelOne(\''+file.id+'\');" value="取消">',
				columnWidth: .20,
				border: false
			}
		],
		renderTo: child
	});
	if(Ext.get("fsUploadProgress").getHeight() > 260){
		Ext.getCmp("progressPanel").setHeight( Ext.getCmp("progressPanel").getHeight() + progress.getHeight() );
	}
	
}

function fileDialogComplete(numFilesSelected, numFilesQueued) {
	//nothing to do
}
function uploadStart(file) {
	this.addFileParam(file.id, "dirID", current_dir);
}
function uploadProgress(file, bytesLoaded, bytesTotal) {
	var progress = Ext.getCmp(file.id);
	var persent = bytesLoaded/bytesTotal;
	progress.updateProgress(persent,file.name+" "+Math.floor((persent)*100)+'% '+ SWFUpload.speed.formatBPS(file.currentSpeed));
}
function uploadSuccess(file, serverData) {
	var progress = Ext.getCmp(file.id);
	progress.updateText(file.name+' Upload Complete');
}

function uploadError(file, errorCode, message) {
	var progress = Ext.getCmp(file.id);
	switch (errorCode) {
		case SWFUpload.UPLOAD_ERROR.HTTP_ERROR:
			progress.updateText("Upload Error: " + message);
			this.debug("Error Code: HTTP Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_FAILED:
			progress.updateText("Upload Failed.");
			this.debug("Error Code: Upload Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.IO_ERROR:
			progress.updateText("Server (IO) Error");
			this.debug("Error Code: IO Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.SECURITY_ERROR:
			progress.updateText("Security Error");
			this.debug("Error Code: Security Error, File name: " + file.name + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_LIMIT_EXCEEDED:
			progress.updateText("Upload limit exceeded.");
			this.debug("Error Code: Upload Limit Exceeded, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_VALIDATION_FAILED:
			progress.updateText("Failed Validation.  Upload skipped.");
			this.debug("Error Code: File Validation Failed, File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
		case SWFUpload.UPLOAD_ERROR.FILE_CANCELLED:
			/*
				取消上傳
			*/
			progress.updateText(file.name+" Cancelled");
			setTimeout(function (){
				Ext.fly("div_"+file.id).fadeOut({
					remove: true
				});
			},200);
			break;
		case SWFUpload.UPLOAD_ERROR.UPLOAD_STOPPED:
			progress.updateText("Stopped");
			break;
		default:
			progress.updateText("Unhandled Error: " + errorCode);
			this.debug("Error Code: " + errorCode + ", File name: " + file.name + ", File size: " + file.size + ", Message: " + message);
			break;
	}
	
	
}

function uploadComplete(file) {
	setTimeout(function (){
		Ext.fly("div_"+file.id).fadeOut({
			remove: true
		});
	},1000);
}

// This event comes from the Queue Plugin
function queueComplete(numFilesUploaded) {
	Ext.Msg.alert("成功","所有檔案上傳完成");
	Ext.getCmp("uploadWindow").hide();
	store.reload({params:{start:0, limit:12, dir:current_dir, search: ''}});
}

function startall(){
	swfu.startUpload();
}
function cancelOne(id){
	swfu.cancelUpload(id, SWFUpload.UPLOAD_ERROR.FILE_CANCELLED);
}
function stopall(){
	swfu.cancelQueue();
}