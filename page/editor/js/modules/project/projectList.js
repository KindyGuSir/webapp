var uuid="";//*************
var prn = "";
String.prototype.trim=function() {
    return this.replace(/(^\s*)|(\s*$)/g,'');
}
$(function() {
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
	
		$('#ratio').combobox({
		editable : false,
		onLoadSuccess : function() {
			var data = $('#ratio').combobox('getData');
			if (data.length > 0) {
				$('#ratio').combobox('setValue', data[0].value);
			}
		}
	});  
	editForm=editWindow.find('form');
});

//操作审核加载框
$(function() {
	loadingProgressBar=$('#idAuditProgressbar').dialog({
		title: '正在审核',
		closed: true,
		cache: false,
		modal: true
		});
	var fl = document.getElementById("btnShowFlag").value;
	if(fl == ''){
		$("#nav_myproject").css("background-color","#666666");
		$("#nav_myproject").css("color","#ffffff");
	}
	else if(fl == "public"){
		$("#nav_pubproject").css("background-color","#666666");
		$("#nav_pubproject").css("color","#ffffff");
	}else if(fl == "suspend"){
		$("#nav_waitpassproject").css("background-color","#666666");
		$("#nav_waitpassproject").css("color","#ffffff");
	}
});

//var dg;// 表格 datagrid
var editWindow;
var loadingProgressBar;
var editForm;
var user_Module;
var da;

/**给搜索，排序赋值**/
$(document).ready(function(){
	var keyWords=$("#btnSearchValue").val();
	//var sorter=$("#btnSorterValue").val();alert(sorter);
	$("#ss").val(decodeURIComponent(decodeURI(keyWords)));
	$("#ss").focus();
	/*if(""==sorter){
		$("#sorterComboBox").combobox('setValue',"date");
	}
	else{
		$("#sorterComboBox").combobox('setValue',sorter);
	}*/
});

function trimfont(source){
	return source.replace(/<\/?font[^>]*>/gi,""); 
}

function projectNav(flag){
	if('myproject'==flag){
		window.location.href=requestContextPath+"/project/Project_home.do?module=Project";  // 我的
	}
	else if('pubproject'==flag){
		window.location.href=requestContextPath+"/project/Project_home.do?module=Project&navproject=public&signre=0"; // 公共
	}
	else if('waitpassproject'==flag){
		window.location.href=requestContextPath+"/project/Project_home.do?module=Project&navproject=suspend&signre=0"; // 待审核
	}	
	else if('temproject'==flag){
		window.location.href=requestContextPath+"/project/Project_home.do?module=Project&navproject=template&signre=0";  // 模板
	}	
}

function doSearch(para){
	//alert(111111);
	var expand=$('.searchmore').is(':hidden');
	var val="";
	var vl = document.getElementById("ss").value;
	var showFlag=document.getElementById("btnShowFlag").value;
	var refreshPath=requestContextPath+"/project/Project_home.do?module=Project";
	var theme=$("#themeCategory>.checked:not(':first-child')").text();
	var showcategory=$("#showCategory>.checked").text();
	var w="0";
	var h="0";
	var trimValue=vl.trim();
	var searchFlag="index";
	//alert(vl + "--vl--" + theme + "*****theme*****" + showcategory + "----showcategory");
	if($("#idtimesearch").hasClass("checked")){
		val="time";
	}
	else if($("#idnamesearch").hasClass("checked")){
		val="name";
	}
	else if($("#idmatchsearch").hasClass("checked")){
		val="match";
	}
	
	if(showFlag!=""){
		refreshPath+="&navproject="+showFlag;
	}
	if(vl.trim()!=""){
		//refreshPath+="&keyWords="+trimValue;
		refreshPath+="&keyWords="+encodeURI(encodeURI(trimValue));
	}
	refreshPath+="&sorter="+val;
	refreshPath+="&searchFlag="+searchFlag;
	if($("#myproject").hasClass("checked")){
		refreshPath+="&navPro=1";
	}
	else if($("#pubproject").hasClass("checked")){
		refreshPath+="&navPro=5";
	}
	else if($("#temproject").hasClass("checked")){
		refreshPath+="&navPro=100";
	}
	else if($("#waitpassproject").hasClass("checked")){
		refreshPath+="&navPro=2";
	}
	
	if($("#resolutionCategory>.checked").text()!="全部"&&$("#resolutionCategory>.checked").text()!="其他"){
		w = $("#resolutionCategory>.checked").text().split("x")[0];
		h = $("#resolutionCategory>.checked").text().split("x")[1];
	}
	else if($("#resolutionCategory>.checked").text()=="其他"){
		w = "1";
		h = "1";
	}
	//refreshPath+=("&theme="+theme);
	//refreshPath+=("&showcategory="+showcategory);
	refreshPath+=("&theme="+encodeURI(encodeURI(theme)));
	refreshPath+=("&showcategory="+ encodeURI(encodeURI(showcategory)));
	refreshPath+=("&w="+w);
	refreshPath+=("&h="+h);
	refreshPath+=("&expand="+expand);
	refreshPath+=("&random="+Math.random());
//	window.location.href=encodeURI(refreshPath);
	//alert(refreshPath);
	window.location.href= refreshPath;
}

//对节目进行排序
function projectSort(rec){
	var showFlag=document.getElementById("btnShowFlag").value;
	var refreshPath=requestContextPath+"/project/Project_home.do?module=Project";
	var keyWords = $("#ss").val();
	keyWords = encodeURIComponent(encodeURI(keyWords));
	showFlag = encodeURIComponent(encodeURI(showFlag));
	if(keyWords.trim()!=""){
		refreshPath+="&keyWords="+keyWords.trim();
	}
	if(showFlag!=""){
		refreshPath+="&navproject="+showFlag;
	}
	refreshPath+="&sorter="+rec.id;
	window.location.href=refreshPath;
}

