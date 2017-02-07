
var dg;// 表格 datagrid
var editWindow;
var editForm;
var user_Module;
var da;
var searchFlag=false;
var sortsign= 'asc';
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
/*$(document).ready(function(){
	listUser();
});*/
function listUser(){
	dg=$('#dataGrid');
	$('#userList').show();
	dg.datagrid({
		border : false,
		fitColumns : false,
		fit : true,
		nowrap : false,
		sortName : 'loginname',
		sortOrder:'asc',
		checkOnSelect : true,
		selectOnCheck : true,
		striped : true,
		rownumbers : true,
		pagination : true,
		singleSelect : false,
		pagination : false,
		rownumbers : true,
		remoteSort : true,
//		width:function(){return document.body.clientWidth*0.9;},
		//pageList : [ 10, 20, 30, 40 ],
		iconCls : 'icon-save',
		url : '/ManagementCenter/user/User_list.do',
		idField : 'id',
		pagePosition : 'bottom',
		/*onLoadSuccess: function (data) {
            //datagrid头部 table 的第一个tr 的td们，即columns的集合
            var headerTds = $(".datagrid-header-inner table tr:first-child").children();
            //datagrid主体 table 的第一个tr 的td们，即第一个数据行
            var bodyTds = $(".datagrid-body table tr:first-child").children();
            var totalWidth = 0; //合计宽度，用来为datagrid头部和主体设置宽度
            //循环设置宽度
            bodyTds.each(function (i, obj) {
                var headerTd = $(headerTds.get(i));
                var bodyTd = $(bodyTds.get(i));
                $("div:first-child", headerTds.get(i)).css("text-align", "center");
                var headerTdWidth = headerTd.width(); //获取第i个头部td的宽度
                //这里加5个像素 是因为数据主体我们取的是第一行数据，不能确保第一行数据宽度最宽，预留5个像素。有兴趣的朋友可以先判断最大的td宽度都在进行设置
                var bodyTdWidth = bodyTd.width() + 5;
                var width = 0;
                //如果头部列名宽度比主体数据宽度宽，则它们的宽度都设为头部的宽度。反之亦然
                if (headerTdWidth > bodyTdWidth) {
                    width = headerTdWidth;
                    bodyTd.width(width);
                    headerTd.width(width);
                    totalWidth += width;
                } else {
                    width = bodyTdWidth;
                    headerTd.width(width);
                    bodyTd.width(width);
                    totalWidth += width;
                }
            });
            var headerTable = $(".datagrid-header-inner table:first-child");
            var bodyTable = $(".datagrid-body table:first-child");
            //循环完毕即能得到总得宽度设置到头部table和数据主体table中
            headerTable.width(totalWidth);
            bodyTable.width(totalWidth);
            bodyTds.each(function (i, obj) {
                var headerTd = $(headerTds.get(i));
                var bodyTd = $(bodyTds.get(i));
                var headerTdWidth = headerTd.width();
                bodyTd.width(headerTdWidth);
            });
        },*/
		onLoadSuccess : function(d){
			//d=da;
//			dg.datagrid('selectRecord',da);
			var size = dg.datagrid('getRows').length;
			if(searchFlag){//搜索
				if(size==0){
					$("#userList").attr("style","display:none");
					$("#empty_add").attr("style","display:none");
					$("#empty").attr("style","");
				}else{
					$("#userList").attr("style","height:100%");
					$("#empty_add").attr("style","display:none");
					$("#empty").attr("style","display:none");
				}
			}else{	
			searchFlag=false;			
			if(size==0){
				$("#userList").attr("style","display:none");
				$("#empty").attr("style","display:none");
				$("#empty_add").attr("style","");
			}else{
				$("#userList").attr("style","height:100%");
				$("#empty").attr("style","display:none");
				$("#empty_add").attr("style","display:none");
			}
			}
		},
		frozenColumns : [ [ {// 前面的多选 框
			field : 'id',
			title : '编号',
			checkbox : true,
			width : 120
		}] ],
		columns : [ [ 
		 {
			field : 'loginname',
			title : '用户名',
			sortable : true,
			width:100,
			 //addby weichao 20160415----------begin
			 formatter : function(value, row, index) {
				 return "<div style='word-break:break-all;word-wrap:break-word;'>"+value+"</div>";
			 }
			 //addby weichao 20160415----------begin
		} ,{
			field : 'username',
			title : '姓名',
			width:100
		},{
			field : 'managerName',
			title : '直属管理人',
			width:100
		},{
			field : 'userDeviceGroupStr',
			title : '管理的组',
			width:100
		}, {
			field : 'usermodule',
			title : '权限',
			width:432
		}, {
			field : 'cloudusername',
			title : '已绑定的云账号',
			width:120,
			//addby weichao 20160415----------begin
			formatter : function(value, row, index) {
				if(value!=null&&!value=="") {
					return "<div style='word-break:break-all;word-wrap:break-word;'>" + value + "</div>";
				}
			}
			//addby weichao 20160415----------end
		} ] ]
	});
}

