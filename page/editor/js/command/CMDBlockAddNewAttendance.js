/**
 * add by haoyc 班级考勤 20160727
 */

var CMDBlockAddNewAttendance = function (id,x,y){
	id= '37';/*与request.js中data数组中的id的属性值*/
    var item = IWIN.BlockOpr.addBlock(id);
    IWIN.Request.addBlockReq([item.id]);//后台操作入口
};

			
