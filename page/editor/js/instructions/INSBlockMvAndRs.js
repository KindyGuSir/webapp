/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-2
 * Time: 上午11:28
 * To change this template use File | Settings | File Templates.
 */

var CMDBlockMvAndRs = function (id,psSz1,psSz2){
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.elId  = id;
    this.util = IWIN.util;

    this.oldPsSz = psSz1;
    this.newPsSz = psSz2;
    IWIN.Request.updateBlockReq(this.util.byId(this.elId));
};

CMDBlockMvAndRs.prototype = {
    constructor : CMDBlockMvAndRs,
    undo : function(){
        IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
        IWIN.BlockOpr.setPosAndSize(this.oldPsSz.x,this.oldPsSz.y,this.oldPsSz.w,this.oldPsSz.h);
        IWIN.Request.updateBlockReq(this.util.byId(this.elId));
    },
    redo : function(){
        IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
        IWIN.BlockOpr.setPosAndSize(this.newPsSz.x,this.newPsSz.y,this.newPsSz.w,this.newPsSz.h);
        IWIN.Request.updateBlockReq(this.util.byId(this.elId));
    },
    destroy : function (){
        this.mainBox = null;
        this.elId  = null;
        this.util = null;

        this.oldPsSz = null;
        this.newPsSz = null;
    }
};
