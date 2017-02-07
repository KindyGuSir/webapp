		//单击显示隐藏 userbox
		$("#selectybtn").bind("click",function(){
			if($("#singleOutBox").is(":hidden")){
				$("#selectybtn").css({"background-position":"0% 100%"});
				$("#singleOutBox").show();
			}else{
				$("#selectybtn").css({"background-position":"0% 0%"});
				$("#singleOutBox").hide();
			};
		});

		// 默认h3标题显示
		$('#firstpane .menu_body:eq(0)').show();
		$('#firstpane .menu_body:eq(1)').show();
		// 抽屉切换
		$('#firstpane h3.menu_head').click(function() {
			var txt = $(this).next('div.menu_body');
			var _this = this;
			// 如果当前menu_body不可见
			if (!txt.is(":visible")) {
				$(_this).next('div.menu_body').slideDown(500);
			} else {
				$(_this).next('div.menu_body').slideUp(500);
			}
		});
	//iframe 切换
	function targetRight(trUrl) {
		var iframe = document.getElementsByTagName('iframe')[0];
		iframe.src = trUrl;
	}