<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title>用户管理</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/user.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/top-btm.css">
</head>
<body>
			<!-- top盒子 -->
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
		<div class="user-tit"><img src="../../../../imgs/nowpath.png" alt="">当前位置： 用户管理</div>
		<div class="btn">
			<a href="../createuser/createuser.html" class="adduser">添加用户</a>
			<a class="edituser delete" href="${pageContext.request.contextPath}/User_getUser?id=">编辑</a>
			<a class="delete" href="javascript:">删除</a>
		</div>
		<!-- 表单 -->
		<div id="idcard" class="idcard">
			<table>
				<tr class="table-tit">
					<th class="checkall"><input class="checks" type="checkbox"></th>
					<th class="id">用户名</th>
					<th class="name">姓名</th>
					<th class="sex">性别</th>
					<th class="phone">电话</th>
					<th class="email">邮箱</th>
					<th class="id">角色</th>
					<th class="group">分组</th>
					<th class="device">当前状态</th>
				</tr>
                <s:iterator value="lstUser" >
                    <tr>
                        <td><input type="checkbox" value=<s:property value="id" /></td>
                        <td><s:property value="id" />zhangsan</td>
                        <td><s:property value="loginname" />张三</td>
                        <td><s:property value="sex" />男</td>
                        <td><s:property value="mobile" />15188702425</td>
                        <td><s:property value="email" />1402645641@qq.com</td>
                        <td><s:property value="idcard" />三年级班主任</td>
                        <td><s:property value="group" />三年级一组</td>
                        <td><span id="" class="onstate">已启用</span></td>
                    </tr>
                </s:iterator>
          <tr>
              <td><input type="checkbox" value=<s:property value="id" /></td>
              <td><s:property value="id" />zhangsan</td>
              <td><s:property value="loginname" />张三</td>
              <td><s:property value="sex" />男</td>
              <td><s:property value="mobile" />132</td>
              <td><s:property value="email" />1402645641@qq.com</td>
              <td><s:property value="idcard" />三年级班主任</td>
              <td><s:property value="group" />三年级一组</td>
              <td><span id="" class="onstate">已启用</span></td>
          </tr>
          <tr>
              <td><input type="checkbox" value=<s:property value="id" /></td>
              <td><s:property value="id" />zhangsan</td>
              <td><s:property value="loginname" />张三</td>
              <td><s:property value="sex" />男</td>
              <td><s:property value="mobile" />132</td>
              <td><s:property value="email" />1402645641@qq.com</td>
              <td><s:property value="idcard" />三年级班主任</td>
              <td><s:property value="group" />三年级一组</td>
              <td><span id="" class="onstate">已启用</span></td>
          </tr>
          <tr>
              <td><input type="checkbox" value=<s:property value="id" /></td>
              <td><s:property value="id" />zhangsan</td>
              <td><s:property value="loginname" />张三</td>
              <td><s:property value="sex" />男</td>
              <td><s:property value="mobile" />132</td>
              <td><s:property value="email" />1402645641@qq.com</td>
              <td><s:property value="idcard" />三年级班主任</td>
              <td><s:property value="group" />三年级一组</td>
              <td><span id="" class="onstate">已启用</span></td>
          </tr>
			</table>
		</div>
		<!-- 分页 -->
    <div id ="pagebar" style="text-align: center;width:100%" >
        <ul class="pagination" id="pagination2"></ul>
    </div>
</div>
</body>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script>
//单击显示隐藏 userbox
		$(".selectybtn").bind("click",function(){
			if($("#singleOutBox").is(":hidden")){
				$(".selectybtn").css({"background-position":"0% 100%"});
				$("#singleOutBox").show();
			}else{
				$(".selectybtn").css({"background-position":"0% 0%"});
				$("#singleOutBox").hide();
			};
		});
	// 全选
	$('.checks').click(function(){
		if ( this.checked ){
			$('#idcard td input').prop('checked',true);
		}else{
			$('#idcard td input').prop('checked',false);
		}
		checkInput();
	});
	//单选
	$('#idcard td input').click(function(){
		checkInput();
	});
	function checkInput(){
		var numTrue = 0;
		$('#idcard td input').each(function(){
			if($(this).prop("checked")){
				$(this).parent().parent().css({'background':'#f9f9f9'});
				numTrue += 1;
			}else{
				$(this).parent().parent().css({'background':''});
			};
		});
		if(numTrue != $('#idcard td input').length){
			$('.checks').prop("checked",false);
		}else{
			$('.checks').prop("checked",true);
		}
	}
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
</html>