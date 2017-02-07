/**
 * add by haoyc 自定义组件 20160704
 */

    var CMDBlockAddUdefined = function (id,x,y){
	id= '34';/*与request.js中data数组中的id的属性值*/
    var item = IWIN.BlockOpr.addBlock(id);
    IWIN.Request.addBlockReq([item.id]);//后台操作入口
};

			
