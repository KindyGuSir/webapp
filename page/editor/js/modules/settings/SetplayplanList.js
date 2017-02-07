var dg;
var pxid = 'a';
var pnodeId = 'a';
var weekselected = "";
var allproject;
var searchFlag = false;
var sortsign = 'asc';
var projecttype = "commontype";
var projectrange = "";
var equiptype="";
var equipid="";
var functype = 'pro'; // 节目pro   通知notice   视频video   网站web 
function mysort() {
	if (sortsign == 'asc') {
		dg.datagrid('reload', {
			sortOrder : 'desc'
		});
		sortsign = 'desc';
		return;
	} else if (sortsign == 'desc') {
		dg.datagrid('reload', {
			sortOrder : 'asc'
		});
		sortsign = 'asc';
		return;
	}
}
/*
 * 处理过长的字符串，截取并添加省略号
 * 注：半角长度为1，全角长度为2
 * 
 * pStr:字符串
 * pLen:截取长度
 * 
 * return: 截取后的字符串
 */
function autoAddEllipsis(pStr, pLen) {

	var _ret = cutString(pStr, pLen);
	var _cutFlag = _ret.cutflag;
	var _cutStringn = _ret.cutstring;

	if ("1" == _cutFlag) {
//		return _cutStringn + "...";
		return true
	} 
}

/*
 * 取得指定长度的字符串
 * 注：半角长度为1，全角长度为2
 * 
 * pStr:字符串
 * pLen:截取长度
 * 
 * return: 截取后的字符串
 */
function cutString(pStr, pLen) {

	// 原字符串长度
	var _strLen = pStr.length;

	var _tmpCode;

	var _cutString;

	// 默认情况下，返回的字符串是原字符串的一部分
	var _cutFlag = "1";

	var _lenCount = 0;

	var _ret = false;

	if (_strLen <= pLen/2) {
		_cutString = pStr;
		_ret = true;
	}

	if (!_ret) {
		for (var i = 0; i < _strLen ; i++ ) {
			if (isFull(pStr.charAt(i))) {
				_lenCount += 2;
			} else {
				_lenCount += 1;
			}

			if (_lenCount > pLen) {
				_cutString = pStr.substring(0, i);
				_ret = true;
				break;
			} else if (_lenCount == pLen) {
				_cutString = pStr.substring(0, i + 1);
				_ret = true;
				break;
			}
		}
	}
	
	if (!_ret) {
		_cutString = pStr;
		_ret = true;
	}

	if (_cutString.length == _strLen) {
		_cutFlag = "0";
	}

	return {"cutstring":_cutString, "cutflag":_cutFlag};
}

/*
 * 判断是否为全角
 * 
 * pChar:长度为1的字符串
 * return: true:全角
 * 			false:半角
 */
function isFull (pChar) {
	if ((pChar.charCodeAt(0) > 128)) {
		return true;
	} else {
		return false;
	}
}

/**
 * function listDevice_cpy(xid,nodeId,nodeText) {
 * $("#contentHeader_playplan").html(nodeText); var keyw =
 * $('#ppss').searchbox('getValue'); if(keyw != ''){ //doSearch(keyw);
 * $('#ppss').searchbox('setValue',''); } pxid=xid; pnodeId=nodeId; dg =
 * $('#dataGrid'); $('#playplanList').show(); dg.datagrid({ border : false,
 * fitColumns : false, fit : true, nowarp : true, checkOnSelect : true,
 * selectOnCheck : true, striped : true, rownumbers : true, pagination : true,
 * singleSelect : false, pagination : false, rownumbers : true, idField : 'id',
 * iconCls : 'icon-save', url :
 * '/ManagementCenter/playplan/PlayPlan_getPlayPlanList.do?'+xid+'='+ nodeId,
 * queryParams:{'keyWord':''}, //bind数据成功设置列宽度 onLoadSuccess: function (data) {
 * //datagrid头部 table 的第一个tr 的td们，即columns的集合 var headerTds =
 * $(".datagrid-header-inner table tr:first-child").children(); //datagrid主体
 * table 的第一个tr 的td们，即第一个数据行 var bodyTds = $(".datagrid-body table
 * tr:first-child").children(); var totalWidth = 0; //合计宽度，用来为datagrid头部和主体设置宽度
 * //循环设置宽度 bodyTds.each(function (i, obj) { var headerTd = $(headerTds.get(i));
 * var bodyTd = $(bodyTds.get(i)); $("div:first-child",
 * headerTds.get(i)).css("text-align", "center"); var headerTdWidth =
 * headerTd.width(); //获取第i个头部td的宽度 //这里加5个像素
 * 是因为数据主体我们取的是第一行数据，不能确保第一行数据宽度最宽，预留5个像素。有兴趣的朋友可以先判断最大的td宽度都在进行设置 var
 * bodyTdWidth = bodyTd.width() + 5; var width = 0;
 * //如果头部列名宽度比主体数据宽度宽，则它们的宽度都设为头部的宽度。反之亦然 if (headerTdWidth > bodyTdWidth) {
 * width = headerTdWidth; bodyTd.width(width); headerTd.width(width); totalWidth +=
 * width; } else { width = bodyTdWidth; headerTd.width(width);
 * bodyTd.width(width); totalWidth += width; } }); var headerTable =
 * $(".datagrid-header-inner table:first-child"); var bodyTable =
 * $(".datagrid-body table:first-child"); //循环完毕即能得到总得宽度设置到头部table和数据主体table中
 * headerTable.width(totalWidth); bodyTable.width(totalWidth);
 * bodyTds.each(function (i, obj) { var headerTd = $(headerTds.get(i)); var
 * bodyTd = $(bodyTds.get(i)); var headerTdWidth = headerTd.width();
 * bodyTd.width(headerTdWidth); }); }, onLoadSuccess : function(d){ var size =
 * dg.datagrid('getRows').length; if(searchFlag){//搜索 if(size==0){ //
 * $("#playplanList").attr("style","display:none");
 * $("#emptyp").attr("style","display:block");
 * $("#empty_add").attr("style","display:none"); }else{ //
 * $("#playplanList").attr("style","height:100%");
 * $("#emptyp").attr("style","display:none");
 * $("#empty_add").attr("style","display:none"); } }else{ searchFlag=false;
 * if(size==0){ $("#playplanList").attr("style","display:none");
 * $("#emptyp").attr("style","display:none"); $("#empty_add").attr("style","");
 * }else{ $("#playplanList").attr("style","height:100%");
 * $("#emptyp").attr("style","display:none");
 * $("#empty_add").attr("style","display:none"); } } },
 * 
 * sortName : 'name', sortOrder : 'desc', remoteSort : true, frozenColumns : [ [ {
 * title : '编号', field : 'id', checkbox : true, width:100 } ] ], columns : [ [ {
 * title : '播放的节目', field : 'name', sortable : true, width:100 } ,{ title :
 * '播放时间', field : 'playtime', width:300 }, { title : '最后修改人', field :
 * 'updateuser', width:232 }, { title : '最后修改时间', field : 'updatetime',
 * width:200 }] ] }); dg.datagrid('clearSelections');
 * dg.datagrid('clearChecked'); }
 */

