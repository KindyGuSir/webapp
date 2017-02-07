<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title>互动视窗</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/top-btm.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/createuser.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
</head>
<body onLoad="Resize()" onResize="Resize()">
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

		<!-- 添加新身份 -->
		<div class="user-tit">
			<img src="${pageContext.request.contextPath}/imgs/nowpath.png" alt="">当前位置：身份管理/添加新身份</div>
		<form class="tables" method="post" name="saveRole" id="saveRole" action="Role_saveRole" onsubmit="return check()">
			<p class="username">
				<span>身份名称:</span>
				<input type="text" id="roleName" name="role.name" onblur="checkIdName()" placeholder="请填写身份">
				<span></span>
			</p>
			<div class="bind clearfix">
				<p>添加板块:</p>
				<div class="bind_cont">
					<!-- 板块 -->
					<div class="plate">
						<p>常规板块</p>
					</div>
					<s:iterator value="lstModule" id="module">
						<s:if test="#module.parentId==0">
							<div class="clearfix">
								<p  class="allt">
									<s:property value="#module.name"/>
								</p>
								<s:iterator value="lstModule" id="m">
									<s:if test="#module.id==#m.parentId">
										<span class="<s:property value="#m.id"/>
										">
										<s:property value="#m.name"/>
									</span>
									<input type="checkbox" name="<s:property value="#m.name"/>
									" value="
									<s:property value="#m.id"/>
									" id="
									<s:property value="#m.id"/>
									">
								</s:if>
							</s:iterator>
						</div>
					</s:if>
				</s:iterator>
				<!-- 选中提示 -->
				<div></div>
			</div>
		</div>

		<div class="describe clearfix">
			<p>职责描述:</p>
			<textarea id="roleMark" name="role.mark" placeholder="职责描述"></textarea>
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
// check user
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
// 提交时验证
function check(){
	if($("#createName").val() == ""){
		$("#createName").next().html("身份名称不能为空!");
		return false;
	};
	//未选中绑定模块
	if(!$('input[type="checkbox"]').is(':checked')){
		$('.bind_cont div:last-child').html('权限未添加！');
		return false;
	};
	// ok 写对了
	return true;
}

function checkIdName(){
	if($("#createName").val() == ""){
		$("#createName").next().html("身份名称不能为空!");
	}else{
		$("#createName").next().html("");
	};
};
	//单机更换label样式
	var bindLabel = $('.bind_cont span');
	$(bindLabel).each(function(){
			$(this).click(function(){
						$('.bind_cont div:last-child').html('');
						if(!$('#'+$(this).attr('class')).is(':checked')){
								$('#'+$(this).attr('class')).attr("checked",true);
								$(this).css({'background-color':'#6192d6','border-color':'#6192d6','color':'#fff'});
						}else{
								$('#'+$(this).attr('class')).attr("checked",false);
								$(this).css({'background-color':'#fff','border-color':'#d9d9d9','color':'#d9d9d9'});
						};
			});
	});

	//全选
	$(".allt").click(function(){
		var inlength = $(this).parent().find("input");
		var intrue = $(this).parent().find("input:checked");
		if(inlength.length == intrue.length){
			inlength.attr("checked",false);
			$(this).parent().find("span").css({'background-color':'#fff','border-color':'#d9d9d9','color':'#d9d9d9'});
		}else{
			inlength.attr("checked",true);
			$(this).parent().find("span").css({'background-color':'#6192d6','border-color':'#6192d6','color':'#fff'});
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