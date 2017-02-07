var curMenu = null, zTree_Menu = null;
var urlStrOption = '';
var setting = {
		view: {
			addHoverDom: addHoverDom,
			removeHoverDom: removeHoverDom,
			showLine: true,
			showIcon: false,
			selectedMulti: false,
			dblClickExpand: false,
			addDiyDom: addDiyDom,
			dblClickExpand: dblClickExpand
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
		    url : "/ManagementCenter/resource/ResourceFile_brown.do",
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
				rootPid:10
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
			onClick: zTreeOnClick
		}
	};

	var log, className = "dark";
	function beforeDrag(treeId, treeNodes) {
		return false;
	}
	function zTreeOnClick(event, treeId, treeNode) {
		if(treeNode.id!=null&&!treeNode.id==""){			
			listResource("id",treeNode.id);
		}
		else{
			listResource("deviceId",treeNode.deviceId);
		}
	}
	function dblClickExpand(treeId, treeNode) {
			return treeNode.level > 0;
	}
	function beforeEditName(treeId, treeNode) {
		className = (className === "dark" ? "":"dark");
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.selectNode(treeNode);
		return confirm("进入节点 -- " + treeNode.text + " 的编辑状态吗？");
	}
	function beforeRemove(treeId, treeNode) {
		className = (className === "dark" ? "":"dark");
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		zTree.selectNode(treeNode);
		return confirm("确认删除 节点 -- " + treeNode.text + " 吗？");
	}
	function onRemove(e, treeId, treeNode) {
		alert("删除节点--"+treeNode.text+"成功");
		urlStrOption='/ManagementCenter/device/DeviceGroup_del.do';
		var params="text="+treeNode.text+"&id="+treeNode.id+"&pid="+treeNode.pid;
		zTreeOption(urlStrOption,params);
	}
	function beforeRename(treeId, treeNode, newName, isCancel) {
		className = (className === "dark" ? "":"dark");
		var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		if (newName.length == 0) {
			alert("节点名称不能为空.");
			setTimeout(function(){zTree.editName(treeNode)}, 10);
			return false;
		}else{
			if(confirm("确认保存 节点 -- " + newName + " 吗？")){
				alert("保存成功");
				return true;
			}else{
			zTree.selectNode(treeNode);
			return false;
		}
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
	  zTreeOption(urlStrOption,params);
	};
	function showRemoveBtn(treeId, treeNode) {
		// return !treeNode.isFirstNode;
		if(treeNode.level!=0){			
			return true;
		}
		return false;
	};
	function showRenameBtn(treeId, treeNode) {
		// return !treeNode.isLastNode;
		if(treeNode.level!=0){			
			return true;
		}
		return false;
	};
	function zTreeOption(doUrl, backParams){
		var tempdata ;
		$.ajax({
			async: false,
			url: doUrl,
			type: 'post',
			dataType: 'json',
			data: backParams,
			success: function(data){
				tempdata = data;
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
		var newCount = Math.round(Math.random()*2000000000);
		//var sObj = $("#" + treeNode.tId + "_span");
		var sObj = $("#diyBtn_" +treeNode.id);
		if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
		var addStr = "<span class='button add' id='addBtn_" + treeNode.tId
			+ "' title='增加节点' onfocus='this.blur();'></span>";
		sObj.after(addStr);
		var btn = $("#addBtn_"+treeNode.tId);
		if (btn) btn.bind("click", function(){
			if(confirm("确认在节点--"+treeNode.treenodeName + "增加节点吗？")){
				urlStrOption="/ManagementCenter/device/DeviceGroup_add.do";
				var treeNodeId=newCount;
				var treeNodePid=treeNode.id;
				var treeNodeText='新建节点';
				var params="text="+treeNodeText+"&id="+treeNodeId+"&pid="+treeNodePid;
				zTreeOption(urlStrOption,params)
							
				var zTree = $.fn.zTree.getZTreeObj("treeDemo");
				zTree.addNodes(treeNode, {id:newCount, pid:treeNode.id, text:"新建节点"});
				return false;
			}
		});
	};
	
	function removeHoverDom(treeId, treeNode) {
		$("#addBtn_"+treeNode.tId).unbind().remove();
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

		if (treeNode.level > 1) {
			var spaceStr = "<span style='display: inline-block;width:" + (spaceWidth * treeNode.level)+ "px'></span>";
			switchObj.before(spaceStr);
		}
		
		var sObj = $("#" + treeNode.tId + "_span");
		if (treeNode.editNameFlag || $("#addBtn_"+treeNode.tId).length>0) return;
		
		urlStrOption='/ManagementCenter/resource/ResourceFile_getResCount.do';
	  	var params="text="+treeNode.text+"&id="+treeNode.id+"&pid="+treeNode.pid+"&type="+treeNode.type;
	 	var tempdata=zTreeOption(urlStrOption,params);
		if(treeNode.type=='groupType'){
		var addStr = "<span id='diyBtn_" +treeNode.id+ "'>("+tempdata+")</span>";
		sObj.after(addStr);			
		}
	}

	function beforeClick(treeId, treeNode) {
		if (treeNode.level == 0 ) {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo");
			//zTree.expandNode(treeNode);
			return false;
		}
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