// 增加方法
//------20160406updatebyweichao
function add() {
	user_Module=0;
	$('#editWindow').dialog({title:"新增用户"});
	$('#editWindow').dialog('open');
	$("#loginname").css("background-color","#FFFFFF");                        //addby weichao20160330
	$("#loginname").removeAttr("readonly");
	$("#editForm").form('clear');
	dg.datagrid('clearSelections');
	dg.datagrid('clearChecked');
	$.ajax({
		type: "POST",
		url: requestContextPath+"/user/User_findModuleUI.do",// 发送请求的地址
		success: function(data){
			var json = eval("(" + data + ")");
			$("#module").empty();
			for (var i = 0; i < json.length; i++) {
				if(json[i].type==2||json[i].type==3){
					$("#module").append("<input id=\"module" + i + "\" moduletype=\""+json[i].type+"\" module=\"" + json[i].id + "\" name=\"module\" type=\"checkbox\"  onclick=\"check(" + i + ")\"/>");
				}else{
					$("#module").append("<input id=\"module" + i + "\" moduletype=\""+json[i].type+"\" module=\"" + json[i].id + "\" name=\"module\" type=\"checkbox\"  onclick=\"check(" + i + ")\">" + json[i].name + "</input>" + json[i].subModule + "<br/>");
				}
			}
			$("#module").append("<input id='moduleALL'  module='-1024' name='moduleALL' type='checkbox' onclick='checkALL()' >全选");
			hiddenCheckbox();
		}
	});

	editForm.url = requestContextPath+'/user/User_save.do?usermodule=';
}
function checkALL(){
		var checklist = document.getElementsByName ("module");
	   if(document.getElementById("moduleALL").checked)
	   {
		   for(var i=0;i<checklist.length;i++)
		   {
		      checklist[i].checked = 1;
		   } 
	 }else{
		  for(var j=0;j<checklist.length;j++)
		  {
		     checklist[j].checked = 0;
		  }
	 }
}
// 编辑方法
//------20160406 update by weichao
function edit() {
	user_Module=0;
	var rows = dg.datagrid('getSelections');

	var num = rows.length;
	if (num == 0) {
		$.messager.alert('提示', '请选择一条记录进行操作!', 'info');
		return;
	} else if (num > 1) {
		$.messager.alert('提示','您选择了多条记录,只能选择一条记录进行修改!', 'info');
		//dg.datagrid('clearSelections');
		//dg.datagrid('clearChecked');
		return;
	} else {
		var um = $('#uname').val();
		if(um != rows[0].loginname){
			$('#editWindow').dialog({title:"编辑用户"});
			$('#editWindow').dialog('open');
			$("#loginname").attr("readonly","true");
			$("#loginname").css("background-color","#C0C0C0");			//addby weichao20160330
			$.ajax({
				type: "GET",
				cache: false,
				url : requestContextPath+'/user/User_findUserById.do?id='+ rows[0].id,
				success : function(data) {
					var json = eval("(" + data + ")");
					$("#editForm").form('load',{
						loginname:json.loginname,
						birthday:json.birthday,
						username:json.username,
					/*	sex:json.sex,
						mobile:json.mobile,
						email:json.email,*/
						userDeviceGroups:json.userDeviceGroups
					});
					/*var arr=[];
					 arr=json.usermodule.split(",");
					 for(var i=0;i<arr.length;i++){
					 $("#usermodule"+arr[i]).attr("checked","checked");
					 }*/

				}

			});

			$.ajax({
				type: "POST",
				url: requestContextPath+"/user/User_findModuleUI.do?id=" + rows[0].id,
				success: function(data){
					var json = eval("(" + data + ")");
					$("#module").empty();
					if (json != null) {
						for (var i = 0; i < json.length; i++) {
							if(json[i].type==2||json[i].type==3){
								$("#module").append("<input id=\"module" + i + "\" moduletype=\""+json[i].type+"\" module=\"" + json[i].id + "\" name=\"module\" type=\"checkbox\"  onclick=\"check(" + i + ")\"/>");
							}else{
								$("#module").append("<input id=\"module" + i + "\" moduletype=\""+json[i].type+"\" module=\"" + json[i].id + "\" name=\"module\" type=\"checkbox\" onclick=\"check(" + i + ")\">" + json[i].name + "</input>" + json[i].subModule + "<br/>");
							}
							if (json[i].flag) {
								$("#module"+i).prop("checked",true);
							}
						}
						var moduleLen = $("input[name='module']").length;
						var le1 = $("input[type='checkbox'][name='module']:checked").length;
						if(parseInt(le1) == parseInt(moduleLen)){
							$("#module").append("<input id='moduleALL'  module='-1024' name='moduleALL' type='checkbox' onclick='checkALL()' checked='checked'>全选");
						}else{
							$("#module").append("<input id='moduleALL'  module='-1024' name='moduleALL' type='checkbox' onclick='checkALL()' >全选");
						}
					}
					hiddenCheckbox();
				}
			});

			editForm.url = requestContextPath+'/user/User_update.do?id=' + rows[0].id+"&usermodule=";

			/*$.ajax({
			 type: "POST",
			 async:false,
			 data : {
			 id : rows[0].id
			 },
			 url: requestContextPath+"/user/User_saveOrEditModule.do?usermodule=" + strParams,
			 success: function(result){
			 user_Module = result;
			 }
			 });*/
		}
		else{
			$.messager.alert('提示', '不能对自己本身进行操作!', 'info');
			return;
		}
	}
}

