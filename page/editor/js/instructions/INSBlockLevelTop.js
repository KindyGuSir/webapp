/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-7
 * Time: 下午2:32
 * To change this template use File | Settings | File Templates.
 */
var CMDBlockLevelTop = function (){
    this.elId  = IWIN.BlockOpr.getCurObj().id;
    this.oldLevelList = IWIN.Level.getAllLevel();
    IWIN.Level.top(this.elId);
    this.newLevelList = IWIN.Level.getAllLevel();
    IWIN.Request.levelBlockReq(this.newLevelList);
};
CMDBlockLevelTop.prototype = {
    constructor : CMDBlockLevelTop,
    undo : function(){
        IWIN.Level.setAllLevel(this.oldLevelList);
        IWIN.Request.levelBlockReq(this.oldLevelList);
    },
    redo : function(){
        IWIN.Level.setAllLevel(this.newLevelList);
        IWIN.Request.levelBlockReq(this.newLevelList);
    },
    destroy : function (){
        this.elId  = null;
        this.oldLevelList = null;
        this.newLevelList = null;
    }
};
