		var css3arr = new Array("-webkit-","-moz-","-o-","-ms-","");
	//获取画布
		var	$canvas = $("#huabu");
		//获取画布 宽高
		var canvasw = $canvas.css("width");
		canvasw = canvasw.substring(0,canvasw.length-2);
		var canvash = $canvas.css("height");
		canvash = canvash.substring(0,canvash.length-2);
	//控制缩放
	function canvasZoom(){
		//获取画布父级
		var $canvasBaba = $(".looksee");
		var bbw = $canvasBaba.css("width");
		bbw = bbw.substring(0,bbw.length-2);
		var bbh = $canvasBaba.css("height");
		bbh = bbh.substring(0,bbh.length-2);
		//父级宽度小于当前宽度时 w > h
		if(canvasw*(bbh/canvash) > bbw){
			$canvas.css({"transform":"matrix("+(bbw/canvasw)+",0,0,"+(bbw/canvasw)+",0,"+(bbh-(canvash*(bbw/canvasw)))/2+")"});
		}else{
			$canvas.css({"transform":"matrix("+(bbh/canvash)+",0,0,"+(bbh/canvash)+","+(bbw-(canvasw*(bbh/canvash)))/2+",0)"});
		};
	};

	//页面加载后调整画布大小
	canvasZoom();

	//浏览器改变宽高 时 调整画布大小
	$(window).resize(function(){
		canvasZoom();
	});
