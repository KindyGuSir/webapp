/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-21
 * Time: 上午10:56
 * To change this template use File | Settings | File Templates.
 */
/**
 *部件的各种通用方法
 * @type {{originItemSize: *, setItemScW: Function, setItemScH: Function, setItemChW: Function, setItemChH: Function, comAdd: Function, comCopy: Function, addParamsToItem: Function, setParamToItem: Function, getParamFromItem: Function, comDestroy: Function}}
 */
var CompClass = {
    originItemSize : IWIN.Options.menuItem,
    setItemScW : function (item,n,sc){
        var bdw = IWIN.util.getStyleVal(item.children[0],'borderLeftWidth');
        var oSize = this.originItemSize[item.type_id];
        var ow = oSize.w + 2*bdw;
        var tp = typeof(sc);
        var ratio = (tp!="null"&& tp!='undefined')?sc : n/ow;
        item.style.width = (tp!="null"&& tp!='undefined')?sc*ow+'px':n + 'px';
        item.t_scaleX = ratio;
        var str =  'scale('+item.t_scaleX+','+item.t_scaleY+')';
        item.children[0].style.transform =  str;
        item.children[0].style.webkitTransform = str;
        var params = JSON.parse(item.params);
        params.scX = ratio;
        item.params = JSON.stringify(params);
    },
    setItemScH : function (item,n,sc){
        var bdw = IWIN.util.getStyleVal(item.children[0],'borderLeftWidth');
        var oSize = this.originItemSize[item.type_id];
        var oh = oSize.h + 2*bdw;
        var tp = typeof(sc);
        var ratio = (tp!="null"&& tp!='undefined')?sc : n/oh;
        item.style.height = (tp!="null"&& tp!='undefined')?sc*oh+'px':n + 'px';
        item.t_scaleY = ratio;
        var str = 'scale('+item.t_scaleX+','+item.t_scaleY+')';
        item.children[0].style.transform = str;
        item.children[0].style.webkitTransform = str;
        var params = JSON.parse(item.params);
        params.scY = ratio;
        item.params = JSON.stringify(params);
    },
    setItemChW : function (item,n){
        var ch = item.children[0];
        var bdw = IWIN.util.getStyleVal(ch,'borderLeftWidth');
        ch.style.width = n - 2*bdw+'px';
        item.style.width = n  + 'px';
        var params = JSON.parse(item.params);
        params.w = n;
        item.params = JSON.stringify(params);
    },
    setItemChH : function (item,n){
        var ch = item.children[0];
        var bdw = IWIN.util.getStyleVal(ch,'borderTopWidth');
        ch.style.height = n - 2*bdw+'px';
        item.style.height = n  + 'px';
        var params = JSON.parse(item.params);
        params.h = n;
        item.params = JSON.stringify(params);
    },
    comAdd : function (typeId){
         var item = document.createElement('div');
         item.className = IWIN.Options.eClass.editBlock;
         item.innerHTML = IWIN.Options.menuItem[typeId].innerHTML;
         item.id = IWIN.MakeId.mkBlockId();
         item.params = "{}";
         IWIN.Options.el.mainBoxIn.appendChild(item);
         return item;
    },
    comCopy : function (e,id){

        if(!id)id = IWIN.MakeId.mkBlockId;
        var el = e.cloneNode(true);
        el.params = e.params;
        console.log(el.innerHTML+"-----------------paramscloneNode-----------------------------" + e.innerHTML)
        el.id = id;
       /* if(el.getElementsByClassName("editItem25").length>0)
        {
            var con=el.getElementsByClassName("TEXT_COMP_text2")[0].textContent;
            var jsObject = eval("(" +  el.params + ")");
            jsObject.con = con;
            el.params =JSON.stringify(jsObject);
            //el.params['con']=con;
        }*/
        //update by caoqian 2016/3/29 flash\ppt\pic\视频\网站等文件复制及粘贴操作  begin----------------------
        if(el.getElementsByClassName("editItem25").length>0)   //文本
        {
            var con=el.getElementsByClassName("TEXT_COMP_text2")[0].innerHTML;//从获取纯文本改为获取富文本(textContent改为innerHTML)
            var jsObject = eval("(" +  el.params + ")");
            jsObject.con = con;
            //add by haoyc DataFlow升级 begin 20160330
            var isdataflow=el.getElementsByClassName("TEXT_COMP_ISDTF")[0].textContent;
            jsObject.isdataflow = isdataflow;
            var rftime=el.getElementsByClassName("TEXT_COMP_RFTIME")[0].textContent;
            jsObject.rftime = rftime;
            //add by haoyc DataFlow升级 end 20160330
            el.params =JSON.stringify(jsObject);
        }
        else if(el.getElementsByClassName("editItem8").length>0 ||el.getElementsByClassName("editItem4").length>0 ||el.getElementsByClassName("editItem9").length>0 || el.getElementsByClassName("editItem10").length>0)//单个页面只能有1个轮播图
        {
            alert("单个节目轮播图数量不能超过1个！");
            return;
        }
        else if(el.getElementsByClassName("editItem11").length>0)//单个页面只能有1个PPT
        {
            alert("当前页面重复添加或者已添加FLASH!");
            return;
        }
        else if(el.getElementsByClassName("editItem2").length>0)//单个页面只能有1个视频
        {
            alert("单个页面视频数量不能超过1个！");
            return;
        }
        else if(el.getElementsByClassName("editItem14").length>0)//单个页面只能有1个流媒体
        {
            alert("单个节目中流媒体数量不能超过1个！");
            return;
        }
        else if(el.getElementsByClassName("editItem22").length>0){//单个页面课程表数量不能超过2个
            var childrens=IWIN.Options.el.mainBoxIn.childNodes;
            var count=0;
            for(var i=0;i<childrens.length;i++){
                if(childrens[i].lastChild.className=='editItem22'){
                    count+=1;
                }
            }
            if(count>1){
                alert("单个页面中课程表数量不能超过" + 2 + "个！");
                return;
            }
        }
        else if(el.getElementsByClassName("editItem29").length>0)
        {
            alert('当前页面重复添加或者已添加考勤表!');
            return;
        }
        else if(el.getElementsByClassName("editItem28").length>0)
        {
            alert('当前页面重复添加或者已添加公告!');
            return;
        }
        else if(el.getElementsByClassName("editItem27").length>0)
        {
            alert('当前页面重复添加或者已添加动态!');
            return;
        }
        else if(el.getElementsByClassName("editItem15").length>0)
        {
            alert('单个页面中主题展示数量不能超过1个!');
            return;
        }
        else if(el.getElementsByClassName("editItem32").length>0)
        {
            alert('单个页面中班级活动数量不能超过1个!');
            return;
        }
        else if(el.getElementsByClassName("editItem33").length>0)
        {
            alert('单个页面中班级荣誉数量不能超过1个!');
            return;
        }
        else if(el.getElementsByClassName("editItem35").length>0)
        {
            alert('单个页面中德育排名数量不能超过1个!');
            return;
        }
        else if(el.getElementsByClassName("editItem36").length>0)
        {
            alert('单个页面中作业布置数量不能超过1个!');
            return;
        }
/*        else if(el.getElementsByClassName("editItem34").length>0)
        {
            alert('单个页面中自定义组件数量不能超过1个!');
            return;
        }*/
        else if(el.getElementsByClassName("editItem37").length>0)
        {
            alert('单个页面中班级考勤组件数量不能超过1个!');
            return;
        }
        else if((document.getElementsByClassName("editItem32").length+document.getElementsByClassName("editItem33").length+document.getElementsByClassName("editItem34").length+document.getElementsByClassName("editItem36").length)>=7){
            alert('单个页面中局部更新轮播组件不能超过7个！');
            return;
        }
        else
        {
            var jsObject = eval("(" +  el.params + ")");
            el.params =JSON.stringify(jsObject);
        }
        //update by caoqian 2016/3/29 pdf\flash\ppt\pic等文件复制及粘贴操作  end----------------------

        console.log(el.innerHTML+"-----------------params-----------------------------"+el.params+"---------"+e.params)
        IWIN.Options.el.mainBoxIn.appendChild(el);
        return el;
    },
    addParamsToItem : function (item,o){
        var obj = JSON.parse(item.params);
        for(var i in o){
            obj[i]=o[i];
        }
        item.params = JSON.stringify(obj);
    },
    setParamToItem : function (item,name,value){
        var obj = JSON.parse(item.params);
        obj[name] = value;
        item.params = JSON.stringify(obj);
    },
    getParamFromItem :function (item,name){
        var obj = JSON.parse(item.params);
        return obj[name];
    },
    comDestroy : function (item){
        item.parentNode.removeChild(item);
    }
};

