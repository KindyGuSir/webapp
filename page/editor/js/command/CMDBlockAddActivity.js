/**
 * add by haoyc 班级活动 20160602
 */

var CMDBlockAddActivity = function (id,x,y){
	id= '32';/*与request.js中data数组中的id的属性值*/
    var item = IWIN.BlockOpr.addBlock(id);
    IWIN.Request.addBlockReq([item.id]);//后台操作入口
};

			
