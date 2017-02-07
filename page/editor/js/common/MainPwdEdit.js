var sii = false;
$(function(){
   
   var confrmpw;
   // 旧密码的输入框获取焦点的时候  1：旧密码的提示信息请空
   /*$('.text#oldpw').focus(function(){
	   var olnmim = $('.text#oldpw').val().trim();
   });*/
   
   $('.text#lname').blur(function(){
	   var lname = $('#lname').val().trim();
	   if(lname.length==''){
		   $("#lnameinfo").html("用户名为空,请输入用户名！");
		     $('#mianpweditdlg #lnamemsg').css("display","block");
		   return false;
	   }
	   else if(lname!=''){
		   
		   $.ajax({
				url : '/ManagementCenter/user/User_confirmLname.do',
				type : 'POST',
				data : {
					lname :lname
				},
				dataType : 'json',
				success : function(result) {
					var json = eval("(" + result + ")");
					if (json) {
						$("#lnameinfo").html("");
					     $('#mianpweditdlg #lnamemsg').css("display","none");
						return true;
					} else {
						 $("#lnameinfo").html("用户名不存在！");
					     $('#mianpweditdlg #lnamemsg').css("display","block");
						return false;
					}
				 },
				error : function(result) {
					$("#lnameinfo").html("用户名不存在！");
				     $('#mianpweditdlg #lnamemsg').css("display","block");
					return false;
			  }
			});
		}
   });
   
   $('.text#oldpw').blur(function(){
	   var lname = $('#lname').val().trim();
	   if(lname==''){
		   $("#lnameinfo").html("用户名为空,请输入用户名！");
		     $('#mianpweditdlg #lnamemsg').css("display","block");
		   return false;
	   }
	   else if(lname!=''){
		   var oldpw = $('#oldpw').val().trim();
		   if(oldpw==''){
				 //$.messager.alert('提示', '新密码为空,请输入新密码！', 'show');
				 $("#hintinfo").html("旧密码为空,请输入旧密码！");
			     $('#mianpweditdlg #hintmsg').css("display","block");
			     return false;
			  }else{
				  $.ajax({
						url : '/ManagementCenter/user/User_confirmBeforeLoginPassword.do',
						type : 'POST',
						data : {
							pw :oldpw,
							lname:lname
						},
						dataType : 'json',
						success : function(result) {
							var json = eval("(" + result + ")");
							sii = json;
							if (json) {
								$("#hintinfo").html("");
								$('#mianpweditdlg #hintmsg').css("display","none");
								return true;
							} else {
								$("#hintinfo").html("您输入的原密码错误");
								$('#mianpweditdlg #hintmsg').css("display","inline");
								return false;
							}
						 },
						error : function(result) {
							$("#hintinfo").html("您输入的原密码错误");	
							$('#mianpweditdlg #hintmsg').css("display","inline");
							return false;
					  }
					});
			 }
		   
		}
	   
	   
   });
   
   $('.text#newpw').blur(function(){
	   	  var newpw = $('.text#newpw').val().trim();
		  if(newpw.length==''){
			 //$.messager.alert('提示', '新密码为空,请输入新密码！', 'show');
			 $("#newpwinfo").html("新密码为空,请输入新密码！");
		     $('#mianpweditdlg #newpwmsg').css("display","block");
		     return false;
		  }else if(newpw.length<6){
				 //$.messager.alert('提示', '新密码为空,请输入新密码！', 'show');
				 $("#newpwinfo").html("新密码的长度至少6位");
			     $('#mianpweditdlg #newpwmsg').css("display","block");
			     return false;
		 }else if(!validateStrAndNo(newpw)){
			 $("#newpwinfo").html("新密码只允许输入数字和英文");
		     $('#mianpweditdlg #newpwmsg').css("display","block");
		     return false;
		 }else if(newpw!='' && newpw.length>=6 && validateStrAndNo(newpw)){
			 $("#newpwinfo").html("");
		     $('#mianpweditdlg #newpwmsg').css("display","none");
		 }
   });
   
   $('.text#confirmpw').blur(function(){
	   var newpw = $('.text#newpw').val().trim();
  	 	var confirmpw =  $('.text#confirmpw').val().trim();
	     if(confirmpw == '' ){
	  		 $("#confirmpwinfo").html("确认密码为空,请输入新密码！");
			     $('#mianpweditdlg #confirmpwmsg').css("display","block");
			     return false;
	  	 }
	  	 else if(confirmpw.length<6){
	  		 $("#confirmpwinfo").html("确认密码的长度至少6位");
			     $('#mianpweditdlg #confirmpwmsg').css("display","block");
			     return false;
	  	 }
	  	 else if(newpw!='' && newpw != confirmpw){
	  		 	$("#confirmpwinfo").html("2次密码必须一致");
			     $('#mianpweditdlg #confirmpwmsg').css("display","block");
			     return false;
	  	 }else if(!validateStrAndNo(confirmpw)){
			 $("#confirmpwinfo").html("确认密码只允许输入数字和英文");
		     $('#mianpweditdlg #confirmpwmsg').css("display","block");
		     return false;
		 }else if(confirmpw!='' && confirmpw.length>=6 && validateStrAndNo(confirmpw)){
			 $("#confirmpwinfo").html("");
		     $('#mianpweditdlg #confirmpwmsg').css("display","none");
		 }
   });
   	
   //确认密码  只需要自己跟新密码保持一致即可
	 /*$('.text#confirmpw').focus(function(){
		 $("#hintinfo").html("");
	     $('#pweditdlg #hintmsg').css("display","none");
		 $("#newpwinfo").html("");
	     $('#pweditdlg #newpwmsg').css("display","none");
	     $("#confirmpwinfo").html("");
	     $('#pweditdlg #confirmpwmsg').css("display","none");
		  var oldpw=$("#oldpw").val().trim();
	      var newpw = $('.text#newpw').val().trim();
		  if(newpw.length==''){
			 //$.messager.alert('提示', '新密码为空,请输入新密码！', 'show');
			 $("#newpwinfo").html("新密码为空,请输入新密码！");
		     $('#pweditdlg #newpwmsg').css("display","block");
		     return false;
		  }else if(newpw.length<6){
				 //$.messager.alert('提示', '新密码为空,请输入新密码！', 'show');
				 $("#newpwinfo").html("新密码的长度至少6位");
			     $('#pweditdlg #newpwmsg').css("display","block");
			     return false;
		 }
	 });*/
	
	// 提交表单的时候  去检测原密码的正确性
	$('.btnalter#ok').click(function(){
	 
		var lname = $('#lname').val().trim();
		if(lname.length==''){
			   $("#lnameinfo").html("用户名为空,请输入用户名！");
			   $('#mianpweditdlg #lnamemsg').css("display","block");
			   return false;
		}
		else if(lname!=''){
			   $.ajax({
					url : '/ManagementCenter/user/User_confirmLname.do',
					type : 'POST',
					data : {
						lname :lname
					},
					dataType : 'json',
					success : function(result) {
						var json = eval("(" + result + ")");
						if (json) {
							$("#lnameinfo").html("");
						     $('#mianpweditdlg #lnamemsg').css("display","none");
						} else {
							 $("#lnameinfo").html("用户名不存在！");
						     $('#mianpweditdlg #lnamemsg').css("display","block");
							return false;
						}
					 },
					error : function(result) {
						$("#lnameinfo").html("用户名不存在！");
					     $('#mianpweditdlg #lnamemsg').css("display","block");
						return false;
				  }
				});
		 }	
		
	     var oldpw = $('#oldpw').val().trim();
	     if(oldpw==''){
	    	 $("#hintinfo").html("请输入原密码！");
	    	 $('#mianpweditdlg #hintmsg').css("display","block");
		     return false;
		 }else{
			 checkOldPwd(oldpw);
		 }
	     if(sii){
	    	 var newpw = $('.text#newpw').val().trim();
	    	 var confirmpw =  $('.text#confirmpw').val().trim();
	    	 if(newpw.length>=6&&validateStrAndNo(newpw)){
	    		 $("#newpwinfo").html("");
			     $('#mianpweditdlg #newpwmsg').css("display","none");
	    	 }
	    	 if(confirmpw.length>=6&&validateStrAndNo(confirmpw)&&newpw == confirmpw){
	    		 $("#confirmpwinfo").html("");
			     $('#mianpweditdlg #confirmpwmsg').css("display","none");
	    	 }
	    	 if(newpw == '' ){
	    		 $("#newpwinfo").html("新密码为空,请输入新密码！");
			     $('#mianpweditdlg #newpwmsg').css("display","block");
			     return false;
	    	 }
	    	 else if(newpw.length<6){
	    		 $("#newpwinfo").html("新密码的长度至少6位");
			     $('#mianpweditdlg #newpwmsg').css("display","block");
			     return false;
	    	 }
	    	 else if(confirmpw == '' ){
	    		 $("#confirmpwinfo").html("确认密码为空,请输入新密码！");
			     $('#mianpweditdlg #confirmpwmsg').css("display","block");
			     return false;
	    	 }
	    	 else if(confirmpw.length<6){
	    		 $("#confirmpwinfo").html("确认密码的长度至少6位");
			     $('#mianpweditdlg #confirmpwmsg').css("display","block");
			     return false;
	    	 }
	    	 else if(newpw != confirmpw){
	    		 $("#confirmpwinfo").html("2次密码必须一致");
			     $('#mianpweditdlg #confirmpwmsg').css("display","block");
			     return false;
	    	 }
	    	 if(!validateStrAndNo(newpw)){
	    		 $("#newpwinfo").html("新密码只允许输入数字和英文");
			     $('#mianpweditdlg #newpwmsg').css("display","block");
			     return false;
	    	 }
	    	 if(validateStrAndNo(confirmpw)==false){
	    		 $("#cvalidateStrAndNoonfirmpwinfo").html("新密码只允许输入数字和英文");
			     $('#mianpweditdlg #confirmpwmsg').css("display","block");
			     return false;
	    	 }
	    	 
	    	 $.ajax({
	    			url : '/ManagementCenter/user/User_confirmBeforeLoginPassword.do',
	    			type : 'POST',
	    			data : {
	    				pw :oldpw,
	    				lname:lname
	    			},
	    			dataType : 'json',
	    			success : function(result) {
	    				var json = eval("(" + result + ")");
	    				sii = json;
	    				if (json) {
	    					$("#hintinfo").html("");
	    					$('#mianpweditdlg #hintmsg').css("display","none");
	    					$.ajax({
	    						url : '/ManagementCenter/user/User_changeBeforeLoginPassword.do',
	    						type : 'POST',
	    						data : {
	    							pw : confirmpw,
	    							lname:lname
	    						},
	    						dataType : 'json',
	    						success : function(result) {
	    							var json = eval("(" + result + ")");
	    							if (json) {
	    								 $.messager.alert('提示', '密码修改成功！', 'show');
	    								 $('#mianpweditdlg').dialog('close');
	    							} else {
	    								$.messager.alert('提示', '密码修改失败！', 'show');
	    							}
	    						  },
	    					   error : function(result) {
	    							$.messager.alert('提示', '密码修改失败！', 'show');
	    						  }
	    					});
	    				} else {
	    					$("#hintinfo").html("您输入的原密码错误");
	    					$('#mianpweditdlg #hintmsg').css("display","inline");
	    					return false;
	    				}
	    				
	    			 },
	    			error : function(result) {
	    				$("#hintinfo").html("您输入的原密码错误");	
	    				$('#mianpweditdlg #hintmsg').css("display","inline");
	    				return false;
	    		  }
	    		});
		  }
	});
	
});
function checkOldPwd(oldpw){
	var lname = $('#lname').val().trim();
	   if(lname==''){
		   $("#lnameinfo").html("用户名为空,请输入用户名！");
		     $('#mianpweditdlg #lnamemsg').css("display","block");
		   return false;
	   }
	   else if(lname!=''){
		   $.ajax({
				url : '/ManagementCenter/user/User_confirmBeforeLoginPassword.do',
				type : 'POST',
				data : {
					lname:lname,
					pw :oldpw
				},
				dataType : 'json',
				success : function(result) {
					var json = eval("(" + result + ")");
					sii = json;
					if (json) {
						$("#hintinfo").html("");
						$('#mianpweditdlg #hintmsg').css("display","none");
						return true;
					} else {
						$("#hintinfo").html("您输入的原密码错误");
						$('#mianpweditdlg #hintmsg').css("display","inline");
						return false;
					}
				 },
				error : function(result) {
					$("#hintinfo").html("您输入的原密码错误");	
					$('#mianpweditdlg #hintmsg').css("display","inline");
					return false;
			  }
			});
	   }
}