function addshow(flag,t) {

	/**
	 * 注释掉 by wei
	 */
	// 权限检查
	//$.ajax({
	//	type : "GET",
	//	cache : false,
	//	url : "/ManagementCenter/playplan/PlayPlan_checkInsModule.do",
	//	async:false,
	//	success : function(data) {
	//		// 说明有插播节目的权限
	//		if(data == 1){
	//			document.getElementById("pinsertpro").style.display="inline-block";
	//		}
	//	},
	//	error : function() {
	//		$.messager.alert('错误', '程序进行出现错误', 'error');
	//	}
	//});
	//$.ajax({
	//	type : "GET",
	//	cache : false,
	//	url : "/ManagementCenter/playplan/PlayPlan_checkPriinseModule.do",
	//	async:false,
	//	success : function(data) {
	//		// 说明有优先插播节目的权限
	//		if(data == 1){
	//			document.getElementById("ppriinsertpro").style.display="inline-block";
	//		}
	//	},
	//	error : function() {
	//		$.messager.alert('错误', '程序进行出现错误', 'error');
	//	}
	//});
	
	if (pnodeId == 'a') {
		$.messager.alert('提示', '请选择左边的设备或者设备组!', 'info');
		return false;
	}
	$("#projectARY").html("");
	// $('#playproject').attr("style","width:350px;height:250px");url :
	// '/ManagementCenter/playplan/PlayPlan_getProjects.do?module=Project',

	/**
	 * 注释掉 by wei
	 */
	//$('#playproject').dialog('open');

	/**
	 * update by wei20161008
	 */
	if(t == '0'){// 优先插播
		$.ajax({
			type : "GET",
			cache : false,
			url : "/ManagementCenter/playplan/PlayPlan_checkPriinseModule.do",
			async:false,
			success : function(data) {
				// 说明有优先插播节目的权限
				if(data == 1){
					document.getElementById("ppriinsertpro").style.display="inline-block";
					$('#playproject').dialog('open');
					selectPropriority($('#ppriinsertpro'));
					$("#ppriinsertpro").attr("className", "checked");
				}
				else{
					$.messager.alert('错误', '没有优先插播权限', 'error');
				}
			},
			error : function() {
				$.messager.alert('错误', '程序进行出现错误', 'error');
			}
		});
	}else if(t == '1'){//插播
		$.ajax({
			type : "GET",
			cache : false,
			url : "/ManagementCenter/playplan/PlayPlan_checkInsModule.do",
			async:false,
			success : function(data) {
				// 说明有插播节目的权限
				if(data == 1){
					document.getElementById("pinsertpro").style.display="inline-block";
					$('#playproject').dialog('open');
					selectPropriority($('#pinsertpro'));
					$("#pinsertpro").attr("className", "checked");
				}
				else{
					$.messager.alert('错误', '没有插播权限', 'error');
				}
			},
			error : function() {
				$.messager.alert('错误', '程序进行出现错误', 'error');
			}
		});
	}else if(t == '2'){//日常
		$('#playproject').dialog('open');
		selectPropriority($('#pcommonpro'));
		$("#pcommonpro").attr("className", "checked");
	}
	$("#playPlanForm").form('clear');
	$("#weekeMsg").html("");
	$("#timeMsg").html("");
	// 添加节目的下一步控件
	projecttype = $(".projectpriority  .checked");
	if (projecttype.attr("value") == "commonpro") {
		$("#spannextstep").css("visibility", "hidden");
		$("#plansubmit").attr("value", "播放");
		$("#plansubmit").attr("onclick", "directplay();");
	} else {
		$("#spannextstep").css("visibility", "visible");
		$("#plansubmit").attr("value", "下一步");
		$("#plansubmit").attr("onclick", "nextStep();");
	}

	if (flag != 1) { // ==1的时候是表示是更新
		for ( var i = 1; i <= 7; i++) {
			$("#week" + i).prop("checked", true);
		}
		weekselected = '1234567';
	}
	// div打开的同时，还需要去查询节目列表
	$.ajax({
				type : "POST",
				cache : false,
				url : '/ManagementCenter/playplan/PlayPlan_getProjects.do?module=Project&navproject=public&signre=0&projectrange='+$(".projectrange .checked").attr("value")+"&"+equiptype+"="+equipid,
				success : function(data) {
					var myobj = eval(data);
					if (myobj == '') {
						var newNodeLabel = document.createElement("label");
						newNodeLabel.innerHTML = '暂无节目';
						newNodeLabel.style.color = 'red';// setAttribute("font-color","red");
						document.getElementById("projectARY").appendChild(
								newNodeLabel);
						return;
					}
					allproject = myobj;
					for ( var i in myobj) {
						var newNodeDiv = document.createElement("div");
						newNodeDiv.className = "select-img-div";
						newNodeDiv.setAttribute("id", myobj[i].prid);
						newNodeDiv.setAttribute("onclick", 'selRadio(\''
								+ myobj[i].prid + '\')');
						document.getElementById("projectARY").appendChild(
								newNodeDiv);

						var newNodeImg = document.createElement("img");
						newNodeImg.className = "select-img";
						newNodeImg.src = myobj[i].thumb;
						newNodeDiv.appendChild(newNodeImg);

						var newNodeBr = document.createElement("br");
						newNodeDiv.appendChild(newNodeBr);

						var newNodeRadio = document.createElement("input");
						newNodeRadio.setAttribute("type", "radio");
						newNodeRadio.setAttribute("value", myobj[i].prid);
						newNodeRadio.setAttribute("id", "ra" + myobj[i].prid);
						newNodeRadio.setAttribute("name", "newNodeRadio");
						newNodeDiv.appendChild(newNodeRadio);

						var newNodeSpan = document.createElement("span");
						newNodeSpan.style = 'line-height:24px';
						newNodeSpan.title = myobj[i].name;
						newNodeSpan.innerHTML = myobj[i].name;
						if (newNodeSpan.innerHTML.length > 4) {
							newNodeSpan.innerHTML = newNodeSpan.innerHTML
									.substring(0, 4)
									+ '..';
						}
						newNodeDiv.appendChild(newNodeSpan);
					}
				}
			});
}
function selRadio(obj) {
	// bug 修改 : 选择节目时，单选按钮的问题
	var radioes = document.getElementsByName("newNodeRadio");
	for ( var i = 0; i < radioes.length; i++) {
		radioes[i].removeAttribute('checked');
	}
	document.getElementById("ra" + obj).checked = 'checked';
	// $("#ra"+obj).attr("checked","checked");
	// (".select-img-div #"+obj).attr("checked","checked");
}
function editselect() {
	if (pnodeId == 'a') {
		$.messager.alert('提示', '请选择左边的设备或者设备组!', 'info');
		return false;
	} else {
		$("#weekMsg").html("");
		var rows = dg.datagrid('getSelections');
		var num = rows.length;
		if (num == 0) {
			$.messager.alert('提示', '请选择一条记录进行操作!', 'info');
			return;
		} else {
			if (num > 1) {
				$.messager.alert('提示', '您选择了多条记录,只能选择一条记录进行修改!', 'info');
				return;
			} else {
				$
						.ajax({
							type : "GET",
							cache : false,
							url : '/ManagementCenter/playplan/PlayPlan_showSelect.do?id='
									+ rows[0].id,
							success : function(data) {
								var json = eval("(" + data + ")");
								if (json) {
									$('#playproject').dialog('open');
									addshow(1,2);
									$.ajax({
												async : false,
												type : "GET",
												cache : false,
												url : '/ManagementCenter/playplan/PlayPlan_findPlayPlanById.do?id='
														+ rows[0].id,
												success : function(data) {
													var json = eval("(" + data
															+ ")");

													$("#playPlanForm")
															.form(
																	'load',
																	{
																		id : json.id,
																		project : json.project,
																		startdate : json.startdate,
																		enddate : json.enddate,
																		starttime : json.starttime,
																		endtime : json.endtime
																	});
													weekselected = json.weekselected;
													oncheck(weekselected);
													// 单选按钮节目回显?? 必须要alert一下
													var radioProject = document
															.getElementsByName("newNodeRadio");
													for ( var i = 0; i < radioProject.length; i++) {
														var pv = radioProject[i].value;
														if (pv == json.project) {
															radioProject[i].checked = true;
															break;
														}
													}
													// $("#ra"+json.project).attr("checked","checked");
												}
											});
									// check();
								} else {
									noticeeditshow();
								}
							}
						});
			}
		}
	}

}
function editshow() {
	// uncheck();
	var rows = dg.datagrid('getSelections');
	var num = rows.length;
	if (num == 0) {
		$.messager.alert('提示', '请选择一条记录进行操作!', 'info');
		return;
	} else if (num > 1) {
		$.messager.alert('提示', '您选择了多条记录,只能选择一条记录进行修改!', 'info');
		return;
	} else {
		$('#playproject').dialog('open');
		$.ajax({
			type : "GET",
			cache : false,
			url : '/ManagementCenter/playplan/PlayPlan_findPlayPlanById.do?id='
					+ rows[0].id,
			success : function(data) {
				var json = eval("(" + data + ")");
				$("#playPlanForm").form('load', {
					id : json.id,
					project : json.project,
					startdate : json.startdate,
					enddate : json.enddate,
					starttime : json.starttime,
					endtime : json.endtime
				});
				weekselected = json.weekselected;
				oncheck(weekselected);
			}
		});
		// check();
	}
}
function noticeeditshow() {
	var rows = dg.datagrid('getSelections');
	var num = rows.length;
	if (num == 0) {
		$.messager.alert('提示', '请选择一条记录进行操作!', 'info');
		return;
	} else if (num > 1) {
		$.messager.alert('提示', '您选择了多条记录,只能选择一条记录进行修改!', 'info');
		return;
	} else {
		$('#insertplay').dialog('open');

		$.ajax({
			type : "GET",
			cache : false,
			url : '/ManagementCenter/playplan/PlayPlan_findPlayPlanById.do?id='
					+ rows[0].id,
			success : function(data) {
				var json = eval("(" + data + ")");
				var tep = json.text.replace(/<br>/g, "\n").replace(/&nbsp;/ig," "); // 将<br>转为换行符
				$("#text").val(tep);
				$("#insertplayForm").form('load', {
					id : json.id,
					title : json.title,
					// text:json.text,
					starttime : json.starttime,
					endtime : json.endtime,
					style : json.style
				});
			}
		});
	}
}
function noticeshow() {
	if (pnodeId == 'a') {
		$.messager.alert('提示', '请选择左边的设备或者设备组!', 'info');
		return false;
	}
	$("#titleMsg").html("");
	$("#textMsg").html("");
	$("#insertplayForm").form('clear');
	$('#insertplay').dialog('open');
}
function noticeclose() {
	$('#insertplay').dialog('close');
}
function projectclose() {
	$('#playproject').dialog('close');
	$('#playproject2').dialog('close');
}
function check() {
	var week = "";
	for ( var i = 1; i <= 7; i++) {
		if ($("#week" + i).prop("checked")) {
			week = week + i;
		}
	}
	weekselected = week;
}
function oncheck(weekselected) {

	for ( var i = 0; i < weekselected.length; i++) {
		var k = weekselected.charAt(i);
		$("#week" + k).prop("checked", true);
	}
}
function uncheck() {
	for ( var i = 1; i <= 7; i++) {
		$("#week" + i).prop("checked", false);
	}
}
function chkTitle() {
	$("#titleMsg").html("");
}
function chkText() {
	$("#textMsg").html("");
}
function chkStyle() {
	$("#styleMsg").html("");
}
function noticeSaveOrUpdate() {
	var title = $("#title").val();
	var text = $("#text").val();
	var style = $("#style").val();
	if (title.length <= 0) {
		$("#titleMsg").html("通知标题不能为空");
		return false;
	}
	if (text.length <= 0) {
		$("#textMsg").html("通知内容不能为空");
		return false;
	}
	//	if (text.length > 1000) {
//		$("#textMsg").html("通知内容不能大于1000个字");
//		return false;
//	}
////add by caoqian---begin-----
	var titleLen  = 90;
	var tmpTitleLen = title.replace(/[^\x00-\xff]/g,"*").length;//实际输入的个数
	var tmpTitleLen2 = title.replace(/[^\x00-\xff]/g,"**").length;//title的长度
	if(tmpTitleLen < titleLen && tmpTitleLen2> titleLen){
		titleLen = titleLen + (tmpTitleLen2 - tmpTitleLen);
	}
	if (autoAddEllipsis(title,titleLen)) {
		$("#titleMsg").html("通知标题内容不能超过90个字，请缩短内容");
		return false;
	}
	var textLen  = 600;
	var tmpTextLen = text.replace(/[^\x00-\xff]/g,"*").length;//实际输入的个数,数字、字母、汉字都为1个
	var tmpTextLen2 = text.replace(/[^\x00-\xff]/g,"**").length;//text的长度
	if(tmpTextLen < textLen && tmpTextLen2 > textLen){
		textLen = textLen + (tmpTextLen2 - tmpTextLen);
	}
	//add by caoqian---end-----
	if (autoAddEllipsis(text,textLen)) {
		$("#textMsg").html("通知内容不能超过600个字，请缩短内容");
		return false;
	}
	if (style == null) {
		$("#styleMsg").html("请选择播出方式");
		return false;
	}
	var st = $("#starttimei").datetimebox('getValue');
	var et = $("#endtimei").datetimebox('getValue');
	//alert(st + "-----" + et);
	//---增加为空判断by--caoqian 20151222----hthwx20151230
	 if(st.length==0){
		$.messager.alert('提示', '开始时间不能为空', 'warning');
		return false;
	}else if(et.length==0){
		$.messager.alert('提示', '结束时间不能为空', 'warning');
		return false;
	}else if(new Date(st).getFullYear() > 2099 || new Date(st).getFullYear() < new Date().getFullYear()){
		 $.messager.alert('提示', '开始日期无效', 'warning');
		 return false;
	 }
	 else if(new Date(et).getFullYear() > 2099){
		 $.messager.alert('提示', '结束日期无效', 'warning');
		 return false;
	 }else if(new Date(et) < new Date()){
		 $.messager.alert('提示', '结束时间不能早于当前时间', 'warning');
		 return false;
	 }else if (st.length>0&&et.length>0 && new Date(st) > new Date(et)) {
		 $.messager.alert('提示', '开始日期不能晚于结束日期', 'warning');
		 return false;
	 }
	//-------------------
	// textarea 回车换行符的转换 只有在全屏显示的时候，才进行回车换行转换 \n-->br
	if ($("#style").val() == "显示全屏style") {
		var textArray = text.split('\n');
		for ( var i = 0; i < textArray.length; i++) {
			textArray[i] = textArray[i] + "<br>";
		}
		var str = "";
		for ( var j = 0; j < textArray.length; j++) {
			str += textArray[j];
		}
		$("#text").val(str);
	}
	$("#insertplayForm")
			.form(
					'submit',
					{
						url : '/ManagementCenter/playplan/PlayPlan_saveOrUpdatePlayPlan.do?'
								+ pxid + '=' + pnodeId,
						onSubmit : function() {
							return $(this).form('validate');
						},
						success : function(data) {
							$.messager.alert('提示', data, 'info');				
							$('#insertplay').dialog('close');
							notice($("#notice"));
							$("#dataGrid").datagrid('reload');
						}
					});
}

