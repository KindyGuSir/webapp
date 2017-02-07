<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/id.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
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
	<div class="user-tit"><img src="${pageContext.request.contextPath}/imgs/nowpath.png" alt="">当前位置： 身份管理</div>
	<div class="btn">
		<a href="${pageContext.request.contextPath}/role/Role_addRole.do">创建角色</a>
		<a class="editrole" href="${pageContext.request.contextPath}/role/Role_getRoleById.do?id=">编辑</a>
		<a class="delrole" href="${pageContext.request.contextPath}/role/Role_delRole.do">删除</a>
	</div>
	<!-- 表单 -->
	<div id="idcard" class="idcard">
		<table>
			<tr class="table-tit">
				<th id="checkall" class="checkall">全选</th>
				<th class="id">角色名称</th>
				<th class="bank">权限</th>
				<th class="say">角色描述</th>
			</tr>

			<s:iterator value="lstObj" >
				<tr>
					<td><input type="checkbox" value="<s:property value="id" />"></td>
					<td><s:property value="name" /></td>
					<td><s:iterator value="modules" ><s:property value="name"></s:property> </s:iterator></td>
					<td><s:property value="mark" /></td>
				</tr>
			</s:iterator>
		</table>
	</div>
	<!-- 分页 -->
    <div style="text-align: center;width:100%" >
        <ul class="pagination" id="pagination2"></ul>
    </div>
	<input type="hidden" value="${pageContext.request.contextPath}" id="root_path">

	</div><!-- right-con end -->
	</div><!-- right end -->
</div><!-- pageCont -->
</body>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/jqPaginator.js"></script>
<script src="${pageContext.request.contextPath}/js/test.js"></script>
<script>

    function delRole()
    {
        var ids = "";
        var boxs = $('input[type="checkbox"]:checked');
        var i = 0;
        for( i = 0; i < boxs.length;i++) {
            var check_box = boxs[i].value;
            ids += check_box+',';
        }
        if(ids.length > 0)
        {
            ids = ids.substr(0,ids.length - 1);
            var aSrc = $('.delrole').attr('href');
            $('.delrole').attr('href',aSrc+"?ids="+ids);
            return true;
        }
        else
        {
            return false;
        }
    }

    $('.delrole').click(function(){
        delRole();
    });

	$('.editrole').click(function(){
		var boxs = $('input[type="checkbox"]:checked');
		if(boxs.length != 1){
			return false;
		}

		var aSrc = $('.editrole').attr('href');
		$('.editrole').attr('href',aSrc+boxs.val());
	});
	$("tr td:nth-child(3) > a").each(function(){
		$(this).click(function(){
			$(".hide").hide();
			$(this).next(".hide").show('300');
		});
	});
  $('.close').click(function(){
  	$('.hide').hide('300');
  })
  // 全选按钮
	document.getElementById('checkall').onclick = function(){
	 	var boxs = $(".idcard input");
	 	var keds = $(".idcard input:checked");
	 	if(boxs.length == keds.length){
	 		for(var i = 0;i < boxs.length;i++){
	  		boxs[i].checked = "";
	  	}
	 	}else{
	 		for(var i = 0;i < boxs.length;i++){
	  		boxs[i].checked = "checked";
	  	}
	 	};
 	};

	$('.turngo').click(function(){
		var aSrc = $('.turngo').attr('href');
		var c = $("#gotoPage").val();
		$('.turngo').attr('href',aSrc+c);
	});

    $.jqPaginator('#pagination2', {
        totalPages:<s:property value="count"/> ,
        visiblePages: 10,
        currentPage: <s:property value="page"/> ,
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            if(type=="change"){
                location.href="/role/Role_roleList.do?page="+num;
            }

        }
    });

</script>
</html>