/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-1-24
 * Time: 下午4:19
 * To change this template use File | Settings | File Templates.
 */

var  RectComp = {
    dftVals : {bdC:'rgb(141, 196, 30)',bgC:'#FFFFFF',bdW:1,rds:0},
    rectClass: 'editItem3'
};
IWIN.util.extend(RectComp,CompChClass);
IWIN.util.extend(RectComp,{
    addParamsToItem : function (item,o){
        CompClass.addParamsToItem(item,o);
        var rect =  item.getElementsByClassName(this.rectClass)[0];
        rect.style.backgroundColor = o.bgC;
        rect.style.borderColor = o.bdC;
        rect.style.borderWidth = o.bdW + 'px';
        rect.style.borderRadius = o.rds + 'px';
        rect.style.width = o.w + 'px';
        rect.style.height = o.h + 'px';
        return item;
    },
    setProperty : function (item,name,value){
        var params = JSON.parse(item.params);
        var rect =  item.getElementsByClassName(this.rectClass)[0];
        switch (name){
            case 'bg_color':
                var opacity = IWIN.util.getClrOpacity(params.bgC);
                value = IWIN.util.colorRgba(value,opacity);
                rect.style.backgroundColor = value;
                params.bgC = value;
                break;
            case 'bg_opacity':
                value = IWIN.util.colorRgba(params.bgC,value);
                rect.style.backgroundColor = value;
                params.bgC = value;
                break;
            case 'bd_color':
                var opacity = IWIN.util.getClrOpacity(params.bdC);
                value = IWIN.util.colorRgba(value,opacity);
                rect.style.borderColor = value;
                params.bdC = value;
                break;
            case 'bd_opacity':
                value = IWIN.util.colorRgba(params.bdC,value);
                rect.style.borderColor = value;
                params.bdC = value;
                break;
            case  'bd_width':
                if(!value){
                    rect.style.borderWidth = 0 + 'px';
                    params.bdW = 0;
                }else{
                    rect.style.borderWidth = value + 'px';
                    params.bdW = value;
                }
                item.style.width = rect.offsetWidth + 'px';
                item.style.height = rect.offsetHeight + 'px';
                IWIN.PropertyBar.setVal('wVal',rect.offsetWidth);
                IWIN.PropertyBar.setVal('hVal',rect.offsetHeight);
                IWIN.BlockOpr.maskMove2Obj();
                break;
            case 'bd_radius':
                if(!value){
                    rect.style.borderRadius = 0 + 'px';
                    params.rds = 0;
                }else{
                    rect.style.borderRadius = value + 'px';
                    params.rds = value;
                }
        }
        item.params = JSON.stringify(params);
    },
    getProperty : function (item,name){
        var rect =  item.getElementsByClassName(this.rectClass)[0];
        var params = JSON.parse(item.params);
        switch (name){
            case 'bg_color':
                var clr = params.bgC;
                return IWIN.util.getClrRgb(clr);
            case 'bg_opacity':
                var clr = params.bgC;
                return parseFloat(IWIN.util.getClrOpacity(clr));
            case 'bd_color':
                var clr = params.bdC;
                return IWIN.util.getClrRgb(clr);
            case 'bd_opacity':
                var clr = params.bdC;
                return parseFloat(IWIN.util.getClrOpacity(clr));
            case 'bd_width':
                return IWIN.util.getStyleVal(rect,'borderLeftWidth');
            case 'bd_radius':
                return IWIN.util.getStyleVal(rect,'borderTopLeftRadius');
            case 'width':
                return item.children[0].offsetWidth;
            case 'height':
                return item.children[0].offsetHeight;
        }
    }
});

IWIN.Options.comp_map['3'] = RectComp;