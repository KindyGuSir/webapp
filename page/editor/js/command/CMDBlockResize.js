/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 13-12-26
 * Time: 上午11:46
 * To change this template use File | Settings | File Templates.
 */

var CMDBlockResize = function (id,size1,size2){
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.elId  = id;
    this.util = IWIN.util;

    this.oldSize = size1;
    this.newSize = size2;
    IWIN.Request.updateBlockReq(this.util.byId(this.elId));
};

CMDBlockResize.prototype = {
    constructor : CMDBlockResize,
    undo : function(){
        IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
        IWIN.BlockOpr.setW(this.oldSize.w);
        IWIN.BlockOpr.setH(this.oldSize.h);
        IWIN.Request.updateBlockReq(this.util.byId(this.elId));
    },
    redo : function(){
        IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
        IWIN.BlockOpr.setW(this.newSize.w);
        IWIN.BlockOpr.setH(this.newSize.h);
        IWIN.Request.updateBlockReq(this.util.byId(this.elId));
    },
    destroy : function (){
        this.mainBox = null;
        this.elId  = null;
        this.util = null;

        this.oldPos = null;
        this.newPos = null;
    }
};