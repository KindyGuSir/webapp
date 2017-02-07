/**
 * add by haoyc 作业布置
 */

var CMDBlockAddTask = function (id,x,y){
	id= '36';/*与request.js中data数组中的id的属性值*/
    var item = IWIN.BlockOpr.addBlock(id);
    IWIN.Request.addBlockReq([item.id]);//后台操作入口
};

			
