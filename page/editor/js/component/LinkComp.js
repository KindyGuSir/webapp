/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-15
 * Time: 下午4:21
 * To change this template use File | Settings | File Templates.
 */

var  LinkComp = {
    dftVals : {mapped:"",path:"",rds:0},
    imgClass: 'LINK_COMP_img',
};
IWIN.util.extend(LinkComp,CompChClass);
IWIN.util.extend(LinkComp,{
    addParamsToItem : function (item,o){
        CompClass.addParamsToItem(item,o);
        var img =  item.getElementsByClassName(this.imgClass)[0];
        if (o.mapped) img.src = o.mapped;
        img.style.borderRadius = o.rds + 'px';
        img.ondragstart = function (){return false};
        if(typeof(o.iH) != 'undefined'){
            var start_index = o.iH.indexOf("page");
            var end_index = o.iH.indexOf("\">",start_index);
            if(start_index != -1 && end_index != -1){
                var pageNum = o.iH.substring(start_index+6,end_index);
                var alink =  item.getElementsByTagName("alink")[0];
                alink.setAttribute("page",pageNum);
            }
        }

        IWIN.util.events(item,'selectstart',function(e){
            if(e.stopPropagation)e.stopPropagation();
            if(e.preventDefault)e.preventDefault();// add 20140813
        });
        return item;
    },
    setProperty : function (item,name,value){
        var params = JSON.parse(item.params);
        var img =  item.getElementsByClassName(this.imgClass)[0];
        switch (name){
            case 'img_path':
                img.src = value.mapped;
                params.path = value.path;
                params.mapped = value.mapped;
                break;
            case 'img_bd_radius':
                img.style.borderRadius = value?value+'px':'';
                params.rds = value?value:0;
                break;
            case 'link_bd_page': //跳转页
                var alink =  item.getElementsByTagName("alink")[0];
                alink.setAttribute("page",value);
                break;

        }
        item.params = JSON.stringify(params);
    },
    getProperty : function (item,name){
        var params = JSON.parse(item.params);
        switch (name){
            case 'img_path':
                return {path:params.path,mapped:params.mapped};
            case 'img_bd_radius':
                return params.rds;
            case 'width':
                return item.offsetWidth;
            case 'height':
                return item.offsetHeight;
            case 'link_bd_page':
                // var content = item.innerHTML;
                // var start_index = content.indexOf("page");
                // var end_index = content.indexOf("\">",start_index);
                // if(start_index != -1 && end_index != -1){
                //    var pageNum = content.substring(start_index+6,end_index);
                //     console.log(pageNum);
                //     return pageNum;
                // }
                if(typeof(params.iH) != 'undefined'){
                    var start_index = params.iH.indexOf("page");
                    var end_index = params.iH.indexOf("\">",start_index);
                    if(start_index != -1 && end_index != -1){
                       var pageNum = params.iH.substring(start_index+6,end_index);
                        console.log(pageNum);
                        return pageNum;
                    }
                }
                return 0;
                break;
        }
    }
});

IWIN.Options.comp_map['30'] = LinkComp;
