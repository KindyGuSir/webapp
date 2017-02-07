<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/userGroup.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/alert.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/test2.css">
</head>
<body>
      <!-- top -->
    <div class="top">
    <div class="top-c">
        <div class="logo">
            <img class="logoimg" src="../../../imgs/tplogo.png" alt="">
            <h1 class="tit">互动视窗系统</h1>
        </div>
        <div class="top-con">
            <div class="top-tit">
                <h1>为中国教育崛起而努力 同心共筑教育强国梦</h1>
            </div>
            <div class="singleout">
                当前用户:
                <span>
                    管理员
                    <span class="selectBox">
                        <a href="javascript:" id="selectybtn" class="selectbtn"></a>
                    </span>
                </span>
                <div id="singleOutBox" class="singleOutBox">
                        <div><a href="javascript:">个人资料</a></div>
                        <div><a href="javascript:">帮助中心</a></div>
                        <div><a class="outuser" href="javascript:">注销</a></div>
                </div>
            </div>
        </div>
    </div>
    </div>
<!-- pageCont -->
<div class="pageCont">
    <!-- left -->
    <div class="left">
    <div class="left-con">
        <div id="firstpane" class="menu_list">
            <h3 class="menu_head current"><img src="${pageContext.request.contextPath}/imgs/h3-person.png" alt=""> 用户管理</h3>
            <div class="menu_body">
                <a href="${pageContext.request.contextPath}/group/Group_groupList.do?type=user"><span>人员分组</span></a>
                <a href="${pageContext.request.contextPath}/role/Role_roleList.do?current=1"><span>公共角色</span></a>
                <a href="${pageContext.request.contextPath}/user/User_userList.do?current=1"><span>人员管理</span></a>
            </div>
            <h3 class="menu_head"> <img src="${pageContext.request.contextPath}/imgs/h3-device.png" alt="">设备管理</h3>
            <div class="menu_body">
                <a href="${pageContext.request.contextPath}/group/Group_groupList.do?type=device"><span>设备分组</span></a>
                <a href="${pageContext.request.contextPath}/device/Device_deviceList.do"><span >设备部署</span></a>
            </div>
        </div>
        </div>
    </div><!-- left end -->
    <!-- right -->
    <div class="right">
    <div class="right-con">



	<!-- 身份管理 -->
	<!-- <div class="user-tit"><img src="../../../imgs/nowpath.png" alt="">当前位置： 人员分组</div> -->

	<div class="gwidth clearfix">
		<div class="group-l">
			<div class="group-l-tit">
				用户分组
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
			<div id ="data_num" class="senum">人员列表: （已选择 <b id="senum">0</b> 条数据）</div>
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



        </div><!-- right-con end -->
        </div><!-- right end -->
    </div><!-- pageCont -->
</body>
</html>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script><script src="${pageContext.request.contextPath}/js/test.js"></script>
<script src="${pageContext.request.contextPath}/js/userGroup.js"></script>
<script src="${pageContext.request.contextPath}/js/ualert.js"></script>
<script src="${pageContext.request.contextPath}/js/jqPaginator.js"></script>
<script src="${pageContext.request.contextPath}/js/layer/layer.js"></script>
<script>
$("#g-tab tr td:nth-child(7)").each(function(){
	
});

var json_str= "";

function Init(){
    $("#data_num").hide();
    var rootpath = $("#root_path").val();
    $.ajax({
        type:'post',
        url:rootpath + "/group/Group_initGroup.do?type=user",
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

</script>