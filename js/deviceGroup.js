//名称长度限制
var groupNameMax = 10;
var totalPage = 0;
var group_id = 0;

//表格操作
function tables(){
    // 单选样式改变
    $("#g-tab td input").each(function(){
        $(this).unbind("click");
        $(this).bind("click",function(){
            if($(this).prop("checked")){
                $(this).parent().parent().css({"background":"#f9f9f9"});
            }else{
                $(this).parent().parent().css({"background":""});
            };
            showdel();
        });
    });
    //是否显示删除按钮
    function showdel(){
        var num = 0;
        $("#g-tab td input").each(function(){
            if($(this).prop("checked")){
                num += 1;
            }
        });
        // 选中条数等于总条数显示 全选=true
        if($("#g-tab td input").length == num){
            $("#allt input").prop("checked",true);
        }else{
            $("#allt input").prop("checked",false);
        };
        // 选中条数大于零显示删除按钮
        if(num == 0){
            $("#del").css({"visibility":"hidden"});
        }else{
            $("#del").css({"visibility":"visible"});
        };
        //显示选中条数
        $("#senum").html(num);
    }
    // 全选 取消全选
    $("#allt input").unbind("click");
    $("#allt input").bind("click",function(){
        if($("#allt input").prop("checked")){
            $("#g-tab td input").prop("checked",true);
            $("#g-tab td input").parent().parent().css({"background":"#f9f9f9"});
        }else{
            $("#g-tab td input").prop("checked",false);
            $("#g-tab td input").parent().parent().css({"background":""});
        }
        showdel();//显示选中条数
    });

    //删除选中组员
    $("#del").unbind("click");
    $("#del").bind("click",function(){
    });

    // 激活状态
    $("#g-tab tr td:nth-child(9) a").each(function(){
        if($(this).html() == "未激活"){
            $(this).css({"color":"#f76c86"});
        };

        $(this).unbind("click");
        $(this).bind("click",function(){
            if ($(this).html() == "未激活") {
                $(this).html("已激活").css({"color":"#6082ee"});
            }else{
                $(this).html("未激活").css({"color":"#f76c86"});
            };
        });
    });
}

function c(i){
	console.log(i);
};

// 图标
// 有下级分组添 加图标
function addicon(){
	$("#group-se").find("li").each(function(){
	if($(this).find("li").length != 0){
			var fspan = $(this).children("div").children("span:first-child");
			if(fspan.children("a").length == 0){
				fspan.children("b").before('<a href="javascript:"></a>');
			};
		};
	});
};

// 添加删除组时 添加移除下拉图标
function aiconA(dom){
	// 下级存在组是 显示下拉按钮
	if(dom.find("ul").length != 0 && dom.find("span:first-child").find("a").length == 0){
		dom.children("div").find("b").before('<a href="javascript:"></a>');
	};
};
function aiconR(dom){
	// 删除之前收到的值 删除最后一位DOM元素时 移除上级 dom
	if(dom.children("ul").length == 1){
		dom.children("div").find("span:first-child").find("a").remove();
	};
};

//分组名称超出后显示...
$("#group-se li div > span > b").each(function(){
	if($(this).html().length > groupNameMax){
		$(this).html($.trim($(this).html()).substr(0,groupNameMax) + "...");
	}
});

// 显示分组
//显示下级分组
function showGroup(){
	$("#group-se div span:first-child").unbind("click");
	$("#group-se div span:first-child").bind("click",function(){


		//判断HTML存在下一级分组
		var pul = $(this).parent().parent().children("ul");
		if(pul.length != 0){
			var cda = $(this).children("a:first-child"); // 获取到 a (图标)
			if(pul.css("display") == "none"){
				cda.css({"background-position":"0% 100%"});
				pul.css({"display":"block"});
				//同级菜单隐藏下级元素
				pul.parent().parent().siblings("ul").find("ul").css({"display":"none"});
				pul.parent().parent().siblings("ul").find("div span:first-child").children("a").css({"background-position":"0% 0%"});
			}else{
				cda.css({"background-position":"0% 0%"});
				pul.css({"display":"none"});
			};
		};

        group_id = this.id;
        postAjax(group_id,1);
        if(totalPage > 0){
            $("#pagebar").show();
            build(group_id,totalPage,1,10)
        }else{
            $("#pagebar").hide();
        }


	});
};