/**
 * 用width和height来处理缩放的部件的类
 * @type {{getParseStr: Function, initBlock: Function, addBlock: Function, copyBlock: Function, setItemW: Function, setItemH: Function}}
 */
var CompChClass = {
    getParseStr:function (item){
        return JSON.parse(item.params);
    },
    initBlock : function (o){
        var item = CompClass.comAdd(o.t);
        return this.addParamsToItem(item,o);
    },
    addBlock : function (typeId){
        var item = CompClass.comAdd(typeId);
        var o = {w:this.getProperty(item,'width'),h:this.getProperty(item,'height')};
        for(var i in this.dftVals){
            o[i] = this.dftVals[i];
        }
        return this.addParamsToItem(item,o);
    },
    copyBlock : function (e,id){
      //  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+ e.innerHTML+"kkkkkkkkkkkkkkkkkkkkk"+id)
        var item = CompClass.comCopy(e,id);
        var o = JSON.parse(item.params);
      //  console.log("kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+ item.params+"kkkkkkkkkkkkkkkkkkkkkkkkkkkkkk"+ e.innerHTML +"kkkkkkkkkkkkkkkkkkkkk"+id)
        return this.addParamsToItem(item,o);
    },
    setItemW : function (item,n,sc){
        CompClass.setItemChW(item,n,sc);
    },
    setItemH : function (item,n,sc){
        CompClass.setItemChH(item,n,sc);
    },
    destroy : function (item){
        CompClass.comDestroy(item);
    }
};
/**
 * 用scX和scY来处理缩放的部件的类
 * @type {{}}
 */
