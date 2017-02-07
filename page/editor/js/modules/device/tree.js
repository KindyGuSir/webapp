var curMenu = null, zTree_Menu = null;
var urlStrOption = '';
var setting = {
		view: {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			showLine: false,
			showIcon: false,
			selectedMulti: false,
			dblClickExpand: false,
			addDiyDom: addDiyDom,
			expandSpeed : "normal"
		},
		edit: {
			enable: true,
			editNameSelectAll: true,
			showRemoveBtn: showRemoveBtn,
			showRenameBtn: showRenameBtn
		},
		async: {
		    contentType : "application/json",
		    enable : true,
		    dataType : "json",
		    type : "post",
		    url : "/ManagementCenter/device/DeviceGroup_getGroupsTree.do",
		    dataFilter: ajaxDataFilter
		    },
		data: {
			key:{
				name:"text"
			},
			simpleData: {
				enable: true,
				idKey:'id',
				pIdKey:'pid',
				rootPId:1
			}

		},
		callback: {
			beforeClick: beforeClick,
			beforeDrag: beforeDrag,
			beforeEditName: beforeEditName,
			beforeRemove: beforeRemove,
			beforeRename: beforeRename,
			onRemove: onRemove,
			onRename: onRename,
			onClick: zTreeOnClick,
			onAsyncSuccess: zTreeOnAsyncSuccess
		}
	};

	var firstAsyncSuccessFlag = 0;
	function zTreeOnAsyncSuccess(event, treeId, msg) {
			var firstgroup=getfirstgroup();
			var treeObj =  $.fn.zTree.getZTreeObj("treeDemo");
			var node = treeObj.getNodeByParam("id",firstgroup,null);
			treeObj.selectNode(node);
			listDevice("id",firstgroup,"");
			// 根目录下的节目列表
			if(firstgroup!=1){
				document.getElementById("treeDemo_1_a").style.display ="none";
			}
	}

	function beforeExpand (){

	}

	var log, className = "dark";
	function beforeDrag(treeId, treeNodes) {
		return false;
	}
	function zTreeOnClick(event, treeId, treeNode) {
		if(treeNode.id!=null&&!treeNode.id==""){
			listDevice("id",treeNode.id,treeNode.text);
		}else{
			listDevice("deviceId",treeNode.deviceId,treeNode.text);
		}
	}
	function dblClickExpand(treeId, treeNode) {
			return treeNode.level > 1;
	}
	function beforeEditName(treeId, treeNode) {
		className = (className === "dark" ? "":"dark");
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.selectNode(treeNode);
		return true;
	}
	function beforeRemove(treeId, treeNode) {
		className = (className === "dark" ? "":"dark");
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.selectNode(treeNode);
		return  confirm("确认删除 【设备组 : " + treeNode.text + "】 吗？");
	}
	function onRemove(e, treeId, treeNode) {
		urlStrOption='/ManagementCenter/device/DeviceGroup_del.do';
		var params="text="+treeNode.text+"&id="+treeNode.id+"&pid="+treeNode.pid;
		zTreeOption(urlStrOption,params,'delete');
		// add by caoqian 2016/5/4 设备左侧树形分组删除后，刷新页面
		//var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		//zTree.reAsyncChildNodes(null, "refresh");
		location.reload();
	}
	function beforeRename(treeId, treeNode, newName, isCancel) {
		if(newName.indexOf("\&")!=-1||newName.indexOf("\%")!=-1||newName.indexOf("\?")!=-1||newName.indexOf("\？")!=-1){
			//||newName.indexOf("\。")!=-1||newName.indexOf("\，")!=-1||newName.indexOf("\.")!=-1||newName.indexOf("\,")!=-1
			alert("节点名称不能包含& % ?");
			return false;
		}
		className = (className === "dark" ? "":"dark");
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		if (newName.length == 0) {
			alert("节点名称不能为空.");
			setTimeout(function(){zTree.editName(treeNode)}, 10);
			return false;
		}else{
			return true;
		}
	};

	function ajaxDataFilter(treeId, parentNode, responseData) {
		 if (responseData) {
		      for(var i =0; i < responseData.length; i++) {
			  	if(responseData[i].id==responseData[i].pid)
		        responseData[i].open=true;
		      }
	   	}
	    return responseData;
	};
	function onRename(e, treeId, treeNode, isCancel) {
	  urlStrOption='/ManagementCenter/device/DeviceGroup_update.do';
	  var params="text="+treeNode.text+"&id="+treeNode.id+"&pid="+treeNode.pid;
	  zTreeOption(urlStrOption,params,'update');

	  $.fn.zTree.getZTreeObj("treeDemo").updateNode(treeNode);

	  // 节点修改名称后 刷新整棵树
	  var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	  zTree.reAsyncChildNodes(null, "refresh");
		return true;
	};
	function showRemoveBtn(treeId, treeNode) {
		// return !treeNode.isFirstNode;
		if(treeNode.id==2||treeNode.id==1){		// 2--->对应的未分组
			return false;
		}
		return true;
	};
	function showRenameBtn(treeId, treeNode) {
		// return !treeNode.isLastNode;
		if(treeNode.id==2||treeNode.id==1){		// 2--->对应的未分组
			return false;
		}
		return true;
	};
	var myid;
	function zTreeOption(doUrl, backParams,sign){
		var tempdata ;
		$.ajax({
			async: false,
			url: doUrl,
			type: 'post',
			dataType: 'json',
			data: backParams,
			success: function(data){
				tempdata = data;
				if(sign=='add'){
					myid = data; //myid 新增节点后 避免刷新使用
				}
			}
//			,error: function(XMLHttpRequest, textStatus, errorThrown){
//				alert(XMLHttpRequest.status);
//				alert(XMLHttpRequest.readyState);
//				alert(textStatus);
//			}
		});
		return tempdata;
		}
	function getTime() {
		var now= new Date(),
		h=now.getHours(),
		m=now.getMinutes(),
		s=now.getSeconds(),
		ms=now.getMilliseconds();
		return (h+":"+m+":"+s+ " " +ms);
	}

	function addHoverDom(treeId, treeNode) {
//		var newCount = Math.round(Math.random()*2000000000);
		//var sObj = $("#" + treeNode.tId + "_span");
		//var sObj = $("#diyBtn_" +treeNode.id);
		// update by lihuimin 所有设备后面只要新增按钮，编辑和删除都不要 begin

		if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0
				||$("#refreshBtn_"+treeNode.tId).length>0) return;

		var refreshStr = "<img id='refreshBtn_" + treeNode.tId
		+ "' title='刷新' class='alldevices-refresh' src='/ManagementCenter/images/device/reload.png'/>";
		if(treeNode.id==1){
			var addStr = "<span class='button addHeader' id='addBtn_" + treeNode.tId
			+ "' title='增加分组' onfocus='this.blur();'></span>";
			$("#diyBtn_1").after(addStr);
			$("#addBtn_" + treeNode.tId).after(refreshStr);
		}else if(treeNode.id!=1){
			var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
			+ "' title='增加分组' onfocus='this.blur();'></span>";
			var sObj = $("#" + treeNode.tId + "_edit");
			sObj.before(addStr);
		}
		// update by lihuimin 所有设备后面只要新增按钮，编辑和删除都不要  end
		var btn = $("#addBtn_"+treeNode.tId);
		if (btn) btn.bind("click", function(){
			urlStrOption="/ManagementCenter/device/DeviceGroup_add.do";
			var treeNodePid=treeNode.id;
			var treeNodeText='新建节点';
			var params="text="+treeNodeText+"&pid="+treeNodePid;
			zTreeOption(urlStrOption,params,'add');

			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.addNodes(treeNode, {id:myid, pid:treeNodePid, text:"新建节点"});
			//zTree.reAsyncChildNodes(null, "refresh");
			return true;
		});
		// update by lihuimin 所有设备后面另外新加一个刷新按钮，点击后刷新整棵树 begin
		var btnr = $("#refreshBtn_"+treeNode.tId);
		if (btnr) btnr.bind("click", function(){
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			zTree.reAsyncChildNodes(null, "refresh");
			return true;
		});
		// update by lihuimin 所有设备后面另外新加一个刷新按钮，点击后刷新整棵树 end
	};

	function removeHoverDom(treeId, treeNode) {
		var addStr = '';
		if(treeNode.id == 1){
			addStr = "<span class='button addHeader' id='addBtn_" + treeNode.tId
				+ "' title='增加分组' onfocus='this.blur();'></span>";
			$("#diyBtn_1").after(addStr);
		}
		else if(treeNode.id != 1){
			addStr = "<span class='button add' id='addBtn_" + treeNode.tId
			+ "' title='增加分组' onfocus='this.blur();'></span>";
		}
		var refreshStr = "<img id='refreshBtn_" + treeNode.tId
		+ "' title='刷新' class='alldevices-refresh' src='/ManagementCenter/images/device/reload.png'/>";
		$("#addBtn_" + treeNode.tId).after(refreshStr);

		$("#addBtn_"+treeNode.tId).unbind().remove();
		$("#refreshBtn_"+treeNode.tId).unbind().remove();
	};
	function selectAll() {
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.setting.edit.editNameSelectAll =  $("#selectAll").prop("checked");
	}
	function addDiyDom(treeId, treeNode) {

		var spaceWidth = 5;
		var switchObj = $("#" + treeNode.tId + "_switch"),
		icoObj = $("#" + treeNode.tId + "_ico");
		switchObj.remove();
		icoObj.before(switchObj);

		if (treeNode.level > 0) {/*width:" + (spaceWidth * treeNode.level)+ "px'  设备管理左侧树结构 的节点相互错位显示*/
			var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
			switchObj.before(spaceStr);
		}

		var sObj = $("#" + treeNode.tId + "_span");
		//var sObj = $("#" + treeNode.tId + "_edit");
		//if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;

		urlStrOption='/ManagementCenter/device/DeviceGroup_getDeviceCount.do';
	  	var params="text="+treeNode.text+"&id="+treeNode.id+"&pid="+treeNode.pid+"&type="+treeNode.type;
	 	var tempdata=zTreeOption(urlStrOption,params);

		var spantxt = sObj.html();
		if(spantxt.length>8){
			spantxt = trunc(spantxt,40,200);
			sObj.html(spantxt);
		}

		if(treeNode.type=='groupType'){
			var addStr='';
			if(treeNode.id == 1){
				addStr = "<span class='button addHeader' id='addBtn_" + treeNode.tId
				+ "' title='增加分组' onfocus='this.blur();'></span>";
			}else if(treeNode.id != 1){
				addStr = "<span class='button add' id='addBtn_" + treeNode.tId
				+ "' title='增加分组' onfocus='this.blur();'></span>";
			}

			var refreshStr = "<img id='refreshBtn_" + treeNode.tId
			+ "' title='刷新' class='alldevices-refresh' src='/ManagementCenter/images/device/reload.png'/>";

			var addStr;
			if(treeNode.id==1){
				addStr = "<span id='diyBtn_" +treeNode.id+ "'> / "+tempdata+"</span>";
			}else{
				addStr = "<span id='diyBtn_" +treeNode.id+ "'>("+tempdata+")</span>";
			}

			sObj.after(addStr);

			if(treeNode.id == 1){
				//$("#diyBtn_1").after(addStr);
				$("#addBtn_" + treeNode.tId).after(refreshStr);
				addHoverDom(treeId,treeNode);
			}
	}
}

	function getfirstgroup(){
		var firstgroup="";
		$.ajax({
			async: false,
			url:   "/ManagementCenter/device/DeviceGroup_getFirstGroup.do",
			type: 'post',
			dataType: 'json',
			success: function(data){
				firstgroup=data;
			},
			error:function(data){
			}
		});
		return parseInt(firstgroup);
	}

	function beforeClick(treeId, treeNode) {
//		if (treeNode.level == 0 ) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			//zTree.expandNode(treeNode);
//			return false;
//		}
		return true;
	}
	$(document).ready(function(){
		var treeObj = $("#treeDemo");
		$.fn.zTree.init(treeObj, setting);
		$("#selectAll").bind("click", selectAll);
		if (!treeObj.hasClass("showIcon")) {
			treeObj.addClass("showIcon");
		}
	});
