/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-7
 * Time: 上午11:19
 * To change this template use File | Settings | File Templates.
 */
var CMDBlockAlignLeft = function (){
    this.oldPosList = IWIN.Align.getAllPos();
    IWIN.Align.left();
    IWIN.BlockOpr.maskMove2Obj();
    this.newPosList = IWIN.Align.getAllPos();
    IWIN.Request.alignBlockReq(this.newPosList);
};
CMDBlockAlignLeft.prototype = {
    constructor : CMDBlockAlignLeft,
    undo :function (){
        IWIN.Align.setAllPos(this.oldPosList);
        IWIN.BlockOpr.maskMove2Obj();
        IWIN.Request.alignBlockReq(this.oldPosList);
    },
    redo : function (){
        IWIN.Align.setAllPos(this.newPosList);
        IWIN.BlockOpr.maskMove2Obj();
        IWIN.Request.alignBlockReq(this.newPosList);
    },
    destroy : function (){
        this.oldPosList = null;
        this.newPosList = null;
    }
}