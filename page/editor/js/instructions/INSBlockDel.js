/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 13-12-26
 * Time: 上午11:46
 * To change this template use File | Settings | File Templates.
 */


var CMDBlockDel = function (){
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.elIds  = IWIN.BlockOpr.countSelectIds();
    this.util = IWIN.util;

    IWIN.BlockOpr.moveElsToDel(this.elIds);
    IWIN.Request.delBlockReq(this.elIds);
};
CMDBlockDel.prototype = {
    constructor : CMDBlockDel,
    undo : function (){
        IWIN.BlockOpr.moveElsToEdit(this.elIds);
        IWIN.Request.addBlockReq(this.elIds);
    },
    redo : function (){
        IWIN.BlockOpr.moveElsToDel(this.elIds);
        IWIN.Request.delBlockReq(this.elIds);
    },
    destroy : function (){
        this.mainBox = null;
        this.elIds  = null;
        this.util = null;
    }
};

