<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/userGroup.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/top-btm.css">
</head>
<body>
   <div class="top clearfix">
            <div class="shy">
                <div class="logo">
                    <img class="logoimg" src="../../../../imgs/tplogo.png" alt="">
                    <h1 class="tit">互动视窗系统</h1>
                </div>
                <div class="top-con">
                    <div class="top-tit">
                        <ul class="prom-title">
                            <li>
                                <a href="${pageContext.request.contextPath}/group/Group_groupList.do?type=user">人员分组</a>
                            </li>
                            <li>
                                <a href="${pageContext.request.contextPath}/role/Role_roleList.do?current=1">公共角色</a>
                            </li>
                            <li>
                                <a href="${pageContext.request.contextPath}/user/User_userList.do?current=1">人员管理</a>
                            </li>
                            <li>
                                <a href="${pageContext.request.contextPath}/group/Group_groupList.do?type=device">设备分组</a>
                            </li>
                            <li>
                                <a href="${pageContext.request.contextPath}/device/Device_deviceList.do">设备配置</a>
                            </li>
                        </ul>
                    </div>
                    <div class="singleout">
                        当前用户:
                        <span>
                            管理员
                            <span class="selectybtn"></span>
                        </span>
                        <div id="singleOutBox" class="singleOutBox">
                            <div>
                                <a href="javascript:">个人资料</a>
                            </div>
                            <div>
                                <a href="javascript:">帮助中心</a>
                            </div>
                            <div>
                                <a class="outuser" href="javascript:">注销</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>





<!-- bottom盒子 -->
<div class="bottom-box">



	<!-- 身份管理 -->
	<!-- <div class="user-tit"><img src="../../../imgs/nowpath.png" alt="">当前位置： 人员分组</div> -->

	<div class="gwidth clearfix">
		<div class="group-l">
			<div class="group-l-tit">
				设备分组
			</div>
				<!-- 已有组 -->
				<ul id="group-se">
				</ul>

			</div><!-- 二级分组 end -->


		<div class="group-r">
			<div class="group-list clearfix" >
				<a id="batchEdit" class="ugid1" href="javascript:">批量修改</a>
				<a id="del" href="javascript:">删除 </a>
				<div class="suname">
					<input id="search-prople" type="text" placeholder="请输入姓名或同户名进行搜索">
					<a href="javascript:"></a>
				</div>
			</div>
			<div id ="data_num" class="senum">设备列表: （已选择 <b id="senum">0</b> 条数据）</div>
			<div class="tb">
			<table id="g-tab">



			</table>
			</div>

			<!-- 分页 -->
            <div id ="pagebar" style="text-align: center;width:100%" >
                <ul class="pagination" id="pagination2"></ul>
            </div>

		</div><!-- group-r -->
	</div><!-- gwidth - end -->
    <input type="hidden" value="${pageContext.request.contextPath}" id="root_path">
    <input type="hidden"  id="id_flag">
    <input type="hidden"  id="totalPage">
    <input type="hidden"  id="currentPage">
</div>
</body>
</html>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/deviceGroup.js"></script>
<script src="${pageContext.request.contextPath}/js/ualert.js"></script>
<script src="${pageContext.request.contextPath}/js/jqPaginator.js"></script>
<script src="${pageContext.request.contextPath}/js/layer/layer.js"></script>
<script>

var json_str= "";

function Init(){
    $("#data_num").hide();
    var rootpath = $("#root_path").val();
    $.ajax({
        type:'post',
        url:rootpath + "/group/Group_initGroup.do?type=group",
        success:function(data){
            var nodes = convert(data.array);
            var html = makeTree(nodes);
            html+='<li class="unclassified"><a href="javascript:">查看未分组</a></li>';
            var ns = document.getElementById("group-se");
            ns.innerHTML =  html;
            addicon();
            newpage();
        }
    });
}

function convert(rows){
    function exists(rows, parentId){
        for(var i=0; i<rows.length; i++){
            if (rows[i].id == parentId) return true;
        }
        return false;
    }
    var nodes = [];
    // get the top level nodes
    for(var i=0; i<rows.length; i++){
        var row = rows[i];
        if (!exists(rows, row.parentId)){
            nodes.push({
                id:row.id,
                text:row.name
            });
        }
    }

    var toDo = [];
    for(var i=0; i<nodes.length; i++){
        toDo.push(nodes[i]);
    }
    while(toDo.length){
        var node = toDo.shift();	// the parent node
        // get the children nodes
        for(var i=0; i<rows.length; i++){
            var row = rows[i];
            if (row.parentId == node.id){
                var child = {id:row.id,text:row.name};
                if (node.children){
                    node.children.push(child);
                } else {
                    node.children = [child];
                }
                toDo.push(child);
            }
        }
    }
    return nodes;
}

function makeTree(nodes){
    var html='';
    var len = nodes.length;
    for( var i = 0; i < len; i++ ){
        var node = nodes[i];
        html+='<li>'
                + ' <div> '
                +     '<span id='+node.id+'><b>'+node.text+'</b></span>'
                +     '<span class="idus">'
                +         '<a class="reng" id=\"'+node.id+'\" href="javascript:" title="重命名"></a>'
                +         '<a class="anug" id=\"'+node.id+'\" href="javascript:" title="新建组"></a>'
                +         '<a class="delg" id=\"'+node.id+'\" href="javascript:" title="删除组"></a>'
                +     '</span>'
                +'</div>';
        if(node.children){
            var child = node.children;
            html+='<ul>'
            html+=makeTree(node.children);
            html+='</ul>'
        }
        html+='</li>';
    }
    return html;
}

Init();
// 分页插件
 $.jqPaginator('#pagination2', {
        totalPages:<s:property value="count"/> ,
        visiblePages: 10,
        currentPage: <s:property value="page"/> ,
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            if(type=="change"){
                // location.href="/role/Role_roleList.do?page="+num;
            }

        }
    });
</script>