var CompScClass = {};
IWIN.util.extend(CompScClass,CompChClass);
/*IWIN.util.extend(CompScClass,{
    addBlock : function (typeId){
        var item = CompClass.comAdd(typeId);
        var o = {scX:1,scY:1};
        for(var i in this.dftVals){
            o[i] = this.dftVals[i];
        }
        return this.addParamsToItem(item,o);
    },
    setItemW : function (item,n,sc){
        CompClass.setItemScW(item,n,sc);
    },
    setItemH : function (item,n,sc){
        CompClass.setItemScH(item,n,sc);
    }
});*/
IWIN.util.extend(CompScClass,{
    getParseStr:function (item){
        var params = JSON.parse(item.params);
        params.w = this.getProperty(item,'width');
        params.h = this.getProperty(item,'height');
        var bdw = IWIN.util.getStyleVal(item.children[0],'borderLeftWidth');
        var oSize = CompClass.originItemSize[item.type_id];
        if(params.tymd == '2'){
        	oSize.w = 100;
        	oSize.h = 60;
        }else if(params.tymdhms == '2'){
        	oSize.w = 300;
        	oSize.h = 60;
        }
        var obj = {};
        for(var i in params)
        {
            if(i=='w'){
                obj['scX']=params[i]/(oSize.w+2*bdw);
            }else if(i=='h'){
                obj['scY']=params[i]/(oSize.h+2*bdw);
            }else{
                obj[i] = params[i];
            }
        }
        return obj;
    },
    addBlock : function (typeId){
        var item = CompClass.comAdd(typeId);
        var o = {scX:1,scY:1};
        for(var i in this.dftVals){
            o[i] = this.dftVals[i];
        }
        return this.addParamsToItem(item,o);
    },
    initBlock : function (o){
        var item = CompClass.comAdd(o.t),ch = item.children[0];
        var oSize = CompClass.originItemSize[o.t];
        if(o.tymd == '2'){
        	oSize.w = 100;
        	oSize.h = 60;
        }else if(o.tymdhms == '2'){
        	oSize.w = 300;
        	oSize.h = 60;
        }
        var bdw = IWIN.util.getStyleVal(ch,'borderLeftWidth');
        var scX =  parseFloat(o.scX,10),scY = parseFloat(o.scY,10),dbW = 2*bdw;
        ch.style.width = Math.round(scX*oSize.w+(scX-1)*dbW) +'px';
        ch.style.height = Math.round(scY*oSize.h+(scY-1)*dbW) +'px';
        return this.addParamsToItem(item,o);
    }
});
