var dg;
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
	function changePic1(){
		$("#allsystem-pic").attr("class","master-menu-content-img-public2");	
		$("#allsystem-text").css({ "color": "#46af4b" });
	}
	function changePic11(){
		$("#allsystem-pic").attr("class","master-menu-content-img-public");
		$("#allsystem-text").css({ "color": "rgb(96,96,96)" });
	}
		function changePic2(){
		$("#myauthor-pic").attr("class","master-menu-content-img-myauthor2");
		$("#myauthor-text").css({ "color": "#46af4b" });
	}
	function changePic21(){
		$("#myauthor-pic").attr("class","master-menu-content-img-myauthor");
		$("#myauthor-text").css({ "color": "rgb(96,96,96)" });
	}
	function changePic3(){
		$("#downloadinfo-text").css({ "color": "#46af4b" });
	}
	function changePic31(){
		$("#downloadinfo-text").css({ "color": "rgb(96,96,96)" });
	}
	function baseSetting(){
		$("#settingsign").val('base');
	     $('#save').css("display","block");
	     $('#cancel').css("display","block");
	         $('#licensedownload').css("display","none");
	         $('#licenseupload').css("display","none");
	         $('#attendanceTimeSettingWindow').css("display","none");
	         $('#editWindow').css("display","block");
	         $('div.info').css("display","none");
	         $('div.authorinfo').css("display","none");
	         $('#infoList').css("display","none");
		$('#flag').val('1')	;//授权模块标识重置
		$("#dataflow").css("display","none");
		hideClassList();
	   };
	function downloadInfo(){
		 $('#save').css("display","none");
         $('#cancel').css("display","none");
	     $('#licensedownload').css("display","none");
	     $('#licenseupload').css("display","none");
         $('div#editWindow').css("display","none");
         $('div.authorinfo').css("display","none");
         $('#attendanceTimeSettingWindow').css("display","none");
         $('#infoList').css("display","block");
         $('div.info').css("display","none");
		$('#flag').val('1')	;//授权模块标识重置
		$('#infoList').css("display","block");
		$('div.info').css("display","none");
		$("#dataflow").css("display","none");
		hideClassList();
         listInfo();
	}
function systemAuthor(){
	/*授权部分改成授权码方式
	 $('#save').css("display","none");
	 $('#cancel').css("display","none");
	 $('#licensedownload').css("display","block");
	 $('#licenseupload').css("display","block");
	 * */
	$('#save').css("display","none");
	$('#cancel').css("display","none");
	$('#licensedownload').css("display","none");
	$('#licenseupload').css("display","none");
	$('div#editWindow').css("display","none");
	$('div.authorinfo').css("display","block");
	$('#attendanceTimeSettingWindow').css("display","none");
	$('div.info').css("display","block");
	$('#infoList').css("display","none");
	$('#flag').val('2');//授权标识
	$('#infoList').css("display","none");
	$("#dataflow").css("display","none");
	$('#div_registration').css("display","none");
	hideClassList();
	$.ajax({
		type: "POST",
		url: requestContextPath+"/system/System_obtainAuthorInfo.do",

		//在有效期内不显示授权码输入框
		success: function(data){
			var json = eval("(" + data + ")");
			if (json != null) {


				var validtime = json.validTime;

				var playercount = json.playerCount;

				$('div#time.validtime').html(validtime);

				$('div#count.playercount').html(playercount);
				if(validtime=="已经过期!"){
					$('#div_registration').css("display","block");
					$('#save').css("display","block");
				}else{
					$('#div_registration').css("display","none");
					$('#save').css("display","none");
				}
			}

		}
	});


};
	    
		//查询列表
	//---------update by weichao 20160406
