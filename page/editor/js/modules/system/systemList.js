$(document).ready(function(){
    $('.system_tool #save').css("display","block");
    $('.system_tool #cancel').css("display","block");
	setFlag();
});
//给页面的checkbox加上标示符
function setFlag(){
	$.ajax({
		url:'${pageContext.request.contextPath}/system/System_getFlag.do',
		type:'POST',
		data:{},
		dataType:'json',
		success:function(result){
			var json=eval('('+result+')');
			var ps=json.programstatus;
			var rs=json.recourcestatus;
			var cs=json.cleanstatus;
			if(ps=="1"){

				document.getElementById("program").checked=true;
			}else{
				document.getElementById("program").checked=false;
			}
			if(rs=="1"){
				document.getElementById("resource").checked=true;
			}else{
				document.getElementById("resource").checked=false;
			}
			if(cs=="1"){

				document.getElementById("clean").checked=true;
			}else{
				document.getElementById("clean").checked=false;
			}
		}
	});
}
//上传授权文件
function licenseupload(){

	$('#license_uploaddlg').dialog('open');

}
//下载授权文件
function licensedownload(){
	window.location.href="/ManagementCenter/system/System_downloadLicense.do";
}
//保存修改
function saveEdit(){
	var program;
	var resource;
	var clean;
	var flag=$('#flag').val();
	var reg = $('#registration').val();
	if (flag=='2'){//授权节点点击时已经置成2,点击其他模块重置为1
		if(reg==''){
			$.messager.alert('提示', '请输入授权码', 'info');
			return;
		}
		$.ajax({
			url:'${pageContext.request.contextPath}/system/System_registration.do',
			type:'POST',
			data:{registration:reg},
			dataType:'json',
			success:function(data){
                if (data.message=="success" ) {
                    var playercount = data.playerCount;
                    $('div#count.playercount').html(playercount);//设置可用播放器数量
                    $('#registration').val("");//将注册码置空
                    //授权成功后隐藏授权码输入框和保存按钮
                    $('#div_registration').css("display","none");
                    $('#save').css("display","none");
                    /*					$.messager.confirm('提示信息', '授权成功，请重新登录', function(data1) {
                     if (data1) {
                     //授权成功注销后重新登录生效
                     window.location.href="/ManagementCenter/home/Home_logout.do";
                     }
                     });*/
                }else{
                    $.messager.alert('提示', '授权失败!</br>错误信息：'+data.message, 'info');
                }
			}
		})
	}else {
        if (document.getElementById("program").checked == true) {
            program = "1";
        } else {
            program = "0";
        }
        if (document.getElementById("resource").checked == true) {
            resource = "1";
        } else {
            resource = "0";
        }
        if (document.getElementById("clean").checked == true) {
            clean = "1";
        } else {
            clean = "0";
        }
        $.ajax({
            url: '${pageContext.request.contextPath}/system/System_queryUnverifyRes.do',
            type: 'POST',
            data: {},
            dataType: 'json',
            success: function (result) {
                var json = eval('(' + result + ')');
                if (json > 0 && resource == 0) {
                    $.messager.confirm('提示信息', '取消资源审核会导致' + json + '条数据被置为已审核状态 !</br>是否继续?', function (data) {
                        if (data) {
                            $.ajax({
                                url: '${pageContext.request.contextPath}/system/System_save.do',
                                type: 'POST',
                                data: {
                                    program: program,
                                    resource: resource,
                                    clean: clean
                                },
                                dataType: 'json',
                                success: function (result) {
                                    var json = eval('(' + result + ')');
                                    if (json) {
                                        $.messager.alert('提示', '保存成功', 'info');
                                        setFlag();
                                    } else {
                                        $.messager.alert('提示', '保存失败', 'info');
                                        setFlag();
                                    }
                                }
                            });
                        } else {
                            return;
                        }
                    });
                } else {
                    var sign = $("#settingsign").val();
                    if (sign == 'attendance') {
                        var attendancetime = $("#attendancetime").val();
                        if (attendancetime == '') {
                            $.messager.alert('提示', '考勤时间不能为空!', 'info');
                            return;
                        }
                        $.ajax({
                            url: '${pageContext.request.contextPath}/system/System_saveattendancetime.do',
                            type: 'POST',
                            data: {
                                attendancetime: attendancetime
                            },
                            dataType: 'json',
                            success: function (result) {
                                if (result != "") {
//								var json=eval('('+result+')');
//								if(json){
//									$.messager.alert('提示', '保存成功', 'info');
//									$("#attendancetime").val(result);
//									setFlag();
//								}else{
//									$.messager.alert('提示', '保存失败', 'info');
//									setFlag();
//								}

                                    $.messager.alert('提示', '保存成功', 'info');
                                    $("#attendancetime").val(result);
                                    setFlag();
                                }
                            }
                        });
                    } else {
                        $.ajax({
                            url: '${pageContext.request.contextPath}/system/System_save.do',
                            type: 'POST',
                            data: {
                                program: program,
                                resource: resource,
                                clean: clean
                            },
                            dataType: 'json',
                            success: function (result) {
                                var json = eval('(' + result + ')');
                                if (json) {
                                    $.messager.alert('提示', '保存成功', 'info');
                                    setFlag();
                                } else {
                                    $.messager.alert('提示', '保存失败', 'info');
                                    setFlag();
                                }
                            }
                        });
                    }
                }
            }
        });
    }
}

