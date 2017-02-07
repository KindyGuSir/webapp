/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-23
 * Time: 下午4:44
 * To change this template use File | Settings | File Templates.
 */
var CMDPageDelete= function (){
	if(confirm("页面删除后，不能进行撤销操作，是否确认删除？")){
		this.elId = IWIN.PageOpr.getCurId();
	    this.idx = IWIN.PageOpr.getCurIdx();
	    this.delPgId = IWIN.PageOpr.delPage(this.elId);
	    IWIN.Request.delPageReq(this.elId,function (){
	        IWIN.Request.selectPageReq(IWIN.PageOpr.getCurId());
	    });
	    if(IWIN.Options.el.pageBoxIn.children.length == 0){
	    	// 节目制作  当删除的页面是最后一个的时候，自动新建一个页面
	    	var that =this;
	 	    IWIN.Request.addPageReq(1,function(id){
	 	        var o = {pid:id,path:''};
	 	        IWIN.PageOpr.addPage(o,that.idx);
	 	        that.elId = id;
	 	        IWIN.PageOpr.setCurId(that.elId);
	 	        IWIN.BlockOpr.clearAllBlock();
	 	        IWIN.PageOpr.initPageNum();
	 	        IWIN.Controller.snapPage();
	 	    });
	 	    // 当删除最后一个页面时 ， 新建的页面自动选中
	 	    IWIN.Options.el.pageBoxIn.children[0].className = 'check item';
	    }
	}else{
		return false;
	}
};
CMDPageDelete.prototype = {
    constructor : CMDPageDelete,
    undo :function (){
        var that = this;
        IWIN.Request.addPageReq(this.idx,function(id){
            IWIN.PageOpr.addPage(id,that.idx);
            that.elId = id;
            IWIN.PageOpr.setCurId(that.elId);
            IWIN.BlockOpr.clearAllBlock();
            var ids =  IWIN.BlockOpr.getAllIds(that.delPgId);
            if(ids&&ids.length>0){
                IWIN.Request.addBlockReq(IWIN.BlockOpr.getAllIds(that.delPgId));
            }
            var delPg = IWIN.util.byId(that.delPgId);
            IWIN.util.moveAllChildren(delPg,IWIN.Options.el.mainBoxIn);
            delPg.parentNode.removeChild(delPg);
        })
    },
    redo : function (){
        this.delPgId = IWIN.PageOpr.delPage(this.elId);
        IWIN.Request.delPageReq(this.elId,function (){
            IWIN.Request.selectPageReq(IWIN.PageOpr.getCurId());
        });
    },
    destroy : function (){
        this.elId = null;
        this.idx = null;
    }
};

