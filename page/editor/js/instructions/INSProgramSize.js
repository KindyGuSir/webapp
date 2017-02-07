/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-3-24
 * Time: 下午1:55
 * To change this template use File | Settings | File Templates.
 */

var CMDProgramSize = function (o){
    this.oldSize = {w:IWIN.Options.cur.w,h:IWIN.Options.cur.h};
    this.newSize = o;
    IWIN.Frame.setEditBoxSize(o);
    IWIN.Request.updateProgramRatio(function(){
        IWIN.Frame.initRatio(o.w,o.h,function(){
            IWIN.Request.selectPageReq(IWIN.Options.cur.page);
        });
    });
};
CMDProgramSize.prototype = {
    constructor : CMDProgramSize,
    undo : function (){
        IWIN.Frame.setEditBoxSize(this.oldSize);
        IWIN.Request.updateProgramRatio();
        IWIN.Frame.initRatio(this.oldSize.w,this.oldSize.h);
    },
    redo : function (){
        IWIN.Frame.setEditBoxSize(this.newSize);
        IWIN.Request.updateProgramRatio();
        IWIN.Frame.initRatio(this.newSize.w,this.newSize.h);
    },
    destroy : function (){
        this.oldSize = null;
        this.newSize = null;
    }
};