function listInfo() {
	dg = $('#dataGrid');
	$('#infoList').show();
	dg.datagrid({
		border : false,							//addby weichao20160415
		fitColum : true,
		fit : true,								//addby weichao20160415
		nowarp : false,
		sortName : 'device',
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
		//pagination : false,
		pagination : true,                    //  update by weichao 20160222
		singleSelect : false,
		pageList : [ 10, 20, 30, 40 ],
		iconCls : 'icon-save',
		url : '/ManagementCenter/system/System_getInfoList.do',
		idField : 'id',
		pagePosition : 'bottom',
		onLoadSuccess : function(d){
			var size = dg.datagrid('getRows').length;
			/*		if(size==0){
			 $("#infoList").attr("style","display:none");
			 }else{
			 $("#infoList").attr("style","height:100%");
			 }*/

		},
		frozenColumns : [ [ {
			field : 'id',
			title : '编号',
			width : 100,
			hidden:true
		}] ],
		columns : [ [ {
			field : 'time',
			title : '上报时间',
			width : 200
		}, {
			field : 'device',
			title : '设备名称',
			width : 150,
			sortable : true
		},{
			field : 'url',
			title : '文件地址',
			width : 500,
			formatter : function(value, row, index) {
				return "<div style='word-break:break-all;word-wrap:break-word;'>"+value+"</div>";
			}
		} ,{
			title : '错误信息',
			field : 'info',
			width : 130,		//addby weichao20160415
			hidden : false,
			formatter : function(value, row, index) {
				return "<div style='word-break:break-all;word-wrap:break-word;'>"+value+"</div>";
			}
		} ] ]
	});
	//add by weichao 20160201---------------------------------------begin
	var p = $("#dataGrid").datagrid('getPager');
	$(p).pagination({
		//total : 17,
		pageNumber : 1,
		//	loading : true,
		beforePageText : '第',
		afterPageText : '页    共 {pages} 页',
		displayMsg : '当前显示第 {from} - {to} 条记录   共 {total} 条'
	});
//add by weichao 20160201---------------------------------------end
}
	function attendanceTimeSetting(){
		 $("#settingsign").val('attendance');
		 $('#save').css("display","block");
	     $('#cancel').css("display","block");
	     $('#licensedownload').css("display","none");
         $('#licenseupload').css("display","none");
         $('#editWindow').css("display","none");
         $('#attendanceTimeSettingWindow').css("display","block");
         $('div.info').css("display","none");
         $('div.authorinfo').css("display","none");
         $('#infoList').css("display","none");
		$("#dataflow").css("display","none");
		$('#flag').val('1')	;//授权模块标识重置
		hideClassList();
         $.ajax({
				url:'${pageContext.request.contextPath}/system/System_getattendancetime.do',
				type:'POST',
				dataType:'json',
				success:function(result){
					if(result != ""){
						$("#attendancetime").val(result);
					}
				}
			});
	}   
	function changePic4(){
		$("#attendancetimesetting-text").css({ "color": "#46af4b" });
	}
	function changePic41(){
		$("#attendancetimesetting-text").css({ "color": "rgb(96,96,96)" });
	}

function DataFlow(){
	$("#settingsign").val('attendance');
	$('#save').css("display","none");
	$('#cancel').css("display","none");
	$('#licensedownload').css("display","none");
	$('#licenseupload').css("display","none");
	$('#editWindow').css("display","none");
	$('#attendanceTimeSettingWindow').css("display","none");
	$('div.info').css("display","none");
	$('div.authorinfo').css("display","none");
	$('#infoList').css("display","none");
	$('#dataflow').css("display","block");
	$.post("${pageContext.request.contextPath}/system/DataFlowIntf_getIntfAddr.do",function(data){
		var intfUrl=data.msg;
		if(data.result=="success"&& intfUrl.length>0){
			$("#radio1").click();
		}
	},"json");
	$.post("${pageContext.request.contextPath}/system/DataFlowDtb_getDtb.do",function(data){
		var dtb=data.msg;
		if(data.result=="success"&&dtb.length>0){
			$("#radio2").click();
		}
	},"json");
	$("#dtb").css("display","none");
}
function changePic5(){
	$("#DataFlow-text").css({ "color": "#46af4b" });
}
function changePic51(){
	$("#DataFlow-text").css({ "color": "rgb(96,96,96)" });
}
//隐藏匹配班级
function hideClassList(){
	$("#system_line").css("display","none");
	$(".localclass").css("display","none");
}
//隐藏匹配班级