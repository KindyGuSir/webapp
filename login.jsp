<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ page isELIgnored="false" %>
<head>
	<meta charset="UTF-8">
	<title>互动视窗后台登陆</title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/login/login.css">
</head>
<body onkeydown="subCheck(event)">
<!-- head -->
<header>
	<div class="head">
		<div class="head-logo"><img src="${pageContext.request.contextPath}/imgs/logo.png" alt="LOGO"></div>
		<div class="head-tit"><span>|</span><span>校园互动视窗系统</span></div>
	</div>
</header>
<input type="hidden" value="${pageContext.request.contextPath}" id="root_path">
<!-- 页面主体 -->
<div class="content">
	<!-- img -->
	<div class="cont-img">
		<img src="${pageContext.request.contextPath}/imgs/cont-img.png" alt="">
	</div>
	<!-- login -->
	<div class="cont-login">
		<h2>
			欢迎登录校园互动视窗系统
		</h2>
		<div>
			<!-- 账号密码 -->
				<p><input type="text" name="usersEntity.loginname" id="loginName" placeholder="请输入登录账号"></p>
				<p><input type="password" name="usersEntity.pwd" id="loginPwd" placeholder="请输入登录密码"></p>
				<span id="errorPrompt"></span>
			<!-- 记住账号 -->
				<div class="select">
					<!-- 记住账号 -->
					<div class="remember">
						<input type="checkbox" id="remember" name="remember" >
						<label for="remember">记住账号</label>
					</div>
				</div>
			<!-- 分割线 -->
				<div class="formhr"></div>
			<!-- 登陆 -->
				<button class="login_submit" type="button">登陆</button>
			<!-- 文本信息 -->
			<div class="info">
				<h3>更多了解我们的产品</h3>
				<p>本产品基本功能 便于校园管理 优化时间安排 信息查询快捷</p>
			</div>

		</div>
	</div>
</div>

<!-- 分割线 -->
<div class="downhr"></div>

<!-- 版权信息 -->
<footer>
	<p><a href="##">了解更多</a> <a href="##">联系我们：13000000000</a></p>
	<p>Copyright©2011-2016 技术有限公司 版权所有 保留一切权利</p>
</footer>

<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/layer/layer.min.js"></script>
<%--<script src="${pageContext.request.contextPath}/js/layer/extend/layer.ext.js"></script>--%>
</body>
</html>
<script>
	$(".login_submit").click(function () {
	//get form
	var user = $("#loginName").val();
	var psw  = $("#loginPwd").val();
	var rootpath = $("#root_path").val();
	//user psw
	var reg = /^[a-zA-z0-9-_]{6,18}$/;
//		alert(rootpath);
	if(reg.test(psw.value) && reg.test(user.value)){
		$.post(rootpath+"/user/User_login.do", {
			login_name: user,
			login_pass: psw
		}, function (data) {
			if (data.success == true) {
				location.href=rootpath+"/user/User_login.do";
			}
			else {
				layer.msg(data.msg);
			}
		}, 'json');
	}else{
		document.getElementById('errorPrompt').innerHTML = '账号密码格式不正确！<br/> (正确格式为6 - 18位，由字母数字下划线组成)';
		return false;
	}
});
	/**点击回车触发事件*/
	function subCheck(event){
		if(event.keyCode==13){
			if ($("input[name='loginName']").val() == "") {
				$("input[name='loginName']").focus();
				return false;
			}
			if ($("input[name='loginPwd']").val() == "") {
				$("input[name='loginPwd']").focus();
				return false;
			}

			$(".login_submit").click();
			return false;
		}
	}
</script>