/**
 * Created by zhanghongbin on 2016/4/26.
 */
/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-5-12
 * Time: 上午10:01
 * To change this template use File | Settings | File Templates.
 */

var CMDAddRLink = function (list) {
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.util = IWIN.util;

    this.elIds = [];
    var w = this.mainBox.offsetWidth, h = this.mainBox.offsetHeight;
    for (var i = 0; i < list.length; i++) {
        var obj = list[i];
        var typeObj = this.typeMap[obj.type];
        var item = IWIN.EditComponent.addBlock(typeObj.type);
        var o = {path: obj.path, mapped: obj.respath};
        var elb = document.getElementsByTagName('body')[0];
        var el0 = document.createElement("div");
        el0.className = "loading0";
        el0.style.cssText = "height:100%;width:100%;position:absolute;left:0;top:0;display:block;z-index:998;background-color:#333;opacity:0.5;";
        var el = document.createElement("div");
        el.className = "loading1";
        el.style.cssText = "height:100px;width:100px;position:absolute;left:50%;top:40%;display:block;z-index:999;margin-left:-50px;margin-top:-50px;";
        el.style.backgroundImage = "url(images/iwinload.gif)";
        elb.appendChild(el);
        elb.appendChild(el0);
        IWIN.EditComponent.setProperty(item, typeObj.name + '_path', o);

        IWIN.EditComponent.setItemW(item, 299);
        IWIN.EditComponent.setItemH(item, 186);
        /*item.style.left = (w - o.w)/2 + 'px';
         item.style.top = (h - o.h)/2 + 'px';
         IWIN.EditComponent.setItemW(item, o.w);
         IWIN.EditComponent.setItemH(item, o.h);*/
        this.elIds.push(item.id);
    }
    if (this.elIds) {
        IWIN.BlockOpr.setCurObj(this.util.byId(this.elIds[this.elIds.length - 1]));
    }
    IWIN.Request.addBlockReq(this.elIds);
    item = null;
};
CMDAddRLink.prototype = {
    constructor: CMDAddRLink,
    typeMap: {
        '0': {type: '', name: 'flodder'},
        '1': {type: '2', name: 'video'},
        '2': {type: '', name: 'word'},
        '3': {type: '', name: 'excel'},
        '4': {type: '30', name: 'img'},
        '5': {type: '', name: 'pdf'},
        '6': {type: '12', name: 'ppt'},
        '7': {type: '11', name: 'flash'}
    },
    undo: function () {
        IWIN.BlockOpr.moveElsToDel(this.elIds);
        IWIN.Request.delBlockReq(this.elIds);
    },
    redo: function () {
        IWIN.BlockOpr.moveElsToEdit(this.elIds);
        if (this.elIds) {
            IWIN.BlockOpr.setCurObj(this.util.byId(this.elIds[0]));
        }
        IWIN.Request.addBlockReq(this.elIds);
    },
    destroy: function () {
        this.mainBox = null;
        this.elIds = null;
        this.util = null;
    }
};
