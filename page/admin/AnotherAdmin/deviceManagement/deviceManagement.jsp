<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title>用户管理</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/deviceManagement.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
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
				<div class="user-tit"><img src="${pageContext.request.contextPath}/imgs/nowpath.png" alt="">当前位置： 设备管理 / 设备部署</div>
				<div class="btn">
					<a href="${pageContext.request.contextPath}/device/Device_addDevice.do" class="adduser">添加设备</a>
					<a href="${pageContext.request.contextPath}/device/Device_getDevice.do?id=" class="edituser delete">编辑</a>
					<a href="${pageContext.request.contextPath}/device/Device_delDevice.do" class="delete">删除</a>
				</div>
				<!-- 表单 -->
		<div class="idcard">
			<table  id="idtable">
				<form action="##" name="idcard">
				<tr class="table-tit">
					<th><span id="checkall">全选</span></th>
					<th>序号</th>
					<th>地址</th>
					<th>状态</th>
					<th>所属分组</th>
					<th>负责人</th>
				</tr>
				<tr>
					<td><input type="checkbox" name="check1" value="1"></td>
					<td>1</td>
					<td>192.168.1.100</td>
					<td>在线</td>
					<td>初一一班</td>
					<td>李老师</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="check1" value="2"></td>
					<td>1</td>
					<td>192.168.1.100</td>
					<td>在线</td>
					<td>初一一班</td>
					<td>李老师</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="check1" value="3"></td>
					<td>1</td>
					<td>192.168.1.100</td>
					<td>在线</td>
					<td>初一一班</td>
					<td>李老师</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="check1" value="4"></td>
					<td>1</td>
					<td>192.168.1.100</td>
					<td>在线</td>
					<td>初一一班</td>
					<td>李老师</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="check1" value="5"></td>
					<td>1</td>
					<td>192.168.1.100</td>
					<td>在线</td>
					<td>初一一班</td>
					<td>李老师</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="check1" value="6"></td>
					<td>1</td>
					<td>192.168.1.100</td>
					<td>在线</td>
					<td>初一一班</td>
					<td>李老师</td>
				</tr>
				<tr>
					<td><input type="checkbox" name="check1" value="7"></td>
					<td>1</td>
					<td>192.168.1.100</td>
					<td>在线</td>
					<td>初一一班</td>
					<td>李老师</td>
				</tr>
				</form>
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
	//选中一个点击编辑才会弹框
	$('.edituser').click(function(){
		var boxs = $('input[type="checkbox"]:checked');
		if(boxs.length != 1){
			return false;
		}
		var aSrc = $('.edituser').attr('href');
		$('.edituser').attr('href',aSrc+boxs.val());
	});
	//全选 取消全选
	// var checkall = document.getElementById('checkall');
	// console.log(boxs);
	// checkall.onclick = function(){
	// 	if( boxs.length != keds.length ){
	// 		for( i=0; i<boxs.length; i++ ){
	// 			boxs[i].checked = true;
	// 		}
	// 	}else{
	// 		for ( i=0; i<boxs.length; i++ ){
	// 			boxs[i].checked = false;
	// 		}
	// 	};
	// };
	$("#checkall").click(function(){
		var boxs = $('#idtable input');
		var keds = $('#idtable input:checked');
    if( boxs.length == keds.length ){
        $("input[name='check1']").attr('checked', false);
    }else{
        $("input[name='check1']").attr('checked', true);
    };
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