function checkALL(){
	 var checkliste = document.getElementsByName ("module");
	 for(var j=0;j<checkliste.length;j++){
	     checkliste[j].checked = 0;
	 }
	 if(document.getElementById("moduleALL").checked){
	   for(var i=0;i<checkliste.length;i++){
	      checkliste[i].checked = 1;
	   } 
	 }else{
		  for(var j=0;j<checkliste.length;j++){
		     checkliste[j].checked = 0;
		  }
	 }
}
function hiddenCheckbox(){
	$("input[moduletype='2']").attr('style','display:none');
	$("input[moduletype='3']").attr('style','display:none');
}
// 删除方法
function del() {
	var ids = [];
	var um = $('#uname').val();
	var rows = dg.datagrid('getSelections');
	for ( var i = 0; i < rows.length; i++) {
		if(um != rows[i].loginname){
			ids.push(rows[i].id);
		}
		else{
			$.messager.alert('提示', '删除的用户中不能包含自己!', 'info');
			return;
		}
	}
	var arr = ids.join(',');
	if (arr.length > 0) {
		$.messager.confirm('提示信息', '您确认要删除吗?', function(data) {
			if (data) {
				$.ajax({
					url : requestContextPath+'/user/User_delete.do',
					type : 'POST',
					data : {
						idstr : arr
					},
					dataType : 'json',
					success : function(result) {
						// 删除待审核的节目
						if(result != ""){
							$.ajax({
								url : requestContextPath+'/user/User_deleteProject.do',
								type : 'POST',
								data : {
									proidstr : result
								},
								dataType : 'json',
								success : function(result) {
								},
								error:function(XMLHttpRequest, textStatus, errorThrown){
									$.messager.alert('错误', '删除失败', 'error');
								}
							});
						}
						//删除用户
						$.ajax({
							url : requestContextPath+'/user/User_deleteUser.do',
							type : 'POST',
							data : {
								idstr : arr 
							},
							dataType : 'json',
							success : function(result) {
								var json = eval("(" + result + ")");
								if (json) {
									$.messager.alert('成功', '删除成功', 'info');
								} else {
									$.messager.alert('错误', '删除失败c', 'error');
								}
								dg.datagrid('reload');
								dg.datagrid('clearSelections');
								dg.datagrid('clearChecked');
							},
							error:function(XMLHttpRequest, textStatus, errorThrown){
								$.messager.alert('错误', '删除失败', 'error');
							}
						});
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('错误', '删除失败', 'error');
					}
				});
			}
		});
	} else {
		$.messager.alert('提示', '请先选择要删除的记录。', 'info');
	}
}
// 重置密码
function resetPassword(){
	var ids = [];
	var um = $('#uname').val();
	var rows = dg.datagrid('getSelections');
	for ( var i = 0; i < rows.length; i++) {
		if(um != rows[i].loginname){
			ids.push(rows[i].id);
		}
		else{
			$.messager.alert('提示', '不能对自己本身进行操作!', 'info');
			return;
		}
	}
	var arr = ids.join(',');
	if (arr.length > 0) {
		$.messager.confirm('提示信息', '您确认要重置吗?', function(data) {
			if (data) {
				$.ajax({
					url : requestContextPath+'/user/User_resetPassword.do',
					type : 'POST',
					data : {
						idstr : arr
					},
					dataType : 'json',
					success : function(result) {
						var json = eval("(" + result + ")");
						if (json) {
							$.messager.alert('成功', '重置成功', 'info');
						} else {
							$.messager.alert('错误', '重置失败', 'error');
						}
						dg.datagrid('reload');
					}
				});
			}
		});
	} else {
		$.messager.alert('提示', '请先选择要重置的记录。', 'info');
	}
}

