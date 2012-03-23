/*!
 * Ext JS Library 3.0.0
 * Copyright(c) 2006-2009 Ext JS, LLC
 * licensing@extjs.com
 * http://www.extjs.com/license
 */

//
// This is the main layout definition.
//
Ext.onReady(function(){
	
	Ext.QuickTips.init();
	
	// This is an inner body element within the Details panel created to provide a "slide in" effect
	// on the panel body without affecting the body's box itself.  This element is created on
	// initial use and cached in this var for subsequent access.
	var detailEl;
	
	// This is the main content center region that will contain each example layout panel.
	// It will be implemented as a CardLayout since it will contain multiple panels with
	// only one being visible at any given time.
	var contentPanel = {
		id: 'content-panel',
		region: 'center', // this is what makes this panel into a region within the containing layout
		layout: 'card',
		margins: '2 5 5 0',
		activeItem: 0,
		border: true,
		items: [grid
			//fileGrid
		]
	};
    
	var treePanel = new Ext.tree.TreePanel({
        useArrows: true,
		id: 'tree-panel',
		region:'north',
		height: 400,
        autoScroll: true,
        animate: true,
        enableDD: false, // false for custom user
        containerScroll: true,
        border: false,
        // auto create TreeLoader
        dataUrl: 'getDir.php',

        root: {
            nodeType: 'async',
            text: '/',
            draggable: false,
            id: '0'
        }
    });

    // render the tree
    treePanel.getRootNode().expand();
	treePanel.on('beforemovenode', function(tree,node,oldp,newp,index){
		//var aaaa = dd.getEl();
		var ss;
		
	})
	treePanel.on('click', function(n){
    	var sn = this.selModel.selNode || {}; // selNode is null on initial selection
		var search = Ext.get('search');
		search.dom.value = "";
		store.setBaseParam('search', "")
		store.load({params:{start:0, limit:12, dir:n.id}});
		store.on("datachanged",function (){
			var tempN = n;
			var title = new Array;
			var i = 0;
			while(!tempN.isRoot){
				title[i++] = tempN.text;
				tempN = tempN.parentNode;
			}
			
			grid.setTitle("目前位置："+title.reverse().join(" >> "));
		});
	});
	
	// This is the Details panel that contains the description for each example layout.
	var detailsPanel = {
		id: 'details-panel',
        title: '檔案詳細資訊',
        region: 'center',
        autoScroll: true
	};
	
	// Finally, build the main layout once all the pieces are ready.  This is also a good
	// example of putting together a full-screen BorderLayout within a Viewport.
    new Ext.Viewport({
		layout: 'border',
		title: 'Ext Layout Browser',
		items: [{
			xtype: 'box',
			region: 'north',
			applyTo: 'header',
			height: 30
		},{
			layout: 'border',
	    	id: 'layout-browser',
	        region:'west',
	        border: false,
	        split:true,
			margins: '2 0 5 5',
	        width: 275,
	        minSize: 100,
	        maxSize: 500,
			items: [treePanel, detailsPanel]
		},
			grid
		],
        //renderTo: Ext.getBody()
		renderTo: 'loayout'
    });
	
	
	Ext.get('loading').remove();
	Ext.get('loading-mask').fadeOut({
		remove:true
	});
  
});
