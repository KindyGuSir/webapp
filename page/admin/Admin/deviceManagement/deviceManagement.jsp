<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title>用户管理</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/deviceManagement.css">
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
				<div class="user-tit"><img src="${pageContext.request.contextPath}/imgs/nowpath.png" alt="">当前位置： 设备管理 / 设备部署</div>
				<div class="btn">
					<a  class="addDevice" href="${pageContext.request.contextPath}/device/Device_addDevice.do" >添加设备</a>
					<a  class="editDevice" href="${pageContext.request.contextPath}/device/Device_getDevice.do?id=">编辑</a>
		            <a  class="delDevice" href="${pageContext.request.contextPath}/device/Device_delDevice.do">删除</a>
				</div>
				<!-- 表单 -->
				<div class="idcard">
					<table  id="idtable">
						<tr class="table-tit">
							<th><span id="checkall">全选</span></th>
							<th>序号</th>
							<th>地址</th>
							<th>MAC地址</th>
							<th>状态</th>
							<th>所属分组</th>
							<th>负责人</th>
						</tr>
							<s:iterator value="lstObj">
								<tr>
									<td><input type="checkbox" name="check1" value="<s:property value="id"/> "></td>
									<td><s:property value="id"/> </td>
									<td><s:property value="ipAddress"/></td>
		                            <td><s:property value="macAddress"/></td>
									<td>在线</td>
									<td><s:iterator value="groups" ><s:property value="name" /></s:iterator></td>
									<td><s:iterator value="users" ><s:property value="name" /></s:iterator></td>
								</tr>
							</s:iterator>
					</table>
				</div>
				<!-- 分页 -->
		        <div style="text-align: center;width:100%" >
		            <ul class="pagination" id="pagination2"></ul>
		        </div>


		</div><!-- right-con end -->
	</div><!-- right end -->
</div><!-- pageCont -->
</body>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/jqPaginator.js"></script>
<script src="${pageContext.request.contextPath}/js/test.js"></script>
<script>
	//选中一个点击编辑才会弹框
	$('.editDevice').click(function(){
		var boxs = $('input[type="checkbox"]:checked');
		if(boxs.length != 1){
			return false;
		}
		var aSrc = $('.editDevice').attr('href');
		$('.editDevice').attr('href',aSrc+boxs.val());
	});

	function delDevice()
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
			var aSrc = $('.delDevice').attr('href');
			$('.delDevice').attr('href',aSrc+"?ids="+ids);

		}

	}

	$('.delDevice').click(function(){
		delDevice();
	});

	$("#checkall").click(function(){
		var boxs = $('#idtable input');
		var keds = $('#idtable input:checked');
    if( boxs.length == keds.length ){
        $("input[name='check1']").attr('checked', false);
    }else{
        $("input[name='check1']").attr('checked', true);
    };
  });

    $.jqPaginator('#pagination2', {
        totalPages:<s:property value="count"/> ,
        visiblePages: 10,
        currentPage: <s:property value="page"/> ,
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
            if(type=='changge')
            {
                location.href="/device/Device_deviceList.do?page="+num;
            }

        }
    });
</script>
</html>