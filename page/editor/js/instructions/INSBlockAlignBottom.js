
var CMDBlockAlignBottom = function (){
    this.oldPosList = IWIN.Align.getAllPos();
    IWIN.Align.bottom();
    IWIN.BlockOpr.maskMove2Obj();
    this.newPosList = IWIN.Align.getAllPos();
    IWIN.Request.alignBlockReq(this.newPosList);
};
CMDBlockAlignBottom.prototype = {
    constructor : CMDBlockAlignBottom,
    undo :function (){
        IWIN.Align.setAllPos(this.oldPosList);
        IWIN.BlockOpr.maskMove2Obj();
    },
    redo : function (){
        IWIN.Align.setAllPos(this.newPosList);
        IWIN.BlockOpr.maskMove2Obj();
    },
    destroy : function (){
        this.oldPosList = null;
        this.newPosList = null;
    }
};
