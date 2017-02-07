/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-3
 * Time: 上午10:55
 * To change this template use File | Settings | File Templates.
 */

var CMDBlockCopy = function (){
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.util = IWIN.util;

    this.elIds = IWIN.BlockOpr.copyEles();
};
CMDBlockCopy.prototype = {
    constructor : CMDBlockCopy,
    undo : function (){
        //IWIN.BlockOpr.moveElsToEdit(this.elIds);
        if(this.elIds){
            IWIN.BlockOpr.setCurObj(this.util.byId(this.elIds[0]));
        }
    },
    redo : function (){
        //IWIN.BlockOpr.moveElsToDel(this.elIds);
    },
    destroy : function (){
        this.mainBox = null;
        this.elIds  = null;
        this.util = null;
    }
};



