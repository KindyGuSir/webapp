<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title></title>
		<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/top-btm.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/createeqt.css">
		<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
	</head>
<body>
<!-- top
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
pageCont
<div class="pageCont">
	left
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
	</div>left end
	right
	<div class="right">
	<div class="right-con"> -->
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
	<form class="tables" method="post" name="createUser" id="createUser" action="##" onsubmit="return check()">
		<p>
			<span>设备名称:</span>
			<input type="text" placeholder="请填写设备名称">
			<span></span>
		</p>
		<p>
			<span>设备IP:</span>
			<input type="text" placeholder="请填写设备IP">
			<span></span>
		</p>
		<div class="appoint clearfix">
				<div class="addperson">
					<h3>指定负责人</h3>
					<div class="search-ipt">
						<input type="text" placeholder="搜索负责人">
						<img class="search" src="../../../../imgs/search.png" alt="search">
					</div>
					<select name="principal" size="1" class="principal" multiple="multiple" id="set1">
						<option value="王主任">王主任</option>
						<option value="莉萍 ">莉萍</option>
						<option value="正妍">正妍</option>
						<option value="张琳竣">张琳竣</option>
						<option value="梦丽">梦丽</option>
						<option value="钱若美 ">钱若美</option>
						<option value="娅清 ">娅清</option>
						<option value="孙舒玉 ">孙舒玉</option>
						<option value="映蓉 ">映蓉</option>
						<option value="李长英">李长英</option>
						<option value="丽美">丽美</option>
						<option value="夕文">夕文</option>
						<option value="琳涵">琳涵</option>
						<option value="冯燕星">冯燕星</option>
						<option value="善玲">善玲</option>
						<option value="楚宇芳">楚宇芳</option>
						<option value="卫铭倩">卫铭倩</option>
					</select>
				</div>
				<div class="addperson">
					<h3>添加到分组</h3>
					<select name="grouping" multiple="multiple" id="set2">
						<option value="一年级组">一年级组</option>
	          <option value="二年级组">二年级组</option>
	          <option value="三年级组">三年级组</option>
	          <option value="四年级组">四年级组</option>
	          <option value="五年级组">五年级组</option>
	          <option value="六年级组">六年级组</option>
	          <option value="初一年级组">初一年级组</option>
	          <option value="初二年级组">初二年级组</option>
	          <option value="处三年级组">处三年级组</option>
					</select>
				</div>
		</div>
		<div class="btn">
			<a href="##">提交</a>
			<a onclick="history.go(-1)">取消</a>
		</div>
	</form>
	<!-- 分页 -->
    <div id ="pagebar" style="text-align: center;width:100%" >
        <ul class="pagination" id="pagination2"></ul>
    </div>
</div>
</body>
</html>
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
//
$(".search").click(function(){
	var searchVal = $('.search-ipt input').val();
	 var str = $("#set1 option").map(function(){return $(this).val();}).get().join();
	if( searchVal == str ){
		alert('aaa');
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