function validateStrAndNo(str) {
	var reg = /^[a-zA-Z0-9]+$/; 
	var lastReg=/\.$/;
	if(reg.test(str)){
		if(lastReg.test(str))
			return false;
		else
			return true;
	}
	else{
		return false;
	} 
}

function alterPW() {
	 $('#lname').val("");
	if ($("#menu_bar").hasClass("son-div")) {
		$("#menu_bar").removeClass("son-div");
		$('#menu_bar').css("visibility", 'visible');
	} else {
		$("#menu_bar").addClass("son-div");
		$('#menu_bar').css("visibility", 'hidden');
	}
	
	$('#mainFormDiv').css("display", "block");
	$('input.text#oldpw').val("");
	$('#mainFormDiv').css("display", "block");
	$('input.text#newpw').val("");
	$('input.text#confirmpw').val("");
	
	$("#lnameinfo").html("");
	$("#mianpweditdlg #lnamemsg").css("display","none");
	
	$("#hintinfo").html("");
	$("#mianpweditdlg #hintmsg").css("display","none");
	
	$("#newpwinfo").html("");
	$("#mianpweditdlg #newpwmsg").css("display","none");
	
	$("#confirmpwinfo").html("");
	$("#mianpweditdlg #confirmpwmsg").css("display","none");
	
	$('#mianpweditdlg').dialog('open').show();
}