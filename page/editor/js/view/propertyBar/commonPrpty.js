/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 13-12-16
 * Time: 上午10:55
 * To change this template use File | Settings | File Templates.
 */
(function(){
    var IWIN = IWIN || parent.IWIN ||{};
	var doc = document,
		byId = function(id){
			return typeof id ==="string" ? doc.getElementById(id) : id;
		},
		byClass = function(clsName,el){
			var el = el ? el : doc;
			return el.getElementsByClassName(clsName);
		},
		byName = function(name){
			return doc.getElementsByName(name);
		},
		byTagName = function(tagName,el){
			var el = el ? el : doc;
			return el.getElementsByTagName(tagName);
		};
    var PropertyBar = {
        util: IWIN.util,
        init : function (){
            var els = document.getElementsByName('valEl');
            var dpok = document.getElementById('dpOkInput');
            for(var i=0;i<els.length;i++){
            	var name = els[i].id;
                this.setVal(name,IWIN.BlockOpr.getProperty(name));
                this.addComEvent(name);
            }
            if(dpok != null){
            	this.setVal(name,IWIN.BlockOpr.getProperty(name));
                this.addComEvent(name);
            }

            var fEls = document.getElementsByName('fValEl');
            for(var i=0;i<fEls.length;i++){
                var name = fEls[i].id;
                this.addFontEvent(name);
            }

            var imgsDiv = document.getElementById('imgList');
            var imgList = IWIN.BlockOpr.getProperty('img_list');
            if (imgList)
            {
                for (var i=0; i<imgList.length; i++)
                {
                    var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                    var imgsDiv = document.getElementById('imgList');
                    imgsDiv.appendChild(imgItem);
                    imgItem.getElementsByClassName('scroll_item_img')[0].src = imgList[i].mapped;
                    imgItem.getElementsByClassName('scroll_title_input')[0].value = imgList[i].title;
                    imgItem.getElementsByClassName('scroll_title_input')[0].onblur = function (){
                        that.editScrollTitle(this);
                    }
                    imgItem.params = JSON.stringify({path:imgList[i].path,title:imgList[i].title,mapped:imgList[i].mapped});
                }
            }
            //班级活动读取历史记录  add by haoyc 班级活动 20160612
            var imageText_list=IWIN.BlockOpr.getProperty('imageText_list'),that=this;//update by haoyc 班级活动、班级荣誉、作业布置、自定义组件公用部分 20160809
            if(imageText_list){
                var currentObj = IWIN.BlockOpr.getCurObj().id;
                for(var i=0;i<imageText_list.length;i++) {
                    var path = imageText_list[i].mapped;
                    if(path==null) path="";
                    var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                    var imgDiv = document.getElementById('imgList');
                    imgItem.params = JSON.stringify({id:imageText_list[i].id,path:imageText_list[i].path,mapped:imageText_list[i].mapped,info:imageText_list[i].info});
                    imgDiv.appendChild(imgItem);
                    if(typeof imgDiv.getElementsByClassName("scroll_item_img")[i]!="undefined")
                    {
                        imgDiv.getElementsByClassName('scroll_item_img')[i].src = path.indexOf('http://') < 0 ? path : path;
                    }
                    if(typeof imgDiv.getElementsByClassName('scroll_info_input')[i]!="undefined")
                    {
                        imgDiv.getElementsByClassName('scroll_info_input')[i].value = imageText_list[i].info;
                        imgDiv.getElementsByClassName('scroll_id_input')[i].value = imageText_list[i].id;
                        imgItem.getElementsByClassName('scroll_info_input')[0].onblur=function()
                        {
                            that.editScrollInfo(this,currentObj,'imageText_list');
                        }
                    }
                }
            }
            // add by caoqian 德育排名
            var activity_list_rank=IWIN.BlockOpr.getProperty('activity_list_rank'),that=this;
            if(activity_list_rank){
                var currentObj = IWIN.BlockOpr.getCurObj().id;
                for(var i=0;i<activity_list_rank.length;i++) {
                    var path = activity_list_rank[i].path;
                    if(path==null) path="";
                    var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                    var imgDiv = document.getElementById('imgList');
                    imgItem.params = JSON.stringify({id:activity_list_rank[i].id,path:activity_list_rank[i].path,mapped:"",info:activity_list_rank[i].info});
                    imgDiv.appendChild(imgItem);
                    imgDiv.getElementsByClassName('scroll_info_input_name')[i].value = activity_list_rank[i].info;
                    imgDiv.getElementsByClassName('scroll_info_input_rank')[i].value = activity_list_rank[i].path;
                    imgDiv.getElementsByClassName('scroll_id_input')[i].value = activity_list_rank[i].id;
                    imgItem.getElementsByClassName('scroll_info_input_name')[0].onblur=function(){
                        that.editScrollInfoName(this,currentObj);
                    }
                    imgItem.getElementsByClassName('scroll_info_input_rank')[0].onblur=function(){
                        that.editScrollInfoRank(this,currentObj);
                    }
                }
            }


			// 优秀作品属性页初始化及相关操作
			this.eWorkInit();
		
			// 时间部件或天气部件属性页初始化及保存操作
			if(byId('opacitySetWrap')){
				new IWIN.SliderBar('bg_opacity');
			}
			
			// 初始化背景颜色设置
			if(byId('backColorWrap')){
				new IWIN.ColorSet('bg_color');
			}
			
			// 初始化字体颜色设置
			if(byId('fontColorWrap')){
				new IWIN.ColorSet('font_color');
			}
			
			// 初始化边框颜色设置
			if(byId('borderSetWrap')){
				new IWIN.ColorSet('bd_color');
			}

			// 加载城市列表
			var cityEl = byId('city');
			if(cityEl){
				this.cityListLoad(cityEl);
			}
			
			// 课程表属性页初始化及相关操作
			this.courseListInit();
			this.classListInit();//班级活动初始化  add by haoyc 班级活动 20160607
            this.addBtnEvent();

            //自定义组件轮播效果
            if(byId("effect"))
            {
                var scrl2effect=byId("effect");
                var oldVal=IWIN.BlockOpr.getProperty("effect");
                var options = scrl2effect.options;
                for (var i = 0; i < options.length; i++) {
                    if (oldVal == options[i].value) {
                        options[i].selected = "true";
                    }
                }
                this.util.events(scrl2effect,'change',function(e){
                    var newVal = scrl2effect.value;
                    IWIN.BlockOpr.setProperty('effect',newVal);
                    IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'effect',oldVal,newVal);
                });
            }

            if(byId("program_update"))
            {
                IWIN.util.events(byId('program_update'),'click',function (e){
                    IWIN.Controller.execute('CMD_PROJECT_UPDATE',IWIN.BlockOpr.getCurObj().id);

//                    $.ajax({
//                        type : "GET",
//                        cache : false,
//                        url : IWIN.serverIp + "/ManagementCenter/playplan/PlayPlan_updatePlayPlanQ.do?prid="+IWIN.Options.cur.program,
//                        async:false,
//                        success : function(data) {
//                            if(0==data){
//                                alert("发布成功");
////    					window.location.href = IWIN.serverIp + '/ManagementCenter/project/Project_quickReplaceHome.do?module=QuickReplace&signre=0';
//                                var hre = '';  // 标志：快速更新从哪个地方进来的  快速更新列表是0   播放管理列表是1
//                                if(IWIN.util.byId('ent').value=='1'){
//                                    hre = IWIN.serverIp + '/ManagementCenter/playplan/PlayPlan_home.do?module=PlayPlan';
//                                }else{
//                                    hre = IWIN.serverIp + '/ManagementCenter/project/Project_quickReplaceHome.do?module=QuickReplace';
//                                }
//                                location.replace(hre);
//                            }
//                            else{
//
//                            }
//                        },
//                        error : function() {
//                            $.messager.alert('错误', '程序进行出现错误', 'error');
//                        }
//                    });



                })
            }
            if(byId('activity_type'))
            {
                var activity_type = IWIN.BlockOpr.getProperty('tName');
                byId('activity_type').value=activity_type;
                var currentObj = IWIN.BlockOpr.getCurObj().id;
                IWIN.util.events(byId('activity_type'),'change',function (e){
                    var type_temp=byId('activity_type').value;
                    IWIN.BlockOpr.setProperty('tName',type_temp,currentObj);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',currentObj,'tName',activity_type,type_temp);

                    var newList = that.findImgList();
                    //只要有一个修改所有id置空
                    var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                    for(var i=0;i<newList.length;i++){
                        newList[i].id="";
                    }
                    IWIN.BlockOpr.setProperty('imageText_list',newList);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);

                })
            }
        },
		eWorkInit: function(){ // 优秀作品属性页相关
			// 优秀作品二级页面背景图
            var backPicEl = byId('backPic');
            if(backPicEl){
                var backPic_val = IWIN.BlockOpr.getProperty('backPic');
				backPicEl.src = backPic_val.mapped;
                backPicEl.onclick = function (){
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4',function(win){
                        var oldPath = IWIN.BlockOpr.getProperty('backPic');
                        var list = win.query();
                        if(!list)return;
                        var path = list[0].mapped;
                        backPicEl.src = path.indexOf('http://') < 0 ? path : path;
						// var newPath = {path:list[0].path,mapped:list[0].mapped};
                        var newPath = {path:list[0].path,mapped:list[0].mapped};
                        IWIN.BlockOpr.setProperty('backPic',newPath);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'backPic',oldPath,newPath);
                    });
                }
            }
			
			// 优秀作品列表
            var articleList = IWIN.BlockOpr.getProperty('articleList'),that = this;
            if (articleList){
                for (var i=0; i<articleList.length; i++){
                    var eWrokItem = byId('eWorksWrap').children[1].cloneNode(true);
                    var eWorksDiv = byId('eWorksInner');
                    eWorksDiv.appendChild(eWrokItem);
					
                    byClass('fileSrc',eWrokItem)[0].src = articleList[i].mapped;
                    byClass('workName',eWrokItem)[0].value = articleList[i].title;
					byClass('authorInfo',eWrokItem)[0].value = articleList[i].author;
					
                     byClass('workName',eWrokItem)[0].onblur = function (){
                         that.saveWorksInfo(this);
                    }
					byClass('authorInfo',eWrokItem)[0].onblur = function (){
                        that.saveWorksInfo(this);
                    }
                    eWrokItem.params = JSON.stringify({id:Number(i+1), path:articleList[i].path, title:articleList[i].title, author:articleList[i].author, mapped:articleList[i].mapped});
                }
            }
		},
		courseListInit: function(){  // 课程表属性页相关
			// 页面初始加载课程表名
			var cNameListEl = byId('cListID');
			if(cNameListEl){
				IWIN.Request.getCName(function(rsData){
					for(var i=0,len=rsData.cList.rows.length;i<len;i++){ 
					   var opt = new Option(rsData.cList.rows[i].curriculumName,rsData.cList.rows[i].id);
					   cNameListEl.options.add(opt);
					} 
					var oldServerIp = IWIN.BlockOpr.getProperty('serverIp');
					IWIN.BlockOpr.setProperty('serverIp',rsData.serverIp);
					IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'serverIp',oldServerIp,rsData.serverIp);

					var oldCListID = IWIN.BlockOpr.getProperty('cListID');
					if(!oldCListID && rsData.cList.rows.length>0){ 
						var newCListID = cNameListEl.options[0].value;
						// 根据加载的课程表名，将第一项作为cListID的默认值
						IWIN.BlockOpr.setProperty('cListID',newCListID);
						IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'cListID', oldCListID,newCListID);
						oldCListID = newCListID;
					}
					for(var j=0,optsLen=cNameListEl.options.length;j<optsLen;j++){
						if(cNameListEl.options[j].value==oldCListID){
							cNameListEl.options[j].selected = true;
							break;
						}
					}

					// 获取选中的课程名的课程表数据
					IWIN.Request.getCList(function(rsData){
						IWIN.BlockOpr.setProperty('cData',JSON.stringify(rsData));
						IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'cData', IWIN.BlockOpr.getProperty('cData'),JSON.stringify(rsData));
					});
				});
			}
			
			// 课程表二级页面背景图的设置
			var bgImgEl = byId('bgImg');
            if(bgImgEl){
                var dftSrc = '../../images/iwincListbg.png';
                var bgImgSrc = IWIN.BlockOpr.getProperty('bgImg');
                var isReset =  false;
				var bgImgElWrap = bgImgEl.parentNode;
				bgImgEl.src =  bgImgSrc.mapped ? bgImgSrc.mapped : dftSrc;//bgImgSrc.indexOf('/') == 0 ?  bgImgSrc : dftSrc;
                bgImgEl.onclick = function (){
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4',function(win){
                        var oldPath = IWIN.BlockOpr.getProperty('bgImg');
                        var list = win.query();
                        if(!list)return;
                        var path = list[0].mapped;
                        bgImgEl.src = path.indexOf('http://') < 0 ? path : path;
						var newPath = {path:list[0].path,mapped:list[0].mapped};
                        IWIN.BlockOpr.setProperty('bgImg',newPath);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'bgImg',oldPath,newPath);
						if(isReset){return;}
						if(oldPath != newPath){
							var resetIcon = byClass('resetBg',bgImgElWrap)[0];
							bgImgElWrap.onmouseover =  function(){
								resetIcon.style.display = 'block';
							};
							bgImgElWrap.onmouseout =  function(){
								resetIcon.style.display = 'none';
							};
							isReset = true;
							resetIcon.onclick =  function(){
								IWIN.BlockOpr.setProperty('bgImg',{path:"images/cList_dftBg.png",mapped:""});
								IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'bgImg',oldPath,dftSrc);
								bgImgEl.src = dftSrc;
								IWIN.util.delEvent(bgImgElWrap,'mouseover');
								IWIN.util.delEvent(bgImgElWrap,'mouseout');
								IWIN.util.delEvent(this,'click');
								this.style.display = 'none';
								isReset = false;	
							};
						}
                    });
                }
            }
		},
        classListInit: function(){  //班级活动初始化      add by haoyc 班级活动 20160607
            var cNameListEl = byId('classId');
            if(cNameListEl){
                IWIN.Request.getDName(function(rsData)
                {
                    var oldclassId = IWIN.BlockOpr.getProperty('classId');
                    var newClassId="";
                    var flag=true;
                    for(var i=0;i<rsData.length;i++)
                    {
                        var opt = new Option(rsData[i].deviceName,rsData[i].deviceIp);
                        cNameListEl.options.add(opt);
                        if(rsData[i].deviceIp==oldclassId){
                            cNameListEl.options[i].selected = true;
                            flag=false;
                        }
                    }
                    //update by haoyc 20161010 解决导入节目班级默认值失效的问题
                    if(rsData.length>0 && flag){
                        cNameListEl.options[0].selected = true;
                        newClassId=cNameListEl.options[0].value;
                        IWIN.BlockOpr.setProperty('classId',newClassId);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'classId', oldclassId,newClassId);
                        oldclassId=newClassId;

                        //update by haoyc 20161010 导入节目默认班级问题 begin
                        var newList = findThisImgList();
                        //只要有一个修改所有id置空
                        for(var i=0;i<newList.length;i++){
                            newList[i].id="";
                        }
                        var thisClassName=IWIN.BlockOpr.getCurObj().firstChild.className;
                        if(thisClassName=='editItem35'){
                            var oldList = IWIN.BlockOpr.getProperty('activity_list_rank');
                            IWIN.BlockOpr.setProperty('activity_list_rank',newList);
                            IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'activity_list_rank',oldList,newList);
                        }
                        else{
                            var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                            IWIN.BlockOpr.setProperty('imageText_list',newList);
                            IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);
                        }
                    }
                    //update by haoyc 20161010 导入节目默认班级问题 end

                });

                //var opt = new Option("","");
                //cNameListEl.options.add(opt);
                //var opt = new Option("aaa",'192.168.21.26');
                //cNameListEl.options.add(opt);
                //var opt = new Option("bbb",'192.168.21.27');
                //cNameListEl.options.add(opt);
                //var opt = new Option("ccc",'192.168.21.28');
                //cNameListEl.options.add(opt);
                //cNameListEl.options[0].selected=true;
                //var oldclassId = IWIN.BlockOpr.getProperty('classId');
                //for(var i=0;optsLen=cNameListEl.options.length;i++){
                //    if(cNameListEl.options[i].value==oldclassId){
                //        cNameListEl.options[i].selected = true;
                //        break;
                //    }
                //}
            }
             var findThisImgList= function () {
                var imgsDiv = document.getElementById('imgList');
                var imgList = [];
                if(!imgsDiv)return imgList;
                for (var i=0;i<imgsDiv.children.length;i++){
                    imgList.push(JSON.parse(imgsDiv.children[i].params));
                }
                return imgList;
            }
        },
		cityListLoad: function(cityEl){
			// 页面初始化后，从服务器加载城市列表数据，存在本地
			IWIN.Request.getCityData(function(data){
				var delayTimer, cityList = null, 
					localStorage = data;
				cityEl.onkeydown =  function(evt){
					evt = window.event || evt;
					if(evt.keyCode==32) return false; // 禁止输入空白字符
				};
				cityEl.onkeyup =  function(evt){
					evt = window.event || evt;
					var keyCode = evt.keyCode;
					/**根据不同的键码值，做相应的事件处理
					 * 退格键：keyCode==8
					 * shift键：keyCode==16
					 * 空格键：keyCode==32
					 * 字母键(a-z)：65<=keyCode<=90
					 * 数字键(0-9)：48<=keyCode<=57
					 * 数字键盘上的数字键(0-9)及(.+-/*)：96<=keyCode<=111
					 */
					// 如果按下的是字母键、数字键或者退格键，则请求服务器
					if((keyCode>=48 && keyCode<=57) || (keyCode>=65 && keyCode<=90) || (keyCode>=96 && keyCode<=111) || keyCode==8 || keyCode==16 || keyCode==32|| keyCode==13){ 
						if(this.value=='' && cityList){
							cityList.changeUI.call(cityList);
							cityList.destory();
							return;
						}
						cityList && cityList.destory();
						if(delayTimer){clearTimeout(delayTimer);}
						delayTimer = setTimeout(function(){
							cityList = new IWIN.CreateCityList('cityList',{keyEl:cityEl,data:localStorage});	
						},500);
					}else if(keyCode == 38 || keyCode == 40){ //处理上下键(up,down) 
						cityList && cityList.pressUpOrDown_handler(keyCode);
					}
					/* 按enter键同样访问服务器
					 * else if(keyCode == 13){ // enter键 
						cityList && cityList.pressEnter_handler();
					}*/
					else if(keyCode == 27 ) { //esc键 
						cityList && cityList.changeUI.call(cityList);
					}  
				};
			});
		},
        setVal : function (name,value){
            var el = byId(name);
            if(el){
                var tgName = el.tagName.toLowerCase(),tp = el.type;
                if(tgName=="input"&&tp=="checkbox"){
                    if(value)el.checked=true;
                }else if(el.className == 'bgOpacity'){
				    el.value = value;
					var slider = byClass('slider',el)[0];
					byClass('count',el)[0].innerHTML = parseInt(value*100);
					slider.style.left = Math.max(0,(value*100 - slider.offsetWidth))+'px';
					byClass('sliderProgress',el)[0].style.width = slider.style.left;
				}else if(el.className=='color_select_list'){
                    var curColor = el.parentNode.getElementsByClassName('color_current');
                    if(!curColor||curColor.length==0){ return;}
                    curColor[0].style.backgroundColor = value;
                }else{
                    if (name=='xVal'||name=='yVal'||name=='wVal'||name=='hVal') {value = parseInt(value, 10);}
                    el.value = value;
                }
            }
        },
        getVal : function (name){
            var el = byId(name);
            if(el){
                var tgName = el.tagName.toLowerCase(),tp = el.type;
                if(tgName=="input"&&tp=="checkbox"){
                    return el.checked?1:0;
                }else if(el.className == 'bgOpacity'){
					return (el.value = Number(byClass('count',el)[0].innerHTML)/100);
				}else{
                    return el.value;
                }
            }
        },
        setPosAndSize : function (x,y,w,h){
            this.setPos(x,y);
            this.setSize(w,h);
        },
        setSize : function (w,h){
            this.setVal('wVal',w);
            this.setVal('hVal',h);
        },
        setPos : function (x,y){
            this.setVal('xVal',x);
            this.setVal('yVal',y);
        },
        addComEvent : function (id){
            var el = byId(id);
            if(!el)return;
            var that = this;
            var curObjId = null;
            var curObj = null;
            this.util.events(el,'focus',function(e){
            	curObjId = IWIN.BlockOpr.getCurObj().id;
            	curObj = IWIN.BlockOpr.getCurObj();
            });
            if(id=='xVal'||id=='yVal'){
                this.util.events(el,'blur',function(e){
                    var ps = IWIN.BlockOpr.getPos();
                    var xv = that.getVal('xVal'),yv = that.getVal('yVal');
                    xv = parseInt(xv, 10) < 0 ? parseInt(xv, 10) * -1 : parseInt(xv, 10);
                    yv = parseInt(yv, 10) < 0 ? parseInt(yv, 10) * -1 : parseInt(yv, 10);
                    if(isNaN(xv)){xv=0}else if(isNaN(yv)){yv=0};
                    //add by haoyc 手动调整坐标不允许超出画布 20160422 begin
                    var w= IWIN.Options.cur.w;
                    var h= IWIN.Options.cur.h;

                    var wVal=that.getVal('wVal'),hVal=that.getVal('hVal');
                    if(xv>(w-wVal)){
                        xv=w-wVal;
                    }
                    if(yv>h-hVal){
                        yv=h-hVal;
                    }
                    //add by haoyc 手动调整坐标不允许超出画布 20160422 end
                    if(id=='xVal') el.value = xv;
                    else if(id=='yVal') el.value = yv;
                    that.util.setElXY(that.util.byId(curObjId), {x:xv, y:yv});
                    IWIN.Controller.execute('CMD_BLOCK_MOVE',curObjId,ps,{x:xv,y:yv});
                    if (curObjId == IWIN.BlockOpr.getCurObj().id) {
                        IWIN.BlockOpr.setPos(xv,yv);
                    } else {
                        IWIN.BlockOpr.setElePos(that.util.byId(curObjId),xv,yv);
                    }
                });
            }else if(id=='wVal'||id=='hVal'){
                this.util.events(el,'blur',function(e){
                    var sz = IWIN.BlockOpr.getSize();
                    var wv = that.getVal('wVal'),hv = that.getVal('hVal');
                    wv = parseInt(wv, 10) < 0 ? parseInt(wv, 10) * -1 : parseInt(wv, 10);
                    hv = parseInt(hv, 10) < 0 ? parseInt(hv, 10) * -1 : parseInt(hv, 10);
                    if(isNaN(wv) || wv==null){wv=0}else if(isNaN(hv) || hv==null){hv=0}else if(hv<1){hv=1};

                    //add by haoyc 手动调整坐标不允许超出画布 20160422 begin
                    var w= IWIN.Options.cur.w;
                    var h= IWIN.Options.cur.h;

                    var xv = that.getVal('xVal'),yv = that.getVal('yVal');
                    if(wv>(w-xv)){
                        wv=w-xv;
                    }
                    if(hv>h-yv){
                        hv=h-yv;
                    }
                    //add by haoyc 手动调整坐标不允许超出画布 20160422 end
                    //add by haoyc 特殊组件限制宽高 20160825 begin
                    var item_classname= IWIN.BlockOpr.getCurObj().firstChild.className;
                    switch (item_classname)
                    {
                       case "editItem22" :
                           if(wv>735)
                           {
                               wv=735;
                           }
                           else if(wv<565)
                           {
                               wv=565;
                           }
                           if(hv<400)
                           {
                               hv=400;
                           }
                           break;
                        case "editItem35" :
                            if(wv<276)
                            {
                                wv=276;
                            }
                            if(hv<472)
                            {
                                hv=472;
                            }
                            break;
                    }
                    //add by haoyc 特殊组件限制宽高 20160825 end


                    if(id=='wVal') el.value = wv;
                    else if(id=='hVal') el.value = hv;
                    that.util.setElWH(that.util.byId(curObjId), {w:wv,h:hv});
                    IWIN.Controller.execute('CMD_BLOCK_RESIZE',curObjId,sz,{w:wv,h:hv});
                    if (curObjId == IWIN.BlockOpr.getCurObj().id) {
                        IWIN.BlockOpr.setSize(wv,hv);
                    } else {
                        IWIN.BlockOpr.setEleSize(that.util.byId(curObjId),wv,hv);
                    }
                });
            }else{
                var tgName = el.tagName.toLowerCase(),tp = el.type;
                var evMap = {'text':'blur','select':'change','checkbox':'click'};
                var evName = evMap[tp] || evMap[tgName] || 'click';
				if(el.className == 'bgOpacity'){
					evName = 'mouseup';
					el = byClass('sliderRail',el)[0];
				}
                this.util.events(el,evName,function(e,ele){
                	if(id == 'tymd'){
                		IWIN.BlockOpr.setProperty(id,'2');
                		IWIN.BlockOpr.setProperty('tymdhms','1');
                 		IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,id);
                	}else if(id == 'tymdhms'){
                		IWIN.BlockOpr.setProperty(id,'2');
                		IWIN.BlockOpr.setProperty('tymd','1');
                 		IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,id);
                	}else if(id == 'dpok'){
                		var tymdhms = IWIN.BlockOpr.getProperty('tymdhms');
                		var tymd = IWIN.BlockOpr.getProperty('tymd');
                		if(tymd == 2){
                			var d11val = document.getElementById("d11").value;
                			IWIN.BlockOpr.setProperty('tymdval',d11val);
                			IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,id);
                		}else if(tymdhms == 2){
                			var d233val = document.getElementById("d233").value;
                			IWIN.BlockOpr.setProperty('tymdhmsval',d233val);
                			IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,id);
                		}
                	}else if(id == 'thirdstream'){
                		IWIN.BlockOpr.setProperty(id,'2');
                		IWIN.BlockOpr.setProperty('honghestream','1');
                 		IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,id);
                	}else if(id == 'honghestream'){
                		IWIN.BlockOpr.setProperty(id,'2');
                		IWIN.BlockOpr.setProperty('thirdstream','1');
                 		IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,id);
                	}
                	else{
                		var sz = IWIN.BlockOpr.getProperty(id);
                        var val;
                        if(ele.className == 'color_select_list'){
                            var sItem = IWIN.util.findPElByCls(e,'item');
                            if(sItem){
                                var val = IWIN.util.getStyle(sItem.getElementsByTagName('span')[0],'backgroundColor');
                            }else {
                                return;
                            }
                        }else{
                        	val = that.getVal(id);
                        }
                    	if (evName == 'blur') {
                            IWIN.BlockOpr.setEleProperty(curObj,id,val);
                    		IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',curObjId,id,sz,val);
                    	} else {
                            //if(id == "text_apply"){
                            //    console.log("&&&&&&&&&&&&&&&&&&&&&&nb&&&&&&&&&&&&&&&&&&&&&&&&&&&&");
                            //    IWIN.BlockOpr.setEleProperty(curObj,id,val);
                            //    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',curObjId,id,sz,val);
                            //}
                            //else{
                                IWIN.BlockOpr.setProperty(id,val);
                                IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,id,sz,val);
                            //}
                    	}
                        if(id=="isFtp"){
                            IWIN.Request.getFptPath(function (rs){
                                byId('ftpPath').value = rs;
                            });
                        }
    					if(id=="cListID"){
    						// 获取当前课程名的课程表数据
    						IWIN.Request.getCList(function(rsData){
    							IWIN.BlockOpr.setProperty('cData',rsData);
    							IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'cData', IWIN.BlockOpr.getProperty('cData'),rsData);
    						});
    					}
                	}
                })
            }
        },
        fontEvList : {
            'txt_font_align_left':{ev:'click',exc:'JustifyLeft'},
            'txt_font_align_center':{ev:'click',exc:'JustifyCenter'},
            'txt_font_align_right':{ev:'click',exc:'JustifyRight'},
            'txt_font_bold':{ev:'click',exc:'Bold'},
            'txt_font_italic':{ev:'click',exc:'Italic'},
            'txt_font_underline':{ev:'click',exc:'Underline'},
            'txt_font_size':{ev:'change',exc:'FontSize'},
            'txt_font_family':{ev:'change',exc:'FontName'},
            'txt_font_color':{ev:'click',exc:'ForeColor'}},
        addFontEvent : function (id){
            if(!this.fontEvList[id])return;
            var el = byId(id);
            if(!el)return;
            var that = this;
            this.util.events(el,this.fontEvList[id].ev,function(e,el){
                var val;
                if(el.className == 'color_select_list'){
                    var sItem = IWIN.util.findPElByCls(e,'item');
                    if(!sItem) return;
                    //获取选择的颜色值
                    val = IWIN.util.getStyle(sItem.getElementsByTagName('span')[0],'backgroundColor');
                    //将颜色值转为#开头的颜色表示
                    val = IWIN.util.colorHex(val);
                }else{
                    val = el.value;
                }
                var oldContent = IWIN.BlockOpr.getProperty('txtCont');
                var txt =  IWIN.BlockOpr.getCurObj().getElementsByClassName('TEXT_COMP_text')[0];
                if(txt.contentEditable!="true"){
                    txt.contentEditable = "true";
                }
                if (IWIN.util.isIE()) {
                	//全选文本
	                if (parent.document.selection) {
	                    var range = parent.document.body.createTextRange();
	                    range.moveToElementText(txt);
	                    range.select();
	                } else if (parent.window.getSelection) {
	                    var range = parent.document.createRange();
	                    range.selectNode(txt);
	                    parent.window.getSelection().addRange(range);
	                }
                }
                parent.document.execCommand(that.fontEvList[id].exc,false,val);
                console.log(that.fontEvList[id].exc);
                IWIN.BlockOpr.mayMove = false;
                var newContent = IWIN.BlockOpr.getProperty('txtCont');
                IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'txtCont',oldContent,newContent);
            });


        },
        addBtnEvent : function (){
            var newImg = document.getElementById('newImg'),that = this;
            if(newImg){
                newImg.onclick = function (){
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4&multi=1',function(win){
                        var oldList = IWIN.BlockOpr.getProperty('img_list');	
                        var list = win.query();
                        if(oldList.length + list.length > IWIN.Options.el.swipeImageCount){
                        	alert("轮播图中图片的个数不能超过"+IWIN.Options.el.swipeImageCount+"个！");
                        	return "";
                        }
                        if(!list)return "";
                        for(var i=0;i<list.length;i++){
//                          var path = list[i].mapped;
                            var path = list[i].respath;  // 解决轮播图弹出框 图片模糊的问题   update 20150202
                            var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                            var imgsDiv = document.getElementById('imgList');
                            imgsDiv.appendChild(imgItem);
                            //imgItem.getElementsByClassName('scroll_item_img')[0].src = path.indexOf('http://')<0?'../../'+path:path;
                            imgItem.getElementsByClassName('scroll_item_img')[0].src = path.indexOf('http://') < 0 ? path : path;
                            imgItem.getElementsByClassName('scroll_title_input')[0].onblur = function (){
                                that.editScrollTitle(this);
                            }
                            imgItem.params = JSON.stringify({path:list[i].path,title:'',mapped:list[i].respath});
                        }
                        var newList = that.findImgList();
                        IWIN.BlockOpr.setProperty('img_list',newList);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'img_list',oldList,newList);
                        return true;
                    });
                };
                IWIN.util.events(byId('imgList'),'click',function (e){
                    var tar = e.target || e.srcElement;
                    var clName = tar.className;
                    if(!clName)return;
                    var item = IWIN.util.findPElByCls(e,'scroll_item');
                    var oldList = IWIN.BlockOpr.getProperty('img_list');
                    if(clName == 'scroll_item_moveUp') {
                        //上移操作
                        if(item.previousSibling){
                            item.parentNode.insertBefore(item,item.previousSibling);
                        }
                    }else if(clName == 'scroll_item_moveDwn') {
                        //下移操作
                        if(item.nextSibling.nextSibling){
                            item.parentNode.insertBefore(item,item.nextSibling.nextSibling);
                        }else{
                            item.parentNode.appendChild(item);
                        }
                    }else if(clName == 'scroll_item_del'){
                        //删除操作
                        item.getElementsByClassName('scroll_title_input')[0].onblur = null;
                        if(item.parentNode.children.length == 1){
                        	var curObj = IWIN.BlockOpr.getCurObj();
                        	// 轮播图  当删除最后一个图片元素时 编辑区域也随之改变  update 20150202
                        	if(curObj.children[0].className == 'editItem4'){
                        		curObj.children[0].children[0].src = 'images/iwinscroll1.png';
                        	}
                        	else if(curObj.children[0].className == 'editItem8'){
                        		curObj.children[0].children[0].src = 'images/iwinswipe1.png';
                        	}
                        	else if(curObj.children[0].className == 'editItem9'){
                        		curObj.children[0].children[0].src = 'images/iwinscroll3.png';
                        	}
                        }
                        item.parentNode.removeChild(item);
                    }else{
                        return;
                    }
                    var newList = that.findImgList();
                    IWIN.BlockOpr.setProperty('img_list',newList);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'img_list',oldList,newList);
                })
            }
			
			
			// 优秀作品添加作品项
			var addItem = document.getElementById('add_eWrok');
			if(addItem){
				addItem.onclick = function(){
					IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=2,3,4,5&multi=1',function(win){
                        var oldList = IWIN.BlockOpr.getProperty('articleList');
                        var list = win.query();
                        if(oldList.length + list.length > IWIN.Options.el.eworkDocCount){
                        	alert("优秀作品中资源的的个数不能超过"+IWIN.Options.el.eworkDocCount+"个！");
                        	return "";
                        }
                        if(!list)return "";
                        for(var i=0;i<list.length;i++){
							var file_src = list[i].mapped;
							var file_content = list[i].path;
							var eWrokItem = document.getElementById('eWorksWrap').children[1].cloneNode(true);
							var eWorksDiv = document.getElementById('eWorksInner');
							eWorksDiv.appendChild(eWrokItem);
							
							// 作品资源文件关联
							//eWrokItem.getElementsByClassName('fileSrc')[0].src = file_src.indexOf('http://')<0?'../../'+file_src:file_src;
							eWrokItem.getElementsByClassName('fileSrc')[0].src = file_src.indexOf('http://') < 0 ? file_src : file_src;
							
							// 获取作品标题
							var workName = file_content.replace(/(.*\/){0,}([^\.]+.*)/ig, "$2");
							workName = workName.substring(0,workName.indexOf('.'));
							eWrokItem.getElementsByClassName('workName')[0].value = workName;
						   
							// 失去焦点保存作品信息
							eWrokItem.getElementsByClassName('workName')[0].onblur = function (){
                                that.saveWorksInfo(this);
							}				
							eWrokItem.getElementsByClassName('authorInfo')[0].onblur = function (){
                                that.saveWorksInfo(this);
                            }
                            eWrokItem.params = JSON.stringify({path:file_content, title:workName, author:'', mapped:list[i].mapped});
							
                        }
                        var newList = that.findWorkList();
                        IWIN.BlockOpr.setProperty('articleList',newList);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'articleList',oldList,newList);
                        return true;
                    });
				};

				// 上移下移删除操作
				IWIN.util.events(byId('eWorksInner'),'click',function (e){
                    var tar = e.target || e.srcElement;
                    var clName = tar.className;
                    if(!clName)return;
                    var item = IWIN.util.findPElByCls(e,'scroll_item');
                    var oldList = IWIN.BlockOpr.getProperty('articleList');
                    if(clName == 'scroll_item_moveUp') {
                        //上移操作
                        if(item.previousSibling){
                            item.parentNode.insertBefore(item,item.previousSibling);
                        }
                    }else if(clName == 'scroll_item_moveDwn') {
                        //下移操作
                        if(item.nextSibling.nextSibling){
                            item.parentNode.insertBefore(item,item.nextSibling.nextSibling);
                        }else{
                            item.parentNode.appendChild(item);
                        }
                    }else if(clName == 'scroll_item_del'){
                        //删除操作
                        item.getElementsByClassName('workName')[0].onblur = null;
						item.getElementsByClassName('authorInfo')[0].onblur = null;
                        item.parentNode.removeChild(item);
                    }else{
                        return;
                    }
                    var newList = that.findWorkList();
                    IWIN.BlockOpr.setProperty('articleList',newList);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'articleList',oldList,newList);
                })
			}

            // 班级活动 添加活动   add by haoyc 班级活动 20160602
            var addActivity = document.getElementById('add_activity'),that = this;
            if(addActivity){

                addActivity.onclick = function(){
                    var currentObj = IWIN.BlockOpr.getCurObj().id;
                    var classId=document.getElementById('classId').value;//班级ID
                    /* var activityItem = document.getElementById('activitysList_outer').children[1].cloneNode(true);
                    var activityDiv = document.getElementById('activitysInner');
                    activityDiv.appendChild(activityItem);*///点击添加增加一组方式
                    var imgsDiv = document.getElementById('imgList');
                    if(imgsDiv && imgsDiv.children.length==IWIN.Options.el.activityCount)
                    {
                        alert("班级活动内容不超过"+IWIN.Options.el.activityCount+"个！");
                        return;
                    }
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4&multi=1',function(win){
                        var list = win.query();
                        var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                        if(oldList.length + list.length>IWIN.Options.el.activityCount){
                            alert("班级活动内容不超过"+IWIN.Options.el.activityCount+"个！");
                            return "";
                        }

                        var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                        for(var i=0;i<list.length;i++) {
                            var path = list[i].respath;
                            var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                            var imgDiv = document.getElementById('imgList');
                            imgDiv.appendChild(imgItem);
                            imgItem.params = JSON.stringify({id:'',path:list[i].path,mapped:list[i].respath,info:''});
                            imgDiv.getElementsByClassName('scroll_item_img')[oldList.length+i].src = path.indexOf('http://') < 0 ? path : path;
                            imgItem.getElementsByClassName('scroll_info_input')[0].onblur=function(){
                                that.editScrollInfo(this,currentObj,'imageText_list');
                            }
                        }
                       var newList = that.findImgList();
                        //只要有一个修改所有id置空
                        for(var i=0;i<newList.length;i++){
                            newList[i].id="";
                        }
                        IWIN.BlockOpr.setProperty('imageText_list',newList);
                       IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);
                       return true;
                    });
                };
                // 删除操作
                IWIN.util.events(byId('imgList'),'click',function (e){
                    var tar = e.target || e.srcElement;
                    var clName = tar.className;
                    if(!clName)return;
                    var item = IWIN.util.findPElByCls(e,'scroll_item');
                    var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                   if(clName == 'scroll_item_del'){
                        //删除操作
                        item.getElementsByClassName('scroll_info_input')[0].onblur = null;
                        item.parentNode.removeChild(item);
                    }else{
                        return;
                    }
                    var newList = that.findImgList();
                    //只要有一个修改所有id置空
                    for(var i=0;i<newList.length;i++){
                        newList[i].id="";
                    }
                    IWIN.BlockOpr.setProperty('imageText_list',newList);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);
                });
            }
            // 班级荣誉 添加班级荣誉   add by haoyc 班级荣誉 20160602
            var addHonor = document.getElementById('add_honor'),that = this;
            if(addHonor){

                addHonor.onclick = function(){
                    var currentObj = IWIN.BlockOpr.getCurObj().id;
                    var classId=document.getElementById('classId').value;//班级ID
                    /* var activityItem = document.getElementById('activitysList_outer').children[1].cloneNode(true);
                     var activityDiv = document.getElementById('activitysInner');
                     activityDiv.appendChild(activityItem);*///点击添加增加一组方式
                    var imgsDiv = document.getElementById('imgList');
                    if(imgsDiv && imgsDiv.children.length==IWIN.Options.el.activityCount)
                    {
                        alert("班级荣誉内容不超过"+IWIN.Options.el.activityCount+"个！");
                        return;
                    }
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4&multi=1',function(win){
                        var list = win.query();
                        var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                        if(oldList.length + list.length>IWIN.Options.el.activityCount){
                            alert("班级荣誉内容不超过"+IWIN.Options.el.activityCount+"个！");
                            return "";
                        }

                        var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                        for(var i=0;i<list.length;i++) {
                            var path = list[i].respath;
                            var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                            var imgDiv = document.getElementById('imgList');
                            imgDiv.appendChild(imgItem);
                            imgItem.params = JSON.stringify({id:'',path:list[i].path,mapped:list[i].respath,info:''});
                            imgDiv.getElementsByClassName('scroll_item_img')[oldList.length+i].src = path.indexOf('http://') < 0 ? path : path;
                            imgItem.getElementsByClassName('scroll_info_input')[0].onblur=function(){
                                that.editScrollInfo(this,currentObj,"imageText_list");
                            }
                        }
                        var newList = that.findImgList();
                        //只要有一个修改所有id置空
                        for(var i=0;i<newList.length;i++){
                            newList[i].id="";
                        }
                        IWIN.BlockOpr.setProperty('imageText_list',newList);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);
                        return true;
                    });
                };
                // 删除操作
                IWIN.util.events(byId('imgList'),'click',function (e){
                    var tar = e.target || e.srcElement;
                    var clName = tar.className;
                    if(!clName)return;
                    var item = IWIN.util.findPElByCls(e,'scroll_item');
                    var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                    if(clName == 'scroll_item_del'){
                        //删除操作
                        item.getElementsByClassName('scroll_info_input')[0].onblur = null;
                        item.parentNode.removeChild(item);
                    }else{
                        return;
                    }
                    var newList = that.findImgList();
                    //只要有一个修改所有id置空
                    for(var i=0;i<newList.length;i++){
                        newList[i].id="";
                    }
                    IWIN.BlockOpr.setProperty('imageText_list',newList);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);
                });
            }
            // 自定义组件 添加自定义组件   add by haoyc 自定义组件 20160602
            var addUdefined = document.getElementById('add_udefined'),that = this;
            if(addUdefined){

                addUdefined.onclick = function(){
                    var currentObj = IWIN.BlockOpr.getCurObj().id;
                    var classId=document.getElementById('classId').value;//班级ID
                    /* var activityItem = document.getElementById('activitysList_outer').children[1].cloneNode(true);
                     var activityDiv = document.getElementById('activitysInner');
                     activityDiv.appendChild(activityItem);*///点击添加增加一组方式
                    var imgsDiv = document.getElementById('imgList');
                    if(imgsDiv && imgsDiv.children.length==IWIN.Options.el.activityCount)
                    {
                        alert("自定义组件内容不超过"+IWIN.Options.el.activityCount+"个！");
                        return;
                    }
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4&multi=1',function(win){
                        var list = win.query();
                        var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                        if(oldList.length + list.length>IWIN.Options.el.activityCount){
                            alert("自定义组件内容不超过"+IWIN.Options.el.activityCount+"个！");
                            return "";
                        }

                        var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                        for(var i=0;i<list.length;i++) {
                            var path = list[i].respath;
                            var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                            var imgDiv = document.getElementById('imgList');
                            imgDiv.appendChild(imgItem);
                            imgItem.params = JSON.stringify({id:'',path:list[i].path,mapped:list[i].respath,info:''});
                            imgDiv.getElementsByClassName('scroll_item_img')[oldList.length+i].src = path.indexOf('http://') < 0 ? path : path;
                            imgItem.getElementsByClassName('scroll_info_input')[0].onblur=function(){
                                that.editScrollInfo(this,currentObj,"imageText_list");
                            }
                        }
                        var newList = that.findImgList();
                        //只要有一个修改所有id置空
                        for(var i=0;i<newList.length;i++){
                            newList[i].id="";
                        }
                        IWIN.BlockOpr.setProperty('imageText_list',newList);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);
                        return true;
                    });
                };
                // 删除操作
                IWIN.util.events(byId('imgList'),'click',function (e){
                    var tar = e.target || e.srcElement;
                    var clName = tar.className;
                    if(!clName)return;
                    var item = IWIN.util.findPElByCls(e,'scroll_item');
                    var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                    if(clName == 'scroll_item_del'){
                        //删除操作
                        item.getElementsByClassName('scroll_info_input')[0].onblur = null;
                        item.parentNode.removeChild(item);
                    }else{
                        return;
                    }
                    var newList = that.findImgList();
                    //只要有一个修改所有id置空
                    for(var i=0;i<newList.length;i++){
                        newList[i].id="";
                    }
                    IWIN.BlockOpr.setProperty('imageText_list',newList);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);
                });
            }
            // 作业布置 添加作业布置   add by haoyc 作业布置 20160602
            var addTask = document.getElementById('add_task'),that = this;
            if(addTask){

                addTask.onclick = function(){
                    var currentObj = IWIN.BlockOpr.getCurObj().id;
                    var classId=document.getElementById('classId').value;//班级ID
                    /* var activityItem = document.getElementById('activitysList_outer').children[1].cloneNode(true);
                     var activityDiv = document.getElementById('activitysInner');
                     activityDiv.appendChild(activityItem);*///点击添加增加一组方式
                    var imgsDiv = document.getElementById('imgList');
                    if(imgsDiv && imgsDiv.children.length==IWIN.Options.el.activityCount)
                    {
                        alert("作业内容不超过"+IWIN.Options.el.activityCount+"个！");
                        return;
                    }
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4&multi=1',function(win){
                        var list = win.query();
                        var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                        if(oldList.length + list.length>IWIN.Options.el.activityCount){
                            alert("作业内容不超过"+IWIN.Options.el.activityCount+"个！");
                            return "";
                        }

                        var oldList = IWIN.BlockOpr.getProperty('imageText_list');
                        for(var i=0;i<list.length;i++) {
                            var path = list[i].respath;
                            var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                            var imgDiv = document.getElementById('imgList');
                            imgDiv.appendChild(imgItem);
                            imgItem.params = JSON.stringify({id:'',path:list[i].path,mapped:list[i].respath,info:''});
                            imgDiv.getElementsByClassName('scroll_item_img')[oldList.length+i].src = path.indexOf('http://') < 0 ? path : path;
                            imgItem.getElementsByClassName('scroll_info_input')[0].onblur=function(){
                                that.editScrollInfo(this,currentObj,"imageText_list");
                            }
                        }
                        var newList = that.findImgList();
                        //只要有一个修改所有id置空
                        for(var i=0;i<newList.length;i++){
                            newList[i].id="";
                        }
                        IWIN.BlockOpr.setProperty('imageText_list',newList);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);
                        return true;
                    });
                };
                // 删除操作
                IWIN.util.events(byId('imgList'),'click',function (e){
                    var tar = e.target || e.srcElement;
                    var clName = tar.className;
                    if(!clName)return;
                    var item = IWIN.util.findPElByCls(e,'scroll_item');
                    var oldList = IWIN.BlockOpr.getProperty('activity_list');
                    if(clName == 'scroll_item_del'){
                        //删除操作
                        item.getElementsByClassName('scroll_info_input')[0].onblur = null;
                        item.parentNode.removeChild(item);
                    }else{
                        return;
                    }
                    var newList = that.findImgList();
                    //只要有一个修改所有id置空
                    for(var i=0;i<newList.length;i++){
                        newList[i].id="";
                    }
                    IWIN.BlockOpr.setProperty('imageText_list',newList);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'imageText_list',oldList,newList);
                });
            }
            //德育排名  add by caoqian 20160713-------------------------
            var addRankmoraledu = document.getElementById('add_rankmoraledu'),that = this;
            if(addRankmoraledu){
                addRankmoraledu.onclick = function(){
                        var currentObj = IWIN.BlockOpr.getCurObj().id;
                        var oldList = IWIN.BlockOpr.getProperty('activity_list_rank');
                        var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                        var imgDiv = document.getElementById('imgList');
                        imgDiv.appendChild(imgItem);
                        imgItem.params = JSON.stringify({id:'',info:'',path:''});
                        imgItem.getElementsByClassName('scroll_info_input_name')[0].onblur=function(){
                            that.editScrollInfoName(this,currentObj);
                        }
                        imgItem.getElementsByClassName('scroll_info_input_rank')[0].onblur=function(){
                            that.editScrollInfoRank(this,currentObj);
                        }
                        var newList = that.findImgList();
                        //只要有一个修改所有id置空
                        for(var i=0;i<newList.length;i++){
                            newList[i].id="";
                        }
                        IWIN.BlockOpr.setProperty('activity_list_rank',newList);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'activity_list_rank',oldList,newList);
                        return true;
                };
                // 上下移、删除操作
                IWIN.util.events(byId('imgList'),'click',function (e){

                    var tar = e.target || e.srcElement;
                    var clName = tar.className;
                    if(!clName)return;
                    var item = IWIN.util.findPElByCls(e,'scroll_item');
                    var oldList = IWIN.BlockOpr.getProperty('activity_list_rank');
                    if(clName == 'scroll_item_moveUp') {
                        //上移操作
                        if(item.previousSibling){
                            item.parentNode.insertBefore(item,item.previousSibling);
                        }
                    }else if(clName == 'scroll_item_moveDwn') {
                        //下移操作
                        if(item.nextSibling.nextSibling){
                            item.parentNode.insertBefore(item,item.nextSibling.nextSibling);
                        }else{
                            item.parentNode.appendChild(item);
                        }
                    }else if(clName == 'scroll_item_del'){
                        //删除操作
                        item.getElementsByClassName('scroll_info_input_name')[0].onblur = null;
                        item.getElementsByClassName('scroll_info_input_rank')[0].onblur = null;
                        item.parentNode.removeChild(item);
                    }else{
                        return;
                    }
                    var newList = that.findImgList();
                    //只要有一个修改所有id置空
                    for(var i=0;i<newList.length;i++){
                        newList[i].id="";
                    }
                    IWIN.BlockOpr.setProperty('activity_list_rank',newList);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'activity_list_rank',oldList,newList);
                });
            }

            var update_rank = document.getElementById('update_rank');
            var reset_rank = document.getElementById('reset_rank');
            //同步德育排名，获取排名列表
           if(update_rank) {
                update_rank.onclick = function () {

                    IWIN.Request.getRankList(function(fn){
                        var rankJson=JSON.stringify(fn);
                        rankJson=eval("("+eval("("+rankJson+")")+")");
                        var childnodes=document.getElementById('imgList').childElementCount;  //德育排名节点数量
                        if(rankJson.result=="true")
                        {
                            var rankMsgJson=eval("("+rankJson.msg+")");
                            var imgList = [];
                            //删除手动添加的节点
                            for(var i=0;i<childnodes;i++)
                            {
                                var item =document.getElementById('scroll_item');
                                item.getElementsByClassName('scroll_info_input_name')[0].onblur = null;
                                item.getElementsByClassName('scroll_info_input_rank')[0].onblur = null;
                                item.parentNode.removeChild(item);
                            }
                            //同步德育排名
                            for(var i=0;i<rankMsgJson.length;i++)
                            {
                                var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                                var imgDiv = document.getElementById('imgList');
                                var oldList = IWIN.BlockOpr.getProperty('activity_list_rank');
                                imgItem.getElementsByClassName('scroll_info_input_name')[0].value=rankMsgJson[i].name;
                                imgItem.getElementsByClassName('scroll_info_input_rank')[0].value=rankMsgJson[i].pm;
                                imgItem.getElementsByClassName('scroll_id_input')[0].value=rankMsgJson[i].id;
                                imgDiv.appendChild(imgItem);
                                imgItem.params = JSON.stringify({id:'',info:rankMsgJson[i].name,path:rankMsgJson[i].pm});
                                imgItem.getElementsByClassName('scroll_info_input_name')[0].onblur=function(){
                                    that.editScrollInfoName(this);
                                }
                                imgItem.getElementsByClassName('scroll_info_input_rank')[0].onblur=function(){
                                    that.editScrollInfoRank(this);
                                }

                            }
                            var newList = that.findImgList();
                            IWIN.BlockOpr.setProperty('activity_list_rank',newList);
                            IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'activity_list_rank',oldList,newList);
                        }
                       else if(rankJson.result=="false")
                        {
                            for(var i=0;i<childnodes;i++)
                            {
                                var item =document.getElementById('scroll_item');
                                item.getElementsByClassName('scroll_info_input_name')[0].onblur = null;
                                item.getElementsByClassName('scroll_info_input_rank')[0].onblur = null;
                                item.parentNode.removeChild(item);
                            }
                        }
                    });

                }
            }
            //根据设备mac地址，清空德育排名
            if(reset_rank){
                reset_rank.onclick = function () {
                    var childnodes=document.getElementById('imgList').childElementCount;  //德育排名节点数量
                    if(childnodes!=0)
                    {
                        if(confirm("您确定重新德育排名吗，以往数据会被清空"))
                        {
                            IWIN.Request.deleteRankList(function(fn)
                            {
                                //删除手动添加的节点
                                for(var i=0;i<childnodes;i++)
                                {
                                    var item =document.getElementById('scroll_item');
                                    item.getElementsByClassName('scroll_info_input_name')[0].onblur = null;
                                    item.getElementsByClassName('scroll_info_input_rank')[0].onblur = null;
                                    item.parentNode.removeChild(item);
                                }
                                //var rankJson=JSON.stringify(fn);
                                //rankJson=eval("("+eval("("+rankJson+")")+")");
                                //if(rankJson.result=="true")
                                //{
                                    var oldList = IWIN.BlockOpr.getProperty('activity_list_rank');
                                    var imgItem = document.getElementById('imgList_outer').children[1].cloneNode(true);
                                    imgItem.params = JSON.stringify({id:'',info:"",path:""});
                                    imgItem.getElementsByClassName('scroll_info_input_name')[0].onblur=function(){
                                        that.editScrollInfoName(this);
                                    }
                                    imgItem.getElementsByClassName('scroll_info_input_rank')[0].onblur=function(){
                                        that.editScrollInfoRank(this);
                                    }
                                    var newList = that.findImgList();
                                    IWIN.BlockOpr.setProperty('activity_list_rank',newList);
                                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'activity_list_rank',oldList,newList);
                                    alert("清空德育排名成功");
                                //}

                            });
                        }
                    }
                    else if(childnodes==0)
                    {
                        alert("已清空德育排名");
                    }
                }
            }
          //----------------------------add by caoqian 德育排名  end--------------------------------
            var imgPath = document.getElementById('img_path');
            if(imgPath){
                if (IWIN.BlockOpr.getProperty('img_path').mapped) {
                    imgPath.src = IWIN.BlockOpr.getProperty('img_path').mapped;
                }
                imgPath.onclick = function (){
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4',function(win){
                        var oldPath = IWIN.BlockOpr.getProperty('img_path');
                        var list = win.query();

                        if(!list)return;
                        var path = list[0].respath;//list[0].mapped;

                        //imgPath.src = path.indexOf('http://') < 0 ? "../../" + path : path;
                        imgPath.src = path.indexOf('http://') < 0 ? path : path;
                        var newPath = {path:list[0].path,mapped:list[0].respath};//list[0].mapped};
                        if(IWIN.util.byId('quick').value=='1'){
                        	IWIN.Controller.execute('CMD_BLOCK_RESOURSE_CHANGE_QUI',IWIN.BlockOpr.getCurObj().id,'img_path',oldPath,newPath,list[0].w,list[0].h,IWIN.BlockOpr.getImw(),IWIN.BlockOpr.getImh());
                        }else{
                        	IWIN.Controller.execute('CMD_BLOCK_RESOURSE_CHANGE',IWIN.BlockOpr.getCurObj().id,'img_path',oldPath,newPath,list[0].w,list[0].h);
                            
                        }
                    });
                }
            }

            var videoPath = document.getElementById('video_path');
            if(videoPath){
                if (IWIN.BlockOpr.getProperty('video_path').mapped) {
                    videoPath.src = IWIN.BlockOpr.getProperty('video_path').mapped;
                }
                videoPath.onclick = function (){
                	// 在线视频地址回显
                	var oldPath = IWIN.BlockOpr.getProperty('video_path');
                	if(oldPath!=null && oldPath.mapped.indexOf('defaultvideothumb') <= -1){
                		oldPath.path = '';
                	}
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=1&op='+oldPath.path,function(win){
                        var oldPath = IWIN.BlockOpr.getProperty('video_path');
                        var obj;
                        var path;
                        var list;
                        var t = win.getVideoType();
                        if(t == 'videoonline'){ // 在线视频
	               			 var onlinesource = win.getVideoOnlineSource();
	               			 if(onlinesource == ''){
	               				 return "";
	               			 }
	               			 if(onlinesource.indexOf("/") > -1){
	               				 list = new Array();
	            				 var resource = new Object();
	            				 resource.path = onlinesource;
	           			         resource.mapped = "/ManagementCenter/data/defaultvideothumb/thumb.png";
	           			         resource.snap = "/ManagementCenter/data/defaultvideothumb/thumb.png";
	           			         resource.w = "480";
	           			         resource.h = "360";
	           			         resource.type = "1";
	           			         resource.respath = "";
	           			         list.push(resource);  
	           			         obj = {path:list[0].path,mapped:list[0].mapped};
              	                 path = list[0].mapped;
	               				 /*var ors = onlinesource.split("/");
	               				 if(ors.length > 1){
	               					 var orsmd5 = ors[ors.length - 2];
	               					 if(orsmd5 != ""){
	               						list = IWIN.Request.checkOnline(orsmd5,onlinesource);
		               					 obj = {path:list[0].path,mapped:list[0].mapped};
		               	                 path = list[0].mapped;
	               					 }else{
	               						 list = new Array();
	     	            				 var resource = new Object();
	     	            				 resource.path = onlinesource;
    	            			         resource.mapped = "/ManagementCenter/data/defaultvideothumb/thumb.png";
    	            			         resource.snap = "/ManagementCenter/data/defaultvideothumb/thumb.png";
    	            			         resource.w = "480";
    	            			         resource.h = "360";
    	            			         resource.type = "1";
    	            			         resource.respath = "";
    	            			         list.push(resource);  
    	            			         obj = {path:list[0].path,mapped:list[0].mapped};
		               	                 path = list[0].mapped;
			               			 }
	               				 }*/
	               			 }
	               		}else{
	               			list = win.query();
	                        if(!list)return;
	               		}
                        
                        obj = {path:list[0].path,mapped:list[0].mapped};
                        path = list[0].mapped;

                        //videoPath.src = path.indexOf('http://')<0?'../../'+path:path;
                        videoPath.src = path.indexOf('http://') < 0 ? path : path;
                        if(IWIN.util.byId('quick').value=='1'){
                        	IWIN.Controller.execute('CMD_BLOCK_RESOURSE_CHANGE_QUI',IWIN.BlockOpr.getCurObj().id,'video_path',oldPath,obj,list[0].w,list[0].h,IWIN.BlockOpr.getImw(),IWIN.BlockOpr.getImh());
                        }else{
                        	IWIN.Controller.execute('CMD_BLOCK_RESOURSE_CHANGE',IWIN.BlockOpr.getCurObj().id,'video_path',oldPath,obj,list[0].w,list[0].h);
                        }
                     });
                }
            }

            var pptPath = document.getElementById('ppt_path');
            var imgList = document.getElementById('imgList'); 
            if(pptPath){
            	//旧版PPT
//                if (IWIN.BlockOpr.getProperty('ppt_path').mapped) {
//                    pptPath.src = IWIN.BlockOpr.getProperty('ppt_path').mapped;
//                }
            	// 新版PPT
            	if(imgList.children.length>0){
            		pptPath.src = imgList.children[0].children[0].src;
            	}
            	
                pptPath.onclick = function (){
                    // IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=6,5,3,2',function(win){ //包含PPT\WORD\EXCEL\PDF
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=6',function(win){
                    	var oldPath =pptPath.src;// IWIN.BlockOpr.getProperty('ppt_path'); 旧版PPT
                        var list = win.query();
                        if(!list)return;
                        var obj = {path:list[0].path,mapped:list[0].mapped};
                        var path = list[0].mapped;

                        //pptPath.src = path.indexOf('http://')<0?'../../'+path:path;
                        pptPath.src = path.indexOf('http://') < 0 ? path : path;
                        IWIN.BlockOpr.setProperty('ppt_path',obj);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'ppt_path',oldPath,obj);
                    });
                }
            }

            var flashPath = document.getElementById('flash_path');
            if(flashPath){
                if (IWIN.BlockOpr.getProperty('flash_path').mapped) {
                    flashPath.src = IWIN.BlockOpr.getProperty('flash_path').mapped;
                }
                flashPath.onclick = function (){
                    IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=7',function(win){
                        var oldPath = IWIN.BlockOpr.getProperty('flash_path');
                        var list = win.query();
                        if(!list)return;
                        var obj = {path:list[0].path,mapped:list[0].mapped};
                        var path = list[0].mapped;

                        //flashPath.src = path.indexOf('http://')<0?'../../'+path:path;
                        flashPath.src = path.indexOf('http://') < 0 ? path : path;
                        IWIN.BlockOpr.setProperty('flash_path',obj);
                        IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'flash_path',oldPath,obj);
                    });
                }
            }
            
           // 倒计时  begin
           var tymd = IWIN.BlockOpr.getProperty('tymd');
           var tymdhms = IWIN.BlockOpr.getProperty('tymdhms');
           if(tymd == '2'){
        	   document.getElementById('tymd').checked = true;
        	   document.getElementById("tymdval").disabled = false;
        	   document.getElementById("tymdhmsval").disabled = true;
           }else if(tymdhms == '2'){
        	   document.getElementById('tymdhms').checked = true;
        	   document.getElementById("tymdhmsval").disabled = false;
        	   document.getElementById("tymdval").disabled = true;
           }
           // 倒计时  end

          // 流媒体
           var thirdstream = IWIN.BlockOpr.getProperty('thirdstream');
           var honghestream = IWIN.BlockOpr.getProperty('honghestream');
           if(thirdstream == '2'){
        	   document.getElementById('thirdstream').checked = true;
           }else if(honghestream == '2'){
        	   document.getElementById('honghestream').checked = true;
           }
            /**
             * 文字滚动部件的滚动属性
             */
            var scrlDim = byId('text_scroll_dim_select');
            var scrlSpd1 = byId('text_scroll_speed_select_1');
            var scrlSpd2 = byId('text_scroll_speed_select_2');
            if(scrlDim){
                var oldVal = IWIN.BlockOpr.getProperty('dim');
                var options = scrlDim.options;
                for (var i = 0; i < options.length; i++) {
                	if (oldVal == options[i].value) {
                		options[i].selected = "true";
                	}
                }
                if(scrlDim.value=='0'){
                    scrlSpd1.style.display = '';
                    scrlSpd2.style.display = 'none';
                } else {
	                scrlSpd1.style.display = 'none';
	                scrlSpd2.style.display = '';
                }
                oldVal = IWIN.BlockOpr.getProperty('speed');
                options = scrlSpd2.options;
                for (var i = 0; i < options.length; i++) {
                	if (oldVal == options[i].value) {
                		options[i].selected = "true";
                	}
                }
                this.util.events(scrlDim,'change',function(e,el){
                    if(scrlDim.value=='0'){
                        scrlSpd1.style.display = '';
                        scrlSpd2.style.display = 'none';
                    } else {
    	                scrlSpd1.style.display = 'none';
    	                scrlSpd2.style.display = '';
                    }
                    var newVal = scrlDim.value;
                    var oldVal = IWIN.BlockOpr.getProperty('dim');
                    IWIN.BlockOpr.setProperty('dim',newVal);
                    IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'dim',oldVal,newVal);
                });
                this.util.events(scrlSpd2,'change',function(e,el){
                    var newVal = scrlSpd2.value;
                    var oldVal = IWIN.BlockOpr.getProperty('speed');
                    IWIN.BlockOpr.setProperty('speed',newVal);
                    IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'speed',oldVal,newVal);
                });
            }

            /**
             * 文字2属性
             */
            
            function FilterPasteText(str)
    		{
    		    str = str.replace(/\r\n|\n|\r/ig, "");
    		    //remove html body form
    		    str = str.replace(/<\/?(html|body|form)(?=[\s\/>])[^>]*>/ig, "");
    		    //remove doctype
    		    str = str.replace(/<(!DOCTYPE)(\n|.)*?>/ig, "");
    		    //remove xml tags
    		    str = str.replace(/<(\/?(\?xml(:\w )?|xml|\w :\w )(?=[\s\/>]))[^>]*>/gi,"");
    		    //remove head
    		    str = str.replace(/<head[^>]*>(\n|.)*?<\/head>/ig, "");
    		    //remove <xxx /> 
    		    str = str.replace(/<(script|style|link|title|meta|textarea|option|select|iframe|hr)(\n|.)*?\/>/ig, "");
    		    //remove empty span
    		    //str = str.replace(/<span[^>]*?><\/span>/ig, "");
    		    //remove <xxx>...</xxx>
    		    str = str.replace(/<(head|script|style|textarea|button|select|option|iframe)[^>]*>(\n|.)*?<\/\1>/ig, "");
    		    //remove table and <a> tag, <img> tag,<input> tag (this can help filter unclosed tag)
    		    str = str.replace(/<\/?(a|table|tr|td|tbody|thead|th|img|input|iframe|span|p|ul|li|em)[^>]*>/ig, "");
    		    //remove bad attributes
    		    do {
    		        len = str.length;
    		        str = str.replace(/(<[a-z][^>]*\s)(?:id|name|language|type|class|style|on\w |\w :\w )=(?:"[^"]*"|\w )\s?/gi, "$1");
    		    } while (len != str.length);
    		    return str;
    		}

            var textApply = byId('text_apply');
            var textArea = byId('text_area');
            var ueText = byId('editor');//add by caoqian
            var isDataflow=byId('isdataflow');  //add by haoyc DataFlow升级 20160315
            var Dataflow=byId('datagridflow');  //add by caoqian DataFlow升级 2016/3/16

            //add by caoqian  2016/3/16  DataFlow升级   begin-----------
            if(Dataflow){
                this.util.events(Dataflow,'click',function(e,el){
                    IWIN.MdDialog.open('../../../project/ProjectPage_dataflow.do',function(win){
                        var txt =  IWIN.BlockOpr.getCurObj().getElementsByClassName('TEXT_COMP_text2')[0];
                        var win_name=txt.innerHTML.replace(txt.textContent,win.name);
                        UE.getEditor('editor').setContent(win_name);//update by caoqian

                        if (IWIN.util.isChrome()) {
                            textArea.cols = "26";
                        } else {
                            textArea.cols = "22";
                        }
                    });
                });

            };
            //add by caoqian  2016/3/16  DataFlow升级   end-----------
            if(textApply){

                //alert('textApply**************'+textApply);
                //add by haoyc 2016/3/16  DataFlow升级   begin-----------
                var isdf=IWIN.BlockOpr.getCurObj().getElementsByClassName('TEXT_COMP_ISDTF')[0].innerHTML;
                if(isdf==1){
                    isDataflow.checked=true;
                }else{
                    isDataflow.checked=false;
                }
                //add by haoyc DataFlow升级 20160316
                this.util.events(isDataflow,'change',function(e,el){
                    var ck=isDataflow.checked?'1':'0';
                    var old = IWIN.BlockOpr.getProperty('isdataflow');
                    IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'isdataflow',old,ck);
                });

                var rfTime=byId('rftime');
                var rftime1=IWIN.BlockOpr.getCurObj().getElementsByClassName('TEXT_COMP_RFTIME')[0].innerHTML;
                rfTime.value=rftime1;
                this.util.events(rfTime,'change',function(e,el){
                    var newrftime = parseInt(document.getElementById('rftime').value);
                    if(isNaN(newrftime)||newrftime<=0||!(/^\d+$/.test(newrftime))){
                        var rftime2=IWIN.BlockOpr.getCurObj().getElementsByClassName('TEXT_COMP_RFTIME')[0].innerHTML
                        //alert("请输入正确的数值,只允许输入整数!");
                        document.getElementById('rftime').value = rftime2;
                        return false;
                    }
                    var old=IWIN.BlockOpr.getProperty('rftime');
                    document.getElementById('rftime').value =newrftime;
                    IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'rftime',old,newrftime);
                });

                //add by haoyc 2016/3/16  DataFlow升级   end-----------

                var txt =  IWIN.BlockOpr.getCurObj().getElementsByClassName('TEXT_COMP_text2')[0];
                var mask =  IWIN.BlockOpr.getCurObj().getElementsByClassName('TEXT_COMP_MASK')[0];
                //  update by caoqian 20160527 去掉replace
            	textArea.innerHTML = txt.innerHTML/*.replace(/&/g, '&amp;')*/;
                ueText.innerHTML =txt.innerHTML/*.replace(/&/g, '&amp;')*/;
                if (IWIN.util.isChrome()) {
            		textArea.cols = "26";
            	} else {
            		textArea.cols = "22";
            	}
                this.util.events(textApply,'click',function(e,el){
                    var textAreaText1 =UE.getEditor('editor').getContent();//add by caoqian 2016/2/2
                    var textAreaText2 =UE.getEditor('editor').getContentTxt();//纯文本
                    var textAreaText = ab.instanceById('text_area').getContent();//原编辑器内容
                    //add by caoqian 20160503  文本框字数超过最大允许值时截取最大允许值长度的内容--------------begin
                    if(textAreaText2.length>1000)
                    {
                        textAreaText2=textAreaText2.substring(0,1000);
                        UE.getEditor('editor').setContent(textAreaText2);
                        textAreaText1=UE.getEditor('editor').getContent();
                    }
                    //add by caoqian 20160503  文本框字数超过最大允许值时截取最大允许值长度的内容--------------end
                    if (txt.innerHTML.replace(/<br>/g, '').replace(/[ ]/g, '') != '') {
                    	//textAreaText = FilterPasteText(textAreaText);//update by caoqian
                    	setTimeout(function(){
                    		ab.instanceById('text_area').setContent(textAreaText1);//update by caoqian
                    	},1)
                    }

                  //  console.log("A"+ab.instanceById('text_area').getContent())
                    var oldContent = IWIN.BlockOpr.getProperty('txtCont');
                    if(txt.contentEditable!="false"){
                        txt.contentEditable = "false";
                    }
                //    console.log("b")

                    txt.innerHTML = textAreaText1;//update by caoqian
                    console.log("------------txt.innerHTML---------" + txt.innerHTML);
                    IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'txtCont',oldContent,textAreaText1);
                    if (txt.innerHTML.replace(/<br>/g, '').replace(/[ ]/g, '') == '') {
                        console.log("c")
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
                        console.log("d")
                    	mask.style.backgroundImage = "";
                    	mask.style.backgroundPosition = "";
                    	mask.style.backgroundRepeat = "";
                    	mask.style.backgroundColor = "red";
                    	mask.style.filter = "alpha(opacity=0)";
                    	mask.style.mozOpacity = "0";
                    	mask.style.khtmlOpacity = "0";
                    	mask.style.opacity = "0";
                    }
                });

            }
            var scrl2Dim = byId('text2_scroll_dim_select');
            var scrl2Spd1 = byId('text2_scroll_speed_select_1');
            var scrl2Spd2 = byId('text2_scroll_speed_select_2');
            if(scrl2Dim){
                var oldVal = IWIN.BlockOpr.getProperty('dim');
                var options = scrl2Dim.options;
                for (var i = 0; i < options.length; i++) {
                	if (oldVal == options[i].value) {
                		options[i].selected = "true";
                	}
                }
                if(scrl2Dim.value=='0'){
                	scrl2Spd1.style.display = '';
                	scrl2Spd2.style.display = 'none';
                } else {
                	scrl2Spd1.style.display = 'none';
                	scrl2Spd2.style.display = '';
                }
                oldVal = IWIN.BlockOpr.getProperty('speed');
                options = scrl2Spd2.options;
                for (var i = 0; i < options.length; i++) {
                	if (oldVal == options[i].value) {
                		options[i].selected = "true";
                	}
                }
                this.util.events(scrl2Dim,'change',function(e,el){
                    if(scrl2Dim.value=='0'){
                    	scrl2Spd1.style.display = '';
                    	scrl2Spd2.style.display = 'none';
                    } else {
                    	scrl2Spd1.style.display = 'none';
                    	scrl2Spd2.style.display = '';
                    }
                    var newVal = scrl2Dim.value;
                    var oldVal = IWIN.BlockOpr.getProperty('dim');
                    IWIN.BlockOpr.setProperty('dim',newVal);
                    IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'dim',oldVal,newVal);
                });
                this.util.events(scrl2Spd2,'change',function(e,el){
                    var newVal = scrl2Spd2.value;
                    var oldVal = IWIN.BlockOpr.getProperty('speed');
                    IWIN.BlockOpr.setProperty('speed',newVal);
                    IWIN.Controller.execute('CMD_TXT_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'speed',oldVal,newVal);
                });
            }
        },
        findImgList : function (){
            var imgsDiv = document.getElementById('imgList');
            var imgList = [];
            if(!imgsDiv)return imgList;
            for (var i=0;i<imgsDiv.children.length;i++){
                imgList.push(JSON.parse(imgsDiv.children[i].params));
            }
            return imgList;
        },
        editScrollTitle : function (el){
            var item = IWIN.util.findPElByCls(el,'scroll_item');
            var params = JSON.parse(item.params);
            params.title = el.value;
            item.params = JSON.stringify(params);
            var old = IWIN.BlockOpr.getProperty('img_list');
            var nnew =  this.findImgList();
            IWIN.BlockOpr.setProperty('img_list',nnew);
            IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'img_list',old,nnew);
        },
        findWorkList : function (){
            var eWorksDiv = document.getElementById('eWorksInner');
            var workList = [];
            if(!eWorksDiv)return workList;
			var eWrokItems = eWorksDiv.children;
            for (var i=0, len=eWrokItems.length; i<len; i++){
                workList.push(JSON.parse(eWrokItems[i].params));
            }
            return workList;
        },
        saveWorksInfo : function (el){
            var item = IWIN.util.findPElByCls(el,'scroll_item');
            var params = JSON.parse(item.params);
			if(el.className == "workName"){ // 作品标题失去焦点
				params.title = el.value;
			}else{
				params.author = el.value;
			}
            item.params = JSON.stringify(params);
            var old = IWIN.BlockOpr.getProperty('articleList');
            var nnew =  this.findWorkList();
            IWIN.BlockOpr.setProperty('articleList',nnew);
            IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',IWIN.BlockOpr.getCurObj().id,'articleList',old,nnew);
        },

        editScrollInfo : function(el,currentObj,property){
            var item = IWIN.util.findPElByCls(el,'scroll_item');
            var params = JSON.parse(item.params);
            var infotemp=params.info;//记录下失去焦点前描述内容；
            if(el.className == "scroll_info_input"){ // 图片描述失去焦点
                if(infotemp!=el.value){//失去焦点前与失去焦点后内容不一致则修改xml
                    params.info = el.value;
                    item.params = JSON.stringify(params);
                    var nnew = this.findImgList();
                    //只要有一个修改所有id置空
                    for(var i=0;i<nnew.length;i++){
                        nnew[i].id="";
                    }
                    var old = IWIN.BlockOpr.getProperty(property);
                    IWIN.BlockOpr.setProperty(property,nnew,currentObj);//update by haoyc 解决自定义组件组件冲突问题 20160809
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',currentObj,property,old,nnew);
                }
            }
        },
        //add by caoqian  德育排名--------------------------begin
        editScrollInfoName : function(el,currentObj){
            var item = IWIN.util.findPElByCls(el,'scroll_item');
            var params = JSON.parse(item.params);
            var infotemp=params.info;//记录下失去焦点前描述内容；
            if(el.className == "scroll_info_input_name"){
                if(infotemp!=el.value){//失去焦点前与失去焦点后内容不一致则修改xml
                    params.info = el.value;
                    item.params = JSON.stringify(params);
                    var nnew = this.findImgList();
                    //只要有一个修改所有id置空
                    for(var i=0;i<nnew.length;i++){
                        nnew[i].id="";
                    }
                    var old = IWIN.BlockOpr.getProperty('activity_list_rank');
                    IWIN.BlockOpr.setProperty('activity_list_rank',nnew,currentObj);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',currentObj,'activity_list_rank',old,nnew);
                }
            }
        },
        editScrollInfoRank : function(el,currentObj){
            var item = IWIN.util.findPElByCls(el,'scroll_item');
            var params = JSON.parse(item.params);
            var infotemp=params.path;//排名
            var regex=/^\+?[1-9][0-9]*$/;
            if(!regex.test(el.value))
            {
                alert("排名输入错误，应为非零的正整数，请确认");
                return false;
            }
            if(el.className == "scroll_info_input_rank"){ // 图片描述失去焦点
                if(infotemp!=el.value){//失去焦点前与失去焦点后内容不一致则修改xml
                    params.path = el.value;
                    item.params = JSON.stringify(params);
                    var nnew = this.findImgList();
                    //只要有一个修改所有id置空
                    for(var i=0;i<nnew.length;i++){
                        nnew[i].id="";
                    }
                    var old = IWIN.BlockOpr.getProperty('activity_list_rank');
                    IWIN.BlockOpr.setProperty('activity_list_rank',nnew,currentObj);
                    IWIN.Controller.execute('CMD_BLOCK_PRPT_CHANGE',currentObj,'activity_list_rank',old,nnew);
                }
            }
        }
        //add by caoqian  德育排名--------------------------end

    };

    PropertyBar.init();
    IWIN.PropertyBar = PropertyBar;

     //属性区页面动态效果
    (function (){
        var byId = function (id){
            return  typeof (id)=='string'?document.getElementById(id):id;
        };
        /**
         * 属性区块动态展开及收起
         */
        var navs = byClass('prpt_nav')
        for(var i=0;i<navs.length;i++){
           IWIN.util.events(navs[i],'click',function (e,el){
               IWIN.util.togClass(el.parentNode,'check');
           })
        }


        /**
         * 颜色值选择块的“其它”选项展开和收起
         */
        var clrSlcts = document.getElementsByClassName('color_select_list');
        for(var i=0;i<clrSlcts.length;i++){
            var moreBtn = clrSlcts[i].getElementsByClassName('more_color_select_btn')[0];
            IWIN.util.events(moreBtn,'click',function (e,el){
                var morePanel = el.parentNode.getElementsByClassName('more_color_select_panel')[0];
                IWIN.util.togClass(morePanel,'check');
            })
        }

        IWIN.util.events(document.body,'click',function (e,el){
            //点击右侧编辑区隐藏右键菜单 begin
            if(parent.IWIN.util.byId("mylayer")){
                console.log("parent.IWIN.util.byId('mylayer').style.display============="+parent.IWIN.util.byId("mylayer").style.display);
                parent.IWIN.util.byId("mylayer").style.display = "none";
            }else if(parent.IWIN.util.byId("mylayerQ")){
                console.log("parent.IWIN.util.byId('mylayerQ').style.display============="+parent.IWIN.util.byId("mylayerQ").style.display);
                parent.IWIN.util.byId("mylayerQ").style.display = "none";
            }
            //点击右侧编辑区隐藏右键菜单 end
            var moreBtn = IWIN.util.findPElByCls(e,'more_color_select_btn');
            if(moreBtn) {
                return;
            }else{
                var els =  document.getElementsByClassName('more_color_select_panel');
                for(var i=0;i<els.length;i++){
                    IWIN.util.dClass(els[i],'check');
                }
            }
        })


    })()
})();
