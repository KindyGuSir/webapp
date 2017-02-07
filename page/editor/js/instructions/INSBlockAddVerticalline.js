/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 13-12-24
 * Time: 下午4:20
 * To change this template use File | Settings | File Templates.
 */

var CMDBlockAddVerticalline = function (id,x,y){
	id= '7';/*与request.js中data数组中的id的属性值*/
	x=0;
	y=0;
    this.mainBox = IWIN.Options.el.mainBoxIn;
    this.delBox = IWIN.Options.el.delElsDiv;
    this.util = IWIN.util;

    var that = this;
    var item = IWIN.BlockOpr.addBlock(id);
    IWIN.BlockOpr.setCurObj(item);
    IWIN.BlockOpr.setPos(x,y);
    if(IWIN.BlockOpr.prptBar)IWIN.BlockOpr.prptBar.onBlockDrag(x,y);
    that.elId = item.id;

    IWIN.Request.addBlockReq([item.id]);
};
CMDBlockAddVerticalline.prototype = {
    constructor : CMDBlockAddVerticalline,
    undo : function (){
        IWIN.BlockOpr.moveToDel(this.elId);
        IWIN.Request.delBlockReq([this.elId]);
    },
    redo : function (){
        IWIN.BlockOpr.moveToEdit(this.elId);
        IWIN.Request.addBlockReq([this.elId]);
    },
    destroy : function (){
        this.typeId = null;
        this.mainBox = null;
        this.delBox = null;
        var item = this.util.byId(this.elId);
        IWIN.EditComponent.destroy(item);
        this.util = null;
        this.elId = null;
    }
};


