var dg;
function listResource(xid,nodeId) {
	dg = $('#dataGrid');
	$('#deviceList').show();
	dg.datagrid({
				border : false,
				fitColum : true,
				fit : true,
				nowarp : true,
				sortName : 'name',
				sortOrder : 'desc',
				pageSize : 10,
				checkOnSelect : false,
				selectOnCheck : false,
				striped : true,
				rownumbers : true,
				pagination : true,
				singleSelect : true,
				pageList : [ 10, 20, 30, 40 ],
				iconCls : 'icon-save',
				url : '${pageContext.request.contextPath}/resource/ResourceFile_select.do?id='
						+ nodeId,
				idField : 'id',
				pagePosition : 'bottom',
				frozenColumns : [ [ {
					field : 'id',
					title : '编号',
					width : 100,
					checkbox : true
				}, {
					field : 'pid',
					title : '文件夹名',
					width : 100,
					sortable : true
				} ] ],
				columns : [ [ {
					field : 'name',
					title : '文件名',
					width : 100,
				}, {
					field : 'snap',
					title : '截图路径',
					hidden : true,
				}, {
					field : 'mapped',
					hidden : true,
				}, {
					title : '路径',
					field : 'path',
					width : 100
				} ] ],
			});
}

function append() {
	$('#admin_addForm').form('clear');
	$('#admin_equipment_addDialog').dialog('open');
}

function query(){
	var rows = dg.datagrid("getChecked");
	var resources = new Array();
	for (var i = 0; rows && i < rows.length; i++) {
	    var row = rows[i];
	    var resource = new Object();
	    
	    resource.path = row.path;
	    resource.mapped = row.snap;
	    resource.snap=row.snap;
		resource.w=200;
		resource.h=200;
		resource.type=4;
		resources.push(resource);
	}
	return resources;
}

function controlEndpoint(controlFlag, controlType) {
	var rows = dg.datagrid('getChecked');
	var epids = [];
	if (rows.length > 0) {
		for ( var i = 0; i < rows.length; i++) {
			epids.push(rows[i].epid);
		}
		var submitUrl = "${pageContext.request.contextPath}/device/Device_controlEndPoint.do?controlFlag="
				+ controlFlag+"controlType="+controlType;
		//将命令交给后台做处理
		$.ajax({
			type : "GET",
			cache : false,
			url : submitUrl,
			data : {
				epids : epids.join(',')
			},
			dataType : 'json',
			success : function(d) {
				dg.datagrid('load');
				dg.datagrid('unselectAll');
				$.messager.show({
					title : '提示',
					msg : d.msg
				});
			}
		});
	} else {
		alert("请至少选择一条需要操作的记录");
	}
}

//重启机器
function reStartMachine() {
	controlEndpoint(513,"CONTROL_REBOOT");
}
