/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 13-12-13
 * Time: 下午2:28
 * To change this template use File | Settings | File Templates.
 */

var IWIN = IWIN || {};
IWIN.Options = {
    el : {
        leftMenuBox :  IWIN.util.byId('left_menu_box'),
        leftPageBox :  IWIN.util.byId('left_page_box'),
        mainBox : IWIN.util.byId('main_box'),
        mainBoxIn : IWIN.util.byId('main_box_inner'),
        pageBoxIn : IWIN.util.byId('left_page_inner'),
        pgDragHint : IWIN.util.byId('page_drag_hint'),
        prptBar : IWIN.util.byId('property_bar'),
        editElMask : IWIN.util.isIE()?IWIN.util.byId('editEle_mask_2'):IWIN.util.byId('editEle_mask_1'),
        ctrEleMask : IWIN.util.byId('ctrlEle_mask'),
        delElsDiv : IWIN.util.byId('deleted_els'),
        cutElsDiv : IWIN.util.byId('cut_els'),
        delPgsDiv : IWIN.util.byId('deleted_pgs'),
        baslineH : IWIN.util.byId('baseline_horizontal_1'),
        baslineH_2 : IWIN.util.byId('baseline_horizontal_2'),
        baslineV : IWIN.util.byId('baseLine_vertical_1'),
        baslineV_2 : IWIN.util.byId('baseLine_vertical_2'),
        layerBox : IWIN.util.byId('mylayer'),
        layerTable : IWIN.util.byId('layertable'),
        compGrpList : IWIN.util.byId('comp_group_list'),
        compPnlList : IWIN.util.byId('comp_panel_list'),
        layerLocktable : IWIN.util.byId('layerLocktable'), // 在普通编辑页面  如果部件处于锁定状态 则右键只允许进行 锁定 解锁两个操作    update 20150130
        layerQtable : IWIN.util.byId('layerQtable'),  // 快速编辑页面 右键菜单（置顶 置底 上移一层 下移一层）   update 20150205
        mainb : IWIN.util.byId('mainb'),
        flash_video_stream_count:1,//单个页面flash、视频、直播数量
        streamCount:1, // 单个节目中流媒体数量
        videoCount:1,  // 单个节目中视频数量
        swipeCount:1, // 单个节目中轮播图数量 (3选1)；
        eworksCount:1, // 单个节目中主题展示数量
        swipeImageCount:20, //  每个轮播图中可加入图片的数量
        eworkDocCount:50, // 每个主题展示区域可加入的文档数量
        activityCount:5  //单个节目中班级动态展示数量  add by haoyc 班级动态 20160606
    },
    eClass : {
        leftMenuItem : 'item',
        leftMenuGroup : 'group',
        leftMenuCheck : 'check',
        pageItem : 'item',
        pgItemIn : 'item_inner',
        pageImg :'page_img',
        pageFoot : 'page_footer',
        pageTime : 'page_time',
        pageTimeSet : 'page_time_set',
        pageTimeEdit : 'page_time_edit',
        pageCheck : 'check',
        editBlock : 'item',
        editElMask : 'editEle_mask',
        ctrElMask : 'ctrlEle_mask',
        TL_rszEl : 'editEle_TL_resize',
        T_rszEl : 'editEle_T_resize',
        L_rszEl : 'editEle_L_resize',
        BL_rszEl : 'editEle_BL_resize',
        B_rszEl : 'editEle_B_resize',
        TR_rszEl : 'editEle_TR_resize',
        R_rszEl : 'editEle_R_resize',
        BR_rszEl : 'editEle_BR_resize',
        pagePre:'page_pre'
    },
    eID : {
        leftMenuBox : 'left_menu_box'
    },
    btn : {
        'button_undo':'CMD_UNDO',
        'button_redo':'CMD_REDO',
        'button_del_blk':'CMD_BLOCK_DEL',
        'button_cut_blk':'CMD_BLOCK_CUT',
        'button_copy_blk':'CMD_BLOCK_COPY',
        'button_paste_blk':'CMD_BLOCK_PASTE',
        'button_align_top':'CMD_BLOCK_ALIGN_TOP',
        'button_align_bottom':'CMD_BLOCK_ALIGN_BOTTOM',
        'button_align_left':'CMD_BLOCK_ALIGN_LEFT',
        'button_align_right':'CMD_BLOCK_ALIGN_RIGHT',
        'button_align_horizontal':'CMD_BLOCK_ALIGN_HORIZONTAL',
        'button_align_vertical':'CMD_BLOCK_ALIGN_VERTICAL',

        'button_level_top' :'CMD_BLOCK_LEVEL_TOP',
        'button_level_bottom' :'CMD_BLOCK_LEVEL_BOTTOM',
        'button_level_up' :'CMD_BLOCK_LEVEL_UP',
        'button_level_down' :'CMD_BLOCK_LEVEL_DOWN',

        'button_baseline_no':'CMD_BASELINE_NO',
        'button_baseline_yes':'CMD_BASELINE_YES',
        'button_resource':'CMD_RESOURSE',
        'create_page':'CMD_CREATE_PAGE',
        'delete_page':'CMD_DELETE_PAGE',
        'copy_page':'CMD_COPY_PAGE',
        'page_preview':'CMD_PAGE_PREVIEW',
        'program_preview':'CMD_PROJECT_PREVIEW',
        'program_publish':'CMD_PROJECT_PUBLISH',
        'program_template':'CMD_PROJECT_TEMPLATE',
        'page_rate_custom':'CMD_PROJECT_PAGERATECUSTOM',
        'program_open':'CMD_PROJECT_OPEN',
        'program_open_Q':'CMD_PROJECT_OPEN_Q',
        'program_new':'CMD_PROJECT_NEW',
        'program_update':'CMD_PROJECT_UPDATE',//局部更新
        /*以下的18的键值对,是新版（点击工具栏的元素小图标，不再是拖拽效果，换成点击效果，如果想还原拖拽效果，请屏蔽此处）的节目制作      begin  */
        'button_resource_text':'CMD_NEW_BLOCK_TEXT',
        'button_resource_image':'CMD_RESOURSE_IMAGE',
        'button_resource_ppt':'CMD_RESOURSE_PPT',
        'button_resource_flash':'CMD_RESOURSE_FLASH',
        'button_resource_video':'CMD_RESOURSE_VIDEO',
        'button_resource_flowvideo':'CMD_NEW_BLOCK_FLOWVIDEO',
        'button_resource_webn':'CMD_NEW_BLOCK_WEB',
        'button_resource_rectangle':'CMD_NEW_BLOCK_RECTANGLE',
        'button_resource_horizontaline':'CMD_NEW_BLOCK_HORIZONTALINE',
        'button_resource_verticalline':'CMD_NEW_BLOCK_VERTICALLINE',
        'button_resource_piano':'CMD_NEW_BLOCK_PIANO',
        'button_resource_wander':'CMD_NEW_BLOCK_WANDER',
        'button_resource_swepe':'CMD_NEW_BLOCK_SWEPE',
        'button_resource_3D':'CMD_NEW_BLOCK_3D',
        'button_resource_timen':'CMD_NEW_BLOCK_TIME',
        'button_resource_weather1':'CMD_NEW_BLOCK_WEATHER',
        'button_resource_goodplay':'CMD_NEW_BLOCK_GOODPLAY',
        'button_resource_curricula':'CMD_NEW_BLOCK_CURRICULA',
        'button_resource_countdown':'CMD_NEW_BLOCK_COUNTDOWN', // 倒计时 add 20150519
        'button_resource_classdynamics':'CMD_NEW_BLOCK_CLASSDYNAMICS', // 动态  add 20150728
        'button_resource_notice':'CMD_NEW_BLOCK_NOTICE', // 公告   add 20150729
        'button_resource_attendance':'CMD_NEW_BLOCK_ATTENDANCE', // 考勤   add 20151015
        'button_resource_back':'CMD_NEW_BLOCK_BACK',//浏览器后退 add zhanghongbin
        'button_resource_link':'CMD_NEW_BLOCK_LINK',
        'button_resource_activity':'CMD_NEW_BLOCK_ACTIVITY',//add by haoyc 班级活动 20160602
        'button_resource_honor':'CMD_NEW_BLOCK_HONOR',//add by haoyc 班级荣誉 20160627
        'button_resource_udefined':'CMD_NEW_BLOCK_UDEFINED',//add by haoyc 自定义组件 20160704
        'button_resource_rankmoraledu':'CMD_NEW_BLOCK_RANKMORALEDU',//add by caoqian 德育排名 20160711
        'button_resource_task':'CMD_NEW_BLOCK_TASK',//add by haoyc 作业布置 20160712
        'button_resource_newattendance':'CMD_NEW_BLOCK_NEWATTENDANCE'//add by haoyc 班级考勤 20160727
        /*以下的18的键值对,是新版（点击工具栏的元素小图标，不再是拖拽效果，换成点击效果，如果想还原拖拽效果，请屏蔽此处）的节目制作      begin  */
    },
    menuItem : {
        '1':{w:287,h:142,prp:'page/property/imgProperty.html',mnClass:'comp_item_1'},
        '2':{w:176,h:132,prp:'page/property/videoProperty.html',mnClass:'comp_item_2'},
        '3':{w:200,h:200,prp:'page/property/rectProperty.html',mnClass:'comp_item_3'},
        '4':{w:299,h:199,prp:'page/property/AccordionSimpleProperty.html',mnClass:'comp_item_4'},
        '5':{w:200,h:10,prp:'page/property/textProperty.html',mnClass:'comp_item_5'},
        '6':{w:200,h:10,prp:'page/property/horizonLineProperty.html',mnClass:'comp_item_6'},
        '7':{w:200,h:200,prp:'page/property/verticalLineProperty.html',mnClass:'comp_item_7'},
        '8':{w:200,h:200,prp:'page/property/AccordionSimpleProperty.html',mnClass:'comp_item_8'},
        '18':{w:200,h:200,prp:'page/property/NewPptProperty.html',mnClass:'comp_item_8'},
        '9':{w:497,h:301,prp:'page/property/AccordionProperty.html',mnClass:'comp_item_9'},
        '10':{w:300,h:185,prp:'page/property/AccordionSimpleProperty.html',mnClass:'comp_item_10'},
        '11':{w:400,h:300,prp:'page/property/flashProperty.html',mnClass:'comp_item_11'},
		'12':{w:400,h:300,prp:'page/property/pptProperty.html',mnClass:'comp_item_12'},
		'13':{w:400,h:300,prp:'page/property/linkProperty.html',mnClass:'comp_item_13'},
		'14':{w:400,h:300,prp:'page/property/streamProperty.html',mnClass:'comp_item_14'},
		'15':{w:300,h:169,prp:'page/property/eWorksProperty.html',mnClass:'comp_item_15'},
		'16':{w:145,h:62,prp:'page/property/time1Property.html',mnClass:'comp_item_16'},
		'19':{w:118,h:62,prp:'page/property/weather1Property.html',mnClass:'comp_item_19'},
		'22':{w:567,h:472,prp:'page/property/courseListProperty.html',mnClass:'comp_item_22'},
        '25':{w:200,h:50,prp:'page/property/text2Property.html',mnClass:'comp_item_25'},
        '26':{w:100,h:60,prp:'page/property/countdownProperty.html',mnClass:'comp_item_26'},
        '27':{w:100,h:60,prp:'page/property/ClassDynamics.html',mnClass:'comp_item_27'},
        '28':{w:100,h:60,prp:'page/property/Notice.html',mnClass:'comp_item_28'},
        '29':{w:100,h:60,prp:'page/property/Attendance.html',mnClass:'comp_item_29'}, //add 20151015-hwx
        '30':{w:287,h:142,prp:'page/property/imageLinkProperty.html',mnClass:'comp_item_30'}, //add 20151015-zhanghongbin
        '31':{w:287,h:142,prp:'page/property/backProperty.html',mnClass:'comp_item_31'}, //add 20151015-zhanghongbin
        '32':{w:567,h:472,prp:'page/property/Activity.html',mnClass:'comp_item_32'}, //add by haoyc 班级活动 20160602
        '33':{w:567,h:232,prp:'page/property/Honor.html',mnClass:'comp_item_33'}, //add by haoyc 班级荣誉 20160627
        '34':{w:567,h:472,prp:'page/property/Udefined.html',mnClass:'comp_item_34'}, //add by haoyc 自定义组件 20160704
        '35':{w:262,h:472,prp:'page/property/Rankmoraledu.html',mnClass:'comp_item_35'}, //add by caoqian 德育排名组件 20160711
        '36':{w:262,h:472,prp:'page/property/Task.html',mnClass:'comp_item_36'}, //add by haoyc 作业布置 20160712
        '37':{w:567,h:232,prp:'page/property/NewAttendance.html',mnClass:'comp_item_37'} //add by haoyc 班级考勤 20160727
},
    cur : {
        program : IWIN.util.getQueryString('prid'),
        page : '1',
        w : 720,
        h :540
    },
    comp_map : {},
    cmd_map : {},
    view : {
        scale : 1.0
    }
};