function chkWeektime() {
	$("#weekMsg").html("");
}
function saveOrUpdate() {
	var priority = 1;
	projecttype = $(".projectpriority  .checked");
	if (projecttype.attr("value") == "insertpro") {
		priority = 1;
	} else if (projecttype.attr("value") == "priinsertpro") {
		priority = 2;
	}
	if (weekselected == "") {
		$("#weekMsg").html("请选择星期");
		return false;
	}
	var st = $("#startdatep").datetimebox('getValue');
	var et = $("#enddatep").datetimebox('getValue');
	var sti = $("#starttime").val();
	var eti = $("#endtime").val();
	/*if (st > et) {
		$.messager.alert('提示', '开始日期不能晚于结束日期', 'warning');
		return false;
	}*/
	//---------修改by ---caoqian---20151222---hthwx20151230
	//alert(st.getFullYear() + "----------" + et.getFullYear());
	 if(st.length==0){
		$.messager.alert('提示', '开始日期不能为空', 'warning');
		return false;
	}else if(et.length==0){
		$.messager.alert('提示', '结束日期不能为空', 'warning');
		return false;
	}else if(sti.length==0){
		$.messager.alert('提示', '开始时间不能为空', 'warning');
		return false;
	}else if(eti.length==0){
		$.messager.alert('提示', '结束时间不能为空', 'warning');
		return false;
	}else if(new Date(st).getFullYear() > 2099 || new Date(st).getFullYear() < new Date().getFullYear()){
		$.messager.alert('提示', '开始日期无效', 'warning');
		 return false;
	}
	else if(new Date(et).getFullYear() > 2099){
		$.messager.alert('提示', '结束日期期无效', 'warning');
		 return false;
	}else if(new Date(et + eti) < new Date()){
		$.messager.alert('提示', '结束时间不能早于当前时间', 'warning');
		 return false;
	}else if ((st+ " " +sti) > (et+ " " +eti)&&st.length>0&&et.length>0) {
		 $.messager.alert('提示', '开始日期不能晚于结束日期', 'warning');
		 return false;
	 }
	//---------------------
	else {
		$("#playPlanForm").form('submit',{
							url : '/ManagementCenter/playplan/PlayPlan_saveOrUpdatePlayPlan.do?weekselected='
									+ weekselected
									+ '&'
									+ pxid
									+ '='
									+ pnodeId
									+ "&level=" + priority,
							onSubmit : function() {
								return $(this).form('validate');
							},
							success : function(data) {
								$.messager.alert('提示', data, 'info');
								getPlayplans(equiptype, equipid,functype); //,priority);
								$('#playproject2').dialog('close');
								$('#insertplay').dialog('close');	
//								$("#dataGrid").datagrid('reload');
							}
						});
		$('#playproject2').dialog('close');
	}
}

function directplay() {
	pr = $("input[name=newNodeRadio]:checked").val();
	if (pr == null) {
		$.messager.alert('提示', '请先选择一个节目。', 'show');
		return false;
	} else {
		$.ajax({
			type : "POST",
			cache : false,
			async : false,
			url : '/ManagementCenter/playplan/PlayPlan_directPlay.do?' + pxid
					+ '=' + pnodeId + "&project=" + pr,
			success : function(data) {
				if (data == "success") {
					$.messager.alert('提示', "增加播放设置成功", 'info');
					projectclose();
					getPlayplans(equiptype, equipid,functype);
				} else {
					$.messager.alert('错误', "增加播放设置失败", 'error');
					projectclose();
				}
			},
			error : function() {
				$.messager.alert('错误', '增加播放设置失败', 'error');
				projectclose();
				getPlayplans(equiptype, equipid,functype);
			}
		});
	}
}

// added by youyou in 20140604
function nextStep() {
	// 点击“下一步”的时候 1，判断用户是否选择了节目 2 如果么有选择 则提示用户 3 如果选择了 则将单选按钮的值赋给隐藏域
	pr = $("input[name=newNodeRadio]:checked").val();
	if (pr == null) {
		$.messager.alert('提示', '请先选择一个节目。', 'show');
		return false;
	} else {
		$('#playproject').dialog('close');
		$('#playproject2').dialog('open');
		$("#project").val(pr);
	}
}
function prevStep() {
	$('#playproject2').dialog('close');
	$('#playproject').dialog('open');
}
// 删除方法
function del() {
	if (pnodeId == 'a') {
		$.messager.alert('提示', '请选择左边的设备或者设备组!', 'info');
		return false;
	} else {
		var ids = [];
		var dg = $('#dataGrid');
		var rows = dg.datagrid('getSelections');
		for ( var i = 0; i < rows.length; i++) {
			ids.push(rows[i].id);
		}
		var arr = ids.join(',');
		if (arr.length > 0) {
			$.messager.confirm('提示信息', '您确认要删除吗?', function(data) {
				if (data) {
					$.ajax({
						url : '/ManagementCenter/playplan/PlayPlan_deleteNotice.do',
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
								$.messager.alert('错误', '删除失败', 'error');
							}
							dg.datagrid('reload');
							dg.datagrid('clearSelections');
						}
					});
				}
			});
		} else {
			$.messager.alert('提示', '请先选择要删除的记录。', 'show');
		}
	}
}
function close() {
	$('#playproject').dialog('close');
}
// add by lihuimin 20140609 播表节目模糊查询
function searchPro() {
	var spvalue = $("#sp").val(); // 节目制作 ---> 节目指派---> 搜索框
	var arr = new Array();
	var arysize = 0;
	spvalue = spvalue.replace(/(^\s*)|(\s*$)/g, "");
	for ( var i in allproject) {
		if (allproject[i].name.lastIndexOf(spvalue) != -1
				|| allproject[i].name.lastIndexOf(spvalue.toLowerCase()) != -1
				|| allproject[i].name.lastIndexOf(spvalue.toUpperCase()) != -1) {
			arr[arysize] = allproject[i];
			arysize = arysize + 1;
			continue;
			;
		}
		if (allproject[i].createname.lastIndexOf(spvalue) != -1) {
			arr[arysize] = allproject[i];
			arysize = arysize + 1;
			continue;
			;
		}
	}
	$("#projectARY").html("");
	for ( var k in arr) {
		var newNodeDiv = document.createElement("div");
		newNodeDiv.className = "select-img-div";
		newNodeDiv.setAttribute("id", arr[k].prid);
		newNodeDiv.setAttribute("onclick", 'selRadio(\'' + arr[k].prid + '\')');
		document.getElementById("projectARY").appendChild(newNodeDiv);

		var newNodeImg = document.createElement("img");
		newNodeImg.className = "select-img";
		newNodeImg.src = arr[k].thumb;
		newNodeDiv.appendChild(newNodeImg);

		var newNodeBr = document.createElement("br");
		newNodeDiv.appendChild(newNodeBr);

		var newNodeRadio = document.createElement("input");
		newNodeRadio.setAttribute("type", "radio");
		newNodeRadio.setAttribute("value", arr[k].prid);
		newNodeRadio.setAttribute("id", "ra" + arr[k].prid);
		newNodeRadio.setAttribute("name", "newNodeRadio");
		newNodeDiv.appendChild(newNodeRadio);

		var newNodeSpan = document.createElement("span");
		newNodeSpan.style = 'line-height:24px';
		newNodeSpan.title = arr[k].name;
		newNodeSpan.innerHTML = arr[k].name;
		if (newNodeSpan.innerHTML.length > 4) {
			newNodeSpan.innerHTML = newNodeSpan.innerHTML.substring(0, 4)
					+ '..';
		}
		newNodeDiv.appendChild(newNodeSpan);
	}
}
// 搜索器
function searchPlayplan(ppvalue) {
	if (dg == null) {
		$("#playplanList").attr("style", "display:none");
		$("#empty").attr("style", "");
		return;
	}
	dg.datagrid('clearSelections');
	dg.datagrid('clearChecked');
	var keyWordStr = ppvalue.replace(/(^\s*)|(\s*$)/g, "");
	dg.datagrid('load', {
		"keyWord" : keyWordStr
	});
	var size = dg.datagrid('getRows').length;
	searchFlag = false;
	if (keyWordStr != "") {
		searchFlag = true;
	}
}

function selectProtype(type) {
	projecttype = type;
}

function listDevice(xid, nodeId, nodeText) {
	equiptype=xid;
	equipid=nodeId;
	// 播放管理  树结构刚加载时 默认选中 所有设备的节点   当用户再点击其它节点时   所有设备的节点的选中的样式也要做相应的变更 
//	if(nodeId != 1){
//		var a  =$('#treeDemo_1_a');
//		a[0].className = 'level0';
//	}
	if(xid=="groupId"){
		var treeObj =  $.fn.zTree.getZTreeObj("treeDemo");;
		var node = treeObj.getNodeByParam("id",nodeId,null);
		treeObj.selectNode(node);
	}
//	alert(xid + "----" + nodeId + "-----" + nodeText + "------" + functype);
	getPlayplans(xid, nodeId,functype);
}

