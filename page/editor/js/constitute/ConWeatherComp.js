/**
 * User: hht-zsl
 * Date: 14-4-28
 * 天气组件1
 */

var WeatherComp_1 = {
	dftVals : { 
		type:"weatherComp_1",
		bgC:"rgb(70,175,75)",
		ftC:"rgb(247,251,247)",
		bdW:0,
		bdC:"rgb(90,90,90)",
		city:"",
		serverIp:""
    },
    weatherClass: 'editItem19'
};
IWIN.util.extend(WeatherComp_1,CompScClass);

IWIN.util.extend(WeatherComp_1,{
    addParamsToItem : function (item,o){
        CompClass.addParamsToItem(item,o);
        var weaObj =  item.getElementsByClassName(this.weatherClass)[0];
		weaObj.style.backgroundColor = o.bgC;
        weaObj.style.borderColor = o.bdC;
        weaObj.style.borderWidth = o.bdW + 'px';
		weaObj.style.color = o.ftC;
        weaObj.style.width = o.w + 'px';
        weaObj.style.height = o.h + 'px';
		weaObj.ondragstart = function (){return false};
        return item;
    },
    destroy : function (item){
		var weaObj =  item.getElementsByClassName(this.weatherClass)[0];
        weaObj.ondragstart = null;
        CompClass.comDestroy(item);
    },
    setProperty : function (item,name,val){
        var params = JSON.parse(item.params);
        var weaObj =  item.getElementsByClassName(this.weatherClass)[0];
        switch (name){
            case 'compType':
                params.type = val;
                break;
			case 'city':
                params.city = val;
                break;
			case 'serverIp':
                params.serverIp = val;
                break;
			case 'bg_color':
				var opacityVal = IWIN.util.getClrOpacity(params.bgC);
                val = IWIN.util.colorRgba(val,opacityVal);
                weaObj.style.backgroundColor = val;
                params.bgC = val;
                break;
			case 'bg_opacity': 
				val = IWIN.util.colorRgba(params.bgC,val);
                weaObj.style.backgroundColor = val;
                params.bgC = val;
                break;
			case 'font_color':
				weaObj.style.color = val;
                params.ftC = val;
                break;
			case 'bd_width':
				weaObj.style.borderWidth = val + 'px';
				params.bdW = val;
				item.style.width = weaObj.offsetWidth + 'px';
                item.style.height = weaObj.offsetHeight + 'px';
                IWIN.BlockOpr.maskMove2Obj();
                break;
			case 'bd_color':
				var opacityVal = IWIN.util.getClrOpacity(params.bdC);
                val = IWIN.util.colorRgba(val,opacityVal);
                weaObj.style.borderColor = val;
                params.bdC = val;
                break;
        }
        item.params = JSON.stringify(params);
    },
    getProperty : function (item,name){
		var params = JSON.parse(item.params);
        switch (name){
            case 'compType':
                return params.type;
			case 'city':
				return params.city;
			case 'serverIp':
				return params.serverIp;
			case 'bg_color':
				var clr = params.bgC;
                return IWIN.util.getClrRgb(clr);
			case 'bg_opacity':
				var clr = params.bgC;
                return parseFloat(IWIN.util.getClrOpacity(clr));
			case 'font_color':
			   var clr = params.ftC;
               return IWIN.util.getClrRgb(clr);
			case 'bd_width':
				return params.bdW;
			case 'bd_color':
			   var clr = params.bdC;
               return IWIN.util.getClrRgb(clr);
            case 'width':
                return item.offsetWidth;//item.children[0].clientWidth;
            case 'height':
                return item.offsetHeight;//item.children[0].clientHeight;
        }
    }
});

IWIN.Options.comp_map['19'] = WeatherComp_1;





