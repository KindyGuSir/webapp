<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/createeqt.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/test2.css">
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



	<!-- 添加设备 -->
	<div class="user-tit">
		<img src="${pageContext.request.contextPath}/imgs/nowpath.png" alt="">当前位置：设备管理 / 添加设备</div>
	<form class="tables" >
		<p>
			<span>设备名称:</span>
			<input id="name" name ="deviceEntity.name" type="text" value="<s:property value="deviceEntity.name"/>">
			<span></span>
		</p>
		<p>
			<span>设备IP:</span>
			<input id="ip" name = "deviceEntity.ipAddress" type="text" value="<s:property value="deviceEntity.ipAddress"/>">
			<span></span>
		</p>
		<p>
			<span>设备MAC:</span>
			<input id = "mac"name = "deviceEntity.macAddress" type="text" value="<s:property value="deviceEntity.macAddress"/>">
			<span></span>
		</p>
		<div class="appoint clearfix">
				<div class="addperson">
					<h3>指定负责人</h3>
					<div class="search-ipt">
						<input type="text" placeholder="搜索负责人">
						<img class="search" src="${pageContext.request.contextPath}/imgs/search.png" alt="search"></div>
					<select id="user_id" size="1" class="principal" multiple="multiple" id="set1">
                        <s:iterator value="lstAllUser" id="user">
								<s:set name="flag" value="0"/>
								<s:iterator value="deviceEntity.users" id="u">
									<s:if test="#user.id==#u.id">
										<s:set name="flag" value="1"/>
									</s:if>
								</s:iterator>
								<s:if test="%{#flag==1}">
									<option value="<s:property value="id" />" selected="selected"><s:property value="name" /></option>
								</s:if>
								<s:else>
									<option value="<s:property value="id" />"><s:property value="name" /></option>
								</s:else>

                        </s:iterator>
					</select>
				</div>
				<div class="addperson">
					<h3>添加到分组</h3>
					<select id="group_id" multiple="multiple" id="set2">
						<s:iterator value="lstAllGroups" id="group">
							<s:set name="flag" value="0"/>
							<s:iterator value="deviceEntity.groups" id="g">
								<s:if test="#group.id==#g.id">
									<s:set name="flag" value="1"/>
								</s:if>
							</s:iterator>
							<s:if test="%{#flag==1}">
								<option value="<s:property value="id" />" selected="selected"><s:property value="name" /></option>
							</s:if>
							<s:else>
								<option value="<s:property value="id" />"><s:property value="name" /></option>
							</s:else>

						</s:iterator>
					</select>
				</div>
		</div>
		<div class="btn">
			<a class="save_submit">提交</a>
			<a onclick="history.go(-1)">取消</a>
		</div>
	</form>
	<input type="hidden" value="${pageContext.request.contextPath}" id="root_path">
	<!-- 分页 -->
    <div id ="pagebar" style="text-align: center;width:100%" >
        <ul class="pagination" id="pagination2"></ul>
    </div>
</div>
</body>
</html>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script>
	$(".save_submit").click(function () {
		var name = $("#name").val();
		var ip = $("#ip").val();
		var mac = $("#mac").val();
		var groupid=$("#group_id").val();
		var userid=$("#user_id").val();
		var rootpath = $("#root_path").val();
		var groupId = new Array();
		groupId.push(groupid);
		var usersId = new Array();
		usersId.push(userid);

		$.ajax({
			type:'post',
			traditional :true,
			url:rootpath + "/device/Device_updateDevice.do",
			data:{'deviceEntity.name':name,'deviceEntity.ipAddress':ip,'deviceEntity.macAddress':mac,'users_id':usersId,'group_id':groupId},
			success:function(data){
				location.href = "/device/Device_deviceList.do?page=<s:property value="page"/>";
			}
		});

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