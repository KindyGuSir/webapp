var dg;
var pxid='a';
var pnodeId='a';
var weekselected="";
var allproject;
var searchFlag=false;
var sortsign= 'asc';
var nodeevent;
var nodetreeId;
var nodetreeNode;
var nodetreetext;

function mysort(){
	if(sortsign== 'asc'){
		dg.datagrid('reload',{sortOrder:'desc'});
		sortsign = 'desc';
		return;
	}else if(sortsign== 'desc'){
		dg.datagrid('reload',{sortOrder:'asc'});
		sortsign = 'asc';
		return;
	}
}

function listNotice(){
	//alert(nodetreeId + "------listNotice-----" + nodetreetext);
	if(nodeevent=="groupId"){			
		listNoticeList("groupId",nodetreeId,nodetreetext);
	}else{
		listNoticeList("deviceId",nodetreeId,nodetreetext);
	}
}

function selectNode(event, treeId,nodeText){
	//alert(event + "----selectNode------" + treeId + "------------" + nodeText);
	nodeevent=event;
	nodetreeId=treeId;
	nodetreetext=nodeText;
}

function listNoticeList(xid,nodeId,nodeText) {
		pxid=xid;
		pnodeId=nodeId;
		$('#noticeList').show();
		dg = $('#dataGrid');
		$('#dataGrid').show();
//		var obj=document.getElementById("gridFrame").contentWindow;  
//		var dg=obj.document.getElementById("dataGrid"); 
			dg.datagrid({
					border : false,
					fitColumns : true,
					fit : true,
					nowarp : false,
					checkOnSelect : true,
					selectOnCheck : true,
					striped : true,
					rownumbers : true,
					pagination : true,
					singleSelect : false,
					pagination : false,
					rownumbers : true,
					idField : 'id',
					iconCls : 'icon-save',
					url : '/ManagementCenter/playplan/PlayPlan_getNoticeList.do?'+xid+'='+ nodeId,
					sortName : 'updatetime',
					sortOrder : 'desc',
					remoteSort : false,
					frozenColumns : [ [ {
						title : '编号',
						field : 'id',
						checkbox : true
					} ] ],
					columns : [ [ 
					{
						title : '通知标题',
						field : 'name',
						sortable : true
					} ,{
						title : '播放时间',
						field : 'playtime'
					}, {
						title : '最后修改人',
						field : 'updateuser'
					}, {
						title : '最后修改时间',
						field : 'updatetime',
						sortable : true
					}] ]
				});
			dg.datagrid('clearSelections');
			dg.datagrid('clearChecked');
}