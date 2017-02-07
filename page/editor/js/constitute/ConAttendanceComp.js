
var  AttendanceComp = {
    /**
     * @parame dftVals：默认参数对象
     **@parame backPic：作品详情背景图
     **@parame title: 标题内容
     */
    dftVals : {
        backPic:"",
        backMapped: "../../images/adddetailBg.png",
        title:""
    },
    srcClass: 'ATTENDANCE_COMP_img'
};
IWIN.util.extend(AttendanceComp,CompChClass);
IWIN.util.extend(AttendanceComp,{
    addParamsToItem : function (item,o){
        CompClass.addParamsToItem(item,o);
        var srcObj =  item.getElementsByClassName(this.srcClass)[0];
        srcObj.ondragstart = function (){return false};
        IWIN.util.events(item,'selectstart',function(e){
            if(e.stopPropagation)e.stopPropagation();
            if(e.preventDefault)e.preventDefault();
        });
        return item;
    },
    destroy : function (item){
        var srcObj =  item.getElementsByClassName(this.srcClass)[0];
        srcObj.ondragstart = null;
        IWIN.util.delEvent(item,'selectstart');
        CompClass.comDestroy(item);
    },
    setProperty : function (item,name,value){
        var params = JSON.parse(item.params);
        var srcObj =  item.getElementsByClassName(this.srcClass)[0];
        switch (name){

            case 'backPic':
                params.backPic = value.path;
                params.backMapped = value.mapped;
                break;
            case 'title':
                params.title = value;
                break;
            /*case 'snap':
             srcObj.src = value;
             params.snap = value;
             break;*/
        }
        item.params = JSON.stringify(params);
    },
    getProperty : function (item,name){
        var params = JSON.parse(item.params);
        console.log(JSON.stringify(params)+"------------==========----------------------")
        switch (name){
            case 'width':
                return item.offsetWidth;
            case 'height':
                return item.offsetHeight;
            case 'backPic':
            {
               // var url = "http://" + location.host + "ManagementCenter/data/" +params.backMapped;//
                var url = params.backMapped;
                return {path:params.backPic,mapped:url};
            }
            case 'title':
                return params.title;

        }
    }
});

IWIN.Options.comp_map['29'] = AttendanceComp;