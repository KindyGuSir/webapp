/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-10
 * Time: 上午10:53
 * To change this template use File | Settings | File Templates.
 */
var CMDBlockAlignVertical = function (){
    this.oldPosList = IWIN.Align.getAllPos();
    IWIN.Align.vertical();
    IWIN.BlockOpr.maskMove2Obj();
    this.newPosList = IWIN.Align.getAllPos();
    IWIN.Request.alignBlockReq(this.newPosList);
};
CMDBlockAlignVertical.prototype = {
    constructor : CMDBlockAlignVertical,
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