function selectPropriority(span) {
	$(span).addClass('checked').siblings().removeClass('checked');
	projecttype = $(".projectpriority  .checked");
	if (projecttype.attr("value") == "commonpro") {
		$("#spannextstep").css("visibility", "hidden");
		$("#plansubmit").attr("value", "播放");
		$('#msg').attr("style", "display:none");
		$('#cont').attr('class','select-content-nmsg');
		$("#plansubmit").attr("onclick", "directplay();");
	} else {
		$("#spannextstep").css("visibility", "visible");
		$('#msg').attr("style", "display:block");
		if(projecttype.attr("value") == "insertpro"){
			document.getElementById('msg').innerHTML = "会覆盖已经存在的插播节目";
		}else if(projecttype.attr("value") == "priinsertpro"){
			document.getElementById('msg').innerHTML = "会覆盖已经存在的优先插播节目";
		}
		$('#cont').attr('class','select-content');
		$("#plansubmit").attr("value", "下一步");
		$("#plansubmit").attr("onclick", "nextStep();");
	}
}

	function selectprorange(span) {
		//先清空列表
		$("#projectARY").html("");
		$(span).addClass('checked').siblings().removeClass('checked');
		projectrange = $(".projectrange .checked").attr("value");
		// div打开的同时，还需要去查询节目列表
		$.ajax({
					type : "POST",
					cache : false,
					url : '/ManagementCenter/playplan/PlayPlan_getProjects.do?module=Project&navproject=public&signre=0&projectrange='+$(".projectrange .checked").attr("value")+"&"+equiptype+"="+equipid,
					success : function(data) {
						var myobj = eval(data);
						if (myobj == '') {
							var newNodeLabel = document.createElement("label");
							newNodeLabel.innerHTML = '暂无节目';
							newNodeLabel.style.color = 'red';// setAttribute("font-color","red");
							document.getElementById("projectARY").appendChild(
									newNodeLabel);
							return;
						}
						allproject = myobj;
						for ( var i in myobj) {
							var newNodeDiv = document.createElement("div");
							newNodeDiv.className = "select-img-div";
							newNodeDiv.setAttribute("id", myobj[i].prid);
							newNodeDiv.setAttribute("onclick", 'selRadio(\''
									+ myobj[i].prid + '\')');
							document.getElementById("projectARY").appendChild(
									newNodeDiv);

							var newNodeImg = document.createElement("img");
							newNodeImg.className = "select-img";
							newNodeImg.src = myobj[i].thumb;
							newNodeDiv.appendChild(newNodeImg);

							var newNodeBr = document.createElement("br");
							newNodeDiv.appendChild(newNodeBr);

							var newNodeRadio = document.createElement("input");
							newNodeRadio.setAttribute("type", "radio");
							newNodeRadio.setAttribute("value", myobj[i].prid);
							newNodeRadio.setAttribute("id", "ra" + myobj[i].prid);
							newNodeRadio.setAttribute("name", "newNodeRadio");
							newNodeDiv.appendChild(newNodeRadio);

							var newNodeSpan = document.createElement("span");
							newNodeSpan.style = 'line-height:24px';
							newNodeSpan.title = myobj[i].name;
							newNodeSpan.innerHTML = myobj[i].name;
							if (newNodeSpan.innerHTML.length > 4) {
								newNodeSpan.innerHTML = newNodeSpan.innerHTML
										.substring(0, 4)
										+ '..';
							}
							newNodeDiv.appendChild(newNodeSpan);
						}
					}
				});
	}
	
	var pnm = 1;
	var plen = 0;
	// 上一页
	function pagerPre() {
		if(pnm > 1){
			pager(parseInt(pnm)-1);
		}
	}
	// 下一页
	function pagerNext() {
		if(pnm < plen){
			pager(parseInt(pnm)+1);
		}
	}
	// 点击page页数时
	function pager(pid) {
		pnm = pid;
		$.ajax({
					type : "POST",
					cache : false,
					async : false,
					url : '/ManagementCenter/playplan/PlayPlan_queryDeviceAppointPrograms.do?'
							+ "type="
							+ pxid
							+ "&id="
							+ pnodeId
							+ "&page="
							+ pid,
					success : function(data) {
						var json = eval("(" + data + ")");
						var ppsd = document.getElementById('ppl');
						ppsd.innerHTML = '';
						for ( var i = 0; i < json.length; i++) {
							var pp = document.createElement("div");
							pp.className = "searchListItem float";
							ppsd.appendChild(pp);
							alert("pager");
							var newNodeFlag=document.createElement("div");
							switch (parseInt(json[i].status)){
							case 1 :
								newNodeFlag.className="status_tag_downloading";
								break;
							case 2:
								newNodeFlag.className="status_tag_success";
								break;
							case 4:
								newNodeFlag.className="status_tag_fail";
								break;
							default:
								newNodeFlag.className="status_tag_ready";
								break;
							}
							pp.appendChild(newNodeFlag);		
							
							var newNodeImg = document.createElement("img");
							newNodeImg.className = "searchimg";
							newNodeImg.src = json[i].thumb;
							newNodeImg.width = "175";
							newNodeImg.height = "165";
							pp.appendChild(newNodeImg);

							var newNodeDiv0 = document.createElement("div");
							newNodeDiv0.className = "corver";
							newNodeDiv0.style.display = 'none';
							newNodeDiv0.title = json[i].name;
							pp.appendChild(newNodeDiv0);

							var newNodeDiv1 = document.createElement("div");
							newNodeDiv1.className = "searchListItemTitle";
							newNodeDiv1.style.display = 'block';
//							var tn = json[i].name; 
//							if(tn.length>8){ 
//								tn = trunc(tn,30,250);
//							}
							newNodeDiv1.innerHTML = '<h1>'+json[i].name+'</h1>';
							pp.appendChild(newNodeDiv1);

							var newNodeDiv2 = document.createElement("div");
							newNodeDiv2.className = "searchListItemTodo";
							newNodeDiv2.title = json[i].name;
							pp.appendChild(newNodeDiv2);
							
							
							var newNodeA0 = document.createElement("a");
							newNodeA0.className = "a1";
							newNodeA0.href = requestContextPath+"/project/ProjectPreview_preprogram.do?prid="+json[i].id+"&source=jsp&navFlag=public";
							newNodeA0.innerHTML = '预览';
							newNodeA0.target="_blank";
							newNodeDiv2.appendChild(newNodeA0);

							var um = $('#uname').val();
							if(um == json[i].createname){
								var newNodeA1 = document.createElement("a");
								newNodeA1.className = "a1";
								newNodeA1.href = requestContextPath+"/pages/project/editor/indexOfQuick.html?username="+$('#uname').val()+"&prid="+json[i].id+"&quick=1&ent=1";
								newNodeA1.innerHTML = '快速更新';
								newNodeDiv2.appendChild(newNodeA1);
							}
							
							var newNodeA2 = document.createElement("a");
							newNodeA2.className = "a1";
							newNodeA2.href = '';
							newNodeA2.innerHTML = '删除';
							newNodeA2.setAttribute("onclick", 'delP(\''+ json[i].id + '\');return false');
							newNodeDiv2.appendChild(newNodeA2);

						}
						
						var ls = document.getElementById("lst");
						if(plen == pid){
							ls.setAttribute("class", "each");
						}else{
							ls.setAttribute("class", "each last-child");
						}
						
						var fs = document.getElementById("fst");
						if(1 == pid){
							fs.setAttribute("class", "each");
						}else{
							fs.setAttribute("class", "each first");
						}
					}
				});
	}

	// 列表中的删除
	function delP(id){
		$.messager.confirm("提示","确认要删除吗?",function(r){            
     	   if(r){
     		  $.ajax({
  				type : "POST",
  				cache : false,
  				async : false,
  				url : '/ManagementCenter/playplan/PlayPlan_removePlayPlan.do?level=0&id=' + id+"&pxid="+pnodeId+'&type='+pxid,
  				success : function(data) {
  					plist(pxid,pnodeId,pnm);
  				}
  			});
     	   }else{
     		  return false;
     	   }
		});
	}
	
	// 公共方法 ：节目列表的获取  分页
	function plist(type,id,pai){
		/*  普通节目列表 暂时不要分页
		$.ajax({
			type : "POST",
			cache : false,
			async : false,
			url : '/ManagementCenter/playplan/PlayPlan_findDeviceProgram.do?'
					+ "type=" + type + "&id=" + id,
			success : function(data) {
				// 动态分页
				if(data != 0){
					var len = parseInt(data)/4;
					if(len % 1 != 0){   
						 len = Math.ceil(len); 
					}
					plen = len;
					var pit = document.getElementById('pit');
					pit.innerHTML = '';
					var newNodeUL = document.createElement("ul");
					pit.appendChild(newNodeUL);
					for(var i = 1;i<=len+1;i++){
						if(i==1){
							var newNodLi = document.createElement("li");
							newNodLi.className = "each";
							newNodLi.innerHTML = '<';
							newNodLi.setAttribute("onclick", 'pagerPre()');
							newNodLi.id='fst';
							newNodeUL.appendChild(newNodLi);
					
							var newNodLi = document.createElement("li");
							newNodLi.className = "checked";
							newNodLi.innerHTML = i;
							newNodLi.setAttribute("onclick", 'pager(\'' + i + '\')');
							newNodeUL.appendChild(newNodLi);
						}else if(i == len+1){
							if(plen == 1){
								var newNodLi = document.createElement("li");
								newNodLi.className = "each";
								newNodLi.innerHTML = '>';
								newNodLi.setAttribute("onclick", 'pagerNext()');
								newNodeUL.appendChild(newNodLi);
							}
							else{
								var newNodLi = document.createElement("li");
								newNodLi.className = "each last-child";
								newNodLi.innerHTML = '>';
								newNodLi.setAttribute("onclick", 'pagerNext()');
								newNodLi.id='lst';
								newNodeUL.appendChild(newNodLi);
							}
						}
						else{
							var newNodLi = document.createElement("li");
							newNodLi.className = "each first-chil";
							newNodLi.innerHTML = i;
							newNodLi.setAttribute("onclick", 'pager(\'' + i + '\')');
							newNodeUL.appendChild(newNodLi);		
						}
					}
					pnm = pai;
				}
			}
		});*/
		
		if(pai>plen){
			pai = plen;
		}
		
		$.ajax({
			type : "POST",
			cache : false,
			async : false,
			url : '/ManagementCenter/playplan/PlayPlan_queryDeviceAppointPrograms.do?'
					+ "type=" + type + "&id=" + id+ "&page=" + pai,
			success : function(data) {
				var json = eval("(" + data + ")");
				var ppsd = document.getElementById('ppl');
				if(json.length > 0){
					ppsd.innerHTML = '';
					for ( var i = 0; i < json.length; i++) {
						var pp = document.createElement("div");
						pp.className = "searchListItem float";
						ppsd.appendChild(pp);

						var newNodeImg = document.createElement("img");
						newNodeImg.className = "searchimg";
						newNodeImg.src = json[i].thumb;
						newNodeImg.width = "175";
						newNodeImg.height = "165";
						pp.appendChild(newNodeImg);
						var newNodeDiv0 = document.createElement("div");
						newNodeDiv0.className = "corver";
						newNodeDiv0.title= json[i].name;
						pp.appendChild(newNodeDiv0);
						var newNodeFlag=document.createElement("div");
						switch (parseInt(json[i].status)){
						case 1 :
							newNodeFlag.className="status_tag_downloading";
							break;
						case 2:
							newNodeFlag.className="status_tag_success";
							break;
						case 4:
							newNodeFlag.className="status_tag_fail";
							break;
						default:
							newNodeFlag.className="status_tag_ready";
							break;
						}	
						pp.appendChild(newNodeFlag);
						
						var newNodeDiv1 = document.createElement("div");
						newNodeDiv1.className = "searchListItemTitle";
//						var tn = json[i].name; 
//						if(tn.length>8){ 
//							tn = trunc(tn,30,250);
//						}
						newNodeDiv1.innerHTML = '<h1>'+json[i].name+'</h1>';
						pp.appendChild(newNodeDiv1);

						var newNodeDiv2 = document.createElement("div");
						newNodeDiv2.className = "searchListItemTodo";
						newNodeDiv2.title= json[i].name;
						pp.appendChild(newNodeDiv2);

						var newNodeA0 = document.createElement("a");
						newNodeA0.className = "a1";
						newNodeA0.href = requestContextPath+"/project/ProjectPreview_preprogram.do?prid="+json[i].id+"&source=jsp&navFlag=public";
						newNodeA0.innerHTML = '预览';
						newNodeA0.target="_blank";
						newNodeDiv2.appendChild(newNodeA0);

						var um = $('#uname').val();
						if(um == json[i].createname){
							var newNodeA1 = document.createElement("a");
							newNodeA1.className = "a1";
							newNodeA1.href = requestContextPath+"/pages/project/editor/indexOfQuick.html?username="+$('#uname').val()+"&prid="+json[i].id+"&quick=1&ent=1";
							newNodeA1.innerHTML = '快速更新';
							newNodeDiv2.appendChild(newNodeA1);
						}

						var newNodeA2 = document.createElement("a");
						newNodeA2.className = "a1";
						newNodeA2.href = '#';
						newNodeA2.setAttribute("onclick", 'delP(\''+ json[i].id + '\');return false');
						newNodeA2.innerHTML = '删除';
						newNodeDiv2.appendChild(newNodeA2);

					}
					var pp = document.createElement("div");
					pp.className = "searchListItem float";
					pp.setAttribute('onclick','addshow(0,2)');
					ppsd.appendChild(pp);

					var newNodeImg = document.createElement("img");
					newNodeImg.className = "searchimg";
					newNodeImg.src = '../images/plan/adddefault.png';
					newNodeImg.style.width = "100%";
					newNodeImg.style.height = "100%";
					pp.appendChild(newNodeImg);
		
					var newNodeDiv0 = document.createElement("div");
					newNodeDiv0.className = "corver";
					newNodeDiv0.title = '点击添加日常节目';
					pp.appendChild(newNodeDiv0);
					
				}else{
					// 无节目列表
					ppsd.innerHTML = ''; 
					
					var pp = document.createElement("div");
					pp.className = "searchListItem float";
					pp.setAttribute('onclick','addshow(0,2)');
					ppsd.appendChild(pp);

					var newNodeImg = document.createElement("img");
					newNodeImg.className = "searchimg";
					newNodeImg.src = '../images/plan/adddefault.png';
					newNodeImg.style.width = "100%";
					newNodeImg.style.height = "100%";
					pp.appendChild(newNodeImg);
		
					var newNodeDiv0 = document.createElement("div");
					newNodeDiv0.className = "corver";
					newNodeDiv0.title = '点击添加日常节目';
					pp.appendChild(newNodeDiv0);
					
				}
			}
		});

	}
	
	function pre(prid){
			var url=requestContextPath+"/project/ProjectPreview_preprogram.do?prid="+prid+"&source=jsp&navFlag=public";
			window.open(url);
		}
		
	function cancelInserPlayF(){
		$.messager.confirm("提示","确认要删除吗?",function(r){            
	     	   if(r){
		     		var fpid = $("#fpid").val();
		  			$.ajax({
		  				type : "POST",
		  				cache : false,
		  				async : false,
		  				url : '/ManagementCenter/playplan/PlayPlan_removePlayPlan.do?level=2&id=' + fpid+"&pxid="+pnodeId+'&type='+pxid,
		  				success : function(data) {
		  					project($('#pro'));
		  				}
		  			});
	     	   }else{
	     		  return false;
	     	   }
		});
	}
	
	function cancelInserPlayS(){
		$.messager.confirm("提示","确认要删除吗?",function(r){            
	     	   if(r){
	     		    var spid = $("#spid").val();
		  			$.ajax({
		  				type : "POST",
		  				cache : false,
		  				async : false,
		  					url : '/ManagementCenter/playplan/PlayPlan_removePlayPlan.do?level=1&id=' + spid+"&pxid="+pnodeId+'&type='+pxid,
		  				success : function(data) {
		  					project($('#pro'));
		  				}
		  			});
	     	   }else{
	     		  return false;
	     	   }
		});
	}
	
	function quiPub(prid){
		window.location.href=requestContextPath+"/pages/project/editor/indexOfQuick.html?username="+$('#uname').val()+"&prid="+prid+"&quick=1&ent=1";
	}
	
	// 获取设备下的 插播节目  和   所有节目列表
	function getPlayplans(type, id,le) {
		$(".artic,.ds_top_con4,.ds_top_con7,.ds_top_con8").hide();	
		$('#pro').addClass('_nv_play').siblings().removeClass('_nv_play');
		pxid = type;
		pnodeId = id;
		if(le == 'pro'){
			project($('#pro'));
			plist(type,id,1);
		}else if(le == 'notice'){
			notice($('#notice'));
		}else if(le == 'video'){
			video($('#video'));
		}else if(le == 'web'){
			web($('#web'));
		}
		autoh();
	}
	// 节目
	function project(b){
		functype = 'pro';
		$(".artic,.ds_top_con4,.ds_top_con7,.ds_top_con8").hide();
		$(b).addClass('_nv_play').siblings().removeClass('_nv_play');
		listProject();
		$("#delDiv").attr("style","display:none;");
		$("#editDiv").attr("style","display:none;");
	}
	// 通知
	function notice(b){
		functype = 'notice';
		$(b).addClass('_nv_play').siblings().removeClass('_nv_play');
		$(".artic,.ds_top_con7,.ds_top_con8").hide();	
		$(".ds_top_con4").show();
		listNotice();
		$("#delDiv").attr("style","display:block;");
		$("#editDiv").attr("style","display:block;");
	}	
	// 视频
	function video(b){
		functype = 'video';
		$(b).addClass('_nv_play').siblings().removeClass('_nv_play');
		$(".artic,.ds_top_con4,.ds_top_con8").hide();	
		$(".ds_top_con7").show();
		listVideos();
		//---------add by caoqian 20151222--------
		$("#delDiv").attr("style","display:none;");
		$("#editDiv").attr("style","display:none;");
	}	
	// 网站
	function web(b){
		functype = 'web';
		$(b).addClass('_nv_play').siblings().removeClass('_nv_play');
		$(".artic,.ds_top_con7,.ds_top_con4").hide();	
		$(".ds_top_con8").show();
		listWebs();
		//---------add by caoqian 20151222--------
		$("#delDiv").attr("style","display:none;");
		$("#editDiv").attr("style","display:none;");
	}	
	// 节目列表
	function listProject(){
		$(".artic").attr("style","display:block;");	
		$.ajax({
			type : "POST",
			cache : false,
			async : false,
			url : '/ManagementCenter/playplan/PlayPlan_getCommonProjects.do?'
					+ "type=" + pxid + "&id=" + pnodeId + "&level=2",
			success : function(data) {
				if(data == '0'){
					// 没有优先插播节目
//					$(".ds_top_con3").attr("style","display:block;");
					$("#ftitle").html("暂无节目");
					$("#firp").attr('src', "../images/plan/adddefault.png");
					$("#firp").attr("style","cursor:pointer;");
					$("#firp").attr('onclick','addshow(0,0)');
					$("#firp").attr('title', "点击添加优先插播节目");
					$("#ut").html("");
					$("#pt").html("");
					$('#quiF').hide();
					$('#delF').hide();
					$(".searchListItemTodo_F").attr("style","display:none;");
				}else{
					var json = eval("(" + data + ")");
					var firp = json[0];
					$("#fpid").val(firp.id);
					// 优先插播节目的名称过长截取
//					var tn = firp.name; 
//					if(tn.length>15){ 
//						tn = trunc(tn,12,200);
//					}

					var datestr=firp.enddate;
					var timestr=firp.endtime;
					var str1=datestr+" "+timestr; 

					//如果未过期
					if(comptime(str1,getcurentTime())){
						switch(parseInt(firp.status)){
						
						case 1:
							$("#yxcb_status_tag").attr('class','status_tag_downloading');
							break;
						case 2:
							$("#yxcb_status_tag").attr('class','status_tag_success');
							break;
						case 4 :
							$("#yxcb_status_tag").attr('class','status_tag_fail');
							break;
						default:
							
							$("#yxcb_status_tag").attr('class','status_tag_ready');
							break;
						
						}
					}else{
						$("#yxcb_status_tag").attr('class','status_tag_played');
					}
					
					
				
					$("#ftitle").html(firp.name);
					$("#ftitle").attr('title', firp.name);
					$("#firp").attr('src', firp.thumb);
					$("#firp").attr("style","cursor:pointer;");
					$("#firp").attr('onclick','');
					$("#firp").attr('title', "");
					$("#firpre").attr('href',requestContextPath+"/project/ProjectPreview_preprogram.do?prid="+firp.id+"&source=jsp&navFlag=public");
					$("#quiF").attr('onclick','quiPub('+firp.id+');');
					$("#ut").html(firp.updateTime);
					$("#pt").html(
							firp.weekSelected + '<br>' + firp.startdate + '—'
								+ firp.enddate + ' ' + firp.starttime + '—'
								+ firp.endtime);
					$('#quiF').show();
					$('#delF').show();
					$(".searchListItemTodo_F").attr("style","display:block;");
					var um = $('#uname').val();
					if(um != firp.createname){
						$('#quiF').hide();
					}
					
				}
			}
		});
		$.ajax({
			type : "POST",
			cache : false,
			async : false,
			url : '/ManagementCenter/playplan/PlayPlan_getCommonProjects.do?'
					+ "type=" + pxid + "&id=" + pnodeId + "&level=1",
			success : function(data) {
				if(data == '0'){
					// 没有插播节目
//					$(".ds_top_con3").attr("style","display:block;");
					$("#stitle").html("暂无节目");
					$("#secp").attr('src', "../images/plan/adddefault.png");
					$("#secp").attr("style","cursor:pointer;");
					$("#secp").attr('onclick','addshow(0,1)');
					$("#secp").attr('title', "点击添加插播节目");
					$("#sut").html("");
					$("#st").html("");
					$('#quiS').hide();
					$('#delS').hide();
					$(".searchListItemTodo_S").attr("style","display:none;");
				}else{
					var json = eval("(" + data + ")");
					var secp = json[0];
					$("#spid").val(secp.id);
					// 插播节目的名称过长截取
//					var tn = secp.name; 
//					if(tn.length>15){ 
//						tn = trunc(tn,12,200);
//					}

					var datestr=secp.enddate;
					var timestr=secp.endtime;
					var str1=datestr+" "+timestr; 

					//如果未过期
					if(comptime(str1,getcurentTime())){
						switch(parseInt(secp.status)){
						case 1:
							$("#cb_status_tag").attr('class','status_tag_downloading');
							break;
						case 2:
							$("#cb_status_tag").attr('class','status_tag_success');
							break;
						case 4 :
							$("#cb_status_tag").attr('class','status_tag_fail');
							break;
						default:
							$("#cb_status_tag").attr('class','status_tag_ready');
							break;
						
						}
					}else{
						$("#cb_status_tag").attr('class','status_tag_played');
					}
					
					
					$("#stitle").html(secp.name);
					$("#stitle").attr('title', secp.name);
					$("#secp").attr('src', secp.thumb);
					$("#secp").attr("style","cursor:pointer;");
					$("#secp").attr('onclick','');
					$("#secp").attr('title', "");
					$("#secpre").attr('href',requestContextPath+"/project/ProjectPreview_preprogram.do?prid="+secp.id+"&source=jsp&navFlag=public");
					$("#quiS").attr('onclick','quiPub('+secp.id+');');
					$("#sut").html(secp.updateTime);
					$("#st").html(
						secp.weekSelected + '<br> ' + secp.startdate + '—'
								+ secp.enddate + ' ' + secp.starttime + '—'
								+ secp.endtime);
					$('#quiS').show();
					$('#delS').show();
					$(".searchListItemTodo_S").attr("style","display:block;");
					var um = $('#uname').val();
					if(um != secp.createname){
						$('#quiS').hide();
					}
				}
			}
		});
		autoh();
	}
	// 视频列表
	function listVideos(){
		pxid = pxid=='deviceId'?'deviceId':'groupId';
		$.ajax({
			type : "POST",
			cache : false,
			async : false,
			url : '/ManagementCenter/playplan/PlayPlan_getVideoList.do?'+ pxid + "=" + pnodeId,
			success : function(data) {
				var json = eval("(" + data + ")");
				var videos = document.getElementById('videos');
				if(json.rows.length > 0){
					videos.innerHTML = '';
					for ( var i = 0; i < json.rows.length; i++) {
						var pp = document.createElement("div");
						pp.className = "searchListItem float";
						videos.appendChild(pp);
		
						var newNodeImg = document.createElement("img");
						newNodeImg.className = "searchimg";
						newNodeImg.src = "/ManagementCenter/data/pics/"+json.rows[i].pic+"/iwinimage.png";
						newNodeImg.style.width = "100%";
						newNodeImg.style.height = "100%";
						pp.appendChild(newNodeImg);
						
						var newNodeDiv0 = document.createElement("div");
						newNodeDiv0.className = "corver";
						newNodeDiv0.title= json.rows[i].name;
						pp.appendChild(newNodeDiv0);
						
						var newNodeDiv1 = document.createElement("div");
						newNodeDiv1.className = "searchListItemTitle";
						/*var tn =  json.rows[i].name;
						if(tn.length>20){ 
							tn = trunc(tn,12,250);
						}*/
						newNodeDiv1.innerHTML = '<h1>'+json.rows[i].name+'</h1>';
						pp.appendChild(newNodeDiv1);
						
						var newNodeDiv2 = document.createElement("div");
						newNodeDiv2.className = "searchListItemTodo";
						newNodeDiv2.title= json.rows[i].name;
						pp.appendChild(newNodeDiv2);
		
						var newNodeA0 = document.createElement("a");
						newNodeA0.className = "a1";
						if(json.rows[i].duration == '-1'){
							newNodeA0.href=requestContextPath+"/pages/playplan/video.html?url="+json.rows[i].url;
						}else{
							newNodeA0.href = '#';
						//	newNodeA0.setAttribute("onclick", 'previewOpen(\''+json.rows[i].name+'\',\''+json.rows[i].url+'\');return false');
							//-------------20160218修改byhwx
							newNodeA0.setAttribute("onclick", 'previewOpen(\''+json.rows[i].name+'\',\''+json.rows[i].url+'\',\''+json.rows[i].videoFormat+'\');return false');

						}
						newNodeA0.innerHTML = '预览';
						newNodeA0.target="_blank";
						newNodeDiv2.appendChild(newNodeA0);
		
//						var um = $('#uname').val();
//						var newNodeA1 = document.createElement("a");
//						newNodeA1.className = "a1";
//						newNodeA1.href = '#';
//						newNodeA1.setAttribute("onclick", 'videoeditshow(\''+ json.rows[i].id + '\');return false');
//						newNodeA1.innerHTML = '修改';
//						newNodeDiv2.appendChild(newNodeA1);
						
						var newNodeA2 = document.createElement("a");
						newNodeA2.className = "a1";
						newNodeA2.href = '#';
						newNodeA2.setAttribute("onclick", 'delVideo(\''+ json.rows[i].id + '\');return false');
						newNodeA2.innerHTML = '删除';
						newNodeDiv2.appendChild(newNodeA2);
					}
					// 追加在所有视频的尾部  一个空的视频模板
					var pp = document.createElement("div");
					pp.className = "searchListItem float";
					pp.setAttribute("onclick",'addVideo();');
					videos.appendChild(pp);

					var newNodeImg = document.createElement("img");
					newNodeImg.className = "searchimg";
					newNodeImg.src = "../images/plan/adddefault.png";
					newNodeImg.style.width = "100%";
					newNodeImg.style.height = "100%";
					pp.appendChild(newNodeImg);
				
					var newNodeDiv0 = document.createElement("div");
					newNodeDiv0.className = "corver";
					newNodeDiv0.title= '点击添加视频';
					pp.appendChild(newNodeDiv0);
				}else{
					// 无视频列表
					videos.innerHTML = ''; 

					var pp = document.createElement("div");
					pp.className = "searchListItem float";
					pp.setAttribute("onclick",'addVideo();');
					videos.appendChild(pp);

					var newNodeImg = document.createElement("img");
					newNodeImg.className = "searchimg";
					newNodeImg.src = "../images/plan/adddefault.png";
					newNodeImg.style.width = "100%";
					newNodeImg.style.height = "100%";
					pp.appendChild(newNodeImg);
				
					var newNodeDiv0 = document.createElement("div");
					newNodeDiv0.className = "corver";
					newNodeDiv0.title= '点击添加视频';
					pp.appendChild(newNodeDiv0);
				}
			}
		});
		autoh();
	}
	// 网站列表
	function listWebs(){
		$.ajax({
			type : "POST",
			cache : false,
			async : false,
			url : '/ManagementCenter/playplan/PlayPlan_getWebSiteList.do?'+ pxid + "=" + pnodeId,
			success : function(data) {
				var json = eval("(" + data + ")");
				var webs = document.getElementById('webs');
				if(json.rows.length > 0){
					webs.innerHTML = '';
					for ( var i = 0; i < json.rows.length; i++) {
						var pp = document.createElement("div");
						pp.className = "searchListItem float";
						webs.appendChild(pp);
		
						var newNodeImg = document.createElement("img");
						newNodeImg.className = "searchimg";
						newNodeImg.src = "/ManagementCenter/data/pics/"+json.rows[i].pic+"/iwinimage.png";
						newNodeImg.style.width = "100%";
						newNodeImg.style.height = "100%";
						pp.appendChild(newNodeImg);
						
						var newNodeDiv0 = document.createElement("div");
						newNodeDiv0.className = "corver";
						newNodeDiv0.title= json.rows[i].name;
						pp.appendChild(newNodeDiv0);
						
						var newNodeDiv1 = document.createElement("div");
						newNodeDiv1.className = "searchListItemTitle";
//						var tn =  json.rows[i].name;
//						if(tn.length>8){
//							tn = trunc(tn,30,250);
//						}
						newNodeDiv1.innerHTML = '<h1>'+json.rows[i].name+'</h1>';
						pp.appendChild(newNodeDiv1);
						
						var newNodeDiv2 = document.createElement("div");
						newNodeDiv2.className = "searchListItemTodo";
						newNodeDiv2.title= json.rows[i].name;
						pp.appendChild(newNodeDiv2);
		
						var newNodeA0 = document.createElement("a");
						newNodeA0.className = "a1";
						newNodeA0.innerHTML = '预览';
						newNodeA0.target="_blank";
						newNodeA0.href = json.rows[i].url;
						newNodeDiv2.appendChild(newNodeA0);
		
//						var um = $('#uname').val();
//						var newNodeA1 = document.createElement("a");
//						newNodeA1.className = "a1";
//						newNodeA1.href = '#';
//						newNodeA1.setAttribute("onclick", 'webeditshow(\''+ json.rows[i].id + '\');return false');
//						newNodeA1.innerHTML = '修改';
//						newNodeDiv2.appendChild(newNodeA1);
						
						var newNodeA2 = document.createElement("a");
						newNodeA2.className = "a1";
						newNodeA2.href = '#';
						newNodeA2.setAttribute("onclick", 'delWeb(\''+ json.rows[i].id + '\');return false');
						newNodeA2.innerHTML = '删除';
						newNodeDiv2.appendChild(newNodeA2);
						
					}
					// 追加在所有网站的尾部  一个空的网站模板
					var pp = document.createElement("div");
					pp.className = "searchListItem float";
					pp.setAttribute("onclick",'addWeb();');
					webs.appendChild(pp);

					var newNodeImg = document.createElement("img");
					newNodeImg.className = "searchimg";
					newNodeImg.src = "../images/plan/adddefault.png";
					newNodeImg.style.width = "100%";
					newNodeImg.style.height = "100%";
					pp.appendChild(newNodeImg);
				
					var newNodeDiv0 = document.createElement("div");
					newNodeDiv0.className = "corver";
					newNodeDiv0.title= '点击添加网站';
					pp.appendChild(newNodeDiv0);
				}else{
					// 无节目列表
					webs.innerHTML = ''; 

					var pp = document.createElement("div");
					pp.className = "searchListItem float";
					pp.setAttribute("onclick",'addWeb();');
					webs.appendChild(pp);

					var newNodeImg = document.createElement("img");
					newNodeImg.className = "searchimg";
					newNodeImg.src = "../images/plan/adddefault.png";
					newNodeImg.style.width = "100%";
					newNodeImg.style.height = "100%";
					pp.appendChild(newNodeImg);
				
					var newNodeDiv0 = document.createElement("div");
					newNodeDiv0.className = "corver";
					newNodeDiv0.title= '点击添加网站';
					pp.appendChild(newNodeDiv0);
				}
			}
		});
		autoh();
	}
	
    // 视频   资源库   视频列表单选按按钮的点击
    function selcetPic(id, multi) {
    	if ("1" == multi) {
            var chkid = "chk_" + id;
              if($("#"+chkid).hasClass("checked")){

                       $("#"+chkid).removeClass("checked");
               }else{
                       $("#"+chkid).addClass("checked");
                      }
    	} else  {
            var chkid = "chk_" + id;
            document.getElementById(chkid).checked=true;
    	}
    }
    // 视频弹出框    一打开    立马加载资源库的视频  
    var multi = "";
    function getResources(myVirtual, srhText) { 
   	if (myVirtual == null || "" == myVirtual) myVirtual = "/root/";
        $.ajax({
            type    : 'POST',
            async   : false,
            url     : '/ManagementCenter/playplan/PlayPlan_planGetResources.do?type=1',
            data    : {srhText : srhText, virtual : myVirtual},
            success : function(data) {
           	 var COLS = 5;
           	
           	 var dataObj = eval("(" + data + ")");
           	 if (dataObj.length == 0) {
                    var virtualArray = myVirtual.split("/");
                    var newVirtual = "";
                    var urlItem = "";
                    var urlItemTitle2="";
                    var newVirtualtitle2="";
                    for (var i = 1; i < virtualArray.length - 1; i++) {
                        urlItem += "" == urlItem ? virtualArray[i] : "/" + virtualArray[i];
                        var linkVirtual = "<a href='javascript:getResources(\"/" + urlItem + "/\", \"\");'>" + virtualArray[i] + "</a>";
                        newVirtual += "" == newVirtual ? linkVirtual : " > " + linkVirtual;
                    }
                    for (var i = 1; i < virtualArray.length - 1; i++) {
	                     urlItemTitle2 += "" == urlItemTitle2 ? virtualArray[i] : "/" + virtualArray[i];
	                     var linkVirtual2 = "<a href='javascript:getResources(\"/" + urlItemTitle2 + "/\", \"\");'>" + (virtualArray[i]=="root"?"公共资源":virtualArray[i]) + "</a>";
	                     newVirtualtitle2 += "" == newVirtualtitle2 ? linkVirtual2 : " > " + linkVirtual2;
	                 }
	              var allContent="</div></div></div>";
	                $("#imagecontent").empty();
	                  $("#imagecontent").append(allContent);
	               $("#roottitle").empty();
	               $("#roottitle").append(newVirtualtitle2); 
           	 } else {
	            	 var allVirtual = myVirtual;
	            	 var folderCnt = 0;
	                 var folderPic = "";
	                 var folderContent = "";
	            	 $.each(dataObj, function(idx, item){
	            		 var aType = item.type;
	                     var name = item.name;
	                     if (name.indexOf(".") >= 0) {
		                     name = name.substring(0, name.lastIndexOf("."));
		            	 }
	                     var newVirtual = item.virtual + name + "/";
	            		 if (aType == 0) {
	            			 folderContent +=" <span style='line-height:24px' title='"+name+"' onclick='getResources(\"" + newVirtual + "\", \"\")'>"+name+"</span> "+" </div>point";
	            				 folderPic +=" <div class='tri-image-content'>"+ " <img  onclick='getResources(\"" + newVirtual + "\", \"\")' src='../images/resources/iwinfolder.png' ></br>point";
	            			 folderCnt++;
	            		 }
	            	 });
	                 $.each(dataObj, function(idx, item){
	                	 var duration = 0;
	                	 if(item.duration > 0){
	                		 duration = item.duration;
	                	 }
	                     var aType = item.type;
	                     var name = item.name;
	                     if(name != 'defaultvideothumb.png'){  // 在线视频的默认图片
	                     	 var path = item.path;
	                         var id = item.id;
	                         var size = item.uploader;
	                         var parent_path = path.substring(0, path.lastIndexOf("."));
		                     path = parent_path + "/thumb.png";
		                     var res_path = "";
		                     if (aType == 4) {
		                         if (item.path.substring(item.path.lastIndexOf("."), item.path.length) == ".gif")
		                         	res_path = parent_path + "/image.gif";
		                         else
		                            res_path = parent_path + "/iwinimage.png";
		                     }
		                     if (aType > 0) {
		                      	    if(multi=="1"){
		                      	    //folderContent+=" <div id='"+"chk_"+id+"'class='select-content-checkbox' value='"+path.replace("@", "@#")+ "@KANG-LIN@"+(item.virtual + name).replace("@", "@#")+"@KANG-LIN@"+size+"@KANG-LIN@"+aType+"@KANG-LIN@"+res_path+"'></div> ";
		                      	    }else{
		                      	    	folderContent+="<input id='"+"chk_"+id+"' type='radio' name='select-content-radiobox' value='"+path.replace("@", "@#")+ "@KANG-LIN@"+(item.virtual + name).replace("@", "@#")+"@KANG-LIN@"+size+"@KANG-LIN@"+aType+"@KANG-LIN@"+res_path+"@KANG-LIN@"+duration+"@KANG-LIN@"+name+"'></input>";
		                      	    }
		                      	      folderContent +=" <span  onclick='selcetPic(" + id + ",\"" + multi + "\");' style='line-height:24px' title='"+name+"'>"+name+"</span> "+
	                    								" </div>point"; 
		                      	    
		                      
		                      	     folderPic +=" <div class='tri-image-content'>"+
	                 						 		    " <img onclick='	    selcetPic(" + id + ",\"" + multi + "\");' src='../" + path + "' ></br>point";	
		                         folderCnt++;
		                     }
	                     }
	                 }); 
	                 var allContent = "";
	                 var contentArray = folderContent.split("point");
	                 var picArray = folderPic.split("point");
	                 for (var i = 0; i < contentArray.length; i++) {
	                	 allContent += picArray[i]+""+contentArray[i];
	                 }
	                 allContent+="</div></div></div>";
	                 var virtualArray = allVirtual.split("/");
	                 var newVirtual = "";
	                 var newVirtualtitle="";
	                 var urlItem = "";
	                 var urlItemTitle="";
	                 for (var i = 1; i < virtualArray.length - 1; i++) {
	                     urlItem += "" == urlItem ? virtualArray[i] : "/" + virtualArray[i];
	                     var linkVirtual = "<a href='javascript:getResources(\"/" + urlItem + "/\", \"\");'>" + virtualArray[i] + "</a>";
	                     newVirtual += "" == newVirtual ? linkVirtual : " > " + linkVirtual;
	                 }
	                   for (var i = 1; i < virtualArray.length - 1; i++) {
	                     urlItemTitle += "" == urlItemTitle ? virtualArray[i] : "/" + virtualArray[i];
	                     var linkVirtual = "<a href='javascript:getResources(\"/" + urlItemTitle + "/\", \"\");'>" + (virtualArray[i]=="root"?"公共资源":virtualArray[i]) + "</a>";
	                     newVirtualtitle += "" == newVirtualtitle ? linkVirtual : " > " + linkVirtual;
	                 }
 
        			console.log(allContent);
	               $("#imagecontent").empty();
	               $("#imagecontent").append(allContent);
	               $("#rootId").empty();
	               $("#rootId").append(newVirtual); 
	               
	               $("#roottitle").empty();
	               $("#roottitle").append(newVirtualtitle); 
//	               addEventForCheckBox();

           	 }
            }
        });
   }
    // 获取用户所选择的资源库的视频的属性
    function query() {
    	var ids = "";
    	var objects;
        var resources = new Array();
        var t = document.getElementById("vt").value;
    	if(t == 'videoonline'){
    	}else{
    		objects =$(":radio");
    	 	if (objects.length > 0) {
	    		 for (var i = 0; i < objects.length; i++) {
	    			if (objects[i].checked) {
	                   var aValue = objects[i].getAttribute("value");
	                    var valueArray = aValue.split("@KANG-LIN@");
	                    var thumbPath = valueArray[0].replace("@#", "@");
	                    var size = valueArray[2];
	                    var width = size.split("*")[0];
	                    var height = size.split("*")[1];
	                    var resource = new Object();
	                    resource.path = valueArray[1].replace("@#", "@");
	                    resource.mapped = thumbPath.substring(thumbPath.indexOf("/resources/"));
	                    resource.snap = thumbPath;
	                    resource.w = width;
	                    resource.h = height;
	                    resource.type = valueArray[3];
	                    resource.respath = valueArray[4].substring(thumbPath.indexOf("/resources/"));
	                    resource.duration = valueArray[5];
	                    resource.name = valueArray[6];
	                    resources.push(resource);
	                    ids += "" == ids ? aValue : "," + aValue;
	    			} 
	    			}
	    		}
    	}
    	if (resources.length == 0) {
            $.messager.alert('提示', '请选择记录进行操作!', 'info');
            return false;
    	}
        return resources;
    }
    //视频   资源库和在线视频  的点击切换
    function showVideo(obj){
    	sibls(obj);
    	var curId = obj.getAttribute('id');
    	if(curId == 'resources'){
    		document.getElementById("videoresources").style.display='block';
    		document.getElementById("videoonline").style.display='none';
    		document.getElementById("vt").value="videoresources";
    	}else if(curId == 'online'){
    		document.getElementById("videoonline").style.display='block';
    		document.getElementById("videoresources").style.display='none';
    		document.getElementById("vt").value="videoonline";
    	}
    }
    function sibls(obj){
    	var thisParent = obj.parentNode;
    	var thisChilds =  thisParent.children;
    	obj.className = 'selected';
    	for(var i=0;i<thisChilds.length-1;i++){
    		if(thisChilds[i] != obj){
    			thisChilds[i].className = '';
    		}  			
    	}
    }
    // 在线视频的缩略图的选择
    function fclick(obj){
        $("#impvideofilename").val(obj.value.substring(obj.value.lastIndexOf("\\")+1));
    }
    // 网站的缩略图的选择
    function fwclick(obj){
        $("#webthumb").val(obj.value.substring(obj.value.lastIndexOf("\\")+1));
    }
    
	// 点击添加视频后  弹框同时获取资源库的视频
	function addVideo(){
		$('#addvideo').dialog('open');
		$("#videoForm").form('clear');
		getResources('', '');
		showVideo($("#resources")[0]); // 再次打开弹出框  默认选中资源库
	}
	// 视频的添加 更新
	var subvideosign = '0'; // 控制视频多次提交
	function videoSaveOrUpdate(){
		if(subvideosign == '0'){
			subvideosign = '1';
			
			var videoty = document.getElementById("vt").value;
			var id = document.getElementById("id").value;
			if(videoty == "videoresources"){ // 资源库的视频
				var resources = query();
				if(resources.length == 0 ){
					alert("请选择资源库的视频");
					subvideosign = '0'
					return false;
					
				}else{
					if(id == ''){
						$.ajax({	
							type : "GET",
							async:false, 
							url : '/ManagementCenter/playplan/PlayPlan_saveOrUpdatePlayPlan.do?'+pxid+"="+pnodeId,
							data:{'resourcesvideo':'resourcesvideo','name':resources[0].name,'h':resources[0].h,'mapped':resources[0].mapped,
								'path':resources[0].path,'respath':resources[0].respath,'snap':resources[0].snap,
								'type':resources[0].type,'w':resources[0].w,'duration':resources[0].duration},
							success : function(data) {
								if(data == 'turnerror'){
									$.messager.alert('提示', "图片格式不支持,请重新上传", 'info');			
								}else{
									$.messager.alert('提示', data, 'info');
									$('#addvideo').dialog('close');
									listVideos();
									subvideosign = '0';
								}
							}
						});
					}else{
						$.ajax({	
							type : "GET",
							async:false, 
							url : '/ManagementCenter/playplan/PlayPlan_editVideo.do?'+pxid+"="+pnodeId,
							data:{'resourcesvideo':'resourcesvideo','name':resources[0].name,'h':resources[0].h,'mapped':resources[0].mapped,
								'path':resources[0].path,'respath':resources[0].respath,'snap':resources[0].snap,
								'type':resources[0].type,'w':resources[0].w,'duration':resources[0].duration,'id':id,'editflag':'update'},
							success : function(data) {
								if(data == 'turnerror'){
									$.messager.alert('提示', "图片格式不支持,请重新上传", 'info');			
								}else{	
									$.messager.alert('提示', data, 'info');
									$('#addvideo').dialog('close');
									listVideos();
									subvideosign = '0';
								}
							}
						});
					}
				}
			}else if(videoty == "videoonline"){
				var onlinevideoname = document.getElementById("onlinesourcename").value;
				var onlinevideorul = document.getElementById("onlinev").value;
				var onlinevideothumb = document.getElementById("impvideofilename").value;
				if (onlinevideoname.length <= 0) {
					$.messager.alert("提示","视频名称不能为空","info");
					subvideosign = '0';
					return false;
				}
				var flag=validDirOrFile(onlinevideoname);
				if(!flag){	
					$.messager.alert('错误', '节目名称中只能包含中文.英文.数字.- _ ! ? , . () [] : “” ', 'error');
					subvideosign = '0';
					return false;
				}
				if (onlinevideorul.length <= 0) {
					$.messager.alert("提示","视频地址不能为空","info");
					subvideosign = '0';
					return false;
				}
				if (onlinevideothumb.length <= 0) {
					$.messager.alert("提示","视频图片不能为空","info");
					subvideosign = '0';
					return false;
				}
				if(id == ''){
					$("#videoForm").form('submit',{
								url : '/ManagementCenter/playplan/PlayPlan_saveOrUpdatePlayPlan.do?'+ pxid + '=' + pnodeId,
								onSubmit : function() {
									return $(this).form('validate');
								},
								success : function(data) {
									if(data == 'turnerror'){
										$.messager.alert('提示', "图片格式不支持,请重新上传", 'info');			
									}else{
										$.messager.alert('提示', data, 'info');
										$('#addvideo').dialog('close');
										listVideos();
										subvideosign = '0';
									}
								}
							});
				}else{
					$("#videoForm").form('submit',{
						url : '/ManagementCenter/playplan/PlayPlan_editVideo.do?'+ pxid +'=' + pnodeId + '&editflag =update',
						onSubmit : function() {
							return $(this).form('validate');
						},
						success : function(data) {
							if(data == 'turnerror'){
								$.messager.alert('提示', "图片格式不支持,请重新上传", 'info');			
							}else{
								$.messager.alert('提示', data, 'info');
								$('#addvideo').dialog('close');
								listVideos();
								subvideosign = '0';
							}
						}
					});
				}
			}
		}
	}
	// 视频编辑  数据回显进表单
	function videoeditshow(id) {
			$('#addvideo').dialog('open');
			$.ajax({
				type : "GET",
				cache : false,
				url : '/ManagementCenter/playplan/PlayPlan_findVideoById.do?id='+ id,
				success : function(data) {
					var json = eval("(" + data + ")");
					$("#videoForm").form('load', {
						id : json.id,
						onlinesourcename : json.onlinesourcename,
						onlinev : json.onlinev,
						impvideofilename : json.impvideofilename
					});
				}
			});
	}
	// 视频的删除
	function delVideo(id) {
		$.messager.confirm('提示信息', '您确认要删除吗?', function(data) {
			if (data) {
				$.ajax({
					url : '/ManagementCenter/playplan/PlayPlan_editVideo.do?'+pxid +'=' + pnodeId,
					cache : false,
					type : 'GET',
					data : {
						id : id,
						editflag:'delete'
					},
					success : function(result) {
						if (result == 'success') {
							$.messager.alert('成功', '删除成功', 'info');
						} else {
							$.messager.alert('错误', '删除失败', 'error');
						}
						listVideos();
					}
				});
			}
		});
	}
	// 视频弹出框的关闭
	function videoclose(){
		$('#addvideo').dialog('close');
	}
	
	// 网站添加框打开
	function addWeb(){
		$('#addweb').dialog('open');
		$("#webForm").form('clear');
	}
	
	
	// 网站弹出框的确定按钮
	var subwebsign = '0'; // 控制网站多次提交
	function webSaveOrUpdate(){
		if(subwebsign == '0'){
			subwebsign = '1';
			
			var id = document.getElementById("id").value;
			var webname = document.getElementById("webname").value;
			var websrc = document.getElementById("websrc").value;
			var webthumb = document.getElementById("webthumb").value;
			if (webname.length <= 0) {
				$.messager.alert("提示","网站名称不能为空","info");
				subwebsign = '0';
				return false;
			}
			var flag=validDirOrFile(webname);
			if(!flag){	
				$.messager.alert('错误', '节目名称中只能包含中文.英文.数字.- _ ! ? , . () [] : “” ', 'error');
				subwebsign = '0';
				return false;
			}
			if (websrc.length <= 0) {
				$.messager.alert("提示","网站链接不能为空","info");
				subwebsign = '0';
				return false;
			}
			if (webthumb.length <= 0) {
				$.messager.alert("提示","网站图片不能为空","info");
				subwebsign = '0';
				return false;
			}
			if(id == ''){
				$("#webForm").form('submit',{
							url : '/ManagementCenter/playplan/PlayPlan_saveOrUpdatePlayPlan.do?'+ pxid +'=' + pnodeId,
							onSubmit : function() {
								return $(this).form('validate');
							},
							success : function(data) {
								if(data == 'turnerror'){
									$.messager.alert('提示', "图片格式不支持,请重新上传", 'info');			
								}else{
									$.messager.alert('提示', data, 'info');
									$('#addweb').dialog('close');
									listWebs();
									subwebsign = '0';
								}
							}
						});
			}else{
				$("#webForm").form('submit',{
							url : '/ManagementCenter/playplan/PlayPlan_editWeb.do?'
									+ pxid +'=' + pnodeId + '&editflag = update',
							onSubmit : function() {
								return $(this).form('validate');
							},
							success : function(data) {
								if(data == 'turnerror'){
									$.messager.alert('提示', "图片格式不支持,请重新上传", 'info');			
								}else{
									$.messager.alert('提示', data, 'info');
									$('#addweb').dialog('close');
									listWebs();
									subwebsign = '0';
								}
							}
						});
			}
		}
	}
	// 网站的编辑
	function webeditshow(id) {
		$('#addweb').dialog('open');
		$.ajax({
			type : "GET",
			cache : false,
			url : '/ManagementCenter/playplan/PlayPlan_findWebsiteById.do?id='+ id,
			success : function(data) {
				var json = eval("(" + data + ")");
				$("#webForm").form('load', {
					id : json.id,
					webname : json.webname,
					websrc : json.websrc,
					webthumb : json.webthumb
				});
			}
		});
	}
	function delWeb(id) {
		$.messager.confirm('提示信息', '您确认要删除吗?', function(data) {
			if (data) {
				$.ajax({
					url : '/ManagementCenter/playplan/PlayPlan_editWeb.do?'+pxid +'=' + pnodeId,
					cache : false,
					type : 'GET',
					data : {
						id : id,
						editflag:'delete'
					},
					success : function(result) {
						if (result == 'success') {
							$.messager.alert('成功', '删除成功', 'info');
						} else {
							$.messager.alert('错误', '删除失败', 'error');
						}
						listWebs();
					}
				});
			}
		});
	}
	// 网站弹出框的关闭
	function webclose(){
		$('#addweb').dialog('close');
	}
	
	//视频预览关闭
	function previewClose(){
		$("#previewId").css("display","none");
/* 		$("#previewContent").empty(); */
		$("#previewContent")[0].innerHTML="";
		$("#downloadName").val("");
		$("#previewEditName").val("");
		$("#previewEditId").val("");
		$("#previewEditType").val("");
		$("previewPath").val("");	
		document.getElementById("previewContent").innerHTML="";
	}
	// 视频预览打开
