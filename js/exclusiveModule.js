// 缩放
		$(".zoom").bind("mousedown",function(event){
			$baba = $(this).parent();		//当前元素父级 obj
			fd = $(this).parent()[0];		//当前元素父级 html
			beforeX = event.pageX;		//鼠标按下定位X轴坐标
			beforeY = event.pageY;		//鼠标按下定位Y轴坐标
			fdw = fd.offsetWidth;
			fdh = fd.offsetHeight;
			$(document).bind("mousemove",function(ev){
				// 画布原大小 除以 缩放后的大小 得到像素的缩放比例
				pxzoom = huabu.offsetWidth / $huabu.width();
				var nX = pxzoom*(ev.pageX - beforeX);
				var nY = pxzoom*(ev.pageY - beforeY);
				// min w h
				bw = fdw + nX > boxMinWidth ? fdw + nX : boxMinWidth;
				bh = fdh + nY > boxMinHeight ? fdh + nY : boxMinHeight;
				 // max w h
				bw = (fd.offsetLeft + bw) > huabu.offsetWidth ? (huabu.offsetWidth - fd.offsetLeft) : bw;
				bh = (fd.offsetTop + bh) > huabu.offsetWidth ? (huabu.offsetWidth - fd.offsetTop) : bh;
				//缩放
				$baba.css({
					width: bw + "px",
					height: bh + "px"
				});
			});
		});
		// 专属模块同比缩放
		$(".ezoom").bind("mousedown",function(event){
			$baba = $(this).parent();		//当前元素父级 obj
			fd = $(this).parent()[0];		//当前元素父级 html
			beforeX = event.pageX;		//鼠标按下定位X轴坐标
			beforeY = event.pageY;		//鼠标按下定位Y轴坐标
			fdw = fd.offsetWidth;
			//获取矩阵 按比例显示宽度
			var matrix = $baba.css("transform");
			matrix = (matrix.substring(7,matrix.length-1)).split(",");
			fdw = fdw*matrix[0];

			fdh = fd.offsetHeight;
			$(document).bind("mousemove",function(ev){
				//获取专属版块 宽高
				var classArr = $baba.attr("class");
				classArr = classArr.split(" ");
				for(var i = 0;i < eminwh.length;i++){
					if(eminwh[i][0] == classArr[1]){
						eminwidth = eminwh[i][1];
						eminhidth = eminwh[i][2];
						break;
					};
				};
				// 画布原大小 除以 缩放后的大小 得到像素的缩放比例
				pxzoom = huabu.offsetWidth / $huabu.width();
				var nX = pxzoom*(ev.pageX - beforeX);
				var nY = pxzoom*(ev.pageY - beforeY);
				// min w h
				bw = (fdw) + nX > eminwidth ? (fdw) + nX : eminwidth;
				bh = (fdh) + nY > eminhidth ? (fdh) + nY : eminhidth;
				// max w h
				bw = (fd.offsetLeft + bw) > huabu.offsetWidth ? (huabu.offsetWidth - fd.offsetLeft) : bw;
				if(((bw*(eminhidth/ eminwidth)) + fd.offsetTop) < (huabu.offsetHeight)){
					bh = bw * (eminhidth/ eminwidth);
				}else{
					bh = huabu.offsetHeight - fd.offsetTop;
					bw = bh*(eminwidth/ eminhidth);
				};
				//同比缩放
				c( bw + " " + eminwidth + " " + (bw/eminwidth));
				if((bw)/(eminwidth) >= 1){
					$baba.css({"transform":"matrix("+(bw/eminwidth)+",0,0,"+(bw/eminwidth)+",0,0)"});
				}else{
						$baba.css({"transform":"matrix(1,0,0,1,0,0)"});
				};

			});
		});
		//移除缩放事件
		$(document).bind("mouseup",function(){
			$("this").unbind("mousedown");
		});