function postAjax(id,page){
    var rootpath = $("#root_path").val();
    $.ajax({
        type:'post',
        url:rootpath + "/group/Group_getDeviceByGroupId.do",
        data:{'id':id,'page':page},
        async: false,
        success:function(data){

            var nodes= data.array;
            var len = nodes.length;
            totalPage = data.total;
            if(len > 0){
                var html = '<tr>'
                    +'<th id="allt"><input type="checkbox"></th>'
                    +    '<th>设备名称</th>'
                    +    '<th>IP</th>'
                    +    '<th>管理员</th>'
                    +    '<th>状态</th>'
                    +    '<th>更多信息</th>'
                    + '</tr>';
                for( var i = 0 ; i < len; i++){
                    var node = nodes[i];
                    html += '<tr>'
                        +'<td id="allt"><input type="checkbox"></td>'
                        +    '<td>'+node.name+'</td>'
                        +    '<td>'+node.ipAddress+'</td>'
                        +    '<td>'+node.users+'</td>'
                        +    '<td>在线</td>'
                        +    '<td>查看</td>'
                        + '</tr>';
                }

                var table = document.getElementById("g-tab");
                table.innerHTML = html;
                tables();


            }else{
                $("#data_num").hide();
                var table = document.getElementById("g-tab");
                table.innerHTML = "";
            }

        }
    });
}

function build(id,total,current,pagesize){
    $.jqPaginator('#pagination2', {
            totalPages:total ,
            visiblePages: pagesize,
            currentPage: current ,
        prev: '<li class="prev"><a href="javascript:;">上一页</a></li>',
        next: '<li class="next"><a href="javascript:;">下一页</a></li>',
        page: '<li class="page"><a href="javascript:;">{{page}}</a></li>',
        onPageChange: function (num, type) {
        if(type=="change"){
            postAjax(id,num);
        }

    }
});
}






// 编辑工具
function newGroup(){
	$(".reng").bind("click");
	$(".reng").bind("click",function(){
        var rootpath = $("#root_path").val();
        var id = this.id;
        var parent =  $(this).parent();
        var per = parent.prev();
        var oldname = per.find("b");
        $.ajax({
            type:'post',
            url:rootpath + "/group/Group_getGroupById.do",
            data:{'id':id,'type':'device'},
            async: false,
            success:function(data){
                var name = data.name;
                var id = data.id;

                layer.prompt({title: '重命名', formType: 0,value:name}, function(text, index){
                    layer.close(index);
                    name =  text;
                    oldname.text(name);
                    $.ajax({
                        type:'post',
                        url:rootpath + "/group/Group_updateGroup.do",
                        data:{'group.id':id,'group.type':'device','group.name':name},
                        async: false,
                        success:function(data){
                        }
                    });
                });

            }
        });

	});
	// 新建组
	$(".anug").unbind("click");
	$(".anug").bind("click",function(){
        var id = this.id;
        layer.prompt({title: '新建组', formType: 0}, function(text, index){
            layer.close(index);
            var name = text;

            var rootpath = $("#root_path").val();

            $.ajax({
                type:'post',
                url:rootpath + "/group/Group_addGroup.do",
                data:{'group.name':name,'group.type':'device','group.parentId':id},

                success:function(data){
                    location.href="/group/Group_groupList.do?type=device";

                }
            });
        });




	});
	//删除组
	$(".delg").unbind("click");
	$(".delg").bind("click",function(){
        var rootpath = $("#root_path").val();
        var id = this.id;
        $.ajax({
            type:'post',
            url:rootpath + "/group/Group_delGroup.do",
            data:{'id':id,'type':'device'},
            success:function(data){
                location.href="/group/Group_groupList.do?type=device";

            }
        });
	});

};



// 查看未分组
function	lookUnclassified(){
	$(".unclassified").bind("click",function(){
	});
}

function newpage(){
	showGroup(); //显示下级分组
	newGroup(); //编辑工具
}
