/**
 * add by haoyc 班级活动 20160602
 * */
var  NewAttendanceComp = {
    srcClass: 'NewAttendance_COMP_src'
};
IWIN.util.extend(NewAttendanceComp,CompChClass);
IWIN.util.extend(NewAttendanceComp,{
    addParamsToItem : function (item,o){
        CompClass.addParamsToItem(item,o);
        var srcObj =  item.getElementsByClassName(this.srcClass)[0];
        srcObj.ondragstart = function (){return false};//用户开始拖动元素时触发
        IWIN.util.events(item,'selectstart',function(e){//目标对象被开始选中时
            if(e.stopPropagation)e.stopPropagation();//阻止事件冒泡
            if(e.preventDefault)e.preventDefault();//取消事件的默认动作
        });
        return item;
    },
    destroy : function (item){//组件删除通用方法
        var srcObj =  item.getElementsByClassName(this.srcClass)[0];
        srcObj.ondragstart = null;
        IWIN.util.delEvent(item,'selectstart');
        CompClass.comDestroy(item);
    },
    getProperty : function (item,name){
        var params = JSON.parse(item.params);
        switch (name){
            case 'width':
                return item.offsetWidth;
            case 'height':
                return item.offsetHeight;
        }
    },
    setProperty : function (item,name,value){
        var params = JSON.parse(item.params);
        var srcObj =  item.getElementsByClassName(this.srcClass)[0];
        item.params = JSON.stringify(params);
    }
});

IWIN.Options.comp_map['37'] = NewAttendanceComp;