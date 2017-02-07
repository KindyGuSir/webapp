/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-2-20
 * Time: 上午11:21
 * To change this template use File | Settings | File Templates.
 */
var  Text2Comp = {
    dftVals : {con:'',dim:'0',speed:1,isdataflow:'',rftime:'',addr:''},//update by haoyc DataFlow升级 20160315
    rectClass: 'editItem25',
    txtClass : 'TEXT_COMP_text2',
    maskClass : 'TEXT_COMP_MASK',
    isdtfClass: 'TEXT_COMP_ISDTF',                //add by haoyc DataFlow升级 20160315
    rftimeClass: 'TEXT_COMP_RFTIME',                //add by haoyc DataFlow升级 20160321
    addrClass:'interfaceDiv'                //add by haoyc DataFlow升级 20160325
};
IWIN.util.extend(Text2Comp,CompChClass);
IWIN.util.extend(Text2Comp,{
    getParseStr:function (item){
        console.log(item.innerHTML+"[[[[[[[[[[[[[[[[[[[[[[[[[[[[[[")
        var txt =  item.getElementsByClassName(this.txtClass)[0];
        var isdataflow=item.getElementsByClassName(this.isdtfClass)[0];    //add by haoyc DataFlow升级 20160315
        var params = JSON.parse(item.params);
        console.log(txt.innerHTML + "sssssssssssssssssssss")
        params.con = txt.innerHTML;
        params.isdataflow=isdataflow.innerHTML;                 //add by haoyc DataFlow升级 20160315

        var rftime=item.getElementsByClassName(this.rftimeClass)[0];    //add by haoyc DataFlow升级 20160321
        params.rftime=rftime.innerHTML;                             //add by haoyc DataFlow升级 20160321

        var addr=item.getElementsByClassName(this.addrClass)[0];    //add by haoyc DataFlow升级 20160325
        params.addr=addr.innerHTML;                             //add by haoyc DataFlow升级 20160325
        return params;
    },
    txtFocus : function (e,txt){
        if(txt.contentEditable!="false"){
            txt.contentEditable = "false";
            txt.focus();
        }
        IWIN.BlockOpr.mayMove = true;
    },
    txtBlur : function (e,txt,item){
        txt.contentEditable = "false";
        IWIN.BlockOpr.mayMove = true;
        var oldVal = CompClass.getParamFromItem(item,'con');
        CompClass.setParamToItem(item,'con',txt.innerHTML);
        IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'txtCont',oldVal,txt.innerHTML);
    },
    addParamsToItem : function (item,o){
        CompClass.addParamsToItem(item,o);
        var txt =  item.getElementsByClassName(this.txtClass)[0];
    	txt.innerHTML = o.con;
        var isdataflow =  item.getElementsByClassName(this.isdtfClass)[0];          //add by haoyc DataFlow升级 20160316
        isdataflow.innerHTML = o.isdataflow;                                        //add by haoyc DataFlow升级 20160316
        var rftime=item.getElementsByClassName(this.rftimeClass)[0];                //add by haoyc DataFlow升级 20160321
        rftime.innerHTML= o.rftime;                                                 //add by haoyc DataFlow升级 20160321
        var addr=item.getElementsByClassName(this.addrClass)[0];                //add by haoyc DataFlow升级 20160325
        addr.innerHTML= o.addr;                                                 //add by haoyc DataFlow升级 20160325
        var mask =  item.getElementsByClassName(this.maskClass)[0];
        if (txt.innerHTML.replace(/<br>/g, '').replace(/[ ]/g, '') == '' && o.con.replace(/<br>/g, '').replace(/[ ]/g, '') == '') {
        	//初始化内容
        	mask.style.backgroundImage = "url(images/textnotify.png)";
        	mask.style.backgroundPosition = "center";
        	mask.style.backgroundRepeat = "no-repeat";
        	mask.style.backgroundColor = "";
        	mask.style.filter = "";
        	mask.style.mozOpacity = "";
        	mask.style.khtmlOpacity = "";
        	mask.style.opacity = "";
        } else {
        	mask.style.backgroundImage = "";
        	mask.style.backgroundPosition = "";
        	mask.style.backgroundRepeat = "";
        	mask.style.backgroundColor = "red";
        	mask.style.filter = "alpha(opacity=0)";
        	mask.style.mozOpacity = "0";
        	mask.style.khtmlOpacity = "0";
        	mask.style.opacity = "0";
        }
        var rect = item.getElementsByClassName(this.rectClass)[0];
        var that = this;
        IWIN.util.events(rect,'dblclick',function(e){
            that.txtFocus(e,txt);
        });
        IWIN.util.events(txt,'blur',function(e){
            that.txtBlur(e,txt,item);
        });
        return item;
    },
    setProperty : function (item,name,value){

        var params = JSON.parse(item.params);
        var rect =  item.getElementsByClassName(this.rectClass)[0];
        var txt =  item.getElementsByClassName(this.txtClass)[0];
        var isdtf =  item.getElementsByClassName(this.isdtfClass)[0];     //add by haoyc DataFlow升级 20160315
        var rftimec=item.getElementsByClassName(this.rftimeClass)[0];     //add by haoyc DataFlow升级 20160321
        var addr=item.getElementsByClassName(this.addrClass)[0];     //add by haoyc DataFlow升级 20160325

        switch (name){
            case 'txtCont':
                txt.innerHTML = value;
                params.con = value;
                break;
            case 'dim':
                params.dim = value;
                break;
            case 'speed':
                params.speed = parseInt(value);
                break;
            case 'isdataflow':                  //add by haoyc DataFlow升级 20160315
                isdtf.innerHTML = value;
                break;
            case 'rftime':                      //add by haoyc DataFlow升级 20160321
                rftimec.innerHTML=value;
                break;
            case 'addr':                      //add by haoyc DataFlow升级 20160325
                addr.innerHTML=value;
                break;
        }
        item.params = JSON.stringify(params);
    },
    getProperty : function (item,name){
        //var rect =  item.getElementsByClassName(this.rectClass)[0];
        var txt =  item.getElementsByClassName(this.txtClass)[0];
        var isdtf =  item.getElementsByClassName(this.isdtfClass)[0];           //add by haoyc DataFlow升级 20160315
        var rftimec=item.getElementsByClassName(this.rftimeClass)[0];           //add by haoyc DataFlow升级 20160321
        var addrc=item.getElementsByClassName(this.addrClass)[0];           //add by haoyc DataFlow升级 20160325

        var params = JSON.parse(item.params);
        switch (name){
            case 'txtCont':
                //return txt.innerHTML;
                return txt.textContent;
            case 'dim':
                return  params.dim;
            case 'speed':
                return params.speed;
            case 'width':
                return item.offsetWidth;
            case 'height':
                return item.clientHeight;
            case 'isdataflow':                                                  //add by haoyc DataFlow升级 20160315
                return isdtf.isdataflow;
            case 'rftime' :                                                     //add by haoyc DataFlow升级 20160321
                return rftimec.rftime;
            case 'addr' :                                                     //add by haoyc DataFlow升级 20160325
                return addrc.addr;

        }
    }
});

IWIN.Options.comp_map['25'] = Text2Comp;
