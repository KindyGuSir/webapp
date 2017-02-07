/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-23
 * Time: 下午4:43
 * To change this template use File | Settings | File Templates.
 */

var CMDPageCreate= function (){
    var that =this;
    this.idx = IWIN.Options.el.pageBoxIn.children.length>0?(IWIN.PageOpr.getCurIdx() + 1):1;
    IWIN.Request.addPageReq(this.idx,function(id){
        var o = {pid:id,path:''};
        IWIN.PageOpr.addPage(o,that.idx);
        that.elId = id;
        IWIN.PageOpr.setCurId(that.elId);
        IWIN.BlockOpr.clearAllBlock();
        IWIN.PageOpr.initPageNum();
        IWIN.Controller.snapPage();
    })

};
CMDPageCreate.prototype = {
    constructor : CMDPageCreate,
    undo :function (){
        IWIN.PageOpr.delPage(this.elId);
        IWIN.Request.delPageReq(this.elId,function (){
            IWIN.Request.selectPageReq(IWIN.PageOpr.getCurId());
            IWIN.PageOpr.initPageNum();
        });
    },
    redo : function (){
        var that = this;
        IWIN.Request.addPageReq(this.idx,function(id){
            var o = {pid:id,path:''};
            IWIN.PageOpr.addPage(o,that.idx);
            that.elId = id;
            IWIN.PageOpr.setCurId(that.elId);
            IWIN.BlockOpr.clearAllBlock();
            IWIN.PageOpr.initPageNum();
        })
    },
    destroy : function (){
        this.elId = null;
        this.idx = null;
    }
};
