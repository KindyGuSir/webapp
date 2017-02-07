<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title>用户管理</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/user.css">
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
		<div class="user-tit"><img src="${pageContext.request.contextPath}/imgs/nowpath.png" alt="">当前位置： 用户管理</div>
		<div class="btn">
			<a class="adduser" href="${pageContext.request.contextPath}/user/User_addUser.do" >添加用户</a>
			<a class="edituser" href="${pageContext.request.contextPath}/user/User_getUser.do?id=">编辑</a>
			<a class="deluser" href="${pageContext.request.contextPath}/user/User_delUser.do">删除</a>
		</div>
		<!-- 表单 -->
		<div class="idcard">
			<table>
				<tr class="table-tit">
					<th id="checkall" class="checkall">全选</th>
					<th class="id">用户名</th>
					<th class="bank name">姓名</th>
					<th class="say sax">性别</th>
					<th class="say">电话</th>
					<th class="say">邮箱</th>
					<th class="say">角色</th>
					<th class="say">分组</th>
					<th class="say device">当前状态</th>
				</tr>
                <s:iterator value="lstObj" >
                    <tr>
                        <td><input type="checkbox" value="<s:property value="id" />"></td>
                        <td><s:property value="id" /></td>
                        <td><s:property value="loginname" /></td>
                        <td><s:property value="sex" /></td>
                        <td><s:property value="mobile" /></td>
                        <td><s:property value="email" /></td>
						<td><s:iterator value="roles" >
							<s:property value="name" />
						</s:iterator></td>
						<td>
							<s:iterator value="groups" >
								<s:property value="name" />
							</s:iterator>
						</td>
                        <td><span id="" class="onstate">已启用</span></td>
                    </tr>
                </s:iterator>
					</table>
				</div>
        <div style="text-align: center;width:100%" >
            <ul class="pagination" id="pagination2"></ul>
        </div>

     </div><!-- right-con end -->
	</div><!-- right end -->
</div><!-- pageCont -->
</body>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/jqPaginator.js"></script>
<script src="${pageContext.request.contextPath}/js/test.js"></script>
<script>
    function delUser()
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
			var aSrc = $('.deluser').attr('href');
			$('.deluser').attr('href',aSrc+"?ids="+ids);
			return true;
		}
		else
		{
			return false;
		}
	}

	$('.deluser').click(function(){
		delUser();
	});

	$('.edituser').click(function(){
		var boxs = $('input[type="checkbox"]:checked');
		if(boxs.length > 1){
            alert("不能同时编辑多个用户");
			return false;
		}
		var aSrc = $('.edituser').attr('href');
		$('.edituser').attr('href',aSrc+boxs.val());
	});
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
	 	 // 点击已启用变成已禁用
	 $('.idcard tr td:last-child span').click(function(){
		 	if ( $(this).html() == '已启用' ){
		 		$(this).html('已禁用');
		 		$(this).removeClass();
		 		$(this).attr('class','offstate');
		 	}else{
		 		$(this).html('已启用');
		 		$(this).removeClass();
		 		$(this).attr('class','onstate');
		 	}
	 });


</script>
</html>