function createNewProject(){
	var validUrl=requestContextPath+'/project/ProjectProgram_getProCreateValid.do';
	$.ajax({
		url : validUrl,
		type : 'POST',
		async : false,
		success : function(result) {
			if (result == "true") {
				$('#editWindow').dialog('open');
				$("#prid").removeAttr("readonly");
				$("#editForm").form('clear');
				var data = $('#ratio').combobox('getData');
				if (data.length > 0) {
					$('#ratio').combobox('setValue', data[0].value);
				}
				editForm.url = requestContextPath+'/project/ProjectProgram_add.do';
			} else{
				$.messager.alert('提示', '您目前尚未有新增节目的权限，请和管理员确认后再尝试！', 'info');
			} 
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}
//新建节目
function addProject(){
	var proresolution;
	var proname = $("#proname").val();
	var w = $("#makeupCo").val();
	var h = $("#makeupCo0").val();
	var protheme = $("#protheme").val();
	var pronote = $("#pronote").val();
	
	proname = proname.trim();
	if(proname == ''){
		 $.messager.alert('错误', '节目名称不能为空', 'error');
		 return false;
	}
	if(proname.length>50){
		 $.messager.alert('错误', '节目名称长度不能超过50', 'error');
		 return false;
	}
	var flag=validDirOrFile(proname);
	if(flag){
		if(proname == ''){
			$.messager.alert('错误', '节目名称不能为空', 'error');
			return false;
		}
	}else{   // 中文 英文 数字 () [] - _ : "" ? , 。 ! 空格 /
		$.messager.alert('错误', '节目名称中只能包含中文.英文.数字.- _ ! ? , . () [] : “” ', 'error');
		return false;
	}
	
	if(w =='请输入数字' ||h == '请输入数字'){
		 $.messager.alert('错误', '请输入正确的分辨率', 'error');
		 return false;
	}else{
		if(w.length > 4 || h.length > 4){
			$.messager.alert('错误', '分辨率不能超过四位数', 'error');
			return false;
	    }else if(w == '' || h == ''){
	   	 	$.messager.alert('错误', '请输入分辨率', 'error');
			 return false;
	    }
	    else{
	   	 	proresolution = w+":"+h;
	    }
	}
	
	var navp = $("#navp").val();
	var userse = $("#userse").val();

	var validUrl=requestContextPath+'/project/ProjectProgram_add.do?name='+encodeURIComponent(encodeURI(proname))+"&resolution="+proresolution+"&theme="+encodeURIComponent(encodeURI(protheme))+"&note="+encodeURIComponent(encodeURI(pronote));
	$.ajax({
		url : validUrl,
		type : 'post',
		async : false,
		success : function(result) {
			if (result != "") {
				// window.location.href=requestContextPath+"/project/Project_home.do?module=Project"; 
				enter(result,'',navp,userse,proresolution);
			}
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
}


//--选择模板
function addTemplate(disa){
	$(disa).attr('disabled','disabled');
	var useTempSign = document.getElementById("useTempSign").value; 
	if(useTempSign=="temp"){
		var prid=document.getElementById("hiddenutcpPrid").value;
	}
	var proname = document.getElementById("utcpname").value;
	var protheme = document.getElementById("utcptheme").value;
	var pronote = document.getElementById("utcpnote").value;

	proname = proname.trim();
	if(proname == ''){
		 $.messager.alert('错误', '节目名称不能为空', 'error');
		 $(disa).attr('disabled',false);
		 return false;
	}
	var flag=validDirOrFile(proname);
	if(flag){
		var len = proname.length;
		if(len > 50){
			$.messager.alert('错误', '节目名称不得超过50字符', 'error');
			 $(disa).attr('disabled',false);
			return false;
		}
	}else{   // 中文 英文 数字 () [] - _ : "" ? , 。 ! 空格 /
		$.messager.alert('错误', '节目名称中只能包含中文.英文.数字.- _ ! ? , . () [] : “” ', 'error');
		 $(disa).attr('disabled',false);
		return false;
	}

	var proresolution;
	var w = $("#utcptmakeupCo").val();
	var h = $("#utcptmakeupCo0").val();
	if(w =='请输入数字' ||h == '请输入数字'){
		 $.messager.alert('错误', '请输入正确的分辨率', 'error');
		 $(disa).attr('disabled',false);
		 return false;
	}else{
		if(w.length > 4 || h.length > 4){
			$.messager.alert('错误', '分辨率不能超过四位数', 'error');
			 $(disa).attr('disabled',false);
			return false;
	    }else if(w == '' || h == ''){
	   	 	$.messager.alert('错误', '请输入分辨率', 'error');
	   	 	$(disa).attr('disabled',false);
			 return false;
	    }
	    else{
	   	 	proresolution = w+":"+h;
	    }
	}
	
	var navp = $("#navp").val();
	var userse = $("#userse").val();
	
	if(useTempSign=="nulltemp"){
		var validUrl=requestContextPath+'/project/ProjectProgram_add.do?name='+encodeURIComponent(encodeURI(proname))+"&resolution="+proresolution+"&theme="+encodeURIComponent(encodeURI(protheme))+"&note="+encodeURIComponent(encodeURI(pronote));
		$.ajax({
			url : validUrl,
			type : 'post',
			async : false,
			success : function(result) {
				if (result != "") {
					// window.location.href=requestContextPath+"/project/Project_home.do?module=Project"; 
					enter(result,'',navp,userse,proresolution);
				}
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
				
			}
		});
	}else if(useTempSign=="temp"){
		var validUrl=requestContextPath+'/project/ProjectProgram_add.do?name='+encodeURIComponent(encodeURI(proname))+"&w="+w+"&h="+h+"&theme="+encodeURIComponent(encodeURI(protheme))+"&note="+encodeURIComponent(encodeURI(pronote))+"&prid="+prid+"&resolution="+proresolution+"&usersign=999";
		$.ajax({
			url : validUrl,
			type : 'post',
			async : false,
			success : function(result) {
				if (result != "") {
					// window.location.href=requestContextPath+"/project/Project_home.do?module=Project"; 
					enter(result,'',navp,userse,proresolution);
				}
				
			},
			error : function(XMLHttpRequest, textStatus, errorThrown) {
			}
		});
	}
}

/*function del(prid,flag){
	//var requestUrl=requestContextPath+'/project/ProjectProgram_del.do?prid='+prid+"&delScopeFlag="+flag;
//	window.location.href=requestContextPath+"/project/ProjectProgram_del.do?prid="+prid;
	
	var validUrl=requestContextPath+'/project/ProjectProgram_getProDelValid.do';
	$.ajax({
		url : validUrl,
		type : 'POST',
		async : false,
		success : function(result) {
			if (result == "true") {
				prid=encodeURI(encodeURI(prid));
				$.messager.confirm('提示信息', '请确认此节目没有被使用 !</br>是否删除?', function(data) {
					if (data) {
						$.ajax({
							url: "${pageContext.request.contextPath }/project/ProjectProgram_del.do?prid="+prid+"&delScopeFlag="+flag,
							type : 'POST',
							async : true,
							success : function(result) {
								if (result == "true") {
									var refreshPath=getSavedPath();
									// $.messager.alert('成功', '删除成功', 'info');
									window.location.href = refreshPath;
								} else if (result == "false") {
									$.messager.alert('错误', '删除失败', 'error');
								} 
								else {
									$.messager.alert('错误', '不能删除节目，由于' + result + "，正在使用此节目",
											'error');
								}
							},
							error : function(XMLHttpRequest, textStatus, errorThrown) {
								alert(XMLHttpRequest.status);
								alert(XMLHttpRequest.readyState);
								alert(textStatus);
								alert(errorThrown);
							}

						});
					}
				});
			} else{
				$.messager.alert('提示', '您目前尚未有删除节目的权限，请和管理员确认后再尝试！', 'info');
			} 
		},
		error : function(XMLHttpRequest, textStatus, errorThrown) {
			
		}
	});
	
	
}*/

function prepareDel(prid,template){
	if(template!="private"){
		if(!validPro(65536)){
			$.messager.alert('错误', '没有操作权限！', 'info');
			return;
		}
	}
	$('#shanchu').show().siblings('.popup-bg').show();
	var dis = $('#shanchu');
	popsitoin(dis);
	var delproval=template+"_"+prid;
	$("#delpro").val(delproval);
}
//---删除节目
function del(){
	var flag,prid;
	var delproval = $("#delpro").val();
	if(delproval!=""){
		var pros = delproval.split("_");
		flag = pros[0];
		prid = pros[1];
	}
	var validUrl=requestContextPath+'/project/ProjectProgram_getProDelValid.do';
	$.ajax({
		url : validUrl,
		type : 'POST',
		async : false,
		success : function(result) {
			if (result == "true") {
				$.ajax({
					url: requestContextPath+"/project/ProjectProgram_del.do?prid="+prid+"&delScopeFlag="+flag,
					type : 'POST',
					async : true,
					success : function(result) {
						if (result == "true") {
//							var refreshPath=getSavedPath();
//							window.location.href = refreshPath;
							setTimeout("doSearch();",1000);
						} else if (result == "false") {
							$.messager.alert('错误', '删除失败', 'error');
						} 
						/*else {
							$.messager.alert('错误', '不能删除节目，由于' + result + "，正在使用此节目",
									'error');
						}*/
					},
					error : function(XMLHttpRequest, textStatus, errorThrown) {
						alert("删除节目");
//						alert(XMLHttpRequest.status);
//						alert(XMLHttpRequest.readyState);
//						alert(textStatus);
//						alert(errorThrown);
					}
			
				});
			} else{
				$.messager.alert('提示', '您目前尚未有删除节目的权限，请和管理员确认后再尝试！', 'info');
			} 
		}
	});
}

//默认复选框全部选中
function allSuspendCheck(){
	 var checklist = document.getElementsByName ("auditCheckBox");
	 if(document.getElementById("suschk").checked){
		   for(var i=0;i<checklist.length;i++){
		      checklist[i].checked = 1;
		   } 
	 }else{
		  for(var j=0;j<checklist.length;j++){
		     checklist[j].checked = 0;
		  }
	 }
}
function selcheck(){
	var x=document.getElementsByName("auditCheckBox");
	var issel=true;
	for(var i=0;i<x.length;i++){
		if(x[i].checked){
			
		} else{
			issel=false;
			break;
		}
	} 
	if(issel==true){
		document.getElementById("suschk").checked = 1;
	}else{
		document.getElementById("suschk").checked = 0;
	}
}
//----
function saveData(){
	$("#editForm").form('submit', {
		url : editForm.url,
		async:false,
		onSubmit : function() {
			var flag = $(this).form('validate');
			if(!flag){
				return flag;
			}
			else{
				var filename=$("#prid").val();
				var f=validDirOrFile(filename);
				if(f){
					if(filename.length>50){
						$.messager.alert('错误', '节目名称不得超过50字符', 'error');
						return false;
					}
					else{
						return flag;
					}
				}
				else{   // 中文 英文 数字 () [] - _ : "" ? , 。 ! 空格 /
					$.messager.alert('错误', '节目名称中只能包含中文.英文.数字.- _ ! ? , . () [] : “” ', 'error');
					return false;
				}
			}
		},
		success : function(data) {
//			var json = eval("(" + data + ")");
			if (data=="true") {
				$('#editWindow').dialog('close');
//				if(json.id!=""){	
//					da=json.id;
//				}
//				$.messager.alert('成功', json.success, 'info');
//				$.messager.alert('成功', '添加成功', 'info');
				window.location.href=requestContextPath+"/project/Project_home.do?module=Project";
//				dg.datagrid('reload');
			} else {
				$.messager.alert('错误', '已有重名节目，添加失败', 'error');
			}
		}
	});
}

function changeText(ev){
	var clickEve = ev || window.event;
    var inputTab = clickEve.target || clickEve.srcElement;
    var initVal = inputTab.innerHTML;

    var inputItem = document.createElement('input'); 
    inputItem.type = 'text'; 
    inputItem.style.width = '100%';
    
    inputTab.innerHTML = ''; // 清空单元格的数据 
    inputTab.appendChild(inputItem); 
    
    inputItem.focus();
    inputItem.value = initVal;
    inputItem.onblur = function changeToText(){
    		var proName = inputItem.value;
    		$.ajax({
				async: false,
				url: "${pageContext.request.contextPath }/project/ProjectProgram_rename.do?prid="+initVal+"&dstPrid="+proName,
				type: 'post',
				async: true,
				success: function(res){
				if(res=="true"){
					inputTab.innerHTML = ''; // 清空单元格的数据 
    				var textNode = document.createTextNode(proName);
    				inputTab.appendChild(textNode);
    				
    				window.location.href=requestContextPath+"/project/Project_home.do?module=Project";
				}
				else{
					$.messager.alert('错误', proName+'已存在', 'error');
					
					inputTab.innerHTML = ''; // 清空单元格的数据 
    				var textNode = document.createTextNode(initVal);
    				inputTab.appendChild(textNode);
				}	
			},
			error: function(XMLHttpRequest, textStatus, errorThrown){
				inputTab.innerHTML = ''; // 清空单元格的数据 
    			var textNode = document.createTextNode(initVal);
    			inputTab.appendChild(textNode);
    			
				alert(XMLHttpRequest.status);
				alert(XMLHttpRequest.readyState);
				alert(textStatus);
			}
		});
    }
    
}

function imageOff(index){
	/**var delid = "del_btn"+index;
	document.getElementById(delid).style.display = "none";
	
	var playid = "play_btn"+index;
	document.getElementById(playid).style.display = "none";**/
	var delid = "move_"+index;
	document.getElementById(delid).style.visibility="hidden";
	var palyid="play_"+index;
	document.getElementById(palyid).style.visibility="hidden";
}

function imageOn(index,navPro,isProDel){
	var delid = "move_"+index;
	//document.getElementById(delid).style.display = "block";
	if(((navPro=="public")&&(isProDel=="false"))){
		document.getElementById(delid).style.visibility="hidden";
	}
	else if(navPro=="suspend"){
		document.getElementById(delid).style.visibility="hidden";
	}
	else{
		document.getElementById(delid).style.visibility="visible";
	}
	var palyid="play_"+index;
	if((navPro=="suspend")||(navPro=="public")){
		document.getElementById(palyid).style.visibility="visible";
	}
	else{
		document.getElementById(palyid).style.visibility="hidden";
	}
	/**var playid = "play_btn"+index;
	document.getElementById(playid).style.display = "block";**/
}

function publicImageOff(index){
	var playid = "public_play_btn"+index;
	document.getElementById(playid).style.display = "none";
}

function publicImageOn(index){
	var playid = "public_play_btn"+index;
	document.getElementById(playid).style.display = "block";
}

function cleardata(){
    $('#projectProgramForm').form('clear');
}

function cancelAudit(prid,username,proresolution,state){
	var checkUrl=requestContextPath+"/project/ProjectProgram_cancelAudit.do";
	$.ajax({
		type : "GET",
		cache : false,
		url : checkUrl,
		async:false,
		data : {
			prid : prid
		},
		success : function(data) {
			if(data=="false"){
				$.messager.alert('错误', '撤销节目审核状态失败', 'error');
			}
			else if(data.split("@")[0]=="true"){
					// window.location.href=requestContextPath+"/pages/project/editor/index.html?prid="+prid;
				if(data.split("@")[1]=="true"){
					window.location.href=requestContextPath+"/pages/project/editor/index.html?username="+username+"&prid="+prid+"&state="+state+"&proresolution="+proresolution+"&quick=0";
				}
				else{
					window.location.href=requestContextPath+"/pages/project/editor/index-commerical.html?username="+username+"&prid="+prid+"&state="+state+"&proresolution="+proresolution+"&quick=0";
				}
			}
			else{
				$.messager.alert('错误', '撤销审核状态失败!', 'error');
			}
		},
		error : function() {
			$.messager.alert('错误', '撤销节目审核状态失败', 'error');
		}
	});
}

// 导出
function proexport(prid,pname,navFlag,username){
	if(!validPro(16384)){
		$.messager.alert('错误', '没有操作权限！', 'info');
		return;
	}
	 if(confirm("是否确认导出？")){
		 prn= pname;
		 var nag= prid+"@"+navFlag;
		 uuid=nag;
		 //update by haoyc [B160317-032]节目制作导出等待效果 begin
		 $('.popup-bg').slideDown(300,function(){
			 $.ajax({
				 type : "GET",
				 cache : false,
				 url : requestContextPath+"/project/Project_exportbebusy.do?exportlfag="+nag,
				 async:false,
				 success : function(data) {
					 if(data == 'ok'){
						 //*************
						 //$('.popup-bg').slideDown(300);
						 document.getElementById('teds').style.display="block";
						 document.getElementById('loading0').style.display="block";
						 var checkUrl=requestContextPath+"/project/Project_export.do?navFlag="+navFlag;

						 /*controlFlag(uuid,"add");*/
						 var index=window.setInterval("beginquery()", "3000");//****test是ajax方法执行成功厚的操作，比如关闭窗口********
						 $("#exportIndex").val(index);

						 $.ajax({
							 type : "post",
							 cache : false,
							 url : checkUrl,
							 async:false,
							 data : {
								 prid : prid,
								 uuid:uuid
							 },
							 success : function(data) {
								 //					window.clearInterval(index);//*************
								 //					controlFlag(uuid,"remove");//*********

							 },
							 error : function() {

							 }
						 });
					 }
					 else if(data == 'inprogess'){
						 $.messager.alert('提示', '该节目正在导出中..... 请耐心等待', 'info');
						 $('.popup-bg').slideDown(300);
						 document.getElementById('teds').style.display="block";
						 document.getElementById('loading0').style.display="block";
						 var index=window.setInterval("beginquery()", "3000");//****test是ajax方法执行成功厚的操作，比如关闭窗口********
						 $("#exportIndex").val(index);
					 }else if(data == 'busy'){
						 $.messager.alert('提示', '已经超出最大数量限制..... 请确认', 'info');
					 }
				 },error:function(){

				 }
			 });
		 });
		 //update by haoyc [B160317-032]节目制作导出等待效果 end
	 }
	 else{
		 return;
	 }
}

function sucmsg(data,pname){
	if(data == ''){
		
	}else{
		document.getElementById('teds').style.display="none";
		document.getElementById('loading0').style.display="none"; 
		//------修改byhthwx20151230
		$('#dcjmzbd,.popup-bg').show();
		//$('#dcjmzbd').show();
		//$('#dcjmzbd').show().siblings('.popup-bg').show();
		var dis = $('#dcjmzbd');
		popsitoin(dis);
		var expFile = data.split("@LHM");
		$("#exportPro").val(expFile[0]);
		$("#expFileSize").val(expFile[1]);
		$("#expFileName").val(trimfont(pname));
	}
}
/**
 *
 */
function exitExport(){

	$('#dcjmzbd').hide();
	$('.popup-bg').hide();
}
function beginExport(){
	var fileurl = $("#exportPro").val();
	var serverName = $("#exportPro").attr("pid");
	if(serverName == null || serverName==""){
		serverName = "ManagementCenter";
	}
	//var ss = fileurl.split("../webapps/ManagementCenter");
	var ss = fileurl.split("data/download")
	var path = "/" + serverName + "/data/download" +ss[1];
	//alert(fileurl + "-------hthwx修改projectList的beginExport-----------" + path);
	var checkUrl=requestContextPath+"/project/Project_download.do?name="+prn+"&path="+path;
/*	$.ajax({
		type : "GET",
		cache : false,
		url : checkUrl,
		async:false,
		success : function(data) {
			alert(data);
			$('#ri').on('click', guanbi);
			function guanbi() {
				$(this).parents('.popup').fadeOut(300).siblings('.popup-bg').fadeOut(300);
			}
	$('#ri').click();
		},
		error : function() {
		
		}
	});*/
	$("#exporturl").val(path);
	$("#exportname").val(prn);
/*	$("#exportform").submit();*/
	window.location.href=encodeURI(path+"?n="+prn);
	$('#ri').on('click', guanbi);
	function guanbi() {
		$(this).parents('.popup').fadeOut(300).siblings('.popup-bg').fadeOut(300);
	}
	$('#ri').click();
}

//开始导入
function beginImport(){
	var impfilename = $("#impfilename").val();
	var impfileurl = $("#impfileurl").val();
	var impfileresource = 'n';
	if(document.getElementById("impfileresource").checked){
		impfileresource = 'y';
	}
	
	var checkUrl=requestContextPath+"/project/ProjectImport_proImport.do?impfilename="+impfilename+"&impfileurl="+impfileurl+"&impfileresource="+impfileresource;
	$.ajax({
		type : "post",
		cache : false,
		url : checkUrl,
		async:false,
		success : function(data) {
			alert("操作成功！");
		},
		error : function() {
		
		}
	});
}
function browserInfo(){
    var Sys = {}; 
var ua = navigator.userAgent.toLowerCase(); 
var s; 
(s = ua.match(/msie ([\d.]+)/)) ? Sys.ie = s[1] : 
(s = ua.match(/firefox\/([\d.]+)/)) ? Sys.firefox = s[1] : 
(s = ua.match(/chrome\/([\d.]+)/)) ? Sys.chrome = s[1] : 
(s = ua.match(/opera.([\d.]+)/)) ? Sys.opera = s[1] : 
(s = ua.match(/version\/([\d.]+).*safari/)) ? Sys.safari = s[1] : 0;

//以下进行测试 
/*      if (Sys.firefox){
	alert('您的浏览器为Firefox: ' + '版本号为:'+ Sys.firefox);
}  */
if (Sys.ie){
	var n=0;
	n=Sys.ie;
	if(n<10){
		alert('您的浏览器为IE: ' + '版本号为:'+Sys.ie+'请更新到ie10及以上');
	}
} 
/*  if (Sys.chrome){
	alert('您的浏览器为Chrome: ' + '版本号为:'+ Sys.chrome);
} 
if (Sys.opera) {
	alert('您的浏览器为Opera: ' + '版本号为:'+ Sys.opera);
} 
if (Sys.safari) {
	alert('您的浏览器为Safari: ' + '版本号为:'+ Sys.safari);
}  */
}
function enter(prid,state,navFlag,username,proresolution){
	
	browserInfo();
//	if(""==navFlag || "template"==navFlag){
 	//alert(window.location.href);
    //window.location.href="${pageContext.request.contextPath}/project/ProjectProgram_detail.do?prid="+prid;
	 var nag = prid+"@"+navFlag;
	 $.ajax({
			type : "GET",
			cache : false,
			url : requestContextPath+"/project/Project_publishbebusy.do?publishflag="+nag,
			async:true,
			success : function(data) {
				if(data == 'ok'){
					var checkUrl=requestContextPath+"/project/ProjectProgram_checkProState.do?navFlag="+navFlag;
					$.ajax({
						type : "GET",
						cache : false,
						url : checkUrl,
						async:false,
						data : {
							prid : prid
						},
						success : function(data) {
							var d = data.split("@")[0];
							if(d=="false"){
								if(data.split("@")[1] == 'true'){
									state = '2';
								}
								if(data.split("@")[2] == 'true'){
									window.location.href=requestContextPath+"/pages/project/editor/index.html?username="+username+"&prid="+prid+"&state="+state+"&proresolution="+proresolution+"&quick=0";
								}
								else{
									window.location.href=requestContextPath+"/pages/project/editor/index-commerical.html?username="+username+"&prid="+prid+"&state="+state+"&proresolution="+proresolution+"&quick=0";
								}
							}
							else if(d=="suspendconflict"){
								if(data.split("@")[1] == 'false'){
									state = '1';
								}
								$.messager.confirm('提示信息', '当前节目已经发布，点击确定后将会撤销审核，是否对其进行编辑?', function(data) {
									if(data){
										cancelAudit(prid,'',proresolution,state);
									}
								});
//								if(confirm("当前节目正处于待审核状态，点击确定将会自动撤销审核，确定要进行再次编辑?")){
//									cancelAudit(prid);
//								}
//								else
//									return false;
							}
							else if(d=="publishconflict"){
								if(data.split("@")[1] == 'false'){
									state = '1';
								}
								$.messager.confirm('提示信息','当前节目已经发布，点击确定编辑后的节目需要再次发布才会生效，是否对其进行编辑?', function(data) {
									if(data){
										cancelAudit(prid,username,proresolution,state);
									}
								});
//								if(confirm("当前节目已经发布，点击确定编辑后的节目需要再次发布才会生效，是否对其进行编辑?")){
//									cancelAudit(prid);
//								}
//								else
//									return false;
							}
							else if(d=="publishreset"){
								cancelAudit(prid,'',proresolution,state);
							}
							else if(d=="refuseconflict"){
								cancelAudit(prid,'',proresolution,state);
							}
						},
						error : function() {
							
						
						}
					});
				}else if(data == 'busy'){
					$.messager.confirm('提示信息', '当前节目处于正在发布状态 ，不能再次进行编辑，请稍候....',"info");
				}	
			},
		 	error:function(){
		 		
		 	}
	 });
}
function copy(disa){
	/*var navp = $("#navp").val();
	var prid=$("#hiddenPrid").val();
	 var nag= prid+"@"+navp;
	 uuid=nag;
	 $.ajax({
			type : "GET",
			cache : false,
			url : requestContextPath+"/project/Project_copybebusy.do?copyflag="+nag,
			async:true,
			success : function(data) {
				if(data == 'ok'){
					
					//---
					
					//---
					
				}else if(data == 'busy'){
					$.messager.alert('错误', '该节目正在复制中，请稍后......', 'error');
				}
			},error:function(){
				
			}
	 });*/
	$(disa).attr('disabled','disabled');
	 var user=$("#copyUser").val();
		var proName=trimfont($("#copyProName").val());
		var note=$("#copyNote").val();
		var name = trimfont($("#copyProName").val());
		var protheme = $("#copyProtheme").val();
		var pronote = $("#copyNote").val();
		var copysign=$("#hiddencopysign").val();
		var userse = $("#userse").val();
		var navp = $("#navp").val();
		var prid=$("#hiddenPrid").val();
		var pagenum=$("#pagenum").val();
		name = name.trim();
		if(name == ''){
			 $.messager.alert('错误', '节目名称不能为空', 'error');
			 $(disa).attr('disabled',false);
			 return false;
		}
		var flag=validDirOrFile(name);
		if(flag){
			var len = name.length;
			if(len > 50){
				$.messager.alert('错误', '节目名称不得超过50字符', 'error');
				$(disa).attr('disabled',false);
				return false;
			}
		}else{   // 中文 英文 数字 () [] - _ : "" ? , 。 ! 空格 /
			$.messager.alert('错误', '节目名称中只能包含中文.英文.数字.- _ ! ? , . () [] : “” ', 'error');
			$(disa).attr('disabled',false);
			return false;
		}
		
		var proresolution;
		var w = $("#copymakeupCo").val();
		var h = $("#copymakeupCo0").val();
		if(w =='请输入数字' ||h == '请输入数字'){
			 $.messager.alert('错误', '请输入正确的分辨率', 'error');
			 $(disa).attr('disabled',false);
			 return false;
		}else{
			if(w.length > 4 || h.length > 4){
				$.messager.alert('错误', '分辨率不能超过四位数', 'error');
				 $(disa).attr('disabled',false);
				return false;
		    }else if(w == '' || h == ''){
		   	 	$.messager.alert('错误', '请输入分辨率', 'error');
		   	 	$(disa).attr('disabled',false);
				 return false;
		    }
		    else{
		   	 	proresolution = w+":"+h;
		    }
		}
		
		var url=requestContextPath+'/project/ProjectProgram_copyProgram.do?name='+encodeURIComponent(encodeURI(proName))+"&resolution="+proresolution+"&theme="+encodeURIComponent(encodeURI(protheme))+"&note="+encodeURIComponent(encodeURI(pronote))+"&prid="+prid+"&w="+w+"&h="+h+"&copyproflag="+navp+"&copysign="+copysign+"&pagenum="+pagenum;
		controlFlag(uuid,"add");
		
		$.ajax({
			type : "post",
			cache : false,
			url : url,
			async:false,
			timeout : 60000, //超时时间设置，单位毫秒
		    complete: function(){
		    },
			success : function(data) {
				if(data=="success"){
					if(copysign =='myproject'){
						$.messager.alert('提示', '您的节目已成功复制到"我的节目"', 'info',function(){
							var index=window.setInterval("beginquery()", "3000");//****test是ajax方法执行成功厚的操作，比如关闭窗口********
							$("#exportIndex").val(index);
							//window.location.href=requestContextPath+"/project/Project_home.do?module=Project";  // 我的
							doSearch(); 
						});
					}else if(copysign == 'tempproject'){
						$.messager.alert('提示', '您的节目已成功复制到"模板中心"', 'info',function(){
							var index=window.setInterval("beginquery()", "3000");//****test是ajax方法执行成功厚的操作，比如关闭窗口********
							$("#exportIndex").val(index);
							//window.location.href=requestContextPath+"/project/Project_home.do?module=Project";  // 我的
							doSearch();  
						});
					}
					//setTimeout("doSearch();",1000);
				}
				else{
					$.messager.alert('错误', '复制节目失败', 'error');
				}
			},
			error : function() {
				$.messager.alert('错误', '复制节目出现错误', 'error');
			}
		});
}

function validPro(idFlag){
	var url = requestContextPath+"/project/Project_validAuth.do?validFlag="+idFlag;
	var flag=true;
	$.ajax({
		type : "GET",
		cache : false,
		url : url,
		async:false,
		success : function(data) {
			if("yes"==data){
			}
			else{
				flag=false;
			}
		},
		error : function() {
		}
	});
	return flag;
}

function propareCopy(prid,name,w,h,theme,note,loginname,thumb,navp){
	if(!validPro(16384)){
		$.messager.alert('错误', '没有操作权限！', 'info');
		return;
	}
	if(navp == ""){
		var url = "requestContextPath+'/project/ProjectProgram_getPageSize.do?prid="+prid;
		$.ajax({
			type : "GET",
			cache : false,
			url : url,
			async:false,
			success : function(data) {
				if(data != ''){
					$("#pagenum").val(data);
				}
			},
			error : function() {
				
			}
		});
	}
	
	$('#fzjmz').show().siblings('.popup-bg').show();
	var dis = $('#fzjmz');
	popsitoin(dis);
	$("#copyUser").val(loginname);
	$("#copyProName").val(trimfont(name));
	$("#copyNote").val(note);
	$("#copymakeupCo").val(w);
	$("#copymakeupCo0").val(h);
	$("#copyProtheme").val(theme);
	$("#hiddenPrid").val(prid);
	document.getElementById("copyimg").src=thumb;
	document.getElementById("copyimgproname").value= name;
}

function propareTemplateCopy(prid,name,w,h,theme,note){
	if(!validPro(16384)){
		$.messager.alert('错误', '没有操作权限！', 'info');
		return;
	}
	var url = "requestContextPath+'/project/ProjectProgram_getFiestPageThumb.do?prid="+prid;
	$.ajax({
		type : "GET",
		cache : false,
		url : url,
		async:false,
		success : function(data) {
			document.getElementById("tempimg").src=data;
			document.getElementById("hjidfiratthumb").value=data;
			
		},
		error : function() {
			
		}
	});
	$("#utcpname").val(trimfont(name));
	document.getElementById('imgproname').value=name;
	$("#utcpnote").val(note);
	$("#utcptmakeupCo").val(w);
	$("#utcptmakeupCo0").val(h);
	$("#utcptheme").val(theme);
	$("#hiddenutcpPrid").val(prid);
	
	$('#cjmb').show().siblings('.popup-bg').show();
	var dis = $('#cjmb');
	popsitoin(dis);
}
// 快速发布列表处   进入快速发布页面入口
function enterPublish(prid,username){
	window.location.href=requestContextPath+"/pages/project/editor/indexOfQuick.html?username="+username+"&prid="+prid+"&quick=1&ent=0";
}
function play(prid,flag){
	//var url = "${pageContext.request.contextPath}/project/ProjectPreview_preprogram.do?prid="+prid;
	var url = "";
	if(flag=="suspend")
		url=requestContextPath+"/project/ProjectPreview_preprogram.do?prid="+prid+"&source=jsp&navFlag="+flag;
	else if(flag=="public"){
		url=requestContextPath+"/project/ProjectPreview_preprogram.do?prid="+prid+"&source=jsp&navFlag="+flag;
	}
	else if(flag=="template"){
		url=requestContextPath+"/project/ProjectPreview_preprogram.do?prid="+prid+"&source=jsp&navFlag="+flag;
	}
	else if(flag==""){
		url=requestContextPath+"/project/ProjectPreview_preprogram.do?prid="+prid+"&source=jsp&navFlag=private";
	}
	window.open(url);
}

function changeNameImage(){
	var div = document.getElementById("sort");
	if(div.style.backgroundImage == "url(${pageContext.request.contextPath}/images/project/sort_date.png)"){
		div.style.backgroundImage = "url(${pageContext.request.contextPath}/images/project/sort_name.png)";
		
	}
	else if(div.style.backgroundImage == "url(${pageContext.request.contextPath}/images/project/sort_name.png)"){
		div.style.backgroundImage = "url(${pageContext.request.contextPath}/images/project/sort_date.png)";
	}
}

function auditcheck(mouse,check){
	var auditCheckImg=document.getElementById("id_audit_checked_img");
	var auditNotCheckImg=document.getElementById("id_audit_notchecked_img");
	if((mouse=="over")&&(check=="check")){
		auditCheckImg.className="project-commontool-auditpass-img-mouseon";
	}
	else if((mouse=="out")&&(check=="check")){
		auditCheckImg.className="project-commontool-auditpass-img";
	}
	else if((mouse=="over")&&(check=="notcheck")){
		auditNotCheckImg.className="project-commontool-auditnotpass-img-mouseon";
	}
	else{
		auditNotCheckImg.className="project-commontool-auditnotpass-img";
	}
	
}

function switchDiv(){
	if(document.getElementById("sort").className=="name_btn"){
    	document.getElementById("sort").className="date_btn";
    	
    	var publish = document.getElementById("publish");
		publish.style.display = "block";
		
		var person = document.getElementById("person");
		person.style.display = "none";
   }
   else{
   		document.getElementById("sort").className="name_btn";
   		
   		var publish = document.getElementById("publish");
		publish.style.display = "none";
		
		var person = document.getElementById("person");
		person.style.display = "block";
   	}
}

function getSavedPath(){
	var keyWords = $("#ss").val();
	keyWords = encodeURIComponent(encodeURI(keyWords));
	var showFlag=document.getElementById("btnShowFlag").value;
	var refreshPath=requestContextPath+"/project/Project_home.do?module=Project";
	var trimValue=keyWords.trim();
	/*var sorterData=$("#sorterComboBox").combobox("getData");
	var sorter="";
	for(var i=0;i<sorterData.length;i++){
		if(sorterData[i].selected){
			sorter=sorterData[i].id;
		}
	}
	var sorterValue=sorter.trim();*/
	if(showFlag!=""){
		refreshPath+="&navproject="+showFlag;
	}
	if(keyWords.trim()!=""){
		refreshPath+="&keyWords="+trimValue;
	}
	/*if(sorterValue.trim()!=""){
		refreshPath+="&sorter="+"";
	}*/
	refreshPath+="&sorter="+"";
	return refreshPath;
}

function enableProChecked(flag){
//	if(!validPro(32768)){
//		return;
//	}
	var auditCheckBox = document.getElementsByName("auditCheckBox");
	var checkedPrj="";
	if(auditCheckBox.length<1){
		$.messager.alert('错误', '没有需要审核的节目！', 'info');
		return;
	}
	for (var i = 0; i < auditCheckBox.length; ++i) {
		if (auditCheckBox[i].checked) {
			if(checkedPrj==""){
				checkedPrj+=auditCheckBox[i].value;
			}
			else{
				checkedPrj+=("|"+auditCheckBox[i].value);
			}
		}
	}
	if(checkedPrj==""){
		$.messager.alert('错误', '请选择需要审核的节目！！', 'info');

		return;
	}
	
	var checkUrl=requestContextPath+"/project/ProjectProgram_audit.do?auditFlag="+flag;
	$.ajax({
		type : "GET",
		cache : false,
		url : checkUrl,
		async:false,
		data : {
			checkedPrj : checkedPrj
		},
		beforeSend: function(){
			//$('#idAuditProgressbar').dialog('open');
	    },
	    complete: function(){
	    	$('#idAuditProgressbar').dialog('close');
	    },
		success : function(data) {
			if(data=="success"){
				var keyWords = $("#ss").val();
				keyWords = encodeURIComponent(encodeURI(keyWords));
				var showFlag=document.getElementById("btnShowFlag").value;
				var refreshPath=requestContextPath+"/project/Project_home.do?module=Project";
				var trimValue=keyWords.trim();
//				var sorterData=$("#sorterComboBox").combobox("getData");
//				var sorter="";
//				for(var i=0;i<sorterData.length;i++){
//					if(sorterData[i].selected){
//						sorter=sorterData[i].id;
//					}
//				}
//				var sorterValue=sorter.trim();
				if(showFlag!=""){
					refreshPath+="&navproject="+showFlag;
				}
				if(keyWords.trim()!=""){
					refreshPath+="&keyWords="+trimValue;
				}
//				if(sorterValue.trim()!=""){
//					refreshPath+="&sorter="+sorterValue;
//				}
//				refreshPath+="&sorter="+"";
				if(flag=="enable"){
					$.messager.alert('提示', '节目审核通过!', 'info',function(){
						window.location.href=refreshPath;
					});
				}else if (flag=="disable"){
					$.messager.alert('提示', '节目审核未通过!', 'info',function(){
						window.location.href=refreshPath;
					});
				}
			}
			else if(data=="block"){
				$.messager.alert('错误', '节目状态已经被改变，请重新确认节目状态!', 'error');
			}else{
				$.messager.alert('错误', '节目审核操作失败!', 'error');
			}
		},
		error : function() {
			$.messager.alert('错误', '节目审核操作失败!', 'error');
		}
	});
}
UUID.prototype.valueOf = function(){ return this.id; };
UUID.prototype.toString = function(){ return this.id; };
UUID.prototype.createUUID = function(){ 
 var dg = new Date(1582, 10, 15, 0, 0, 0, 0);
 var dc = new Date();
 var t = dc.getTime() - dg.getTime();
 var tl = UUID.getIntegerBits(t,0,31);
 var tm = UUID.getIntegerBits(t,32,47);
 var thv = UUID.getIntegerBits(t,48,59) + '1'; // version 1, security version is 2
 var csar = UUID.getIntegerBits(UUID.rand(4095),0,7);
 var csl = UUID.getIntegerBits(UUID.rand(4095),0,7);
 var n = UUID.getIntegerBits(UUID.rand(8191),0,7) +
         UUID.getIntegerBits(UUID.rand(8191),8,15) +
         UUID.getIntegerBits(UUID.rand(8191),0,7) +
         UUID.getIntegerBits(UUID.rand(8191),8,15) +
         UUID.getIntegerBits(UUID.rand(8191),0,15); // this last number is two octets long
 return tl + tm  + thv  + csar + csl + n;
};
UUID.getIntegerBits = function(val,start,end){
var base16 = UUID.returnBase(val,16);
var quadArray = new Array();
var quadString = '';
var i = 0;
for(i=0;i<base16.length;i++){
  quadArray.push(base16.substring(i,i+1));   
}
for(i=Math.floor(start/4);i<=Math.floor(end/4);i++){
  if(!quadArray[i] || quadArray[i] == '') quadString += '0';
  else quadString += quadArray[i];
}
return quadString;
};
UUID.returnBase = function(number, base){
return (number).toString(base).toUpperCase();
};

UUID.rand = function(max){
return Math.floor(Math.random() * (max + 1));
};
function getuuid(){
	return UUID.prototype.createUUID();
}


function UUID(){
 this.id = this.createUUID();
}

function beginquery(){
	console.info("in query ...");
	var url=requestContextPath+"/project/Project_queryState.do";
	$.ajax({
		type : "GET",
		cache : false,
		url : url,
		async:false,
		data:{
			uuid:uuid
		},
	    complete: function(){
	    },
		success : function(data) {
			if(data.indexOf("finish")>-1){
				var datas = data.split("finish_");
				sucmsg(datas[1],prn);
				var index=$("#exportIndex").val();
				window.clearInterval(index);//*************
				controlFlag(uuid,"remove");
		}
			else{
			}
		},
		error : function() {
			$.messager.alert('错误', '程序进行出现错误', 'error');
		}
	});
}
//str:uuid
//str2:flag
function controlFlag(str,str2){
	var url=requestContextPath+"/project/Project_controlState.do";
	$.ajax({
		type : "GET",
		cache : false,
		url : url,
		async:false,
		data:{
			uuid:str,
			flag:str2
		},
		success : function(data) {
			
		}
	});
}