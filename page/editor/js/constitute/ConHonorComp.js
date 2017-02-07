/**
 * add by haoyc 班级荣誉 20160627
 * */
var  HonorComp = {
    dftVals : {classId:"",tName:encodeURI(encodeURI("班级荣誉")),imageList:[],effect:"0"},
    srcClass: 'Honor_COMP_src'
};
IWIN.util.extend(HonorComp,CompChClass);
IWIN.util.extend(HonorComp,{
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
            case 'classId':
                return params.classId;
            case 'tName' :
                return params.tName;
            case 'imageText_list' :
                return params.imageList;
            case 'effect' ://轮播效果
                return params.effect;
        }
    },
    setProperty : function (item,name,value){
        var params = JSON.parse(item.params);
        switch (name){
            case 'classId' ://重新设置班级ID
                params.classId=value;
                break;
            case 'tName' ://组件类型名称
                params.tName=value;
                break;
            case 'imageText_list' :       //设置班级荣誉内容
                params.imageList=value;
                break;
            case 'effect' ://轮播效果
                params.effect=value;
                break;
        }
        item.params = JSON.stringify(params);
    }
});

IWIN.Options.comp_map['33'] = HonorComp;