var dg;
var sortsign= 'asc';
var searchFlag=false;
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

$(function() {
	listCurriculum();					//add by haoyc 20160401 课程表页面偶尔没有数据
	$("#file_upload").uploadify({
		'buttonText' : 'BROWSE...',
		'auto'     : false,
		'multi'    : false,//单个文件上传
		'fileTypeDesc' : '请选择后缀为xls文件',
		'fileTypeExts' : '*.xls',
		'fileObjName' : 'file',
		'removeCompleted' :true, //上传成功后是否自动消失
		'formData' : {'sessionid':$("#sessionid").val()},//解决火狐浏览器session问题
		//   'checkExisting' :requestContextPath+'/curriculum/Curriculum_verifyOneOnly.do',
		//'fileTypeDesc' : 'Any old file you want...',
		'swf'        : requestContextPath+'/js/modules/curriculum/uploadify/uploadify.swf',
		'uploader' : requestContextPath+'/curriculum/CurriculumUploadAndDownload_verifyOneOnly.do;jsessionid=${request.getSession().getid()}',
		//'uploader' : requestContextPath+'/curriculum/CurriculumUploadAndDownload_verifyOneOnly.do;jsessionid='+$("#sessionid").val(),
		'onUploadSuccess' : function(file,data,response) {
			/*        	if(data==0){
			 setTimeout("importSuccess();",2000);
			 }else if(data==2){
			 $.messager.alert("失败","课程表格式有误，请检查","error");
			 } else if(data==1){
			 $.messager.confirm("提示",data+"已经存在确定覆盖原有课表吗",function(r){
			 if(r){
			 $.ajax({
			 url : '${pageContext.request.contextPath }/curriculum/CurriculumUploadAndDownload_saveCurriculum.do',
			 type : 'POST',
			 data : {

			 },
			 dataType : 'json',
			 success : function(result) {
			 var json=('('+result+')');
			 if(json){
			 $.messager.alert("成功","课程表导入成功","info");
			 closeWindow2();
			 listCurriculum();

			 }else{
			 $.messager.alert("失败","课程表导入失败","info");
			 }
			 }

			 });
			 }else{
			 closeWindow2();
			 listCurriculum();
			 }
			 });
			 }*/
			var json = eval("(" + data + ")");
			var flag=json.flag;
			if(flag=="0"){
				setTimeout("importSuccess();",2000);
			}else if(flag=="1"){
				$.messager.confirm("提示",json.snames+"已经存在确定覆盖原有课表吗",function(r){
					if(r){
						$.ajax({
							url : '${pageContext.request.contextPath }/curriculum/CurriculumUploadAndDownload_saveCurriculum.do',
							type : 'POST',
							data : {

							},
							dataType : 'json',
							success : function(result) {
								var json=('('+result+')');
								if(json){
									$.messager.alert("成功","课程表导入成功","info");
									closeWindow2();
									listCurriculum();

								}else{
									$.messager.alert("失败","课程表导入失败","info");
								}
							}

						});
					}else{
						closeWindow2();
						listCurriculum();
					}
				});
			}else{
				$.messager.alert("失败","课程表格式有误，请检查","error");
			}
		}



	});
});
function importSuccess(){
	 $.messager.alert("成功","课程表导入成功","info");
	 closeWindow2();
	 listCurriculum();
}
//查询列表
function listCurriculum() {
	dg = $('#dataGrid');
	$('#curriculumList').show();
	dg.datagrid({
				border : false,
				fitColum : true,
				fit : true,
				nowarp : true,
				sortName : 'curriculumname',
				sortOrder : 'asc',
				remoteSort:true,
				pageSize : 10,
				checkOnSelect : true,
				selectOnCheck : true,
				striped : true,
				onBeforeLoad : function(param){			
					dg.datagrid('clearSelections');
					dg.datagrid('clearChecked');
				},
				rownumbers : true,
				pagination : false,
				singleSelect : false,
				pageList : [ 10, 20, 30, 40 ],
				iconCls : 'icon-save',
				url : '/ManagementCenter/curriculum/Curriculum_listAllCurriculums.do',
				idField : 'id',
				pagePosition : 'bottom',
				onLoadSuccess : function(d){
					var size = dg.datagrid('getRows').length;
					if(!searchFlag){//搜索
						if(size==0){
							$("#curriculumList").attr("style","display:none");
							$("#emptyc").attr("style","display:none");
						}else{
							$("#curriculumList").attr("style","height:100%");
							$("#emptyc").attr("style","display:none");
						}
					}else{	
						searchFlag=false;			
						if(size==0){
							$("#curriculumList").attr("style","display:none");
							$("#emptyc").attr("style","");
						}else{
							$("#curriculumList").attr("style","height:100%");
							$("#emptyc").attr("style","display:none");
						}
					}
				},
				frozenColumns : [ [ {
					field : 'id',
					title : '编号',
					width : 100,
					checkbox : true
				}] ],
				columns : [ [ {
					field : 'curriculumname',
					title : '课程表名称',
					width : 300	,
					sortable:true
					
			//		formatter: function(value,row,index){
			//			value= '<a  ondblclick="queryCurriculum();">'+value+"</a>";
			//			return value;
			//		}
				}, {
					field : 'lastoperater',
					title : '创建人',
					/*sortable:true,*/
					width : 233
				}, {
					title : '创建时间',
					field : 'lastoperatortime',
					width : 300,
					/*sortable:true,*/
					hidden : false
					
				} ] ]
			});
}
//查询某一条Curriculum信息
function queryCurriculum(){
	var rows = dg.datagrid('getSelections');
	var num=rows.length;
	if (num == 0) {
		$.messager.alert('提示', '请选择一条记录进行操作!', 'info');
		return;
	} else if (num >1) {
		$.messager.alert('提示','您选择了多条记录,只能选择一条记录进行修改!', 'info');
		return;
	}
	 var id=rows[0].id;
	//切换div
	changeDiv();
	//更改title显示
	$(".master-header-span").append(">编辑课程表");
	/*disabletable();*/
	//给table赋值
	$.ajax({
		url : '${pageContext.request.contextPath }/curriculum/Curriculum_queryInfo.do',
		type : 'POST',
		data : {
			idstr : id
		},
		dataType : 'json',
		success : function(result) {
		//	var jsonStr=eval("(" + result + ")");
			if (result=="") {
				$.messager.alert('错误', '课表内容为空', 'error');
			} else {
				fillTable(result);
				/*disabletable();*/
				document.getElementById("saveButton").onclick=function(){saveEdit();};			
			}
		}
	});
}
//保存修改
function saveEdit(){
	var rows = dg.datagrid('getSelections');
	var id=rows[0].id;
//update by haoyc 20160310 课程表上下课时间校验 begin
	//下课时间晚于上课时间返回2
	//上课时间存在、下课时间不存在/上课时间不存在、下课时间存在返回3
	//下节上课时间早于上节下课时间返回4
	//时间设置正常返回1
	var flag=getflag();
	if(flag==2){
		//alert("下课时间应晚于上课时间！");
		$.messager.alert('提示','下课时间应晚于上课时间！','info');
		return false;
	}else if(flag==3){
		//alert("上课时间或下课时间不存在！");
		$.messager.alert('提示','上课时间或下课时间不存在！','info');
		return false;
	}else if(flag==4){
		//alert("下节上课时间应晚于上节下课时间！");
		$.messager.alert('提示','下节上课时间应晚于上节下课时间！','info');
		return false;
	}
	//update by haoyc 20160310 课程表上下课时间校验 end
	
	var jsonStr="{";
	for(var i=1;i<=20;i++){
		var id1="a"+i;						
		var id2="b"+i;
		var id3="c"+i;
		var id4="d"+i;
		var id5="e"+i;
		var id6="f"+i;
		var id7="g"+i;
		var id8="h"+i;
		var id9="i"+i;
		jsonStr=jsonStr+id1+':"'+(($("#"+id1).val()+"-"+$("#"+id9).val())=="-"?"":($("#"+id1).val()+"-"+$("#"+id9).val()))+'",';
		jsonStr=jsonStr+id2+':"'+$("#"+id2).val()+'",';
		jsonStr=jsonStr+id3+':"'+$("#"+id3).val()+'",';
		jsonStr=jsonStr+id4+':"'+$("#"+id4).val()+'",';
		jsonStr=jsonStr+id5+':"'+$("#"+id5).val()+'",';
		jsonStr=jsonStr+id6+':"'+$("#"+id6).val()+'",';
		jsonStr=jsonStr+id7+':"'+$("#"+id7).val()+'",';
		jsonStr=jsonStr+id8+':"'+$("#"+id8).val()+'",';
	}
	var strLength=jsonStr.length;
	jsonStr=jsonStr.substring(0, strLength-1);
	jsonStr=jsonStr+"}";
	$.ajax({
		url:'${pageContext.request.contextPath}/curriculum/Curriculum_saveEdit.do',
		type:'POST',
		data:{
			curriculumInfo : jsonStr,
			id:id
		},
		dataType:'json',
		success:function(result){
			var json=eval('('+result+')');
			if (json) {
				$.messager.alert('成功', '修改成功', 'info');
				clearTable();
				back();
				document.getElementById("saveButton").onclick=function(){save();};	
				dg.datagrid('clearSelections');
			} else {
				$.messager.alert('错误', '修改失败', 'error');
				clearTable();
				back();
				dg.datagrid('clearSelections');
			}
		}
	});
}
//删除方法
function del() {
	var ids = [];
	var rows = dg.datagrid('getSelections');
	for ( var i = 0; i < rows.length; i++) {
		ids.push(rows[i].id);
	}
	var arr = ids.join(',');
	if (arr.length > 0) {
		$.messager.confirm('提示信息', '您确认要删除吗?', function(data) {
			if (data) {
				$.ajax({
					url : '${pageContext.request.contextPath }/curriculum/Curriculum_delete.do',
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

function doSearch(value){
	var keyWordStr=value;
	dg.datagrid('load', { "keyWord": keyWordStr});
	var size = dg.datagrid('getRows').length;
	searchFlag=false;
	if(keyWordStr!=""){		
		searchFlag=true;
	}
}

//清空table的字段
function clearTable(){
	for(var i=1;i<=20;i++){
		var id1="a"+i;						
		var id2="b"+i;
		var id3="c"+i;
		var id4="d"+i;
		var id5="e"+i;
		var id6="f"+i;
		var id7="g"+i;
		var id8="h"+i;
		var id9="i"+i;
	    $("#"+id1).val("");
	    $("#"+id2).val("");
	    $("#"+id3).val("");
	    $("#"+id4).val("");
	    $("#"+id5).val("");
	    $("#"+id6).val("");
	    $("#"+id7).val("");
	    $("#"+id8).val("");	
	    $("#"+id9).val("");
	}
}
//切换到新增界面
function addCurriculum(){
	//更改title显示
	$(".master-header-span").append(">新增课程表");
	changeDiv();
}

//切换到新增页面
function changeDiv(){

	
	document.getElementById("curriculumList").style.display="none";
/*隐藏主工具条*/

	document.getElementById("add").style.display="none";
	document.getElementById("import").style.display="none";
	document.getElementById("edt").style.display="none";
	document.getElementById("update").style.display="none";
	document.getElementById("delete").style.display="none";
	document.getElementById("download").style.display="none";
	/*document.getElementById("ss").style.display="none";*/
	$(".searchbox").remove();
/*	document.getElementById("listCurriculum").style.display="none";*/	

	
/*显示编辑工具条*/	
	document.getElementById("backButton").style.display="block";
	document.getElementById("saveButton").style.display="block";
/*  document.getElementById("addCurriculum").style.display="block";*/
	
	document.getElementById("editWindow").style.display="block";
	clearTable();
	enabletable();
	document.getElementById("saveButton").onclick=function(){nameWindow();};
}
//跳转课程表名称页面
function nameWindow(){
	//update by haoyc 20160310 课程表上下课时间校验 begin
	var flag=getflag();
	if(flag==2){
		//alert("下课时间应晚于上课时间！");
		$.messager.alert('提示','下课时间应晚于上课时间！','info');
		return false;
	}else if(flag==3){
		//alert("上课时间或下课时间不存在！");
		$.messager.alert('提示','上课时间或下课时间不存在！','info');
		return false;
	}else if(flag==4){
		//alert("下节上课时间应晚于上节下课时间！");
		$.messager.alert('提示','下节上课时间应晚于上节下课时间！','info');
		return false;
	}
	//update by haoyc 20160310 课程表上下课时间校验 end
	$("#dd").dialog('open');
}
function closeWindow(){
	$("#dd").dialog('close');
}
function closeWindow2(){
	$("#dd2").dialog('close');
}
function closeUpload(){
	location.reload();
}
//新增时，如果没有重名，则保存
function save(){
	var nameStr=document.getElementById("curriculumId").value;
	if(nameStr==""){
		//alert("课表名称不能为空");
		$.messager.alert('提示','课表名称不能为空','info');
		return;
	}
	if(nameStr.length>50){
		//alert("课表名称长度不能超过50");
		//add by haoyc 课程表名称不能超过50个字 begin
		$.messager.alert('提示','名称不能超过50个字','info');
		//add by haoyc 课程表名称不能超过50个字 end
		return;
	}
		
	var flag=0;
	$.ajax({
		url : '${pageContext.request.contextPath }/curriculum/Curriculum_queryName.do',
		type : 'POST',
		async: false,
		data : {
			curriculumName:nameStr
		},
		dataType : 'json',
		success : function(result) {
			var json = eval("(" + result + ")");
			if(json){
				flag=1;
			}else{			
				$.messager.alert('失败', '名称已经存在，请更改名称或删除原有记录！', 'info');
				flag=0;
			}
			
		}
	});
	var jsonStr="{";
	for(var i=1;i<=20;i++){
		var id1="a"+i;						
		var id2="b"+i;
		var id3="c"+i;
		var id4="d"+i;
		var id5="e"+i;
		var id6="f"+i;
		var id7="g"+i;
		var id8="h"+i;
		var id9="i"+i;
		jsonStr=jsonStr+id1+':"'+(($("#"+id1).val()+"-"+$("#"+id9).val())=="-"?"":($("#"+id1).val()+"-"+$("#"+id9).val()))+'",';
		jsonStr=jsonStr+id2+':"'+$("#"+id2).val()+'",';
		jsonStr=jsonStr+id3+':"'+$("#"+id3).val()+'",';
		jsonStr=jsonStr+id4+':"'+$("#"+id4).val()+'",';
		jsonStr=jsonStr+id5+':"'+$("#"+id5).val()+'",';
		jsonStr=jsonStr+id6+':"'+$("#"+id6).val()+'",';
		jsonStr=jsonStr+id7+':"'+$("#"+id7).val()+'",';
		jsonStr=jsonStr+id8+':"'+$("#"+id8).val()+'",';
	}
	var strLength=jsonStr.length;
	jsonStr=jsonStr.substring(0, strLength-1);
	jsonStr=jsonStr+"}";
	if(flag==1){
	$.ajax({
		url : '${pageContext.request.contextPath }/curriculum/Curriculum_add.do',
		type : 'POST',
		data : {
			curriculumInfo : jsonStr,
			curriculumName:nameStr
		},
		dataType : 'json',
		success : function(result) {
			var json = eval("(" + result + ")");
			if(json){
				$("#dd").dialog('close');
				$.messager.alert('成功', '新增成功', 'info');
				back();
				clearTable();
				$("#curriculumId").val("");
			}else{
				$("#dd").dialog('close');
				back();
				clearTable();
				$("#curriculumId").val("");
			}
			
		}
	});
 }
}
//返回按钮
function back(){
	window.location.reload();
}
//给table赋值
function fillTable(jsonStr){
	var obj = eval("("+jsonStr+")");
	for(var i=1;i<=20;i++){
		var id1="a"+i;		
		var id2="b"+i;
		var id3="c"+i;
		var id4="d"+i;
		var id5="e"+i;
		var id6="f"+i;
		var id7="g"+i;
		var id8="h"+i;
		var id9="i"+i;
	    $("#"+id1).val(obj[id1].split("-")[0]);
	    $("#"+id2).val(obj[id2]);
	    $("#"+id3).val(obj[id3]);
	    $("#"+id4).val(obj[id4]);
	    $("#"+id5).val(obj[id5]);
	    $("#"+id6).val(obj[id6]);
	    $("#"+id7).val(obj[id7]);
	    $("#"+id8).val(obj[id8]);	
	    $("#"+id9).val(obj[id1].split("-")[1]);
}
}
//设置table不可编辑
function disabletable(){
	for(var i=1;i<=20;i++){
/*		var id1="a"+i;*/		
		var id2="b"+i;
		var id3="c"+i;
		var id4="d"+i;
		var id5="e"+i;
		var id6="f"+i;
		var id7="g"+i;
		var id8="h"+i;
/*	    $("#"+id1).attr("readonly",true);*/
	    $("#"+id2).attr("readonly",true);
	    $("#"+id3).attr("readonly",true);
	    $("#"+id4).attr("readonly",true);
	    $("#"+id5).attr("readonly",true);
	    $("#"+id6).attr("readonly",true);
	    $("#"+id7).attr("readonly",true);
	    $("#"+id8).attr("readonly",true);
	   /* $("#"+id9).attr("readonly",true);*/
}
}
//设置table可编辑
function enabletable(){
	for(var i=1;i<=20;i++){
		var id1="a"+i;		
		var id2="b"+i;
		var id3="c"+i;
		var id4="d"+i;
		var id5="e"+i;
		var id6="f"+i;
		var id7="g"+i;
		var id8="h"+i;
		var id9="i"+i;
	    $("#"+id1).attr("readonly",false);
	    $("#"+id2).attr("readonly",false);
	    $("#"+id3).attr("readonly",false);
	    $("#"+id4).attr("readonly",false);
	    $("#"+id5).attr("readonly",false);
	    $("#"+id6).attr("readonly",false);
	    $("#"+id7).attr("readonly",false);
	    $("#"+id8).attr("readonly",false);
	    $("#"+id9).attr("readonly",false);
}
}





//导出课程表模板
function download(){
	window.location.href=requestContextPath+"/data/curriculum/template.xls";
}
//打开导入课程表页面
function openupload(){
	var fc=flashChecker();
	if(fc.f){
	}else{
		//alert('插件未安装');
		$.messager.alert('提示','插件未安装','info');
		return;
	}
	$("#dd2").dialog('open');

}
function checkFile(){
	var filename=$("#excel").val();
	if(filename==""){
		$.messager.alert('错误', '请选择文件', 'error');
		return false;
	}else{
		if(filename.lastIndexOf(".")!=-1){
			var filetype=(filename.substring(filename.lastIndexOf(".")+1,filename.length)).toLowerCase();
			if(filetype!="xls"){
				$.messager.alert('错误', '上传文件只支持xls格式！', 'error');
				return false;
			}else{
				timedMsg();
				return true;
			}
		}else{
			$.messager.alert('错误', '上传文件只支持xls格式！', 'error');
			return false;
		}
	}
	
	
}

function timedMsg()
{
	var t=setTimeout('$("#dd2").dialog("close")',1000);

}
function updateName(){
	var rows = dg.datagrid('getSelections');
	var num=rows.length;
	if (num == 0) {
		$.messager.alert('提示', '请选择一条记录进行操作!', 'info');
		return;
	} else if (num >1) {
		$.messager.alert('提示','您选择了多条记录,只能选择一条记录进行修改!', 'info');
		return;
	}
	$("#dd3").dialog('open');
	var curriculumName=$("#curriculumName").val();
//	 $("#renameFormCu").form('clear');
	$.ajax({
		type: "GET",
		cache: false,
		url : '/ManagementCenter/curriculum/Curriculum_findCurriculumByIdBeforRename.do',
		data:{
			id:rows[0].id
		},
		success : function(data) {
			var json = eval("(" + data + ")");
			if(json!=null){
				$("#renameFormCu").form('load',{
					id:json.id,
					curriculumName:json.curriculumname
				});
			}
		}
	});
//	$('#dd3').dialog('open');
//	var curriculumName=$("#curriculumName").val();

}

function saveName(){
	var curriculumName=document.getElementById("curriculumName").value;
	var cc=$("#curriculumName").val().trim();
	if(cc==""){
		$.messager.alert("提示","课程表名称不能为空","error");
		return;
	}
	//add by haoyc 课程表名称不能超过50个字 begin
	if(curriculumName.length>50){
		$.messager.alert('提示','名称不能超过50个字','info');
		return false;
	}
	//add by haoyc 课程表名称不能超过50个字 end
	$.ajax({
		url:'${pageContext.request.contextPath}/curriculum/Curriculum_queryName.do',
		type:'POST',
		data:{
			curriculumName : curriculumName
		},
		dataType:'json',
		success:function(result){
			var json=eval('('+result+')');
			if (json) {
				saveAfterQuery();
				dg.datagrid('clearSelections');
				document.getElementById("curriculumName").value="";
			} else {
				$.messager.alert('提示','名称已经存在，请重新输入','info');
				//document.getElementById("curriculumName").value="";
			}
		}
	});

	
}
function saveAfterQuery(){
	var rows = dg.datagrid('getSelections');
	var curriculumName=$("#curriculumName").val();
	$.ajax({
		url:'${pageContext.request.contextPath}/curriculum/Curriculum_saveName.do',
		type:'POST',
		data:{
			curriculumName : curriculumName,
			id:rows[0].id
		},
		dataType:'json',
		success:function(result){
			var json=eval('('+result+')');
			if (json) {
				$.messager.alert('提示','更改成功','info');
				$("#curriculumName").val("");
				$("#dd3").dialog('close');
				listCurriculum();
				dg.datagrid('clearSelections');
			} else {
				$.messager.alert('提示','更改失败','info');
				$("#dd3").dialog('close');
				dg.datagrid('clearSelections');
			}
		}
	});
}
function closeWindowName(){
	$("#dd3").dialog('close');
	$("#curriculumName").val("");
	dg.datagrid('clearSelections');

}



//判断flash空间是否安装
function flashChecker() {
	var hasFlash = 0;
	var flashVersion = 0

	if (document.all) {
		var swf = new ActiveXObject('ShockwaveFlash.ShockwaveFlash');
		if (swf) {
			hasFlash = 1;
			VSwf = swf.GetVariable("$version");
			flashVersion = parseInt(VSwf.split(" ")[1].split(",")[0]);
		}
	} else {
		if (navigator.plugins && navigator.plugins.length > 0) {
			var swf = navigator.plugins["Shockwave Flash"];
			if (swf) {
				hasFlash = 1;
				var words = swf.description.split(" ");
				for ( var i = 0; i < words.length; ++i) {
					if (isNaN(parseInt(words[i])))
						continue;
					flashVersion = parseInt(words[i]);
				}
			}
		}
	}
	return {
		f : hasFlash,
		v : flashVersion
	};
}
var getflag=function checktime(){
	//add by haoyc 20160310 课程表上下课时间校验 begin
	//下课时间晚于上课时间返回2
	//上课时间存在、下课时间不存在/上课时间不存在、下课时间存在返回3
	//下节上课时间早于上节下课时间返回4
	//时间设置正常返回1
	var begintime;
	var endtime;
	var endtime2="";//上节下课时间
	for(var i=1;i<=20;i++){
		var id1="a"+i;		//上课时间
		var id9="i"+i;		//下课时间
		begintime="2016/03/10 "+$("#"+id1).val()+":00";
		endtime="2016/03/10 "+$("#"+id9).val()+":00";
		if($("#"+id1).val()!="" && $("#"+id9).val()!=""){
			if(!(Date.parse(begintime)<Date.parse(endtime))){
				return 2;
			}
			if(endtime2!=""){
				if(!(Date.parse(begintime)>Date.parse(endtime2))){
					return 4;
				}
			}
			endtime2="2016/03/10 "+$("#"+id9).val()+":00";
			
		}else if($("#"+id1).val()=="" && $("#"+id9).val()==""){

		}else{
			 return 3;
		}
	}
	return 1;
	//add by haoyc 20160310 课程表上下课时间校验 end
}
$(document).ready(function(){
	listCurriculum();
});