//-------------20160218修改byhwx
function previewOpen(name,url,format){
	//function previewOpen(name,url){
		url = url.substring(0,url.lastIndexOf("/")+1);
		$("#previewEditName").val(name);
		$("#previewEditId").val(url);
		//-------------20160218修改byhwx
		$("#previewEditType").val(format);
		//-------------20160218修改byhwx
		/*content =  "<video width='500' height='500' controls='controls' autoplay='autoplay' ><source src='"+url+"video.mp4'>"+
			"<object data='movie.mp4' width='500' height='500'><embed src='"+url+"video.mp4'></object></video><span class='edit-resources-span'>"+name+'</span>';
		*/
		content =  "<video width='500' height='500' controls='controls' autoplay='autoplay' ><source src='"+url+"video.mp4'>"+
		"<object data='movie.mp4' width='500' height='500'><embed src='"+url+"video.mp4'></object></video><br/><span class='edit-resources-span'>"+name+'</span>';//add by caoqian 2016/2/17 新增<br/>回车换行符

		$("#previewContent").remove();
		$(".edit-resources-title").after("<div id='previewContent' class='edit-resources-content'></div>");
		document.getElementById("previewContent").innerHTML=content;
		$("#previewId").css("display","block");									
	}
	// 视频预览下载
	function previewDownload(){
		var downloadId=$("#previewEditId").val();
		var dl = downloadId.split("/");
		var md5 = downloadId.split("/")[dl.length-2];
		var pathFolder = downloadId.split("/")[dl.length-3];
		var previewName=$("#previewEditName").val();
		//-------------20160218修改byhwx
		var format = $("#previewEditType").val();
		//-------------20160218修改byhwx
        $.messager.confirm('提示', '确认要下载吗?',
                function(data) {
                    if (data) {
                        //	window.location.href=encodeURI(requestContextPath+"/data/resources/"+pathFolder+"/"+md5+'.mp4?n='+previewName);
						//-------------20160218修改byhwx
						window.location.href=encodeURI(requestContextPath+"/data/resources/"+pathFolder+"/"+md5+ "." +format+'?n='+previewName);
						//-------------20160218修改byhwx
						//add by caoqian 2016/2/17---------begin-----------
						/*$.ajax({
						 url : '${pageContext.request.contextPath }/playplan/PlayPlan_getFormat.do',
						 data : {
						 md5 : md5
						 },
						 async : true,
						 dataType : 'json',
						 success : function(result) {
						 var jsonResult=eval('('+result+')');
						 $("#previewEditType").val(jsonResult.format);
						 var format=$("#previewEditType").val();
						 window.location.href=encodeURI(requestContextPath+"/data/resources/"+pathFolder+"/"+md5+format+'?n='+previewName);
						 }
						 });*/
						//add by caoqian 2016/2/17---------end-----------
					}
                }
            );
	}
	/*
	 * 	var beginTime = "2009-09-21 00:00:00";
	    var endTime = "2009-09-21 00:00:01";
	    param1>param return true;
	 * */
	function comptime(param1,param2) {

	    var beginTimes = param1.substring(0, 10).split('-');
	    var endTimes = param2.substring(0, 10).split('-');

	    param1 = beginTimes[1] + '-' + beginTimes[2] + '-' + beginTimes[0] + ' ' + param1.substring(10, 19);
	    param2  = endTimes[1] + '-' + endTimes[2] + '-' + endTimes[0] + ' ' + param2.substring(10, 19);


	    var a = (Date.parse(param1)-Date.parse(param2)) / 3600 / 1000;
	    if (a < 0) {
	       return false;
	    } else if (a > 0) {
	       return true;
	    } else if (a == 0) {
	       return fasle;
	    } else {
	        return 'exception'
	    }
	}
	function getcurentTime()
    { 
        var now = new Date();
       
        var year = now.getFullYear();       //年
        var month = now.getMonth() + 1;     //月
        var day = now.getDate();            //日
       
        var hh = now.getHours();            //时
        var mm = now.getMinutes();          //分
        var ss=now.getSeconds();
        var clock = year + "-";
       
        if(month < 10)
            clock += "0";
       
        clock += month + "-";
       
        if(day < 10)
            clock += "0";
           
        clock += day + " ";
       
        if(hh < 10)
            clock += "0";
           
        clock += hh + ":";
        if (mm < 10) clock += '0'; 
        clock += mm; 
        clock+=":";
        if(ss<10) clock+='0';
        clock+=ss;
        return(clock); 
    } 
	function validDirOrFile(filename){
		// 中文 英文 数字 () [] - _ : "" ? , 。 ! 空格 /
		var reg = /([a-zA-Z0-9\u4E00-\u9FA5\_\-\(\)\[\]\.\,\?\!\s\——\？\！\。\，\:\：\"\“\”])$/;
		if(reg.test(filename)){
			/*if(lastReg.test(filename))
				return false;
			else
				return true;*/
			return true;
		}
		else{
			return false;
		} 
	}