//绑定云账号 弹出层 打开
function bindacc(){
	var rows = dg.datagrid('getSelections');
	var num = rows.length;
	if (num == 0) {
		$.messager.alert('提示', '请选择一条记录进行操作!', 'info');
		return;
	} else if (num > 1) {
		$.messager.alert('提示','您选择了多条记录,只能选择一条记录进行修改!', 'info');
		return;
	}
	$("#bindaccForm").form('clear');
	$('#bindacc').dialog('open');
	$("#id").val(rows[0].id);
}
// 保存
function bindaccsave(){
	$('#bindacc').dialog('close');
	var cloudusername = $("#cloudusername").val().trim();
	var cloudpassword = $("#cloudpassword").val().trim();
	if(cloudusername == ''){
		$.messager.alert('提示', '云账号不能为空', 'info');
		return;
	}
	if(cloudpassword == ''){
		$.messager.alert('提示', '云账号密码不能为空', 'info');
		return;
	}
	
	$("#bindaccForm").form('submit', {
		url : requestContextPath+'/user/User_bindacc.do',
		onSubmit : function() {
			return $(this).form('validate');
		},
		success : function(data) {
			var json = eval("(" + data + ")");
			if (json) {
				$.messager.alert('成功', '绑定成功', 'info');
				dg.datagrid('reload');
			}else{
				$.messager.alert('错误', '绑定失败,请确认该云账号或者密码输入正确。', 'error');
			}
		}
	});
}
// 绑定云账号 弹出层 关闭
function bindaccsclose(){
	$('#bindacc').dialog('close');
}
// 解绑
function unbindacc(){
	var ids = [];
	var rows = dg.datagrid('getSelections');
	for ( var i = 0; i < rows.length; i++) {
		ids.push(rows[i].id);
	}
	var arr = ids.join(',');
	if (arr.length > 0) {
		$.messager.confirm('提示信息', '您确认要解绑吗?', function(data) {
			if (data) {
				$.ajax({
					url : requestContextPath+'/user/User_unbindacc.do',
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
						dg.datagrid('reload');
					},
					error:function(XMLHttpRequest, textStatus, errorThrown){
						$.messager.alert('错误', '操作失败', 'error');
					}
				});
			}
		});
	} else {
		$.messager.alert('提示', '请先选择要解绑的记录。', 'info');
	}
}

