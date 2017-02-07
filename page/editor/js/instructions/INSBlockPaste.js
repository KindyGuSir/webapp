/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-3
 * Time: 上午10:21
 * To change this template use File | Settings | File Templates.
 */

var CMDBlockPaste = function (){
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.util = IWIN.util;

    this.elIds = IWIN.BlockOpr.pasteEles();
    if(this.elIds){
        IWIN.BlockOpr.setCurObj(this.util.byId(this.elIds[0]));
    }
    IWIN.Request.addBlockReq(this.elIds);
};
CMDBlockPaste.prototype = {
    constructor : CMDBlockPaste,
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

