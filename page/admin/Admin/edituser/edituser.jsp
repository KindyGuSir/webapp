<%@ taglib prefix="s" uri="/struts-tags" %>
<!DOCTYPE html>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<head>
	<meta charset="UTF-8">
	<title></title>
	<link rel="stylesheet" href="${pageContext.request.contextPath}/style/admin/createuser.css">
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



	<!-- 创建用户 -->
	<div class="user-tit"><img src="${pageContext.request.contextPath}/imgs/nowpath.png" alt="">当前位置：首页 / 用户管理 / 创建用户</div>
	<form class="tables">
		<p class="username">
			<span>用户名: </span><input type="text" name="loginName" id="loginName" onblur="checkUser()" value="<s:property value="usersEntity.loginname"/>" ><span></span>
		</p>

		<p class="pswd">
			<span>密码: </span><input type="password" name="loginPwd"  id="loginPwd" onblur="checkPsw()" value="<s:property value="usersEntity.pwd"/>"><span></span>
		</p>

		<p class="uname">
			<span>姓名: </span><input type="text" name="userName"  id="userName"  value="<s:property value="usersEntity.name"/>" ><span></span>
		</p>

		<p class="sex">
			<span>性别:</span>
			<label for="men">男</label><input class="men" id="men" type="radio" name="sex" >
			<label for="women">女</label>
                <input class="women" id="women" type="radio" name="sex"
                    <s:if test="#usersEntity.sex=='女'">
                       checked="checked"
                    </s:if>
                >
		</p>

		<p class="phone">
			<span>电话: </span><input type="text" name = "mobile" id = "mobile" value="<s:property value="usersEntity.mobile"/>">
		</p>

		<p class="email">
			<span>邮箱: </span><input type="text" name = "email" id="email" value="<s:property value="usersEntity.email"/>">
		</p>

		<div class="bind clearfix">
			<p>绑定身份:</p>
			<div class="bind_cont">
				<s:iterator value="lstRole" id="role">
                    <s:set name="flag" value="0" />
                    <s:iterator value="usersEntity.roles" id="r">
                        <s:if test="#role.id==#r.id">
                            <s:set name="flag" value="1" />
                        </s:if>
                    </s:iterator>
                    <s:if test="%{#flag==1}">
                        <span class="<s:property value="id"/>" style="background-color:#6192d6;border-color:#6192d6;color:#fff"><s:property value="name"/> </span>
                        <input type="checkbox" name="<s:property value="name"/>" value="<s:property value="id"/>" id="<s:property value="id"/>" checked="checked">

                    </s:if>
					<s:else>
						<span class="<s:property value="id"/>" ><s:property value="name"/> </span>
						<input type="checkbox" name="<s:property value="name"/>"  value="<s:property value="id"/>" id="<s:property value="id"/>">
					</s:else>
				</s:iterator>
				<!-- 验证后提示信息 -->
				<div></div>
			</div>
		</div>

		<div class="addgroup bind clearfix">
			<p>添加到分组:</p>
				<select  name="group" id="group" size="10">
					<s:iterator value="lstGroups" id="group">
						<option value="<s:property value="id"/>"
						<s:iterator value="usersEntity.groups" id="g">
							<s:if test="#group.id==#g.id">
								selected="selected"
							</s:if>
						</s:iterator>
						><s:property value="name"/> </option>
					</s:iterator>
				</select>
		</div>
		<div class="btn">
			<a class="update_submit">提交</a>
			<a onclick="history.go(-1)">取消</a>
		</div>
	</form>
    <input type="hidden" value="${pageContext.request.contextPath}" id="root_path">
  </div><!-- right-con end -->
	</div><!-- right end -->
</div><!-- pageCont -->
</body>
</html>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/test.js"></script>
<script>

// 表单验证
var user = document.getElementsByName('loginName')[0];
var psw = document.getElementsByName('loginPwd')[0];

// check user
function checkUser(){
	if(user.value != ''){
		var regUser = /^[a-zA-z0-9-_]{1,18}$/;
		if(!regUser.test(user.value)){
			user.nextSibling.innerHTML = '用户名为字母数字下划线组成 长度不能超过18位！';
			return false;
		}else{
			user.nextSibling.innerHTML = '';
			return true;
		};
	}else{
		user.nextSibling.innerHTML = '用户名不能为空!';
		return false;
	}
};
// check psw

function checkPsw(){

	if(psw.value != ''){
		var regPsw = /^[a-zA-z0-9-_]{6,18}$/;
		if(!regPsw.test(psw.value)){
			psw.nextSibling.innerHTML = '密码为字母数字下划线组成 长度 6-18 位！';
			return false;
		}else{
			psw.nextSibling.innerHTML = '';
			return true;
		};
	}else{
		psw.nextSibling.innerHTML = '密码不能为空!';
		return false;
	}
};
// 提交时验证
function check(){
	// check user psw
	if(!checkUser() || !checkPsw()){
		return false;
	}

	//未选中绑定身份
//	if(!$('input[type="checkbox"]').is(':checked')){
//		$('.bind_cont div').html('未绑定身份');
//		return false;
//	};
	//ok 写对了
	return true;
}

$(function(){
	// 单机更换label样式
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
});

$(".update_submit").click(function () {
    var loginName = $("#loginName").val();
    var loginPwd = $("#loginPwd").val();
    var userName = $("#userName").val();
    var mobile = $("#mobile").val();
    var email = $("#email").val();
    var group = $("#group").val();
    var rootpath = $("#root_path").val();
    var sex =$("men").is(":checked")?'男':'女';
    var $check_boxes = $('input[type=checkbox][checked=checked][id!=men][id!=women]');
    var Ids = new Array();
    $check_boxes.each(function () {
        Ids.push($(this).val());
    });

    $.ajax({
        type:'post',
        traditional :true,
        url:rootpath + "/user/User_updateUser.do",
        data:{'usersEntity.loginname':loginName,'usersEntity.pwd':loginPwd,'usersEntity.name':userName,'usersEntity.sex':sex,'usersEntity.mobile':mobile,'usersEntity.email':email,'groupId':group,'roleIds':Ids},
        success:function(data){
            location.href = "/user/User_userList.do?page=<s:property value="page"/>";
        }
    });
});
</script>