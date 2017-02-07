/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-3
 * Time: 下午3:53
 * To change this template use File | Settings | File Templates.
 */

var CMDBlockAlignTop = function (){
    this.oldPosList = IWIN.Align.getAllPos();
    IWIN.Align.top();
    IWIN.BlockOpr.maskMove2Obj();
    this.newPosList = IWIN.Align.getAllPos();
    IWIN.Request.alignBlockReq(this.newPosList);
};
CMDBlockAlignTop.prototype = {
    constructor : CMDBlockAlignTop,
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
