/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-7
 * Time: 下午5:27
 * To change this template use File | Settings | File Templates.
 */
var CMDBlockLevelBottom = function (){
    this.elId  = IWIN.BlockOpr.getCurObj().id;
    this.oldLevelList = IWIN.Level.getAllLevel();
    IWIN.Level.bottom(this.elId);
    this.newLevelList = IWIN.Level.getAllLevel();
    IWIN.Request.levelBlockReq(this.newLevelList);
};
CMDBlockLevelBottom.prototype = {
    constructor : CMDBlockLevelBottom,
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