/*function check(flag){
	var moduletype=$("#module"+flag).attr("moduletype");
	if(moduletype==0){
		alert(moduletype);
	}
	if($("#module"+flag).prop("checked")){
		$("#module"+flag).prop("checked",true);
	}else{
		$("#module"+flag).prop("checked",false);
	}
	
	var len = $("input[name='module']").length;
    var strParams = [];
    var j = 0;
    for (var i = 0; i < len; i++) {
        if ($("#module" + i).prop('checked')) {
            strParams[j] = $("#module" + i).attr("module");
            j = j + 1;
        }
    }
    $.ajax({
        type: "POST",
        url: "${pageContext.request.contextPath }/user/User_saveOrEditModule.do?usermodule=" + strParams,
        success: function(result){
            user_Module = result;
        }
    });
}*/
function check(flag){
	var moduleLen = $("input[name='module']").length;
	
	if($("#module"+flag).prop("checked")==false){
		$("[name = moduleALL]:checkbox").attr("checked", false);
	}
	else if($("#module"+flag).prop("checked")==true){
		var le1 = $("input[type='checkbox'][name='module']:checked").length;
		if(parseInt(le1) == parseInt(moduleLen)){
			document.getElementById("moduleALL").checked = true;
		}
	}
	
	var rows = dg.datagrid('getSelections');
    var strParams = [];
    var j = 0;
    for (var i = 0; i < moduleLen; i++) {
		var moduletype=$("#module"+flag).attr("moduletype");
		if(moduletype!=0){
			if(moduletype==4){
				var temp=$("input[moduletype='4']");
				var len=temp.length;
				var arrayflag=[];
				for(var k=0;k<len;k++){
					arrayflag[k]=temp[k].checked;
					if(arrayflag[k]==true){
						$("input[moduletype='2']").prop('checked',true);
					}
				}
			
				if(arrayflag.nocontains(true)){
					$("input[moduletype='2']").prop('checked',false);
				}
				if ($("#module" + i).prop('checked')) {
	            	strParams[j] = $("#module" + i).attr("module");
	        	}
			}else if(moduletype==8){
				var temp=$("input[moduletype='8']");
				var len=temp.length;
				var arrayflag=[];
				for(var q=0;q<len;q++){
					arrayflag[q]=temp[q].checked;
					if(arrayflag[q]==true){
						$("input[moduletype='3']").prop('checked',true);
					}
				}
			
				if(arrayflag.nocontains(true)){
					$("input[moduletype='3']").prop('checked',false);
				}
				if ($("#module" + i).prop('checked')) {
	           		 strParams[j] = $("#module" + i).attr("module");
	       		}
			}
		}else{			
	        if ($("#module" + i).prop('checked')) {
	            strParams[j] = $("#module" + i).attr("module");
	        }
		}
	            j = j + 1;
    }
    //alert($("input[type='checkbox'][name='module']:checked").length);
    $("#hidmodule").val(strParams);
}
Array.prototype.nocontains=function(obj)
		{
		   if(null==obj){return;}
		   for(var i=0;i<this.length;i++)
		   {
			if(this[i]==obj)
			{
			 return false;
			}
		   }
		  
		   return true;
		}
