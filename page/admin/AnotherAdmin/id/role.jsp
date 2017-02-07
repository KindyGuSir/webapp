<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/id.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/top-btm.css">

</head>
<body>
	<div class="top clearfix">
			<div class="shy">
				<div class="logo">
<<<<<<< .mine
					<img class="logoimg" src="${pageContext.request.contextPath}/imgs/tplogo.png" alt="">
||||||| .r284
					<img class="logoimg" src="../../../../imgs/tplogo.png" alt="">
=======
					<img class="logoimg" src=""${pageContext.request.contextPath}/imgs/tplogo.png" alt="">
>>>>>>> .r288
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
				<th class="checkall"><input class="checks" type="checkbox"></th>
				<th class="id">角色名称</th>
				<th class="bank">权限</th>
				<th class="say">角色描述</th>
			</tr>

			<s:iterator value="lstObj" >
				<tr>
					<td><input type="checkbox" value=<s:property value="id" /></td>
<<<<<<< .mine
					<td><s:property value="name" /><img src="${pageContext.request.contextPath}/imgs/p5.png" alt="">  </td>
||||||| .r284
					<td><s:property value="name" /><img src="../../../../imgs/p5.png" alt="">  </td>
=======
					<td><s:property value="name" /><img src=""${pageContext.request.contextPath}/imgs/p5.png" alt="">  </td>
>>>>>>> .r288
					<td><s:iterator value="modules" ><s:property value="name"></s:property> </s:iterator></td>
					<td><s:property value="mark" /></td>
				</tr>
			</s:iterator>
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
// 点击编辑
	$('.edituser').click(function(){
		var boxs = $('input[type="checkbox"]:checked');
		if(boxs.length == 0){
			alert('提示！您还没有选中任何一列');
			return false;
		}else if( boxs.length > 1 ){
			alert('提示！您只能选择一列');
			return false;
		}else{
			var aSrc = $('.edituser').attr('href');
			$('.edituser').attr('href',aSrc+boxs.val());
		}
	});
  // 全选按钮
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