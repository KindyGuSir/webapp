/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 13-12-26
 * Time: 上午11:46
 * To change this template use File | Settings | File Templates.
 */

var CMDBlockMove = function (id,pos1,pos2){
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.elId  = id;
    this.util = IWIN.util;

    this.oldPos = pos1;
    this.newPos = pos2;
    IWIN.Request.updateBlockReq(this.util.byId(this.elId));
};

CMDBlockMove.prototype = {
    constructor : CMDBlockMove,
    undo : function(){
        IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
        IWIN.BlockOpr.setLeft(this.oldPos.x);
        IWIN.BlockOpr.setTop(this.oldPos.y);
        IWIN.Request.updateBlockReq(this.util.byId(this.elId));
    },
    redo : function(){
        IWIN.BlockOpr.setCurObj(this.util.byId(this.elId));
        IWIN.BlockOpr.setLeft(this.newPos.x);
        IWIN.BlockOpr.setTop(this.newPos.y);
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