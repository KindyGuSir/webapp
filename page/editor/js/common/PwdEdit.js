var sii = false;
$(function(){
   
   var confrmpw;
   // 旧密码的输入框获取焦点的时候  1：旧密码的提示信息请空
   /*$('.text#oldpw').focus(function(){
	   var olnmim = $('.text#oldpw').val().trim();
   });*/
   
   $('.text#oldpw').blur(function(){
	   var oldpw = $('#oldpw').val().trim();
	   if(oldpw.length==''){
			 //$.messager.alert('提示', '新密码为空,请输入新密码！', 'show');
			 $("#hintinfo").html("旧密码为空,请输入旧密码！");
		     $('#pweditdlg #hintmsg').css("display","block");
		     return false;
		  }else{
			  $.ajax({
					url : '/ManagementCenter/user/User_confirmPassword.do',
					type : 'POST',
					data : {
						pw :oldpw
					},
					dataType : 'json',
					success : function(result) {
						var json = eval("(" + result + ")");
						sii = json;
						if (json) {
							$("#hintinfo").html("");
							$('#pweditdlg #hintmsg').css("display","none");
							return true;
						} else {
							$("#hintinfo").html("您输入的原密码错误");
							$('#pweditdlg #hintmsg').css("display","inline");
							return false;
						}
					 },
					error : function(result) {
						$("#hintinfo").html("您输入的原密码错误");	
						$('#pweditdlg #hintmsg').css("display","inline");
						return false;
				  }
				});
		 }
   });
   
   $('.text#newpw').blur(function(){
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
		 }else if(!validateStrAndNo(newpw)){
			 $("#newpwinfo").html("新密码只允许输入数字和英文");
		     $('#pweditdlg #newpwmsg').css("display","block");
		     return false;
		 }else if(newpw!='' && newpw.length>=6 && validateStrAndNo(newpw)){
			 $("#newpwinfo").html("");
		     $('#pweditdlg #newpwmsg').css("display","none");
		 }
   });
   
   $('.text#confirmpw').blur(function(){
	   var newpw = $('.text#newpw').val().trim();
  	 	var confirmpw =  $('.text#confirmpw').val().trim();
	     if(confirmpw == '' ){
	  		 $("#confirmpwinfo").html("确认密码为空,请输入新密码！");
			     $('#pweditdlg #confirmpwmsg').css("display","block");
			     return false;
	  	 }
	  	 else if(confirmpw.length<6){
	  		 $("#confirmpwinfo").html("确认密码的长度至少6位");
			     $('#pweditdlg #confirmpwmsg').css("display","block");
			     return false;
	  	 }
	  	 else if(newpw!='' && newpw != confirmpw){
	  		 	$("#confirmpwinfo").html("2次密码必须一致");
			     $('#pweditdlg #confirmpwmsg').css("display","block");
			     return false;
	  	 }else if(!validateStrAndNo(confirmpw)){
			 $("#confirmpwinfo").html("确认密码只允许输入数字和英文");
		     $('#pweditdlg #confirmpwmsg').css("display","block");
		     return false;
		 }else if(confirmpw!='' && confirmpw.length>=6 && validateStrAndNo(confirmpw)){
			 $("#confirmpwinfo").html("");
		     $('#pweditdlg #confirmpwmsg').css("display","none");
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
	 
	     var oldpw = $('#oldpw').val().trim();
	     if(oldpw==''){
	    	 $("#hintinfo").html("请输入原密码！");
		     //$.messager.alert('提示', '请输入原密码！', 'show');
	    	 $('#pweditdlg #hintmsg').css("display","block");
		     return false;
		 }else{
			 checkOldPwd(oldpw);
		 }
	     if(sii){
	    	 var newpw = $('.text#newpw').val().trim();
	    	 var confirmpw =  $('.text#confirmpw').val().trim();
	    	 if(newpw.length>=6&&validateStrAndNo(newpw)){
	    		 $("#newpwinfo").html("");
			     $('#pweditdlg #newpwmsg').css("display","none");
	    	 }
	    	 if(confirmpw.length>=6&&validateStrAndNo(confirmpw)&&newpw == confirmpw){
	    		 $("#confirmpwinfo").html("");
			     $('#pweditdlg #confirmpwmsg').css("display","none");
	    	 }
	    	 if(newpw == '' ){
	    		 $("#newpwinfo").html("新密码为空,请输入新密码！");
			     $('#pweditdlg #newpwmsg').css("display","block");
			     return false;
	    	 }
	    	 else if(newpw.length<6){
	    		 $("#newpwinfo").html("新密码的长度至少6位");
			     $('#pweditdlg #newpwmsg').css("display","block");
			     return false;
	    	 }
	    	 else if(confirmpw == '' ){
	    		 $("#confirmpwinfo").html("确认密码为空,请输入新密码！");
			     $('#pweditdlg #confirmpwmsg').css("display","block");
			     return false;
	    	 }
	    	 else if(confirmpw.length<6){
	    		 $("#confirmpwinfo").html("确认密码的长度至少6位");
			     $('#pweditdlg #confirmpwmsg').css("display","block");
			     return false;
	    	 }
	    	 else if(newpw != confirmpw){
	    		 $("#confirmpwinfo").html("2次密码必须一致");
			     $('#pweditdlg #confirmpwmsg').css("display","block");
			     return false;
	    	 }
	    	 if(!validateStrAndNo(newpw)){
	    		 $("#newpwinfo").html("新密码只允许输入数字和英文");
			     $('#pweditdlg #newpwmsg').css("display","block");
			     return false;
	    	 }
	    	 if(validateStrAndNo(confirmpw)==false){
	    		 $("#cvalidateStrAndNoonfirmpwinfo").html("新密码只允许输入数字和英文");
			     $('#pweditdlg #confirmpwmsg').css("display","block");
			     return false;
	    	 }
	    	 
	    	 $.ajax({
	    			url : '/ManagementCenter/user/User_confirmPassword.do',
	    			type : 'POST',
	    			data : {
	    				pw :oldpw
	    			},
	    			dataType : 'json',
	    			success : function(result) {
	    				var json = eval("(" + result + ")");
	    				sii = json;
	    				if (json) {
	    					$("#hintinfo").html("");
	    					$('#pweditdlg #hintmsg').css("display","none");
	    					$.ajax({
	    						url : '/ManagementCenter/user/User_changePassword.do',
	    						type : 'POST',
	    						data : {
	    							pw : confirmpw
	    						},
	    						dataType : 'json',
	    						success : function(result) {
	    							var json = eval("(" + result + ")");
	    							if (json) {
	    								 $.messager.alert('提示', '密码修改成功！', 'show');
	    								 $('#pweditdlg').dialog('close');
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
	    					$('#pweditdlg #hintmsg').css("display","inline");
	    					return false;
	    				}
	    				
	    			 },
	    			error : function(result) {
	    				$("#hintinfo").html("您输入的原密码错误");	
	    				$('#pweditdlg #hintmsg').css("display","inline");
	    				return false;
	    		  }
	    		});
		  }
	});
	
});
function checkOldPwd(oldpw){
	$.ajax({
		url : '/ManagementCenter/user/User_confirmPassword.do',
		type : 'POST',
		data : {
			pw :oldpw
		},
		dataType : 'json',
		success : function(result) {
			var json = eval("(" + result + ")");
			sii = json;
			if (json) {
				$("#hintinfo").html("");
				$('#pweditdlg #hintmsg').css("display","none");
				return true;
			} else {
				$("#hintinfo").html("您输入的原密码错误");
				$('#pweditdlg #hintmsg').css("display","inline");
				return false;
			}
		 },
		error : function(result) {
			$("#hintinfo").html("您输入的原密码错误");	
			$('#pweditdlg #hintmsg').css("display","inline");
			return false;
	  }
	});
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