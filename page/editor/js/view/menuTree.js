/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 13-12-17
 * Time: 上午10:36
 * To change this template use File | Settings | File Templates.
 */

var IWIN = IWIN || {};
var MenuTree = function (boxId,dataAcr){
    //this.box = IWIN.util.byId(boxId);
    this.box = IWIN.Options.el.compPnlList;
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.acr = dataAcr;
    this.menuItemClass = IWIN.Options.eClass.leftMenuItem;
    this.menuGroupClass = IWIN.Options.eClass.leftMenuGroup;
    this.util = IWIN.util;
    this.menuItemList = IWIN.Options.menuItem;
};
MenuTree.prototype = {
    constructor : MenuTree,
    init : function (){
        this.initTree(this.acr);
        this.addEvents();
        IWIN.Options.el.compGrpList.children[0].click();
    },
    initTree : function (acr){
        for(var i=0;i<acr.getGroupNum();i++){
            this.creGroup(this.box,acr,i);
        }
    },
    creDiv : function (p,c){
        var ele = document.createElement('div');
        p.appendChild(ele);
        if(c)ele.className = c;
        return ele;
    },
    creLi : function (p,c){
        var ele = document.createElement('li');
        p.appendChild(ele);
        if(c)ele.className = c;
        return ele;
    },
    creGroup : function (box,acr,i){
        var gpEl =  this.creLi(IWIN.Options.el.compGrpList);
        IWIN.util.setInnerText(gpEl,acr.getGroupName(i));
        gpEl._tar = acr.getGroupId(i);

        //var ele = this.creLi(box,this.menuGroupClass);
        var ele = this.creLi(IWIN.Options.el.compPnlList,acr.getGroupId(i));
        for(var j=0;j<acr.getGroupDataNum(i);j++){
            var item = this.creItem(ele,acr,i,j);
        }

        var that = this;
        gpEl.onclick = function (){
            that.checkGroup(this);
        }
    },
    creItem : function (group,acr,i,j){
        var ele = this.creDiv(group,this.menuItemClass);
        //this.util.setInnerText(ele,acr.getItemName(i,j));
        ele.title = acr.getItemName(i,j);
        ele.id = acr.getItemId(i,j);
        var ownClass = this.menuItemList[ele.id].mnClass;
        this.util.aClass(ele,ownClass);
        var spn = document.createElement('span');
        ele.appendChild(spn);
        ele.onselectstart = function(){return false};
        return ele;
    },
    findPItem : function (e){
        var tar = e.target || e.srcElement || e;
        var bd = document.getElementsByTagName('body')[0];
        while(tar!=bd&&tar){
            if(this.util.cClass(tar,this.menuItemClass)){
                return tar;
            }
            tar = tar.parentNode;
        }
    },
    addItemFn : function (id,e){
        //树目录中条目拖放后的操作
        var pos = IWIN.util.getMs2Ele(IWIN.BlockOpr.box,e);
        var startPos = this.startPos;
        IWIN.Controller.execute('CMD_NEW_BLOCK',id,pos.x - startPos.x,pos.y - startPos.y);
    },
    checkGroup : function (grpItem){
        var chs = IWIN.Options.el.compGrpList.children;
        var chk =  IWIN.Options.eClass.leftMenuCheck;
        for(var i=0;i<chs.length;i++){
            IWIN.util.dClass(chs[i],chk);
        }
        IWIN.util.aClass(grpItem,chk);

        chs = IWIN.Options.el.compPnlList.children;
        for(var i=0;i<chs.length;i++){
            IWIN.util.dClass(chs[i],chk);
        }
        var ch = IWIN.Options.el.compPnlList.getElementsByClassName(grpItem._tar)[0];
        IWIN.util.aClass(ch,chk);
    },
    mouseDown : function (e){
        var item =  this.findPItem(e);
        if(!item)return;
        this.startPos = this.util.getMs2Ele(item,e);
        var ele = item.cloneNode(true);
        document.body.appendChild(ele);
        var pos = this.util.getElePos(item);
        with (ele.style){
            position = 'absolute';
            left = pos.x+ 'px';
            top = pos.y +'px';
            zIndex = 600;
            opacity = 0.5;
            marginTop = 0;
            marginLeft = 0;
        }
        this.dragObj = ele;
        return ele;
    },
    mouseMove :function (e){
        if(!this.dragObj)return;
        var pos = this.util.getMsCords(e);
        with (this.dragObj.style){
            left = pos.x - this.startPos.x + 'px';
            top = pos.y - this.startPos.y +'px';
        }
    },
    mouseUp : function (e){
        if(!this.dragObj)return;
        var pos = this.util.getMs2Ele(this.mainBox,e);
        if(pos.x<0||pos.x>this.mainBox.offsetWidth||pos.y<0||pos.y>this.mainBox.offsetHeight){
            document.body.removeChild(this.dragObj);
            this.dragObj = null;
            return;
        }
        var id = this.dragObj.id;
        document.body.removeChild(this.dragObj);
        this.dragObj = null;
        if(this.addItemFn)this.addItemFn(id,e);
        return id;
    },
    addEvents : function (){
        var ev = this.util.events;
        var  that = this;
        ev(this.box,'mousedown',function(e){
             that.mouseDown(e);
        });
        ev(document.body,'mousemove',function(e){
            that.mouseMove(e);
        });
        ev(document.body,'mouseup',function(e){
            that.mouseUp(e);
        });


    }
};

