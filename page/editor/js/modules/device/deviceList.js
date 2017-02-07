var ids = [];
var IWIN = IWIN || parent.IWIN ||{};
var pageCount4=4;      //四分屏每页条数
var pageCountList=15;   //列表每页条数
//获取设备(4分屏)
function listDevice(xid,nodeId,nodeText) {
	var style=getCookie("style");
	var pageSize="";
	if(style!=null && ""!=style){
		pageSize=pageCountList;
	}else{
		pageSize=pageCount4;
	}
	$("#goo").attr("src",'${pageContext.request.contextPath}/device/DeviceGroup_listAllSubDevices.do?groupId='+nodeId+'&pageSize='+pageSize+'&currentPage=1&style='+style);
	$("#groupId").attr("value",nodeId);
}
//获取设备（列表展示）
function deviceList(){
	var keyWordStr=$("#dess").val().replace(/(^\s*)|(\s*$)/g, "");
	var groupId=$("#groupId").attr("value");
	setCookie("style", "allList",7);
	var pageSize=pageCountList;
	$("#goo").attr("src",'${pageContext.request.contextPath}/device/DeviceGroup_listAllSubDevices.do?groupId='+groupId+'&pageSize='+pageSize+'&currentPage=1&style=allList&keyWordStr='+keyWordStr);
}
//切换为4分屏
function deviceList4(){
	var keyWordStr=$("#dess").val().replace(/(^\s*)|(\s*$)/g, "");
	var groupId=$("#groupId").attr("value");
	removeCookie("style");
	var pageSize=pageCount4;
	$("#goo").attr("src",'${pageContext.request.contextPath}/device/DeviceGroup_listAllSubDevices.do?groupId='+groupId+'&pageSize='+pageSize+'&currentPage=1&keyWordStr='+keyWordStr);
}
//搜索
function doSearch(value){
	{
		var keyWordStr=value.replace(/(^\s*)|(\s*$)/g, "");
		var style= getCookie("style");
		var groupId=$("#groupId").attr("value");
		var pageSize="";
		if(style!=null && ""!=style){
			pageSize=15;
		}else{
			pageSize=4;
		}
		$("#goo").attr("src",'${pageContext.request.contextPath}/device/DeviceGroup_listAllSubDevices.do?groupId='+groupId+'&pageSize='+pageSize+'&currentPage=1&keyWordStr='+keyWordStr+'&style='+style);
	}
}
$(document).on("mouseover",".images_splic",function(){
	$(this).find(".float_border").css("display","block");
});
$(document).on("mouseleave",".images_splic",function(){
	$(this).find(".float_border").css("display","none");
})
//单击截屏div,点击选中
$(document).on("click",".float_border",function(){
	var id=$(this).attr("hostid");
	var ip=$(this).attr("hostip");
	var cloudClassIds=$(this).attr("cloudClassId");
	var status=$(this).find(".host_status").html();
	var deviceType=$(this).find(".host_type").html();
	if($(this).parent().find(".jkn_mc_bz").attr("bingo")=="none")
	{
		$(this).parent().find(".jkn_mc_bz").attr("bingo","done")
		$(this).parent().find(".jkn_mc_bz").show();
	}
	if($(this).parent().find(".jkn_mc_bz").attr("bingo")=="done")
	{
		$(".hostIds").append(id+",");
		$(".hostIps").append(ip+",");
		$(".hostStatus").append(status+",");
		$(".deviceType").append(deviceType+",");
		$(".cloudClassId").append(cloudClassIds+",");
	}
});
//截屏div处于选中状态,点击取消选中
$(document).on("click",".jkn_mc_bz",function(){
	var id=$(this).parent().attr("id");
	var ip=$(this).parent().attr("ip");
	var status=$(this).parent().find(".host_status").html();
	var deviceType=$(this).parent().find(".host_type").html();
	var cloudClassId=$(this).parent().attr("cloudClassId");
	if($(this).parent().find(".jkn_mc_bz").attr("bingo")=="done")
	{
		$(this).parent().find(".jkn_mc_bz").attr("bingo","none")
		$(this).parent().find(".jkn_mc_bz").hide();
	}
	if($(this).parent().find(".jkn_mc_bz").attr("bingo")=="none")
	{
		var ids=$(".hostIds").html();
		var ips=$(".hostIps").html();
		var statuss=$(".hostStatus").html();
		var deviceTypes=$(".deviceType").html();
		var cloudClassIds=$(".cloudClassId").html();
		if(ids.indexOf(id)>-1)
		{
			ids=ids.replace(id+",","");
		}
		$(".hostIds").html(ids);
		if(ips.indexOf(ip)>-1)
		{
			ips=ips.replace(ip+",","");
		}
		$(".hostIps").html(ips);
		if(statuss.indexOf(status)>-1)
		{
			statuss=statuss.replace(status+",","");
		}
		$(".hostStatus").html(statuss);
		if(deviceTypes.indexOf(deviceType)>-1)
		{
			deviceTypes=deviceTypes.replace(deviceType+",","");
		}
		$(".deviceType").html(deviceTypes);
		if(cloudClassIds.indexOf(cloudClassId)>-1)
		{
			cloudClassIds=cloudClassIds.replace(cloudClassId+",","");
		}
		$(".cloudClassId").html(cloudClassIds);
	}
});

