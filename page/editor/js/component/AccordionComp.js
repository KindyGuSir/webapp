/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-2-18
 * Time: 下午2:43
 * To change this template use File | Settings | File Templates.
 */



var  AccordionComp = {
    dftVals : {isFtp:0,during:2,ftpPath:'',imgLoop:[

    ]},
    imgClass : 'ACCORDION_COMP_img'
};
IWIN.util.extend(AccordionComp,CompScClass);
IWIN.util.extend(AccordionComp,{
    addParamsToItem : function (item,o){
        CompClass.addParamsToItem(item,o);
        var img =  item.getElementsByClassName(this.imgClass)[0];
        img.ondragstart = function (){return false};
        IWIN.util.events(item,'selectstart',function(e){
            if(e.stopPropagation)e.stopPropagation();
            if(e.preventDefault)e.preventDefault();// add 20140813
        });
        return item;
    },
    setProperty : function (item,name,value){
        var params = JSON.parse(item.params);
        switch (name){
            case 'img_list':
                params.imgLoop = value;
                break;
            case 'isFtp':
                params.isFtp = value;
                break;
            case 'tm_during':
                params.during = value;
                break;
        }
        item.params = JSON.stringify(params);
    },
    getProperty : function (item,name){
        var params = JSON.parse(item.params);
        switch (name){
            case 'img_list':
                return params.imgLoop;
            case 'width':
                return item.offsetWidth;
            case 'height':
                return item.offsetHeight;
            case 'isFtp':
                return params.isFtp;
            case 'tm_during':
                return params.during;
            case 'ftpPath':
                return params.ftpPath;
        }
    }
});

IWIN.Options.comp_map['4'] = AccordionComp;
