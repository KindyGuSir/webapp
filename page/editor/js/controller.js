/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 13-12-12
 * Time: 下午5:27
 * To change this template use File | Settings | File Templates.
 */
var uuid= '';
IWIN = IWIN || {};
var sig = false;//解决 点击多次发布按钮  会多次弹框的现象
IWIN.Controller = {
    execute : function (excID){
        var cmdMap = {
            'CMD_NEW_BLOCK' : CMDBlockAdd,
            'CMD_BLOCK_MOVE': CMDBlockMove,
            'CMD_BLOCK_RESIZE':CMDBlockResize,
            'CMD_BLOCK_MOVE_RESIZE':CMDBlockMvAndRs,
            'CMD_BLOCK_PRPT_CHANGE':CMDBlockPrptChange,
            'CMD_BLOCK_RESOURSE_CHANGE':CMDBlockSrcChange,
            'CMD_BLOCK_RESOURSE_CHANGE_QUI':CMDBlockSrcChangeQui,
            'CMD_BLOCK_LOCK':CMDBlockLock, //普通节目编辑页面 右键 锁定功能
            'CMD_BLOCK_UNLOCK': CMDBlockUnlock, //普通节目编辑页面 右键 解锁功能
            'CMD_BLOCK_DEL':CMDBlockDel,
            'CMD_BLOCK_CUT': CMDBlockCut,
            'CMD_BLOCK_PASTE':CMDBlockPaste,
            'CMD_BLOCK_COPY':CMDBlockCopy,
            'CMD_BLOCK_ALIGN_TOP':CMDBlockAlignTop,
            'CMD_BLOCK_ALIGN_BOTTOM':CMDBlockAlignBottom,
            'CMD_BLOCK_ALIGN_LEFT':CMDBlockAlignLeft,
            'CMD_BLOCK_ALIGN_RIGHT':CMDBlockAlignRight,
            'CMD_BLOCK_ALIGN_HORIZONTAL':CMDBlockAlignHorizontal,
            'CMD_BLOCK_ALIGN_VERTICAL':CMDBlockAlignVertical,
            'CMD_BLOCK_LEVEL_TOP':CMDBlockLevelTop,
            'CMD_BLOCK_LEVEL_BOTTOM':CMDBlockLevelBottom,
            'CMD_BLOCK_LEVEL_UP':CMDBlockLevelMoveUp,
            'CMD_BLOCK_LEVEL_DOWN':CMDBlockLevelMoveDown,
            'CMD_CREATE_PAGE':CMDPageCreate,
            'CMD_DELETE_PAGE':CMDPageDelete,
            'CMD_SELECT_PAGE':CMDPageSelect,
            'CMD_UPDATE_PAGE_TIME':CMDPageUpdateTime,
            'CMD_COPY_PAGE':CMDPageCopy,
            'CMD_MOVE_PAGE':CMDPageMove,
            'CMD_PROGRAM_SIZE':CMDProgramSize,
            'CMD_TXT_PRPT_CHANGE':CMDBlockPrptChange,
            'CMD_RESOURSE':CMDAddRsrc,
          
            /*以下的18的键值对,是新版（点击工具栏的元素小图标，不再是拖拽效果，换成点击效果，如果想还原拖拽效果，请屏蔽此处）的节目制作      begin  */
            'CMD_NEW_BLOCK_TEXT' : CMDBlockAddText,
            'CMD_RESOURSE_IMAGE':CMDAddRsrc,
			'CMD_NEW_BLOCK_LINK':CMDAddRLink, //zhanghongbin add
			'CMD_NEW_BLOCK_BACK':CMDAddRBACK, //zhanghongbin add
            'CMD_RESOURSE_PPT':CMDBlockAddPpt,
            'CMD_RESOURSE_FLASH':CMDAddRsrc,
            'CMD_RESOURSE_VIDEO':CMDAddRsrc,
            'CMD_NEW_BLOCK_FLOWVIDEO' : CMDBlockAddFlowvideo,
            'CMD_NEW_BLOCK_WEB' : CMDBlockAddWeb,
            'CMD_NEW_BLOCK_RECTANGLE' : CMDBlockAddRectangle,
            'CMD_NEW_BLOCK_HORIZONTALINE' : CMDBlockAddHorizontaline,
            'CMD_NEW_BLOCK_VERTICALLINE' : CMDBlockAddVerticalline,
            'CMD_NEW_BLOCK_PIANO' : CMDBlockAddPinao,
            'CMD_NEW_BLOCK_WANDER' : CMDBlockAddWander,
            'CMD_NEW_BLOCK_SWEPE' : CMDBlockAddSwepe,
            'CMD_NEW_BLOCK_3D' : CMDBlockAdd3D,
            'CMD_NEW_BLOCK_TIME' : CMDBlockAddTime,
            'CMD_NEW_BLOCK_WEATHER' : CMDBlockAddWeather,
            'CMD_NEW_BLOCK_GOODPLAY' : CMDBlockAddGoodplay,
            'CMD_NEW_BLOCK_CURRICULA' : CMDBlockAddCurricula,			//课程表
            'CMD_NEW_BLOCK_COUNTDOWN' : CMDBlockAddCountdown,
            'CMD_NEW_BLOCK_CLASSDYNAMICS' : CMDBlockAddClassdynamics,
			'CMD_NEW_BLOCK_NOTICE' : CMDBlockAddNotice,
			'CMD_NEW_BLOCK_ATTENDANCE' : CMDBlockAddAttendance,
			'CMD_NEW_BLOCK_ACTIVITY' : CMDBlockAddActivity,			//add by haoyc 班级活动 20160602
			'CMD_NEW_BLOCK_HONOR' : CMDBlockAddHonor,			//add by haoyc 班级荣誉 20160627
			'CMD_NEW_BLOCK_UDEFINED' : CMDBlockAddUdefined,			//add by haoyc 自定义组件 20160704
			'CMD_NEW_BLOCK_RANKMORALEDU' : CMDBlockAddRankmoraledu,			//add by caoqian 德育排名 20160711
			'CMD_NEW_BLOCK_TASK' : CMDBlockAddTask,			//add by haoyc 作业布置 20160712
			'CMD_NEW_BLOCK_NEWATTENDANCE' : CMDBlockAddNewAttendance			//add by haoyc 班级考勤 2016071228
			/*以下的18的键值对,是新版（点击工具栏的元素小图标，不再是拖拽效果，换成点击效果，如果想还原拖拽效果，请屏蔽此处）的节目制作      end  */
        };
        var that = this;
		if(excID == 'CMD_NEW_BLOCK_ATTENDANCE'){
			alert('考勤表是全屏组件，建议置于页面最底层！');
		}
        switch (excID){
            case 'CMD_UNDO':
                IWIN.Commond.undo();
                break;
            case 'CMD_REDO':
                IWIN.Commond.redo();
                break;
            case 'CMD_BASELINE_NO':
                IWIN.BaseLine.setNeedLine(false);
                break;
            case 'CMD_BASELINE_YES':
                IWIN.BaseLine.setNeedLine(true);
                break;
            case 'CMD_BLOCK_CUT':
                if(!IWIN.BlockOpr.countSelectIds())return;
                IWIN.Commond.executeUnRe(cmdMap[excID],arguments[1],arguments[2],arguments[3]);
                break;
            case 'CMD_BLOCK_PASTE':
                if(!IWIN.BlockOpr.getCutIds())return;
                IWIN.Commond.executeUnRe(cmdMap[excID],arguments[1],arguments[2],arguments[3]);
                break;
            case 'CMD_BLOCK_COPY':
                if(!IWIN.BlockOpr.countSelectIds())return;
                IWIN.Commond.executeUnRe(cmdMap[excID],arguments[1],arguments[2],arguments[3]);
                break;
            case 'CMD_PAGE_PREVIEW':
                //window.open(IWIN.serverIpPort+'/ManagementCenter/data/product/project/project.html?prid='+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page);
                window.open(IWIN.serverIp + '/ManagementCenter/project/ProjectPreview_prepage.do?prid='+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page);
                break;
            case 'CMD_SINGLE_PAGE_PREVIEW':
                window.open(IWIN.serverIp + '/ManagementCenter/project/ProjectPage_preSingle.do?prid='+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page);
                break;
            case 'CMD_SINGLE_PAGE_PREVIEW_Q':
                window.open(IWIN.serverIp + '/ManagementCenter/project/ProjectPage_preSingleQ.do?prid='+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page);
                break;
            case 'CMD_PROJECT_PREVIEW':
//            	var pn = document.getElementsByClassName('editItem22')[0].parentNode;
//            	var a =  IWIN.EditComponent.getProperty(pn,'cListID');
//            	if(a == ''){
//            		alert('请选择课程表');
//            	}else{
//            		window.open(IWIN.serverIp + '/ManagementCenter/project/ProjectPreview_preprogram.do?prid='+IWIN.Options.cur.program+'&pid='+IWIN.PageOpr.getCurIdx());
//            	}
            	window.open(IWIN.serverIp + '/ManagementCenter/project/ProjectPreview_preprogram.do?prid='+IWIN.Options.cur.program+'&pid='+IWIN.PageOpr.getCurIdx());
               	break;
            case 'CMD_PROJECT_PUBLISH':
            		IWIN.Request.checkBeforePublish(function(rsu){
                		console.info(rsu);
                		if(rsu == '0'){
                			IWIN.Request.beginPublish(function(rs){
    	                		console.info(rs);
    		                	if(rs == 'ok'){
    		                		 IWIN.Request.programPublish(function(rs){
    		     	                	console.info(rs);
    		     	                	if(sig == true){
    		     	                		
    		     	                	}
    		     	                	else{
    		     	                		
    		     	                	}
    		                		 });
    		                	}
    		                	else if(rs == 'busy'){
    		                		alert("节目正在发布中，请稍候.....");
    		                		IWIN.Request.programPublish(function(rs){
    		     	                	console.info(rs);
    		                		});
    		                	}
                			});
                		}
                		else if(rsu == '-1'){
	                		 alert("该节目暂无内容，请添加内容!");
	                	}
            		});
                break;
			case 'CMD_PROJECT_UPDATE'://局部更新 add by haoyc 20160708
				IWIN.Request.programUpdate(function(rs){
					console.info(rs);
				});
				break;
            case 'CMD_PROJECT_TEMPLATE':
				IWIN.Controller.snapBigPage();		//add by haoyc 生成大图 20160413
            		// 模板弹出框
	            IWIN.MdTempDialog.open('../../../project/ProjectProgram_createTemplate.do?prid='+IWIN.Options.cur.program,
	            	function(win){
	            		win.addProjectTemplate();
	            		return;
//	            		var bl = win.createTemplate(IWIN.Options.cur.program);
//	            		return bl;
	                },
	                function(){
		                //close
		            },
	                function(win){
		               	//完成操作
		               	 return;
			        }
            	);
                break;
            case 'CMD_PROJECT_PAGERATECUSTOM':
        		// 自定义分辨率
            	IWIN.MdPagerateDialog.open('../../../project/ProjectProgram_pagerateCustom.do?prid='+IWIN.Options.cur.program,
    	            	function(win){
    	            		var l = win.pageRateSet();
    	            		if(l){
    	            			var s = document.getElementById("page_rate_custom");
        	            		document.getElementById("page_rate_custom").className = 'check ratio_select';
        	            		s.setAttribute("_val","");
        	            		s.setAttribute("_val",l);
        	            		var strs = l.split('*');
                                IWIN.util.byId('defaultrate').innerHTML=strs[0]+":"+strs[1];
        	            		IWIN.Controller.execute('CMD_PROGRAM_SIZE',{w:strs[0],h:strs[1]});
    	            		}
    	            		return l;
    	                },
    	                function(){
    		                //close
    	                	return;
    		            }
                	);
            	break;
            case 'CMD_RESOURSE':
                IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=1,4,6,7',function(win){
                    var list = win.query();
                    if(!list)return;
                    IWIN.Commond.executeUnRe(cmdMap[excID],list);
                    that.snapPage();
                    return true;
                });
                break;
            case 'CMD_RESOURSE_IMAGE':
                IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4',function(win){
                    var list = win.query();
                    if(!list)return;
                    IWIN.Commond.executeUnRe(cmdMap[excID],list);
                    that.snapPage();
                    return true;
                });
                break;
			case 'CMD_NEW_BLOCK_LINK':  //zhanghongbin add link
				IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=4',function(win){
					var list = win.query();
					if(!list)return;
					IWIN.Commond.executeUnRe(cmdMap[excID],list);
					that.snapPage();
					return true;
				});
				break;
            case 'CMD_RESOURSE_PPT':
				//每个页面只允许添加一个PPT
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCurricula.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excID='+excID,
					async:false,
					success : function(data) {
						if(data=='1'){
							alert('当前页面重复添加或者已添加PPT!');
						}else{
							// IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=6,5,3,2',function(win){  //包含PPT\WORD\EXCEL\PDF
							IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=6',function(win){
								var list = win.query();
								if(!list)return;
								IWIN.Commond.executeUnRe(cmdMap[excID],list);
								that.snapPage();
								return true;
							});
						}
					},
					error : function() {
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
                 break;
            case 'CMD_RESOURSE_FLASH':
/*				var flag='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_RESOURSE_FLASH,CMD_RESOURSE_VIDEO,CMD_NEW_BLOCK_FLOWVIDEO'+'&count='+IWIN.Options.el.flash_video_stream_count,
					async:false,
					success : function(data) {
						if(data=='1') {
							alert("单个页面中falsh/视频/直播数量不能超过" + IWIN.Options.el.flash_video_stream_count + "个！");
							flag=data;
							//break;
						}
					},
					error : function() {
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1'){
					break;
				}*///暂时不需要此控制

				//每页只能添加1个FLASH
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCurricula.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excID='+excID,
					async:false,
					success : function(data) {
						if(data=='1'){
							alert('当前页面重复添加或者已添加FLASH!');
						}else{
							IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=7',function(win){
								var list = win.query();
								if(!list)return;
								IWIN.Commond.executeUnRe(cmdMap[excID],list);
								that.snapPage();
								return true;
							});
						}
					},
					error : function() {
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
                 break;
            case 'CMD_RESOURSE_VIDEO':
/*				var flag='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_RESOURSE_FLASH,CMD_RESOURSE_VIDEO,CMD_NEW_BLOCK_FLOWVIDEO'+'&count='+IWIN.Options.el.flash_video_stream_count,
					async:false,
					success : function(data) {
						if(data=='1') {
							alert("单个页面中falsh/视频/直播数量不能超过" + IWIN.Options.el.flash_video_stream_count + "个！");
							flag=data;
							//break;
						}
					},
					error : function() {
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1'){
					break;
				}*///暂时不需要此控制
            	$.ajax({
         			type : "GET",
         			cache : false,
         			url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCountsettting.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excID='+excID+'&count='+IWIN.Options.el.videoCount,
         			async:false,
         			success : function(data) {
         				if(data=='0'){
         					IWIN.MdDialog.open('../../../resource/ResourceFile_homeIndex.do?type=1',function(win){
         	            		 var t = win.getVideoType();
         	            		 if(t == 'videoonline'){ // 在线视频
         	            			 var onlinesource = win.getVideoOnlineSource();
         	            		//	 console.info(onlinesource+"______________________________");
         	            			 if(onlinesource == ''){
         	            				 return "";
         	            			 }
         	            			 
         	            			 if(onlinesource.indexOf("/") > -1){
         	               				 var ors = onlinesource.split("/");
         	               				 var resources = new Array();
         	   	            			 var resource = new Object();
         	               				 resource.path = onlinesource;
         	           			         resource.mapped = "/ManagementCenter/data/defaultvideothumb/thumb.png";
         	           			         resource.snap = "/ManagementCenter/data/defaultvideothumb/thumb.png";
         	           			         resource.w = "480";
         	           			         resource.h = "360";
         	           			         resource.type = "1";
         	           			         resource.respath = "";
         	           			         resources.push(resource);   
         	   	           		         IWIN.Commond.executeUnRe(cmdMap[excID],resources);
         	   	                         that.snapPage();
         	   	                         return "1";
         	            			 }
         	            		 }else{
         	            			 var list = win.query();
         	                         if(!list)return;
         	                         IWIN.Commond.executeUnRe(cmdMap[excID],list);
         	                         that.snapPage();
         	                         return "1";
         	            		 }
         	                 });
	         			}else{
	         				//alert("单个节目中视频的数量不能超过"+IWIN.Options.el.videoCount+"个！");
							alert("单个页面中视频数量不能超过"+IWIN.Options.el.videoCount+"个！");		//update by haoyc [B160315-002]
							return "";
	         			}
         			},
         			error : function() {
         				$.messager.alert('错误', '程序进行出现错误', 'error');
         			}
         		});
                 break;
			// case 'CMD_NEW_BLOCK_BACK':
			// 	//zhanghongbin add 后退组件
			// 	$.ajax({
			// 		type : "GET",
			// 		cache : false,
			// 		url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCountsettting.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excID='+excID+'&count=7',
			// 		async:false,
			// 		success : function(data) {
			// 			if(data !='0'){
			// 				alert("单个页面中后退数量不能超过1个！");		//update by haoyc [B160315-002]
			// 				return "";
			// 			}else{
			// 				that.snapPage();
			// 				return true;
			// 			}
			// 		},
			// 		error : function() {
			// 			$.messager.alert('错误', '程序进行出现错误', 'error');
			// 		}
			// 	});
			// 	break;
            case 'CMD_PROJECT_OPEN':
                window.location.href = IWIN.serverIp + '/ManagementCenter/project/Project_home.do?module=Project&signre=0';
                // signre=0  表示只有在这种情况下  页面才自动刷新一次
                break;
            case 'CMD_PROJECT_OPEN_Q': 
            	window.location.href = IWIN.serverIp + '/ManagementCenter/project/Project_quickReplaceHome.do?module=QuickReplace&signre=0';
                // signre=0  表示只有在这种情况下  页面才自动刷新一次
                break;
            case 'CMD_PROJECT_NEW':
                break;
			case 'CMD_NEW_BLOCK_ACTIVITY':
				var flag='0';
				 $.ajax({
					 type : "GET",
					 cache : false,
					 url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_NEW_BLOCK_ACTIVITY'+'&count='+1,
					 async:false,
					 success : function(data) {
						 if(data=='1')
						 {
							 alert('单个页面中班级活动数量不能超过1个！');
							 flag=data;
							 //break;
						 }
					 },
					 error : function()
					 {
					 	$.messager.alert('错误', '程序进行出现错误', 'error');
					 }
				 });
				 if(flag=='1')
				 {
					 break;
				 }
				if(flag=='1')
				{
					break;
				}
				flag=='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_NEW_BLOCK_ACTIVITY,CMD_NEW_BLOCK_HONOR,CMD_NEW_BLOCK_TASK,CMD_NEW_BLOCK_UDEFINED'+'&count='+7,
					async:false,
					success : function(data) {
						if(data=='1')
						{
							alert('单个页面中局部更新轮播组件不能超过7个！');
							flag=data;
							//break;
						}
					},
					error : function()
					{
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1')
				{
					break;
				}
				IWIN.Commond.executeUnRe(cmdMap[excID]);
				break;
			case 'CMD_NEW_BLOCK_HONOR' :
				var flag='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_NEW_BLOCK_HONOR'+'&count='+1,
					async:false,
					success : function(data) {
						if(data=='1')
						{
							alert('单个页面中班级荣誉数量不能超过1个！');
							flag=data;
							//break;
						}
					},
					error : function()
					{
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1')
				{
					break;
				}
				flag=='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_NEW_BLOCK_ACTIVITY,CMD_NEW_BLOCK_HONOR,CMD_NEW_BLOCK_TASK,CMD_NEW_BLOCK_UDEFINED'+'&count='+7,
					async:false,
					success : function(data) {
						if(data=='1')
						{
							alert('单个页面中局部更新轮播组件不能超过7个！');
							flag=data;
							//break;
						}
					},
					error : function()
					{
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1')
				{
					break;
				}
				IWIN.Commond.executeUnRe(cmdMap[excID]);
				break;
			case 'CMD_NEW_BLOCK_UDEFINED' :
				var flag='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_NEW_BLOCK_ACTIVITY,CMD_NEW_BLOCK_HONOR,CMD_NEW_BLOCK_TASK,CMD_NEW_BLOCK_UDEFINED'+'&count='+7,
					async:false,
					success : function(data) {
						if(data=='1')
						{
							alert('单个页面中局部更新轮播组件不能超过7个！');
							flag=data;
							//break;
						}
					},
					error : function()
					{
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1')
				{
					break;
				}
				IWIN.Commond.executeUnRe(cmdMap[excID]);
				break;
			case 'CMD_NEW_BLOCK_RANKMORALEDU':
				var flag='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_NEW_BLOCK_RANKMORALEDU'+'&count='+1,
					async:false,
					success : function(data) {
						if(data=='1')
						{
							alert('单个页面中德育排名数量不能超过1个！');
							flag=data;
							//break;
						}
					},
					error : function()
					{
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1')
				{
					break;
				}
				IWIN.Commond.executeUnRe(cmdMap[excID]);
				break;
			case 'CMD_NEW_BLOCK_TASK' :
				var flag='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_NEW_BLOCK_TASK'+'&count='+1,
					async:false,
					success : function(data) {
						if(data=='1')
						{
							alert('单个页面中作业数量不能超过1个！');
							flag=data;
							//break;
						}
					},
					error : function()
					{
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1')
				{
					break;
				}
				if(flag=='1')
				{
					break;
				}
				flag=='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_NEW_BLOCK_ACTIVITY,CMD_NEW_BLOCK_HONOR,CMD_NEW_BLOCK_TASK,CMD_NEW_BLOCK_UDEFINED'+'&count='+7,
					async:false,
					success : function(data) {
						if(data=='1')
						{
							alert('单个页面中局部更新轮播组件不能超过7个！');
							flag=data;
							//break;
						}
					},
					error : function()
					{
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1')
				{
					break;
				}
				IWIN.Commond.executeUnRe(cmdMap[excID]);
				break;
			case 'CMD_NEW_BLOCK_NEWATTENDANCE' :
				var flag='0';
				$.ajax({
					type : "GET",
					cache : false,
					url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_NEW_BLOCK_NEWATTENDANCE'+'&count='+1,
					async:false,
					success : function(data) {
						if(data=='1')
						{
							alert('单个页面中考勤组件不能超过1个！');
							flag=data;
							//break;
						}
					},
					error : function()
					{
						$.messager.alert('错误', '程序进行出现错误', 'error');
					}
				});
				if(flag=='1')
				{
					break;
				}
				IWIN.Commond.executeUnRe(cmdMap[excID]);
				break;
            default :
            	// 需要进行 undo redo的操作进行区分
            	// 右键删除    素材拖动    右键上移一层    下移一层    右键置顶    右键置底      18个素材  （允许undo redo）
            	if(excID == 'CMD_BLOCK_DEL' || excID == 'CMD_BLOCK_MOVE' || excID == 'CMD_BLOCK_LEVEL_UP' || excID == 'CMD_BLOCK_LEVEL_DOWN'
            		|| excID == 'CMD_BLOCK_LEVEL_TOP' || excID == 'CMD_BLOCK_LEVEL_BOTTOM'
            			|| excID == 'CMD_NEW_BLOCK_TEXT' || excID == 'CMD_RESOURSE_IMAGE' || excID=='CMD_NEW_BLOCK_LINK'  || excID == 'CMD_NEW_BLOCK_BACK' || excID == 'CMD_RESOURSE_PPT'|| excID == 'CMD_RESOURSE_FLASH'
            				/*|| excID == 'CMD_RESOURSE_VIDEO' || excID == 'CMD_NEW_BLOCK_FLOWVIDEO'*/ || excID == 'CMD_NEW_BLOCK_WEB' || excID == 'CMD_NEW_BLOCK_RECTANGLE'
            					|| excID == 'CMD_NEW_BLOCK_HORIZONTALINE' || excID == 'CMD_NEW_BLOCK_VERTICALLINE' /*|| excID == 'CMD_NEW_BLOCK_PIANO' || excID == 'CMD_NEW_BLOCK_WANDER' 
            						|| excID == 'CMD_NEW_BLOCK_SWEPE' || excID == 'CMD_NEW_BLOCK_3D'*/ || excID == 'CMD_NEW_BLOCK_TIME' || excID == 'CMD_NEW_BLOCK_WEATHER' 
            							/*|| excID == 'CMD_NEW_BLOCK_GOODPLAY'*/){
            		IWIN.Commond.executeUnRe(cmdMap[excID],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);
            	}else if(/*excID == 'CMD_NEW_BLOCK_CURRICULA' ||*/ excID == 'CMD_NEW_BLOCK_CLASSDYNAMICS' || excID == 'CMD_NEW_BLOCK_NOTICE' || excID == 'CMD_NEW_BLOCK_ATTENDANCE' || excID == 'CMD_RESOURSE_PPT' || excID == 'CMD_RESOURSE_FLASH'){

            		//每个页面只允许添加一张课程表  一个动态  一个公告
            		$.ajax({
            			type : "GET",
            			cache : false,
            			url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCurricula.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excID='+excID,
            			async:false,
            			success : function(data) {
            				if(data=='0'){
            					IWIN.Commond.executeUnRe(cmdMap[excID],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);
            				}else{
								if(excID == 'CMD_NEW_BLOCK_CURRICULA'){
									//alert('当前页面重复添加或者已添加课程表!');	//已经改为可以放2个
								}
								else if(excID == 'CMD_NEW_BLOCK_CLASSDYNAMICS'){
									alert('当前页面重复添加或者已添加动态!');
								}
								else if(excID == 'CMD_NEW_BLOCK_NOTICE'){
									alert('当前页面重复添加或者已添加公告!');
								}
								else if(excID == 'CMD_NEW_BLOCK_ATTENDANCE'){
									//alert('当前页面已添加了课程表、动态、公告或者考勤表，无法继续添加新的考勤表!');
									alert('当前页面重复添加或者已添加考勤表!');
								}
            				}
            			},
            			error : function() {
            				$.messager.alert('错误', '程序进行出现错误', 'error');
            			}
            		});
            	}
				else if(excID=='CMD_NEW_BLOCK_CURRICULA')//课程表单页面添加数量控制
				{
					 $.ajax({
						 type : "GET",
						 cache : false,
						 url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+excID+'&count='+2,
						 async:false,
						 success : function(data) {
							 if(data=='0'){
								IWIN.Commond.executeUnRe(cmdMap[excID],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);
							 }
							 else
							 {
								 alert("单个页面中课程表数量不能超过" + 2 + "个！");
							 }
						 },
						 error : function() {
							$.messager.alert('错误', '程序进行出现错误', 'error');
						 }
					 });
				}
            	else if(excID == 'CMD_NEW_BLOCK_FLOWVIDEO'||excID == 'CMD_NEW_BLOCK_GOODPLAY'){
/*					var flag='0';
					$.ajax({
						type : "GET",
						cache : false,
						url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCount.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excIDs='+'CMD_RESOURSE_FLASH,CMD_RESOURSE_VIDEO,CMD_NEW_BLOCK_FLOWVIDEO'+'&count='+IWIN.Options.el.flash_video_stream_count,
						async:false,
						success : function(data) {
							if(data=='1') {
								alert("单个页面中falsh/视频/直播数量不能超过" + IWIN.Options.el.flash_video_stream_count + "个！");
								flag=data;
								//break;
							}
						},
						error : function() {
							$.messager.alert('错误', '程序进行出现错误', 'error');
						}
					});
					if(flag=='1'){
						break;
					}*///暂时不需要此控制
            		var num = 0;
            		if(excID == 'CMD_NEW_BLOCK_FLOWVIDEO'){
            			num = IWIN.Options.el.streamCount;
            		}else if(excID == 'CMD_NEW_BLOCK_GOODPLAY'){
            			num = IWIN.Options.el.eworksCount;
            		}
            		$.ajax({
            			type : "GET",
            			cache : false,
            			url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getCountsettting.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excID='+excID+'&count='+num,
            			async:false,
            			success : function(data) {
            				if(data=='0'){
            					IWIN.Commond.executeUnRe(cmdMap[excID],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);
            				}else{
            					if(excID == 'CMD_NEW_BLOCK_FLOWVIDEO'){
            						alert("单个节目中流媒体数量不能超过"+num+"个！");
            					}
            					else if(excID == 'CMD_NEW_BLOCK_GOODPLAY'){
            						alert("单个节目中主题展示数量不能超过"+num+"个！");
            					}
            				}
            			},
            			error : function() {
            				$.messager.alert('错误', '程序进行出现错误', 'error');
            			}
            		});
            	}else if(excID == 'CMD_NEW_BLOCK_PIANO' || excID == 'CMD_NEW_BLOCK_WANDER' || excID == 'CMD_NEW_BLOCK_SWEPE'){
            		var num = IWIN.Options.el.swipeCount;
            		$.ajax({
            			type : "GET",
            			cache : false,
            			url : IWIN.serverIp + "/ManagementCenter/project/ProjectPage_getSwipecountsettting.do?prid="+IWIN.Options.cur.program+'&pid='+IWIN.Options.cur.page+'&excID='+excID+'&count='+num,
            			async:false,
            			success : function(data) {
            				if(data=='0'){
            					IWIN.Commond.executeUnRe(cmdMap[excID],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);
            				}else{
            					alert("单个节目中轮播图数量不能超过"+num+"个！");
            				}
            			},
            			error : function() {
            				$.messager.alert('错误', '程序进行出现错误', 'error');
            			}
            		});
            	}
            	else{
            		if(IWIN.util.byId('quick').value=='1'){
            			if(excID == 'CMD_BLOCK_RESOURSE_CHANGE_QUI'){
                     		IWIN.Commond.executeImVe(cmdMap[excID],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7],arguments[8],arguments[9]);
                     	}else{
                     		IWIN.Commond.execute(cmdMap[excID],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);
                     	}
            		}else{
            			IWIN.Commond.execute(cmdMap[excID],arguments[1],arguments[2],arguments[3],arguments[4],arguments[5],arguments[6],arguments[7]);
            		}
            		if(excID != 'CMD_SELECT_PAGE' && excID != 'CMD_UPDATE_PAGE_TIME'){
            			this.snapPage();
            		}
            	}
        }
        if(excID.indexOf('_BLOCK')>-1){
            this.snapPage();
        }
    },
    snapPage : function (){
        var distw = IWIN.Options.cur.w;
        var disth = IWIN.Options.cur.h;
        if (distw >= disth) {
            disth = disth * 240 / distw;
            distw = 240;
        }
        else {
            distw = distw * 240 / disth;
            disth = 240;
        }
        html2canvas(IWIN.Options.el.mainBoxIn, {
            width: IWIN.Options.cur.w,
            height: IWIN.Options.cur.h,
            dist_width: distw,
            dist_height: disth,
            onrendered: function(canvas) {
                var imgData = canvas.toDataURL("image/png");
                IWIN.Request.snapPageReq(IWIN.Options.cur.page,imgData);
                /*var win=window.open("about:blank","image from canvas");
                win.document.write('<img src="'+imgData+'" alt="from canvas"/>');*/
                var t = IWIN.PageOpr.getCurItem();
                if(t!=null){
                	var pageItem = t.getElementsByClassName(IWIN.Options.eClass.pageImg)[0];
                    pageItem.innerHTML = '';
                    pageItem.style.background = 'none';
                    pageItem.appendChild(canvas);
                    canvas.style.width = '100%';
                    canvas.style.height = '100%';
                }
            }
        });
    },
	//add by haoyc 生成大图 20160413
	snapBigPage : function (){
		var distw = IWIN.Options.cur.w;
		var disth = IWIN.Options.cur.h;
		html2canvas(IWIN.Options.el.mainBoxIn, {
			width: IWIN.Options.cur.w,
			height: IWIN.Options.cur.h,
			dist_width: distw,
			dist_height: disth,
			onrendered: function(canvas) {
				var imgData = canvas.toDataURL("image/png");
				IWIN.Request.snapBigPageReq(IWIN.Options.cur.page,imgData);
			}
		});
	},
    sunsmgQ : function(rs){
    	if(rs!=''){
    		var el0 = document.getElementsByClassName("loading0")[0];
        	var el1 = document.getElementsByClassName("loading1")[0];
        	el0.parentNode.removeChild(el0);
        	el1.parentNode.removeChild(el1);

        	$.ajax({
    			type : "GET",
    			cache : false,
    			url : IWIN.serverIp + "/ManagementCenter/playplan/PlayPlan_updatePlayPlanQ.do?prid="+IWIN.Options.cur.program,
    			async:false,
    			success : function(data) {
    				if(0==data){
    					alert("发布成功");
//    					window.location.href = IWIN.serverIp + '/ManagementCenter/project/Project_quickReplaceHome.do?module=QuickReplace&signre=0';
    					var hre = '';  // 标志：快速更新从哪个地方进来的  快速更新列表是0   播放管理列表是1 
    					if(IWIN.util.byId('ent').value=='1'){
    						hre = IWIN.serverIp + '/ManagementCenter/playplan/PlayPlan_home.do?module=PlayPlan';
    					}else{
    						hre = IWIN.serverIp + '/ManagementCenter/project/Project_quickReplaceHome.do?module=QuickReplace';
    					}
    					location.replace(hre);
    				}
    				else{
    					
    				}
    			},
    			error : function() {
    				$.messager.alert('错误', '程序进行出现错误', 'error');
    			}
    		});
    	}
    },
    sunsmg : function (rs){
    	if(rs!=''){
    		var el0 = document.getElementsByClassName("loading0")[0];
        	var el1 = document.getElementsByClassName("loading1")[0];
        	el0.parentNode.removeChild(el0);
        	el1.parentNode.removeChild(el1);
    		
        	var audit=false;
        	$.ajax({
    			type : "GET",
    			cache : false,
    			url : IWIN.serverIp + "/ManagementCenter/project/Project_isProAuditOpen.do",
    			async:false,
    		    complete: function(){
    		    },
    			success : function(data) {
    				if("yes"==data){
    					audit=true;
    				}
    				else{
    				}
    			},
    			error : function() {
    				$.messager.alert('错误', '程序进行出现错误', 'error');
    			}
    		});
    		
        	//if(rs.split("@")[0] == '2'){ // 2 表示是开启审核的状态
        	if(audit){ 	
        	
        	//if(rs.split("@")[0] == '2'){ // 2 表示是开启审核的状态
    			 /*if(confirm("是否结束编辑？提交审核。")){
      			 // 返回首页
      			 window.location.href = IWIN.serverIp + '/ManagementCenter/project/Project_home.do?module=Project&signre=0';
      			 return;
	      		 }else{
	          		 return;
	          	 }*/
	      		 alert("节目已经提交审核！");
    		}
    		else{
    			var grade = 0;
    			var campus = 0;
    			sig = true;//解决 点击多次发布按钮  会多次弹框的现象
           	 	//弹出confirm类型的框  “发布成功！是否立即播放？”  “确定”-->继续选择设备   “取消”-->就此结束
            	if(confirm("发布成功！是否立即播放？")){
            		// 权限检查
            		$.ajax({
            			type : "GET",
            			cache : false,
            			url : IWIN.serverIp + "/ManagementCenter/playplan/PlayPlan_checkInsModule.do",
            			async:false,
            			success : function(data) {
            				// 说明有插播节目的权限
            				grade = data;
            			},
            			error : function() {
            				$.messager.alert('错误', '程序进行出现错误', 'error');
            			}
            		});
            		$.ajax({
            			type : "GET",
            			cache : false,
            			url : IWIN.serverIp + "/ManagementCenter/playplan/PlayPlan_checkPriinseModule.do",
            			async:false,
            			success : function(data) {
            				// 说明有优先插播节目的权限
            				campus = data;
            			},
            			error : function() {
            				$.messager.alert('错误', '程序进行出现错误', 'error');
            			}
            		});
            		
            		IWIN.MdDeDialog.open('../../../resource/ResourceFile_devHomeIndex.do?type=-1&grade='+grade+'&campus='+campus,
                			function(win){
                				var bl = win.nextStep();
                				IWIN.Controller.snapPage();
    		                    return bl;
    		                },
    		                function(){
    		                    //close
    		                	sig = false;//解决 点击多次发布按钮  会多次弹框的现象
    		                },
    		            	function(win){
    		                   win.prevStep();
    		                   return;
    		                },
    		            	function(win){
    		                	var cl = win.saveOrUpdate(rs.split("@")[1]);
    		                	IWIN.Controller.snapPage();
    		                    return cl;
    		                },
    		                function(win){
    		                	//完成操作
    		                	 return;
	     		            },
	     		            //普通节目提交操作
    		                function(win){
	     		            	win.updateProjectVal(rs.split("@")[1]);
	     		            	var cl = win.directplay();
    		                	return  cl;
	     		            }
                	);
           	 	}else{
           	 		sig = false;//解决 点击多次发布按钮  会多次弹框的现象
           	 	}
       	}
      }
    },
    beginquery:	function (){
		console.info("in query ...");
		var url=IWIN.serverIp + "/ManagementCenter/project/Project_queryState.do";
		$.ajax({
			type : "GET",
			cache : false,
			url : url,
			async:false,
			data:{
				uuid:uuid
			},
		    complete: function(){
		    },
			success : function(data) {
				var d = data;
				if(data.indexOf("finish")>-1){
					console.info("finish。。。。");
					var ps = '';
					if(IWIN.util.byId('quick').value=='1'){
						var index = IWIN.util.byId('indexportIndexQ').value;
						window.clearInterval(index); //移除定时器
						ps = document.getElementById("stateQ").value;
						if(ps == ''){
							ps = '1';
						}
						IWIN.Controller.sunsmgQ(ps+"@"+d.split("finish_")[1]);
						IWIN.Request.controlFlag(uuid,"remove");
					}else{
						var index = IWIN.util.byId('indexportIndex').value;
						window.clearInterval(index); //移除定时器
						ps = document.getElementById("state").value;
						if(ps == ''){
							ps = '1';
						}
						IWIN.Controller.sunsmg(ps+"@"+d.split("finish_")[1]);
						IWIN.Request.controlFlag(uuid,"remove");
					}
				}
				else{
				}
			},
			error : function() {
				$.messager.alert('错误', '程序进行出现错误', 'error');
			}
		});
	}
};