function append() {
	$('#admin_addForm').form('clear');
	$('#admin_equipment_addDialog').dialog('open');
}

function controlEndpoint(controlFlag, controlType) {
	var _iframe = document.getElementById('goo').contentWindow;
	var ips=_iframe.document.getElementById('hostIps').innerHTML;
	if (ips.length > 0) {
		var submitUrl = "/ManagementCenter/device/Device_controlEndPoint.do?controlFlag="
				+ controlFlag+"&controlType="+controlType;
		//将命令交给后台做处理
		$.ajax({
			type : "GET",
			cache : false,
			url : submitUrl,
			async: false,
			data : {
				ips :ips
			},
			success : function(d) {
				if(controlType=="CONTROL_REBOOT")
				{
					//$('#shutprompt2').dialog('close');
					d=eval("("+d+")");
					if(d){
						$('#shutprompt3').dialog('open');
						setTimeout("$('#shutprompt3').dialog('close')",2000);
					}
					else{
						$.messager.alert('提示', '重启不成功，请重试！！！', 'info');
					}
				}
				else if(controlType=="CONTROL_SHUTDOWN")
				{
					//$('#shutprompt2').dialog('close');
					if(d!=null) {
						$('#shutprompt3').dialog('open');
						setTimeout("$('#shutprompt3').dialog('close')", 2000);
					}
				}
				cancle_choose(_iframe);
			},
			error : function() {
				$.messager.alert('提示', '操作不成功，请重试！！！', 'info',function(){
					cancle_choose(_iframe);
				});
			}
		});	
	} else {
		$.messager.alert('提示', '请选择一条记录进行操作!', 'info');
	}
}
//开机
function bootMachine() {
	var _iframe = document.getElementById('goo').contentWindow;
	var deviceIds=_iframe.document.getElementById('hostIds').innerHTML;
	var status=_iframe.document.getElementById('hostStatus').innerHTML;
	var deviceTypes=_iframe.document.getElementById('deviceType').innerHTML;
	if(status.indexOf("在线")>-1&&status!="开关机状态:在线,")
	{
		$.messager.alert('提示', '所选设备有已在线设备!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	if(status=="开关机状态:在线,")
	{
		$.messager.alert('提示', '所选设备存在已在线设备!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	if(deviceIds.length==0){
		$.messager.alert('提示', '请选择设备!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	if(deviceTypes.indexOf("android")>-1)
	{
		$.messager.alert('提示', '安卓设备不支持远程开机!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	$('.panel .panel-header .panel-title').text("开机提示");
	$('#Promptdlg .content').text('确定执行开机操作？');
	$('#Promptdlg').dialog('open');
}
function startUp(){
	var _iframe = document.getElementById('goo').contentWindow;
	var ips =_iframe.document.getElementById('hostIps').innerHTML;
	$.ajax({
		type:'get',
		url :"/ManagementCenter/device/Device_startUp.do",
		data :{
			ips : ips
		},
		dataType:'json',
		success:function(r){
			//$('#shutprompt2').dialog('close');
			var result=eval('('+r+')');
			if(result){
				$("#goo").contents().find(".jkn_mc_bz").css("display","none").attr("bingo","none");
				$('#shutprompt3').dialog('open');
				setTimeout("$('#shutprompt3').dialog('close')",2000);
			}else{
				$.messager.alert('提示', '开机不成功，请重试！！！', 'info');
			}
			cancle_choose(_iframe);
		}
	});
}
//重启机器
function reStartMachine() {
	var _iframe = document.getElementById('goo').contentWindow;
	var ips=_iframe.document.getElementById('hostIps').innerHTML;
	var status=_iframe.document.getElementById('hostStatus').innerHTML;
	if(ips.length==0){
		$.messager.alert('提示', '请选择设备!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	if(status.indexOf("离线")>-1&&status!="开关机状态:离线,")
	{
		$.messager.alert('提示', '所选设备中有已关机设备!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	if(status=="开关机状态:离线,")
	{
		$.messager.alert('提示', '设备已经关机!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	$('.panel .panel-header .panel-title').text("重启提示");
	$('#Promptdlg .content').text('确定执行重启操作？');
	$('#Promptdlg').dialog('open');
}
//关机
function shutdownMachine() {
	controlEndpoint(513,"CONTROL_SHUTDOWN");
}
//移动到其他组
function moveGroupShow(){
	var _iframe = document.getElementById('goo').contentWindow;
	var ids =_iframe.document.getElementById('hostIds').innerHTML;
	if(ids.length==0){
		$.messager.alert('提示', '请选择设备!', 'info');
		return;
	}
	$('#moveGroup').dialog('open');
	// add by lihuimin 20140611 设备移动到组   设备组的异步加载
	$('#userDeviceGroups').combotree({
		url : '/ManagementCenter/device/Device_getUserGroupsTree.do',  //update by caoqian 2016/2/19
		valueField : 'id',
		textField : 'text',
		required : true,
		editable : false,
		//全部展开
		onLoadSuccess : function(node, data) {
			var t = $(this);
			if (data) {
				$(data).each(function(index, d) {
					if (this.state == 'closed') {
						t.tree('expandAll');
					}
				});
			}
		}
	});
}
//设备重命名回显
function deviceRename(){
	var _iframe = document.getElementById('goo').contentWindow;
	var ids=_iframe.document.getElementById('hostIds').innerHTML;
	if(ids.length==0){
		$.messager.alert('提示', '请选择设备!', 'info');
		return;
	}
	if (ids.split(",").length-1 > 1) {
		$.messager.alert('提示','您选择了多条记录,只能选择一条记录进行修改!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	} else {
		$("#renameForm").form('clear');
		$('#rename').dialog('open');
		$.ajax({
			type: "GET",
			cache: false,
			url : '/ManagementCenter/device/Device_findDeviceByIdBeforRename.do?id='+ids.substr(0,ids.length-1),
			success : function(data) {
				var json = eval("(" + data + ")");
				if(json!=null){	
					$('.panel .panel-header .panel-title').text("重命名");
					$("#renameForm").form('load',{
						deviceId:json.id,
						deviceName:json.name
					});
				}
			}
		});
	}
}
//保存设备重名名
function updateDeviceName(){
	var deviceId=$("#deviceId").val();
	var deviceName=$("#deviceName").val().trim()
	if(deviceName==null||deviceName=="")
	{
		$.messager.alert('提示',"设备昵称不能为空", 'error');
		return;
	}
	$("#renameForm").form('submit', {
		url : '/ManagementCenter/device/Device_updateDeviceName.do?name='+deviceName+'&id='+deviceId,
		onSubmit : function() {
			return $(this).form('validate');
		},
		success : function(data) {
			$.messager.alert('提示',data, 'info');
			$('#rename').dialog('close');
			setTimeout(function(){
				location.reload();
			},800);
		}
	});
}
//关闭定时开关机编辑框   add by lihuimin
function renamePlanClose(){
	var _iframe= document.getElementById('goo').contentWindow;
	$('#rename').dialog('close');
	cancle_choose(_iframe);
}
//打铃  add by caoqian
function ring(){
	var _iframe= document.getElementById('goo').contentWindow;
	var deviceIds=_iframe.document.getElementById('hostIds').innerHTML;
	var status=_iframe.document.getElementById('hostStatus').innerHTML;
	if(deviceIds.length==0){
		$.messager.alert('提示', '请选择设备!', 'info');
		return;
	}
	if(status.indexOf("离线")>-1&&status!="开关机状态:离线,")
	{
		$.messager.alert('提示', '所选设备中有已关机设备!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	if(status=="开关机状态:离线,")
	{
		$.messager.alert('提示', '设备已经关机!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	$('.panel .panel-header .panel-title').text("打铃提示");
	$('#Promptdlg .content').text('确定执行打铃操作？');
	$('#Promptdlg').dialog('open');
}
function control_ring(){
	var _iframe = document.getElementById('goo').contentWindow;
	var ids =_iframe.document.getElementById('hostIds').innerHTML;
	$.ajax({
		type:'get',
		url :"/ManagementCenter/device/Device_controlRing.do",
		data :{
			ids : ids
		},
		dataType:'json',
		success:function(r){
			//$('#shutprompt2').dialog('close');
			var result=eval('('+r+')');
			if(result){
				$('#shutprompt3').dialog('open');
				setTimeout("$('#shutprompt3').dialog('close')",2000);
			}else{
				$.messager.alert('提示', '打铃不成功，请重试！！！', 'info');
			}
			cancle_choose(_iframe);
		}
	});
}
//定时策略弹框
function openDownPlan(){
	var _iframe = document.getElementById('goo').contentWindow;
	var ids =_iframe.document.getElementById('hostIds').innerHTML;
	if(ids.length==0)
	{
		$.messager.alert('提示', '请选择设备!', 'info');
		return;
	}
	else
	{
		IWIN.MdDialog.open('${pageContext.request.contextPath}/device/Device_getPolicy.do?type=1&ids='+ids,function(win){});
	}
}
//关机
function shutdown(){
	var _iframe = document.getElementById('goo').contentWindow;
	var ids=_iframe.document.getElementById('hostIds').innerHTML;
	var status=_iframe.document.getElementById('hostStatus').innerHTML;
	if(ids.length==0){
		$.messager.alert('提示', '请选择设备!', 'info');
		return;
	}
	if(status.indexOf('离线')>-1){
		$.messager.alert('提示', '您所选的设备中存在已关机设备，请确认!', 'info',function(){
			cancle_choose(_iframe);
			$('#Promptdlg').dialog('close');
		});
		return;
	}
	else
	{
		$('.panel .panel-header .panel-title').text("关机提示");
		$('#Promptdlg .content').text('确定对这些设备执行关机操作？');
		$('#shutprompt3 .content#shutting2').text('设备关机命令已成功发送');
		$('#Promptdlg').dialog('open');
	}
}
//关机提示取消
function cancel(){
	var _iframe = document.getElementById('goo').contentWindow;
	cancle_choose(_iframe);
	$('#Promptdlg').dialog('close');
}
//关机提示确定
function ok(){
	if($('.panel .panel-header .panel-title').html()=="重启提示")
	{
		$('#Promptdlg').dialog('close');
		$('.panel .panel-header .panel-title').text("重启提示");
		$('#shutprompt2 #cancelshutdown.btn').text("取消重启");
		$('#shutprompt3 .content#shutting2').text('设备重启命令已成功发送');
		//$('#shutprompt2').dialog('open');
		controlEndpoint(513,"CONTROL_REBOOT");

	}
	else if($('.panel .panel-header .panel-title').html()=="关机提示")
		{
			$('#Promptdlg').dialog('close');
			$('.panel .panel-header .panel-title').text("关机提示");
			$('#shutprompt2 #cancelshutdown.btn').text("取消关机");
			$('#shutprompt3 .content#shutting2').text('设备关机命令已成功发送');
			//$('#shutprompt2').dialog('open');
			setTimeout(function(){shutdownMachine();},1000);
		}
	else if($('.panel .panel-header .panel-title').html()=="开机提示")
		{
			$('#Promptdlg').dialog('close');
			$('.panel .panel-header .panel-title').text("开机提示");
			$('#shutprompt2 #cancelshutdown.btn').text("取消开机");
			$('#shutprompt3 .content#shutting2').text('开机命令已成功发送');
			$('#shutprompt2').find("#shutting1").html('设备正在开机....');
			//$('#shutprompt2').dialog('open');
			startUp();
		}
	else if($('.panel .panel-header .panel-title').html()=="打铃提示")
	{
		$('#Promptdlg').dialog('close');
		$('.panel .panel-header .panel-title').text("打铃提示");
		$('#shutprompt2 #cancelshutdown.btn').text("取消打铃");
		$('#shutprompt3 .content#shutting2').text('设备打铃命令已成功发送');
		$('#shutprompt2').find("#shutting1").html('设备正在打铃....');
		//$('#shutprompt2').dialog('open');
		control_ring();
	}
}
//移动到组
function moveGroup(){
	var _iframe = document.getElementById('goo').contentWindow;
	var devicesIds=_iframe.document.getElementById('hostIds').innerHTML;
	$("#moveGroupForm").form('submit', {
		url: '/ManagementCenter/device/Device_moveGroup.do?arr='+devicesIds,
		onSubmit: function(){
			return $(this).form('validate');
		},
		success: function(data){
			$('#moveGroup').dialog('close');
			setTimeout(function(){
				location.reload();
			},800);
		}
	});
}
//关闭移动到组窗口
function moveGroupclose(){
	$('#moveGroup').dialog('close');
	var _iframe = document.getElementById('goo').contentWindow;
	cancle_choose(_iframe);
}
//删除设备
function delDevice(){
	var _iframe = document.getElementById('goo').contentWindow;
	var ids=_iframe.document.getElementById('hostIds').innerHTML;
	if(ids.length==0){
		$.messager.alert('提示', '请选择设备!', 'info');
		return;
	}
	if (ids.length > 0) {
		$.messager.confirm('提示信息', '您确认要删除吗?', function(data) {
			if (data) {
				// 1.删除设备对应的播表记录
				$.ajax({
					url : '/ManagementCenter/device/Device_delDevices.do',
					type : 'POST',
					data : {
						idstr : ids
					},
					dataType : 'json',
					success : function(res) {
						if(res){
							// 2.删除设备
							$.ajax({
								url : '/ManagementCenter/device/Device_del.do',
								type : 'POST',
								data : {
									idstr : ids
								},
								dataType : 'json',
								success : function(result) {
									var json = eval("(" + result + ")");
									if (json) {
										$.messager.alert('提示', '删除成功', 'info');
									} else {
										$.messager.alert('错误', '删除失败', 'error');
									}
									setTimeout(function(){
										location.reload();
									},800);
								}
							});
						}
					}
				});
			}
			cancle_choose(_iframe);
		});
	} else {
		 $.messager.alert('提示', '请先选择要删除的记录。', 'info',function(){
			 cancle_choose(_iframe);
		 });
	}
}
//云同步
function syncStudents(){
	var _iframe = document.getElementById('goo').contentWindow;
	var ids=_iframe.document.getElementById('hostIds').innerHTML;
	var cloudClassId=_iframe.document.getElementById('cloudClassId').innerHTML;
	if (ids.length == 0) {
		$.messager.alert('提示', '请选择一条记录进行操作!', 'info');
		return;
	} else if (ids.length > 1) {
		$.messager.alert('提示','您选择了多条记录,只能选择一条记录进行修改!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	if(cloudClassId.indexOf("no")<0){
		$.messager.confirm('提示信息', '确认向云端同步班级成员吗？', function(data) {
			if(data){
				$("#bindclassId").val(ids.substr(0,ids.length-1));
				// 获取云班级
				$.ajax({
					url : '${pageContext.request.contextPath}/device/Device_saveCloudStudentList.do', // 云平台
					type : 'POST',
					dataType : 'json',	
					data : {
						cloudclassId : cloudClassId.substr(0,cloudClassId.length-1) ,
						deviceId:ids.substr(0,ids.length-1)
						//mac:rows[0].mac
					},
					success : function(result) {
						var json=eval("("+result+")");
						if(json)
						{
							$.messager.alert('成功', '同步成功', 'info');
						}
						else
						{
							$.messager.alert('失败','请求失败，请检查网络状况，稍后再试!', 'info');
						}
					}
				});
			}
		});
	}
	else
	{
		$.messager.alert('提示','请求失败，请确认班级已经绑定云班级!', 'info');
	}
}
//调取云班级
function bindClass(){
	var _iframe = document.getElementById('goo').contentWindow;
	var ids=_iframe.document.getElementById('hostIds').innerHTML;
	var cloudClassId=_iframe.document.getElementById('cloudClassId').innerHTML;
	if (ids.length == 0)
	{
		$.messager.alert('提示', '请选择设备!', 'info');
		return;
	}
	else if (ids.split(",").length-1 > 1)
	{
		$.messager.alert('提示','您选择了多个设备,只能选择一个设备进行修改!', 'info',function(){
			cancle_choose(_iframe);
		});
		return;
	}
	if(cloudClassId.indexOf("no")<0)
	{
		$.messager.confirm('提示信息', '已经绑定过云班级，确认重新绑定吗？', function(data) {
			if(data){
				getbindClass(ids,_iframe);
			}
			cancle_choose(_iframe);
		});
	}
	else
	{
		getbindClass(ids,_iframe);
	}
}
function getbindClass(ids,_iframe){
	$("#bindclassId").val(ids.substr(0,ids.length-1));
	// 获取云班级
	$.ajax({
		url :'${pageContext.request.contextPath}/device/Device_getCloudClass.do', // 云平台
		type : 'POST',
		dataType : 'json',
		success : function(result) {
			var json=eval("("+result+")");
			if(json.success==true){
				$("#class_select").empty();
				for(var i=0;i<json.data.length;i++){
					var op="<option value='"+json.data[i].class_id+"'>"+json.data[i].class_name+"</option>";
					$("#class_select").append(op);
				}
				$('#bindclass').dialog('open');
			}else{
				$.messager.alert('提示','请求失败，请确认用户已经绑定云账号!', 'info',function(){
					cancle_choose(_iframe);
				});
			}
		},
		error:function(){
			$.messager.alert('错误', '操作失败,请查看网络状况是否良好', 'error',function(){
				cancle_choose(_iframe);
			});
		}
	});
}
//绑定云班级
function bindClassSave(){
	var deviceId=$("#bindclassId").val();
	$('#bindclass').dialog('close');
	var bindid = $("#class_select").val();
	var bindName=$("#class_select").find("option:selected").text();
	var _iframe = document.getElementById('goo').contentWindow;
	$.ajax({
		url : '${pageContext.request.contextPath}/device/Device_bindCloudClass.do',
		type : 'POST',
		data : {
			cloudId : bindid,
			cloudName:bindName,
			id:deviceId
			//mac:rows[0].mac
		},
		dataType : 'json',
		success : function(result) {
			var json = eval("(" + result + ")");
			if(json==1){
				$.messager.alert('错误', '同一个云班级已经被绑定,不能重复绑定', 'error',function(){
					cancle_choose(_iframe);
				});
			}else{
				if (json==2)
				{
					$.messager.alert('成功', '绑定成功', 'info');
					setTimeout(function(){
						location.reload();
					},800);
				} else {
					$.messager.alert('错误', '绑定失败', 'error',function(){
						cancle_choose(_iframe);
					});
				}
			}
		},
		error:function(){
			$.messager.alert('错误', '操作失败,请查看网络状况是否良好', 'error',function(){
				cancle_choose(_iframe);
			});
		}
	});
}
function bindClassClose(){
	$('#bindclass').dialog('close');
	var _iframe = document.getElementById('goo').contentWindow;
	cancle_choose(_iframe);
}
//解除绑定
function unbindClass(){
	var idsArray = [];
	var _iframe = document.getElementById('goo').contentWindow;
	var ids=_iframe.document.getElementById('hostIds').innerHTML;
	var cloudClassId=_iframe.document.getElementById('cloudClassId').innerHTML;
	for ( var i = 0; i < ids.split(",").length; i++) {
		if(cloudClassId.indexOf("no")>-1){
			$.messager.alert('提示', '所选中有并未绑定云班级的设备！', 'info',function(){
				cancle_choose(_iframe);
			});
			return false;
		}
		idsArray.push(ids.split(",")[i]);
	}
	var arr = idsArray.join(',');
	if (arr.length > 0 && cloudClassId.indexOf("no")<0)
	{
		$.messager.confirm('提示信息', '您确认要解绑吗?', function(data) {
			if (data) {
				$.ajax({
					url : '${pageContext.request.contextPath}/device/Device_unbindClass.do',
					type : 'POST',
					data : {
						idstr : arr
					},
					dataType : 'json',
					success : function(result) {
						var json = eval("(" + result + ")");
						if (json) {
							$.messager.alert('成功', '解绑成功', 'info');
						} else {
							$.messager.alert('错误', '解绑失败', 'error');
						}
						setTimeout(function(){
							location.reload();
						},800);
					},
					error:function(){
						$.messager.alert('错误', '操作失败,请查看网络状况是否良好', 'error',function(){
							cancle_choose(_iframe);
						});
					}
				});
			}
			cancle_choose(_iframe);
		});
	}
	else
	{
		$.messager.alert('提示', '请先选择要解绑的记录。', 'info');
	}
}
//取消选中状态
function cancle_choose(_iframe){
	var style=getCookie("style");
	if(style==null || style=="")
	{
		$("#goo").contents().find(".jkn_mc_bz").css("display","none").attr("bingo","none");
	}else
	{
		$("#goo").contents().find(".select_icon_d").removeClass("global_select_icon");
		$("#goo").contents().find(".select_icon_z").removeClass("global_select_icon");
	}
	_iframe.document.getElementById('hostIps').innerHTML="";
	_iframe.document.getElementById('hostIds').innerHTML="";
	_iframe.document.getElementById('hostStatus').innerHTML="";
	_iframe.document.getElementById('deviceType').innerHTML="";
	_iframe.document.getElementById('cloudClassId').innerHTML="";
}
/**
 * 设置cookie,将设备显示样式保存到缓存中
 * @param name    键值
 * @param value   key值
 * @param iDay    过期时间
 */
function setCookie(name, value, iDay)
{
	var oDate=new Date();
	oDate.setDate(oDate.getDate()+iDay);
	document.cookie=name+'='+encodeURIComponent(value)+';expires='+oDate;
}
/**
 * 获取cookie中保存的数据
 * @param name     键值
 * @returns {string}
 */
function getCookie(name)
{
	var arr=document.cookie.split(';');
	for(var i=0;i<arr.length;i++)
	{
		var arr2=arr[i].split('=');
		if(arr2[0]==name)
		{
			var getC = decodeURIComponent(arr2[1]);
			return getC;
		}
	}
	return '';
}
/**
 * 清除cookie
 * @param name   键值
 */
function removeCookie(name)
{
	setCookie(name, '1', -1);
}
