/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-3
 * Time: 上午9:31
 * To change this template use File | Settings | File Templates.
 */

var CMDBlockCut = function (){
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.util = IWIN.util;

    this.elIds = IWIN.BlockOpr.cutEles();
    IWIN.Request.delBlockReq(this.elIds);
};
CMDBlockCut.prototype = {
    constructor : CMDBlockCut,
    undo : function (){
        IWIN.BlockOpr.moveElsToEdit(this.elIds);
        if(this.elIds){
            IWIN.BlockOpr.setCurObj(this.util.byId(this.elIds[0]));
        }
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


