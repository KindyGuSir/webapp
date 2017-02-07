/**
 * add by caoqian 德育排名 20160711
 */

var CMDBlockAddRankmoraledu = function (id,x,y){
	id= '35';/*与request.js中data数组中的id的属性值*/
    var item = IWIN.BlockOpr.addBlock(id);
    IWIN.Request.addBlockReq([item.id]);//后台操作入口
};

			
