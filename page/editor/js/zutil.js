var CAMPUS = CAMPUS ||{};
CAMPUS.serverIp = '';
CAMPUS.util = {
    loadJS : function (list,async){
        var bd = document.getElementsByTagName('body')[0];
        async = async?true:false;
        for(var i=0;i<list.length;i++){
            var srpt = document.createElement('script');
            srpt.src = list[i];
            srpt.charset='utf-8';
            srpt.async = async;
            bd.appendChild(srpt);
        }
    },
    isIE : function (){
        return navigator.appName == "Microsoft Internet Explorer" || !!window.ActiveXObject || "ActiveXObject" in window;
    },
    isChrome : function (){
        return (window.google && window.chrome) || (window.navigator.userAgent.indexOf("Chrome") !== -1);
    },
    isAndroid : function (){
        return (navigator.userAgent.indexOf("Android") > -1);
    },
    byId : function (id){
        return (typeof (id)=='string')?document.getElementById(id):id;
    },
    //ͨ��className���Ҹ�Ԫ��
    findPElByCls : function (e,cls){
        var tar = e.target || e.srcElement || e;
        var bd = document.getElementsByTagName('body')[0];
        while(tar!=bd&&tar){
            if(this.cClass(tar,cls)){
                return tar;
            }
            tar = tar.parentNode;
        }
    },
    //��ȡ����ĵ���λ��
    getMsCords : function (e){
        ///debugInfo( "getMsCords1\n" );
        e = e || window.event || arguments.callee.caller.arguments[0];    //this.byId('debugArea').value += 'e='+e+'  e.targetTouches='+e.targetTouches+'\n  e.targetTouches[0].pageX='+e.targetTouches[0].pageX;
        ///debugInfo( "getMsCords2\n" );
        if(e.targetTouches){
            ///debugInfo( "getMsCords3\n" );
            return {x:e.targetTouches[0].pageX,y:e.targetTouches[0].pageY};
        }
        ///debugInfo( "getMsCords4\n" );
        if(e.pageX || e.pageY){
            ///debugInfo( "getMsCords5\n" );
            return {x:e.pageX, y:e.pageY};
        }
        ///debugInfo( "getMsCords6\n" );
        var bd = document.documentElement || document.body;
        return {x:e.clientX + bd.scrollLeft,y:e.clientY + bd.scrollTop};
    },
    //��ȡԪ������ĵ���λ��
    getElePos : function (e){
        ///debugInfo( "getElePos1\n" );
        var left = 0;
        var top  = 0;
        while (e.offsetParent){
            left += e.offsetLeft;
            top  += e.offsetTop;
            e     = e.offsetParent;
        }
        left += e.offsetLeft;
        top  += e.offsetTop;
        ///debugInfo( "getElePos2\n" );
        return {x:left, y:top};
    },
    // ��ȡ����Ԫ�ص����λ��,��obj2�����obj1�����λ��
    getEle2Ele : function(obj1, obj2){
        var obj1Pos = this.getElePos(obj1);
        var obj2Pos = this.getElePos(obj2);
        return {x:obj2Pos.x - obj1Pos.x, y:obj2Pos.y - obj1Pos.y};
    },
    //��ȡ������Ԫ�ص�λ��
    getMs2Ele : function (o,e){
        ///debugInfo( "getMs2Ele1\n" );
        e = e || window.event || arguments.callee.caller.arguments[0];
        ///debugInfo( "getMs2Ele2\n" );
        var msPos = this.getMsCords(e); //alert('msPos='+msPos.x +'  '+msPos.y);
        ///debugInfo( "getMs2Ele3\n" );
        var elPos = this.getElePos(o); //alert('elPos='+elPos.x +'  '+elPos.y);
        ///debugInfo( "getMs2Ele4\n" );
        return {x:msPos.x-elPos.x,y:msPos.y-elPos.y};
    },
    //��Ԫ�ؾ��Զ�λ����£���Ԫ������left��topֵ
    setElXY : function (o,pos){
        var el = this.byId(o);
        with (el.style){
            left = pos.x + 'px';
            top = pos.y + 'px';
        }
    },
    //��Ԫ�ؾ��Զ�λ����£���Ԫ������width��heightֵ
    setElWH : function (o,pos){
        var el = this.byId(o);
        with (el.style){
            width = pos.w + 'px';
            height = pos.h + 'px';
        }
    },
    //��������¼���ͨ�ú���
    events:function(elem,type,fn){
        var func = function(e){
            fn(e,elem);
        };
        if(elem.attachEvent){
            elem.attachEvent("on"+type,func);
        }else if(elem.addEventListener){
            elem.addEventListener(type,func,false);
        }else{
            elem["on"+type]= func;
        }
        elem.hdls = elem.hdls || {};
        elem.hdls[type] = elem.hdls[type] || [];
        elem.hdls[type].push(func);
        return func;
    },
    //���ڶ�ȡ����json�ļ�
    readJsonFile:function(source,callback){
        var xhr = new XMLHttpRequest;
        xhr.open("GET", source+"?random="+new Date().getTime());
        xhr.onreadystatechange = function() {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                var doc = xhr.responseText;
                var json = JSON.parse(doc);
                console.log("JSON: " + JSON.stringify(json));
                if(callback)callback(json);
            }else{
                console.log("json�ļ���ȡʧ�ܣ�");
            }
        }
        xhr.send();
    },
    /**
     *ɾ�����¼�
     * @param elem  Ԫ��
     * @param type     [optional]�¼�����
     * @param fn        [optional]�¼�����
     */
    delEvent : function (elem,type,fn){
        /**
         *  ɾ���������¼�
         * @param el
         * @param tp
         * @param func
         */
       var rmEvent = function (el,tp,func){
           if(el.detachEvent){
                el.detachEvent('on'+tp,func);
           }else if(el.removeEventListener){
                el.removeEventListener(type,func,false);
           }
           if(el['on'+tp]==func)el['on'+tp] = null;
       };
        /**
         * ɾ��һ����¼�
         * @param el
         * @param tp
         */
       var removeEventList = function (el,tp){
           if(el.hdls&&el.hdls[tp]){
               for(var i=0;i<el.hdls[tp].length;i++){
                   rmEvent(el,tp,el.hdls[tp][i]);
               }
               el.hdls[tp].length = 0;
           }
           el["on"+tp] = null;
       };
        //���ָ����type��δָ��fn����ôɾ��������͵����к����¼�
       if(!fn && type){
           removeEventList(elem,type);
       }else if(!type){
           //���δָ�����ͣ���ôɾ���������͵ĺ����¼�
           if(elem.hdls){
               for(var i in elem.hdls){
                   removeEventList(elem,elem.hdls[i]);
               }
               elem.hdls = {};
           }
           for(var o in elem){
               if(o.indexOf('on')===0)elem[o]=null;
           }
       }else{
           //���ָ����type��fn����ôֱ��ɾ���¼�
           if(el.hdls&&el.hdls[type]){
               for(var i=0;i<elem.hdls[type].length;i++){
                   if(elem.hdls[type][i]==fn) {
                       elem.hdls[type].splice(i,1);
                       break;
                   }
               }
           }
           rmEvent(elem,type,fn);
       }
    },
    eventsAndPos : function (elem,type,fn){
         var that = this;
         this.events(elem,type,function(e,ele){
             var pos = that.getMs2Ele(ele,e);
             fn(e,elem,pos);
         })
    },
    setEvent : function (elem,type,fn){
        elem["on"+type]= function (e){
            fn(e,elem);
        };
    },
    setInnerText : function(ele,txt){
        ele.innerText = txt;
        ele.textContent = txt;
    },
    getInnerText : function (ele){
        return ele.innerText || ele.textContent;
    },
    //����ɾ��Ԫ��
    removeEle : function (ele){
        var pa = ele.parentNode;
        this.delAllEvent(ele);
        pa.removeChildren(ele);
    },
    //�������Ԫ�ص���Ԫ��
    removeAllChildren : function (ele){
        if(ele.children.length == 0)return;
        for(var i =0;i<ele.children.length;i++){
            var ch = ele.children[0];
            ele.removeChild(ch);
        }
        this.removeAllChildren(ele);
    },
    //���ڴ�oldDivת��������Ԫ�ص�newDiv
    moveAllChildren : function(oldDiv,newDiv){
        if(oldDiv.children.length == 0)return;
        for(var i =0;i<oldDiv.children.length;i++){
            var ch = oldDiv.children[0];
            newDiv.appendChild(ch);
        }
        this.moveAllChildren(oldDiv,newDiv);
    },
    removeAllChsByClass : function (ele,c){
        var chs = ele.getElementsByClassName(c);
        if(!chs||chs.length==0)return;
        for(var i=0;i<chs.length;i++){
            ele.removeChild(chs[0]);
        }
        this.removeAllChsByClass(ele,c);
    },
    //��������Ԫ��͸����
    setOpacity : function (obj,n){
        obj.style.filter = 'alpha(opacity='+n+')';
        obj.style.opacity = n/100;
    },
    //����easy�˶�
    startMove : function (obj,json,fn){
        if(obj.timer)clearInterval(obj.timer);
        var that = this;
        obj.timer = setInterval(function(){
            var bBtn = true;

            for(var attr in json){

                var iCur = 0;
                if(attr == 'opacity'){
                    iCur = Math.round(that.getStyle(obj,attr)*100);
                }else if(attr=='transform'){
                    iCur = that.getTransforms(obj);
                }else{
                    iCur = parseInt(that.getStyle(obj,attr));
                    if(!iCur)iCur = 0;
                }

                if(attr=='transform'){
                    var atObj = {};
                    for(var at in json[attr]){
                        if(!iCur[at]){
                            iCur[at]= at.indexOf('scale')>-1?1:0;
                        }
                        atObj[at] = (json[attr][at] - iCur[at])/8;
                        atObj[at] = atObj[at] > 0 ? Math.ceil(atObj[at]) : Math.floor(atObj[at]);
                        if(json[attr][at]-iCur[at]>1){
                            bBtn = false;
                        }
                    }
                    iSpeed = atObj;
                }else{
                    var iSpeed = (json[attr] - iCur)/8;
                    iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

                    if(iCur != json[attr]){
                        bBtn = false;
                    }
                }


                if(attr == 'opacity'){
                    obj.style.filter = 'alpha(opacity='+(iCur + iSpeed)+')';
                    obj.style.opacity = (iCur+iSpeed)/100;
                }else if(attr=='transform'){
                    var atObj = {};
                    for(var at in json[attr]){
                        atObj[at] = iSpeed[at]+ iCur[at];
                    }
                    that.setTransforms(obj,atObj);
                }else{
                    obj.style[attr] = iCur + iSpeed + 'px';
                }

            }

            if(bBtn){
                clearInterval(obj.timer);

                if(fn){
                    fn.call(obj);
                }

            }

        },30);
    },
    //���������˶�
    startUniformMove : function (obj,json,speed,fn){
        if(obj.timer)clearInterval(obj.timer);
        speed = parseInt(speed);
        var that = this;
        obj.timer = setInterval(function(){
            var bBtn = true;

            for(var attr in json){

                var iCur = 0;
                if(attr == 'opacity'){
                    iCur = Math.round(that.getStyle(obj,attr)*100);
                }else{
                    iCur = parseInt(that.getStyle(obj,attr));
                    if(!iCur)iCur = 0;
                }

                if(iCur != json[attr]){
                    bBtn = false;
                }

                if(Math.abs(json[attr] - iCur) < speed){
                    iSpeed = json[attr] - iCur;
                }else{
                    iSpeed = json[attr]>iCur?speed:-speed;
                }


                if(attr == 'opacity'){
                    obj.style.filter = 'alpha(opacity='+(iCur + iSpeed)+')';
                    obj.style.opacity = (iCur+iSpeed)/100;
                }else{
                    obj.style[attr] = iCur + iSpeed + 'px';
                }

            }

            if(bBtn){
                clearInterval(obj.timer);

                if(fn){
                    fn.call(obj);
                }

            }

        },30);
    },
    //ֹͣ�˶�
    stopMove :function (obj){
        if(obj.timer)clearInterval(obj.timer);
    },
    //�����ƶ�
    startTextMove : function(divContainer, options){
        var container = typeof divContainer === 'string' ? document.getElementById(divContainer) : divContainer;
        if(container.rollingTimer) clearInterval(container.rollingTimer);
        var contentTemp = "<table>"
            + ' <tr>'
            + '     <td class="rollingCell_1">'
            + '         <table>'
            + '             <tr>'
            + '                 <td>{content}</td>'
            + '             </tr>'
            + '         </table>'
            + '     </td>'
            + '     <td class="rollingCell_2"></td>'
            + ' </tr>'
            + '</table>';
        container.innerHTML = contentTemp.replace(/\{content\}/g, container.innerHTML);
        container.style.cssText = '';
        var options = options || {};
        var delay = options.delay || 30;
    	if (options.speed == "1") {
    		delay = 30;
    	} else if (options.speed == "2") {
    		delay = 20;
    	} else if (options.speed == "4") {
    		delay = 10;
    	}
    	var cell_1 = container.getElementsByClassName('rollingCell_1')[0];
        var cell_2 = container.getElementsByClassName('rollingCell_2')[0];
        // ���������Ŀ�ȴ��ڻ���ڸ������Ŀ��ʱ���򽫵�ǰ�е����ݸ��Ƹ���һ��
        while (cell_1.offsetWidth <= container.offsetWidth) {
        	cell_1.innerHTML = cell_1.innerHTML.replace(/<\/td>/g, '&nbsp;<\/td>');
        }
        if(cell_1.offsetWidth >= container.offsetWidth){
            cell_2.innerHTML = cell_1.innerHTML;
        }
        container.rollingTimer = setInterval(function(){
        	if (options.dim == "left") {
        		container.scrollLeft >= cell_2.offsetWidth ? container.scrollLeft -= cell_1.offsetWidth + 50 : container.scrollLeft++;
        	} else if (options.dim == "right") {
        		container.scrollLeft <= cell_2.offsetWidth - container.offsetWidth - 50 ? container.scrollLeft += cell_1.offsetWidth + 50 : container.scrollLeft--;
        	}
        }, delay);
    },
    //���ִ�ֱ�ƶ�
    startTextMoveV : function(divContainer, options){
        var container = typeof divContainer === 'string' ? document.getElementById(divContainer) : divContainer;
        if(container.rollingTimer) clearInterval(container.rollingTimer);
        var contentTemp = "<table>"
            + ' <tr>'
            + '     <td class="rollingCell_V1">'
            + '         <table>'
            + '             <tr>'
            + '                 <td>{content}</td>'
            + '             </tr>'
            + '         </table>'
            + '     </td>'
            + ' </tr>'
            + ' <tr>'
            + '     <td class="rollingCell_V2"></td>'
            + ' </tr>'
            + '</table>';
        container.innerHTML = contentTemp.replace(/\{content\}/g, container.innerHTML);
        container.style.cssText = '';
        var options = options || {};
        var delay = options.delay || 30;
    	if (options.speed == "1") {
    		delay = 30;
    	} else if (options.speed == "2") {
    		delay = 20;
    	} else if (options.speed == "4") {
    		delay = 10;
    	}
    	var cell_1 = container.getElementsByClassName('rollingCell_V1')[0];
        var cell_2 = container.getElementsByClassName('rollingCell_V2')[0];
        // ���������Ŀ�ȴ��ڻ���ڸ������Ŀ��ʱ���򽫵�ǰ�е����ݸ��Ƹ���һ��
        while (cell_1.offsetHeight <= container.offsetHeight) {
        	cell_1.innerHTML = cell_1.innerHTML.replace(/<\/td>/g, '<br><\/td>');
        }
        if(cell_1.offsetHeight >= container.offsetHeight){
            cell_2.innerHTML = cell_1.innerHTML;
        }
        container.rollingTimer = setInterval(function(){
        	if (options.dim == "up") {
        		container.scrollTop >= cell_2.offsetHeight ? container.scrollTop -= cell_1.offsetHeight + 50 : container.scrollTop++;
        	} else if (options.dim == "down") {
        		container.scrollTop <= cell_2.offsetHeight - container.offsetHeight - 50 ? container.scrollTop += cell_1.offsetHeight + 50 : container.scrollTop--;
        	}
        }, delay);
    },
    stopTextMove :function (divContainer){
        var container = typeof divContainer === 'string' ? document.getElementById(divContainer) : divContainer;
        if(container.rollingTimer) clearInterval(container.rollingTimer);
    },
  
    //ajax
    ajax : function (url,dt,mth,asc,callbk){
        /*function make_base_auth(user, password) {
            var tok = user + ':' + password;
            var hash = Base64.encode(tok);
            return "Basic " + hash;
        }

        var auth = make_base_auth('hh111','hh111');*/


        //��ȡ���������
        var req;
        if(window.XMLHttpRequest){
            req = new window.XMLHttpRequest();
        }else{
            try{
                req = new window.ActiveXObject("Microsoft.XMLHTTP");
            }catch(e){
                try{
                    req = new window.ActiveXObject("Msxml2.XMLHTTP");
                }catch(e2){
                }
            }
        }
        /*if ("withCredentials" in req){
            req.withCredentials = true;
        }else if(window.XDomainRequest){
            req = new window.XDomainRequest();
        }*/

        if(!req){
            alert("�޷�����ajax����");
            return;
        }     

        //����������
        req.onreadystatechange = function (){
            if(req.readyState == 4){
                if(req.status == 200){
                   if(callbk)callbk(req.responseText);
                }
                else if(req.status==911){
                	window.location.href=IWIN.serverIp+'/ManagementCenter/';
                }
                else{
                    //alert('δ���󵽽����');
                }
            }
        }
        var data = '';
        if(typeof dt =='string'){
            data = dt;
        }else{
            var tt = '';
            for(var o in dt){
                data += tt + o +'='+dt[o];
                tt = '&';
            }
        }


        if( !mth || 'get'== mth.toLowerCase()){
            var dt = (data)?('?'+data):'';            
            req.open('get',url + dt,asc);
            req.setRequestHeader("x-requested-with","XMLHttpRequest");
            req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
            req.send();
        } else {
            //req.setRequestHeader('Authorization', auth);
            req.open('post',url,asc);
            req.setRequestHeader("x-requested-with","XMLHttpRequest");
            req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
            req.send(data);
        }

        if(!asc){
            // if(callbk)callbk(req.responseText);
            return req.responseText;
        }
    },
    //��ȡurl����
    getQueryString : function(name){
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    },
    //�õ�Ԫ�ص�css��ʽ
    getStyle : function(obj,attr){
        if(obj.currentStyle){
            return obj.currentStyle[attr];
        }
        else{
            return getComputedStyle(obj,false)[attr];
        }
    },
    //�õ�Ԫ�ص�css��ʽ��ֵ
    getStyleVal : function (obj,attr){
        
        var tmp = this.getStyle(obj,attr);
        var val = parseInt(tmp.replace('px',''),10);
        
        var params=document.getElementById("defaultrate").innerText.split(":");
        var nowwid=parseInt(params[0])
        var nowhei=parseInt(params[1])
        if(!val){
            if (attr.toLowerCase() == "width" || attr.toLowerCase() == "height") {
                if (tmp == null || tmp == "" || tmp.toLowerCase() == "auto") {
                    if (attr.toLowerCase() == "width") {
                        return obj.offsetWidth;
                    } else if (attr.toLowerCase() == "height") {
                        return obj.offsetHeight;
                    }
                }
            }
        }
        else
        {
            console.log(attr.toLowerCase()+"----aaa1----"+val)
            if(attr.toLowerCase()=="left")
            {
                if(parseInt(val)>=nowwid)
                {
                    // console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa3"+(nowwid-20))
                    document.getElementById("iframe").contentDocument.getElementById("xVal").value=nowwid-20
                    return (nowwid-100);
                }
            }
            else if(attr.toLowerCase()=="top")
            {
                if(parseInt(val)>=nowhei)
                {
                    document.getElementById("iframe").contentDocument.getElementById("yVal").value=nowhei-20
                    return (nowhei-100);
                }
            }

        }
        return val?val:0;
    },
    getTransforms : function (obj){
        
        if(!obj.trsfm)return {};
        return JSON.parse(obj.trsfm);

    },
    getTransformVal : function (obj,name){
        var map = this.getTransforms(obj);
        if(!map[name]){
            if(name.indexOf('scale'))return 1;
            else{
                return 0;
            }
        }
        var val = map[name].replace('px','').replace('deg','');
        return val;
    },
    setTransforms : function (obj,o){
       
        obj.trsfm = JSON.stringify(o);
        var zu = [];      //console.log('%%perspective='+ o.perspective+'  rotateY='+ o.rotateY);
        for(var attr in o){
            var val = o[attr];
            var nn = '';
            if(typeof (val)=='number'||(typeof (val)=='string'&&val.indexOf(',')==-1)){
                if(attr.indexOf('translate')>-1)nn='px';
                if(attr.indexOf('rotate')>-1)nn='deg';
                if(attr.indexOf('skew')>-1)nn='deg';
                if(attr.indexOf('perspective')>-1)nn='px';
            }
            zu.push(attr+'('+val+nn+')');
        }
        var atStr = zu.join(' ');
        obj.style.webkitTransform = atStr;
        obj.style.mozTransform = atStr;
        obj.style.transform = atStr
    },
    setTransformVal : function (obj,name,val){
        var map = this.getTransforms(obj);
        map[name]=val;
        this.setTransforms(obj,map);
    },
    //�������ⶨλ���Ա㿪ʼ��̬Ч��
    setSpecialPos : function (obj){
        var style = this.getStyle(obj,'position');
        if('absolute'== style || 'relative'== style ||'fixed'==style) return;
        obj.style.position = 'relative';
    },
    //��o2�е����Ը��Ƶ�o1��
    extend : function (o1,o2){
        for(var o in o2){
            o1[o] = o2[o];
        }
        return o1;
    },
    //����Ԫ�ض�λ

    /**
     * ��Ԫ�����class��
     * @param ele
     * @param name
     */
    aClass : function (ele,name){
         ele.className = name +' '+ ele.className;
    },
    /**
     * ɾ��Ԫ���е�class��
     * @param ele
     * @param name
     */
    dClass : function (ele,name){
        if(!ele.className)return;
        var list = ele.className.split(' ');
        for(var i=0;i<list.length;i++){
            if(list[i]==name){
                list.splice(i,1);
                ele.className = list.join(' ');
                return;
            }
        }
    },
    /**
     *����Ƿ���class��
     * @param ele
     * @param name
     * @returns {boolean}
     */
    cClass : function (ele,name){
        if(!ele.className)return false;
        var cn = ele.className;
        if(typeof (cn)!="string")cn = cn.baseVal;
        var list = cn.split(' ');
        for(var i=0;i<list.length;i++){
            if(list[i]==name){
                return true;
            }
        }
        return false;
    },
    /**
     *  �滻class
     * @param ele
     * @param oClass
     * @param nClass
     */
    rClass : function (ele,oClass,nClass){
        if(!ele.className)return false;
        var list = ele.className.split(' ');
        for(var i=0;i<list.length;i++){
            if(list[i]==oClass){
                list[i] = nClass;
                ele.className = list.join(' ');
                return;
            }
        }
    },
    /**
     * ��Ԫ�����class������ȥ��
     * @param ele
     * @param name
     */
    aUniqueClass : function (ele,name){
        if( !this.cClass( ele, name ) )
            ele.className = name +' '+ ele.className;
    },
    togClass : function (ele,name){
        if(this.cClass(ele,name)){
            this.dClass(ele,name);
        }else{
            this.aClass(ele,name);
        }
    },
    /**
     * ��һϵ�е�Ԫ�����Ψһ��class�������ul�µ�li���Ψһ��check
     * @param ele
     * @param name
     */
    aOnlyClass : function (ele,name){
        var chs = ele.parentNode.children;
        for(var i=0;i<chs.length;i++){
            this.dClass(chs[i],name);
        }
        this.aClass(ele,name);
    },
    /**
     * ����ɫ�ַ���ת��Ϊ#��ʽ����
     */
    colorHex : function (clr){
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(/^(rgb|RGB)/.test(clr)){
            var aColor = clr.replace(/(?:\(|\)|rgb|RGB)*/g,"").split(",");
            var strHex = "#";
            for(var i=0; i<aColor.length; i++){
                var hex = Number(aColor[i]).toString(16);
                if(hex === "0"){
                    hex += hex;
                }
                strHex += hex;
            }
            if(strHex.length !== 7){
                strHex = clr;
            }
            return strHex;
        }else if(reg.test(clr)){
            var aNum = clr.replace(/#/,"").split("");
            if(aNum.length === 6){
                return clr;
            }else if(aNum.length === 3){
                var numHex = "#";
                for(var i=0; i<aNum.length; i+=1){
                    numHex += (aNum[i]+aNum[i]);
                }
                return numHex;
            }
        }else{
            return clr;
        }
    },
    /**
     * ����ɫ�ַ���ת��Ϊrgb��ʽ����
     */
    colorRgb : function (clr){
        var sColor = clr.toLowerCase();
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(sColor && reg.test(sColor)){
            if(sColor.length === 4){
                var sColorNew = "#";
                for(var i=1; i<4; i+=1){
                    sColorNew += sColor.slice(i,i+1).concat(sColor.slice(i,i+1));
                }
                sColor = sColorNew;
            }
            //
            var sColorChange = [];
            for(var i=1; i<7; i+=2){
                sColorChange.push(parseInt("0x"+sColor.slice(i,i+2)));
            }
            return "RGB(" + sColorChange.join(",") + ")";
        }else{
            return sColor;
        }
    },
    /**
     * ����ɫֵ��͸����ֵתΪrgba��ʽ����
     * clr:��ɫֵ��������rgb��ʽ��Ҳ������#��ͷ��ʽ
     * opacity:0-1��С��
     */
    colorRgba : function (clr,opacity){
        var rgbC = this.colorRgb(clr).toLowerCase();
        var cList = rgbC.replace('rgb(','').replace('rgba(','').replace(')','').split(',');
        cList[3] = opacity;
        return "RGBA(" + cList.join(",") + ")";
    },
    /**
     * ��ȡ��ɫֵ��͸����
     */
    getClrOpacity : function (clr){
        var sColor = clr.toLowerCase();
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(sColor && reg.test(sColor)){
            return 1;
        }else{
            var rgbC = this.colorRgb(clr).toLowerCase();
            var cList = rgbC.replace('rgb(','').replace('rgba(','').replace(')','').split(',');
            if(cList.length<4){
                return 1;
            }else{
                return cList[3];
            }
        }
    },
    /**
     * ��ȡrgba��ɫ�е�rgbֵ;�������rgbaֵ����ô����ԭֵ
     */
    getClrRgb : function (clr){
        var sColor = clr.toLowerCase();
        if(sColor&&sColor.indexOf('rgba(')>-1){
            var rgbC = this.colorRgb(clr).toLowerCase();
            var cList = rgbC.replace('rgba(','').replace(')','').split(',');
            cList.length = 3;
            return "RGB(" + cList.join(",") + ")";
        }
        return clr;
    },
	 /**
     * ���ݵ�ǰ��ѡ��ĵĿγ�������ȡ��Ӧ�Ŀγ��б�����
     */
	 getCurrentCList: function(id){
		var _url ='/ManagementCenter/curriculum/Curriculum_returnCourseInfoJson.do' +'?idstr='+ id +'&t='+ new Date().getTime();
		var _data; 
		this.ajax(_url,'','',false,function(data){
			_data = data;
		});
		return _data;
	 }
};
(function() {
    var lastTime = 0;
    var vendors = ['webkit', 'moz'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] ||    // Webkit�д�ȡ�����������ֱ���
                                      window[vendors[x] + 'CancelRequestAnimationFrame'];
    }
    if (!window.requestAnimationFrame) {
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16.7 - (currTime - lastTime));
            var id = window.setTimeout(function() {
                callback(currTime + timeToCall);
            }, timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
    }
    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }
}());
