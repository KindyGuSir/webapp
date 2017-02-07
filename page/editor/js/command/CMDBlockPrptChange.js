/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-24
 * Time: 下午2:15
 * To change this template use File | Settings | File Templates.
 */


var CMDBlockPrptChange = function (id,prptName,oldVal,newVal){

	if(prptName == 'tymdhms'){
	console.log("nidaye")

	// 倒计时  天
		this.util = IWIN.util;
		this.elId = id;
		var wander = this.util.byId(this.elId);
		var w = 326;
		var h = 64;
		wander.innerHTML = '<div class="editItem26" ><div class="COUNTDOWN_COMP_src"><span class="countdowntime" id="cddd">00</span><span class="countdowndate">天</span><span class="countdowntime" id="cddh">00</span><span class="countdowndate">时</span><span class="countdowntime" id="cdddm">00</span><span class="countdowndate">分</span><span class="countdowntime" id="cdds">00</span><span class="countdowndate">秒</span></div></div>';
		//var newwidth = wander.offsetWidth;
		//var newheight = wander.offsetHeight;
		var o = JSON.parse(wander.params);
		var neww=document.getElementById("iframe").contentDocument.getElementById("wVal").value;
		var newh=document.getElementById("iframe").contentDocument.getElementById("hVal").value;
		//console.log("=============width--"+w+"--height--"+h+"-----neww="+neww)
		if(neww>=w)
		{
			w=neww
		}
		if(newh>=h)
		{
			h=newh
		}
		wander.style.width = w + 'px' ;
		wander.style.height = h + 'px' ;
		 /*if(oldwidth/oldheight>w/h){
			 wander.style.height = oldheight + 'px' ;
		        wander.style.width = w*oldheight/h + 'px' ;
		        wander.style.height = h + 'px' ;
		    wander.style.width = w*newheight/h + 'px' ;
		}else{
		    	wander.style.width = oldwidth + 'px' ;
		    	wander.style.height = h*oldwidth/w + 'px' ;
		}*/
		//if(newwidth/newheight>w/h){
		//	wander.style.height = newheight + 'px' ;
	     //   wander.style.width = w*newheight/h + 'px' ;
		//}else{
		//	wander.style.width = newwidth + 'px' ;
	    	//wander.style.height = h*newwidth/w + 'px' ;
		//}
		//o.w = wander.offsetWidth;
		//o.h = wander.offsetHeight;
		wander.children[0].children[0].style.width = wander.style.width;
		wander.children[0].children[0].style.height = wander.style.height;
		wander.children[0].children[0].style.lineHeight = wander.style.height;
//		wander.style.width = oldwidth + 'px' ;
//		wander.style.height = oldheight + 'px';
		var chl = wander.children[0].children[0].children;
		if(chl.length > 0){
			for(var i =0;i<chl.length;i++){
				if(chl[i].className == 'countdowndate'){
					chl[i].style.color = o.fontcolor;
				}else if(chl[i].className == 'countdowntime'){
//					chl[i].style.color = o.numbercolor;
					chl[i].style.color = o.fontcolor;
				}
			}
		}
		
		 IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
	     IWIN.BlockOpr.setSize(wander.offsetWidth,wander.offsetHeight);
	     if(IWIN.PropertyBar)IWIN.PropertyBar.setSize(wander.offsetWidth,wander.offsetHeight);
		
		IWIN.Request.updateBlockReq(wander);
		console.log("nidayede")
	}else if(prptName == 'tymd'){ // 倒计时  天时分秒
		this.util = IWIN.util;
		this.elId = id;
		var wander = this.util.byId(this.elId);
		var w = 109;
		var h = 64;
		wander.innerHTML = '<div class="editItem26" ><div class="COUNTDOWN_COMP_src"><span class="countdowntime" id="cdy">000</span><span class="countdowndate">天</span></div></div>';
		
		//var newwidth = wander.offsetWidth;
		//var newheight = wander.offsetHeight;
		
		var o = JSON.parse(wander.params);
		
		//if(newwidth/newheight>w/h){
		//	wander.style.height = newheight + 'px' ;
	     //   wander.style.width = w*newheight/h + 'px' ;
		//}else{
		//	wander.style.width = newwidth + 'px' ;
	    	//wander.style.height = h*newwidth/w + 'px' ;
		//}
		var neww=document.getElementById("iframe").contentDocument.getElementById("wVal").value;
		var newh=document.getElementById("iframe").contentDocument.getElementById("hVal").value;
		//console.log("=============width--"+w+"--height--"+h+"-----neww="+neww)
		if(neww>=w)
		{
			w=neww
		}
		if(newh>=h)
		{
			h=newh
		}
		wander.style.width = w + 'px' ;
		wander.style.height = h + 'px' ;
		wander.children[0].children[0].style.width = wander.style.width;
		wander.children[0].children[0].style.height = wander.style.height;
		wander.children[0].children[0].style.lineHeight = wander.style.height;
		var chl = wander.children[0].children[0].children;
		if(chl.length > 0){
			for(var i =0;i<chl.length;i++){
				if(chl[i].className == 'countdowndate'){
					chl[i].style.color = o.fontcolor;
				}else if(chl[i].className == 'countdowntime'){
//					chl[i].style.color = o.numbercolor;
					chl[i].style.color = o.fontcolor;
				}
			}
		}

	//	console.log("dddddddddddddddddddddd")
		 IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
	     IWIN.BlockOpr.setSize(wander.offsetWidth,wander.offsetHeight);
	     if(IWIN.PropertyBar)IWIN.PropertyBar.setSize(wander.offsetWidth,wander.offsetHeight);
		
		
		IWIN.Request.updateBlockReq(wander);
	}
	else if(prptName == 'isdataflow'){					//add by haoyc DataFlow升级 20160318
		this.elId = id;
		this.util = IWIN.util;
		this.prptName = prptName;
		this.oldVal = oldVal;
		this.newVal = newVal;
		var wander = this.util.byId(this.elId);
		var json=eval('('+wander.params+')');
		wander.getElementsByClassName('TEXT_COMP_ISDTF').item(0).innerText=newVal;
		IWIN.Request.updateBlockReq(wander);
	}else if(prptName=='rftime'){		//add by haoyc DataFlow升级 20160325
		debugger;
		this.elId = id;
		this.util = IWIN.util;
		this.prptName = prptName;
		this.oldVal = oldVal;
		this.newVal = newVal;
		var wander = this.util.byId(this.elId);
		wander.getElementsByClassName('TEXT_COMP_RFTIME').item(0).innerText=newVal;
		IWIN.Request.updateBlockReq(wander);
	}
	else{

		this.elId = id;
	    this.util = IWIN.util;
	    //console.log(oldVal+'==============='+newVal);
	    this.prptName = prptName;
	    this.oldVal = oldVal;
	    this.newVal = newVal;
	    // 修改轮播的所见所得
	    var wander = this.util.byId(this.elId);
	    if(prptName=='ppt_path'){ // 如果是PPT
	    	wander.children[0].children[0].src = newVal.mapped;
	    }else{

	    	var jsonobj = eval('('+wander.params+')');
			//console.log("nnnnnnnnnnnnnnnnnnnnnn"+wander.innerHTML )
	        if(jsonobj.imgLoop!=null){
	        	if(jsonobj.imgLoop.length > 0){
	        		wander.children[0].children[0].src = jsonobj.imgLoop[0].mapped;
					//console.log("pppppppppppppppppppp")
	        	}
	        }
	    }
	    //  右侧 三个轮播图 选择图片   添加的时候  如果文件过大   会存在暂不显示的问题
	    if(wander.type_id == '4' || wander.type_id == '9' || wander.type_id == '8'|| wander.type_id == '18' || wander.type_id == '15' ||  wander.type_id == '11'){
	        // 胖子加一个div遮罩

	    	var elb = document.getElementsByTagName('body')[0];

		    var el0 = document.createElement("div");
		    el0.className="loading0";
		    el0.style.cssText = "height:100%;width:100%;position:absolute;left:0;top:0;display:block;z-index:998;background-color:#333;opacity:0.5;";
		    var el = document.createElement("div");
		    el.className="loading1";
		    el.style.cssText = "height:100px;width:100px;position:absolute;left:50%;top:40%;display:block;z-index:999;margin-left:-50px;margin-top:-50px;";
			el.style.backgroundImage="url(images/iwinload.gif)";
			elb.appendChild(el);
			elb.appendChild(el0);
	    }
	    if(prptName=='ppt_path'){ // 如果是PPT
	    	IWIN.BlockOpr.setCurObj(IWIN.BlockOpr.getCurObj());
	    	IWIN.Request.selectPptReq(IWIN.BlockOpr.getCurObj().id,IWIN.BlockOpr.getCurObj(),newVal.mapped,newVal.path);
	    }else{
			IWIN.Request.updateBlockReq(wander);

	    }
	}
};
CMDBlockPrptChange.prototype = {
    constructor : CMDBlockPrptChange,
    undo : function (){
//        IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
//        IWIN.BlockOpr.setProperty(this.prptName,this.oldVal);
//        if(IWIN.PropertyBar)IWIN.PropertyBar.setVal(this.prptName,this.oldVal);
//        IWIN.Request.updateBlockReq(this.util.byId(this.elId));
    },
    redo : function (){
//        IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
//        IWIN.BlockOpr.setProperty(this.prptName,this.newVal);
//        if(IWIN.PropertyBar)IWIN.PropertyBar.setVal(this.prptName,this.newVal);
//        IWIN.Request.updateBlockReq(this.util.byId(this.elId));
    },
    destroy : function (){
        this.util = null;
        this.elId = null;
        this.prptName = null;
        this.oldVal = null;
        this.newVal = null;
    }
};

