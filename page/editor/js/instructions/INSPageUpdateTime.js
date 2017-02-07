/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-5-20
 * Time: 下午4:30
 * To change this template use File | Settings | File Templates.
 */

var CMDPageUpdateTime = function (pid,time1,time2){
    this.pid = pid;
    this.oldVal = time1;
    this.newVal = time2;
    this.tmSetClass = IWIN.Options.eClass.pageTimeSet;
    this.tmEditClass = IWIN.Options.eClass.pageTimeEdit;

    this.setPageTime(this.newVal);
}
CMDPageUpdateTime.prototype = {
    undo : function (){
        this.setPageTime(this.oldVal);
    },
    redo : function (){
        this.setPageTime(this.newVal);
    },
    setPageTime : function (tm){
        var item = IWIN.PageOpr.findPageById(this.pid);
//        var tmSet = item.getElementsByClassName(this.tmSetClass)[0];
//        IWIN.util.setInnerText(tmSet,tm);
        var tmEdit = item.getElementsByClassName(this.tmEditClass)[0];
        tmEdit.value = tm;
        IWIN.Request.updatePageTime(this.pid,tm);
    },
    destroy : function (){
        this.pid = null;
        this.oldVal = null;
        this.newVal = null;
        this.tmSetClass = null;
        this.tmEditClass = null;
    }
}
