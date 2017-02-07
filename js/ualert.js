
//提交
$(".determine").bind("click",function(){
});
//取消显示弹框
$(".cancel").bind("click",function(){
});
//显示 隐藏下级分组
$(".g-list > ul p span").unbind("click");
$(".g-list > ul p span").bind("click",function(){
	var lif = $(this).parent().parent();
	if(lif.find("ul").length != 0){
		if(lif.children("ul").is(":hidden")){
			$(this).css({"background-position":"0% 100%"});
			lif.children("ul").show();
		}else{
			$(this).css({"background-position":"0% 0%"});
			lif.children("ul").hide();
		};
	};
});
// 单个添加
function add(){
	$(".g-list > ul > li > ul > li").unbind("click");
	$(".g-list > ul > li > ul > li").bind("click",function(event){
		var astr =
		'<li>'
		+'	<span>'+$(this).children("span").text()+'</span>'
		+'	<a href="javascript:"></a>'
		'</li>';
		$("#ng-list").append(astr);//添加DOM
		del();//新元素绑定事件
	});
}

//批量添加
function adds(){
	$(".g-list p > a").unbind("click");
	$(".g-list p > a").bind("click",function(){
		//下级元素不存在时查询下级元素
		if($(this).parent().next("ul").length != 0){
			$(this).parent().next("ul").find("li").each(function(){
				var listr =
				'<li>'
				+'	<span>'+$(this).find("span").text()+'</span>'
				+'	<a class="uid111" href="javascript:"></a>'
				+' </li>';
				$("#ng-list").append(listr);
			});
		};
		del();//新元素绑定删除事件
	});
}
//删除组员
function del(){
	$("#ng-list a").bind("click");
	$("#ng-list a").bind("click",function(){
		var did = $(this).attr("class");
		$(this).parent().remove();//删除DOM
	});
};




//搜索
// $(".r-search > a").unbind("click");
// $(".r-search > a").bind("click",function(){
// 	var sv = $.trim($(this).prev().val());
// 	// 验证不为空
// 	if(sv != "" && sv != null && sv != undefined){
// 		var str =
// 		'<li>'
// 		+'	<ul>'
// 		+'		<li>'
// 		+'		<span>'+sv+'</span>'
// 		+' 	</li>'
// 		+'</ul>'
// 		+'</li>';
// 		$(".g-list > ul").html(str);
// 		add();//绑定添加事件
// 		$(".g-list ul").show();
// 	};
// });
function constructUalert(){
	add();
	adds();
	del();
};
constructUalert();