//操作保存修改后的结果
function saveData(){
	user_Module=0;
	if($("#loginname").val().indexOf(" ")>=0){
		$.messager.alert('错误', '用户名称不可包含空格', 'error');
		return;
	}
	if($("#loginname").val().length>50){
		$.messager.alert('错误', '用户名长度不可超过50个字符', 'error');
		return;
	}
	
	if($("#username").val().indexOf(" ")>=0){
		$.messager.alert('错误', '姓名不可包含空格', 'error');
		return;
	}
	if($("#username").val().length>50){
		$.messager.alert('错误', '姓名长度不可超过50个字符', 'error');
		return;
	}
	if($("#module11").prop("checked")==true && $("#module1").prop("checked")==false){
		$.messager.alert('错误', '如果选中"播表管理"权限, 则必须选择"设备管理"权限!', 'error');
		return;
	}
	if(($("#module13").prop("checked")==true || $("#module14").prop("checked")==true) && $("#module11").prop("checked")==false){
		$.messager.alert('错误', '如果选中"发布插播节目"或者"发布优先插播节目"权限, 则必须选择"播表管理"权限!', 'error');
		return;
	}
//addby weichao20160428--begin
//	if(($("#module14").prop("checked")==true  &&  $("#module13").prop("checked")==false)){
//		$.messager.alert('错误', '如果选中"发布插播节目"权限, 则必须选择"发布优先插播节目"权限!', 'error');
//		return;
//	}
	//if(($("#module13").prop("checked")==true  &&  $("#module14").prop("checked")==false)){
	//	$.messager.alert('错误', '如果选中"发布优先插播节目"权限, 则必须选择"发布插播节目"权限!', 'error');
	//	return;
	//}
//addby weichao20160428--end

	var moduleBoxs=document.getElementsByName("module");
    for(var i=0;i<moduleBoxs.length;i++){
         if(moduleBoxs[i].checked){
        	 //user_Module+=parseInt(moduleBoxs[i].attributes['module'].nodeValue);
        	 user_Module+=parseInt(null==moduleBoxs[i].getAttribute("module")?0:moduleBoxs[i].getAttribute("module"));
       }
    }    
    //判断权限是否为空
    var test = document.getElementsByName("module");
    var si = 0;
    for(var i=1; i<=test.length; i+=1){
		if(test[i-1].checked){
			si = 1;
			break;
		}
	}
    if(si==0){
		$.messager.alert('提示', '请为该用户指派权限！', 'info');
	    return false;
    }
 // 操作保存修改后的结果
	$("#editForm").form('submit', {
			url : editForm.url+user_Module,
			onSubmit : function() {
				return $(this).form('validate');
			},
			success : function(data) {
				var json = eval("(" + data + ")");
				if (json.flag) {
					$('#editWindow').dialog('close');
					if(json.id!=""){	
						da=json.id;
					}
					/*$.messager.alert('成功', json.success, 'info',function(){
						location.replace(location.href);
					});
					dg.datagrid('clearSelections');
					dg.datagrid('clearChecked');
					dg.datagrid('reload');
					*/
					dg = $('#dataGrid');
					$.messager.alert('成功', json.success, 'info');
					$('#userList').show();
					dg.datagrid('reload');
					dg.datagrid('clearSelections');
					dg.datagrid('clearChecked');
				} else if (!json.flag) {
					$.messager.alert('提示', '已存在的用户名，请重新输入。', 'info');
				}
			}
		});
}

function doSearch(value){
	dg.datagrid('clearSelections');
	dg.datagrid('clearChecked');
	var keyWordStr=value;
	dg.datagrid('load', { "keyWord": keyWordStr});
	var size = dg.datagrid('getRows').length;
	searchFlag=false;
	if(value!=""){		
		searchFlag=true;
	}
	
}

function cancelKick(){
	var url=requestContextPath;
	location.replace(url);
}

function kick(loginName,isSSO){
	$.ajax({
		url : requestContextPath+'/user/User_kick.do',
		type : 'POST',
		data : {
			loginname : loginName,
			isSSO : isSSO
		},
		async:false,
		success : function(result) {
			if(result=="true"){
//				window.history.go(0);
				//location.replace(location.href);
				if ($("input[name='loginname']").val() == "" || $("input[name='password']").val() == "") {
					location.replace(location.href);
				} else {
					$("#loginForm").submit();
				}
//				window.location.reload();
// 				location.replace(location.href);
			}
			else{
				//alert(result);
				alert("踢出用户失败！");
			}
		},
		error:function(XMLHttpRequest, textStatus, errorThrown){
			alert("踢出用户失败！");
		}
	});
}
$(function() {
	/*var count=false;
	 $.ajax({
	        type: "POST",
	        url: "${pageContext.request.contextPath }/user/User_getExistCount.do",
	        success: function(data){
	        	var json = eval("(" + data + ")");
	        	count=json;
	        	 if(!count){
	        		 $("#empty_add").attr("style","");	
	        	 }else{
	        		 havingflag=true;
	        		 listUser();
	        	 }
	        }
	    });*/
	
	
//	listUser();
	
	
//	check();
	var len = $("input[name='module']").length;
    var strParams = [];
    var j = 0;
    for (var i = 0; i < len; i++) {
        if ($("#module" + i).prop('checked')) {
            strParams[j] = $("#module" + i).attr("module");
            j = j + 1;
        }
    }
//    $.ajax({
//        type: "POST",
//        url: "${pageContext.request.contextPath }/user/User_saveOrEditModule.do?usermodule=" + strParams,
//        success: function(result){
//            user_Module = result;
//        }
//    });
	editWindow=$('#editWindow').dialog({
		closed : true,
		modal : true,
		buttons : [ {
			text : '保存',
			handler : saveData
		} , {
			text : '关闭',
			handler : function() {
				$('#editWindow').dialog('close');
			}
		} ]
	});
	editForm=editWindow.find('form');
	listUser();
});