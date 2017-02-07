/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 13-12-24
 * Time: 下午4:20
 * To change this template use File | Settings | File Templates.
 */

/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-5-12
 * Time: 上午10:01
 * To change this template use File | Settings | File Templates.
 */

var CMDBlockAddPpt = function (list){
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.util = IWIN.util;
    var p = '';
    this.elIds = [];
    var w = this.mainBox.offsetWidth,h = this.mainBox.offsetHeight;
    for(var i=0;i<list.length;i++){
        var obj = list[i];
        p = obj;
        var typeObj = this.typeMap[obj.type];
        var item = IWIN.EditComponent.addBlock(typeObj.type);
        // 解决在控件栏 选择图片 图片清晰度不够的问题
        if(typeObj.type == '1'){ // ‘1’表示的是图片
        	 var o = {path:obj.path,mapped:obj.respath};
        }
        else{
       	 	item.children[0].children[0].src = obj.mapped;
//       	 	var a = IWIN.BlockOpr.getProperty('ppt_path');
//       	 	IWIN.BlockOpr.setProperty('ppt_path',obj.mapped);
        }
        // 上方的 ：PPt 添加的时候  如果文件过大   会存在暂不显示的问题
        if(typeObj.type == '18'){
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
        IWIN.EditComponent.setProperty(item,typeObj.name+'_path',o);
        if (obj.type == '18'){
            var oldSize = {w:IWIN.EditComponent.getProperty(item,'width'),h:IWIN.EditComponent.getProperty(item,'height')};
            var newSize = {};
            if(oldSize.w/oldSize.h>obj.w/obj.h){
                newSize.h = oldSize.h;
                newSize.w = obj.w*oldSize.h/obj.h;
            }else{
                newSize.w = oldSize.w;
                newSize.h = obj.h*oldSize.w/obj.w;
            }
            IWIN.EditComponent.setItemW(item, newSize.w);
            IWIN.EditComponent.setItemH(item, newSize.h);
        }
        this.elIds.push(item.id);
    }
    if(this.elIds){
        IWIN.BlockOpr.setCurObj(this.util.byId(this.elIds[this.elIds.length-1]));
    }
    
    IWIN.Request.addBlockReq(this.elIds); // 添加PPT的控件
    var wander = this.util.byId(this.elIds[0]);
    IWIN.Request.selectPptReq(this.elIds[0],wander,p.mapped,p.path); // 用户选择的PPT所对应的所有image
    
    item = null;
};
CMDBlockAddPpt.prototype = {
    constructor : CMDBlockAddPpt,
    typeMap : {
		'0':{type:'',name:'flodder'},
        '1':{type:'2',name:'video'},
        '2':{type:'18',name:'word'},
        '3':{type:'18',name:'excel'},
        '4':{type:'1',name:'img'},
        '5':{type:'18',name:'pdf'},
//        '6':{type:'12',name:'ppt'},
        '6':{type:'18',name:'ppt'},
        '7':{type:'11',name:'flash'}
    },
    undo : function (){
        IWIN.BlockOpr.moveElsToDel(this.elIds);
        IWIN.Request.delBlockReq(this.elIds);
    },
    redo : function (){
        IWIN.BlockOpr.moveElsToEdit(this.elIds);
        if(this.elIds){
            IWIN.BlockOpr.setCurObj(this.util.byId(this.elIds[0]));
        }
        IWIN.Request.addBlockReq(this.elIds);
    },
    destroy : function (){
        this.mainBox = null;
        this.elIds  = null;
        this.util = null;
    }
};

