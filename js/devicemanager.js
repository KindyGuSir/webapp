		//单击显示隐藏 userbox
		$("#selectybtn").click(function() {
			if ($(this).attr('src') === '../../imgs/selectybtn.png') {
				// 盒子显示，图片切换到向下状态
				$("#singleOutBox").css({
					"display": "block"
				});
				$("#selectybtn").attr('src', '../../imgs/selectbtn.png');
				//鼠标移入改变样式
				$("#singleOutBox div").hover(function() {
					$(this).css({
						"background": "#6192d6"
					});
					$(this).find("a").css({
						"color": "#fff"
					});
				}, function() {
					$(this).css({
						"background": "#fff"
					});
					$(this).find("a").css({
						"color": ""
					});
				});
			} else {
				$('#selectybtn').attr('src', '../../imgs/selectybtn.png');
				$("#singleOutBox").css({
					"display": "none"
				});
			};
		});

		// 默认h3标题显示
		$('#firstpane .menu_body:eq(0)').show();
		$('#firstpane .menu_body:eq(1)').show();
		$('#firstpane .menu_body:eq(2)').show();
		$('#firstpane .menu_body:eq(3)').show();
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
		// 初始显示页面
		var controlDiv = document.getElementById('firstpane').getElementsByTagName('div')[0];
		var controlSpan = controlDiv.getElementsByTagName('span')[0];
		controlSpan.click();