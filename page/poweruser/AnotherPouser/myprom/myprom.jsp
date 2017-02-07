<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/1/4
  Time: 11:01
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>我的节目</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/iframeglobal.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/top-btm.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/style/proweruser/AnotherProwuser/myprom.css">
</head>
<body>
<input type="hidden" value="${pageContext.request.contextPath}" id="root_path">
<!-- top -->
<div class="top clearfix">
  <div class="shy">
    <div class="logo">
      <img class="logoimg" src="${pageContext.request.contextPath}/imgs/tplogo.png" alt="">
      <h1 class="tit">互动视窗系统</h1>
    </div>
    <div class="top-con">
      <div class="top-tit">
        <ul class="prom-title">
          <li><a href="../../../poweruser/AnotherPouser/myprom/myprom.html">我的节目</a></li>
          <li><a href="../../../poweruser/AnotherPouser/release/release.html">发布管理</a></li>
          <li><a href="../../../poweruser/AnotherPouser/publicprom/publicprom.html">公共节目</a></li>
          <li><a href="../../../poweruser/AnotherPouser/promsearch/promsearch.html">播单查询</a></li>
          <li><a href="../../../poweruser/AnotherPouser/unicastnotice/unicastnotice.html">通知管理</a></li>
          <li><a href="../../../poweruser/AnotherPouser/devicecontrol/devicecontrol.html">设备控制</a></li>
        </ul>
      </div>
      <div class="singleout">
        当前用户:
					<span>
						设备管理员
						<span class="selectybtn">
						</span>
					</span>
        <div id="singleOutBox" class="singleOutBox">
          <div><a href="javascript:">个人资料</a></div>
          <div><a href="javascript:">帮助中心</a></div>
          <div><a class="outuser" href="javascript:">注销</a></div>
        </div>
      </div>
    </div>
  </div>
</div>




<div class="bottom-box">
  <!-- 按钮 -->
  <div class="btn">
    <a href="javascript:void(0)" id="new_prom">创建新节目</a>
    <span class="btnmu">
	    <a class="delete" href="##" title="分享到公共节目">分享</a>
	    <a class="delete" href="##" title="复制">复制</a>
	    <a class="delete" href="##" title="删除">删除</a>
	  </span>
		<span class="btn-right">
			<input class="search" type="text" placeholder="按名称搜索">
			<img class="search-img" src="../../../../imgs/search.png" alt="">
		</span>
  </div>
  <!-- 标题 -->
  <div class="tits clearfix">
    <h3 class="mytit">我的节目</h3>
    <span>3页，共22个节目</span>
  </div>
  <!-- 节目 -->
  <div class="prom clearfix">
    <div class="check">
      <span><input class="checkall" type="checkbox">全选</span>
      <span>
					<label for="import">导入</label>
					<input type="file" id="import">
					<a href="javascript:">导出</a>
			</span>
    </div>
    <!-- 图片 -->
    <ul class="imgs clearfix">
      <li>
          <div class="img-box">
            <img src="../../../../imgs/u32.png" alt="">
            <img class="alreadyfb" src="../../../../imgs/u126.png" alt="">
            <div class="hover-box">
              <a href="../../../editor/index.html">编辑</a>
              <a href="javascript:">重命名</a>
              <a href="javascript:">预览</a>
              <a href="alert.html">重新发布</a>
            </div>
            <input type="checkbox">
          </div>
          <div>六一儿童节</div>
          <!-- 重命名 -->
          <div class="rempname">
            <input type="text" value="六一儿童节">
            <a href="javaScript:" title="确定"></a>
            <a href="javaScript:" title="取消"></a>
          </div>
        </li>
      <li>
          <div class="img-box">
            <img src="../../../../imgs/u32.png" alt="">
            <img class="alreadyfb" src="../../../../imgs/u126.png" alt="">
            <div class="hover-box">
              <a href="../../../editor/index.html">编辑</a>
              <a href="javascript:">重命名</a>
              <a href="javascript:">预览</a>
              <a href="alert.html">重新发布</a>
            </div>
            <input type="checkbox">
          </div>
          <div>六一儿童节</div>
          <!-- 重命名 -->
          <div class="rempname">
            <input type="text" value="六一儿童节">
            <a href="javaScript:" title="确定"></a>
            <a href="javaScript:" title="取消"></a>
          </div>
        </li><li>
          <div class="img-box">
            <img src="../../../../imgs/u32.png" alt="">
            <img class="alreadyfb" src="../../../../imgs/u126.png" alt="">
            <div class="hover-box">
              <a href="../../../editor/index.html">编辑</a>
              <a href="javascript:">重命名</a>
              <a href="javascript:">预览</a>
              <a href="alert.html">重新发布</a>
            </div>
            <input type="checkbox">
          </div>
          <div>六一儿童节</div>
          <!-- 重命名 -->
          <div class="rempname">
            <input type="text" value="六一儿童节">
            <a href="javaScript:" title="确定"></a>
            <a href="javaScript:" title="取消"></a>
          </div>
        </li><li>
          <div class="img-box">
            <img src="../../../../imgs/u32.png" alt="">
            <img class="alreadyfb" src="../../../../imgs/u126.png" alt="">
            <div class="hover-box">
              <a href="../../../editor/index.html">编辑</a>
              <a href="javascript:">重命名</a>
              <a href="javascript:">预览</a>
              <a href="alert.html">重新发布</a>
            </div>
            <input type="checkbox">
          </div>
          <div>六一儿童节</div>
          <!-- 重命名 -->
          <div class="rempname">
            <input type="text" value="六一儿童节">
            <a href="javaScript:" title="确定"></a>
            <a href="javaScript:" title="取消"></a>
          </div>
        </li><li>
          <div class="img-box">
            <img src="../../../../imgs/u32.png" alt="">
            <img class="alreadyfb" src="../../../../imgs/u126.png" alt="">
            <div class="hover-box">
              <a href="../../../editor/index.html">编辑</a>
              <a href="javascript:">重命名</a>
              <a href="javascript:">预览</a>
              <a href="alert.html">重新发布</a>
            </div>
            <input type="checkbox">
          </div>
          <div>六一儿童节</div>
          <!-- 重命名 -->
          <div class="rempname">
            <input type="text" value="六一儿童节">
            <a href="javaScript:" title="确定"></a>
            <a href="javaScript:" title="取消"></a>
          </div>
        </li><li>
          <div class="img-box">
            <img src="../../../../imgs/u32.png" alt="">
            <img class="alreadyfb" src="../../../../imgs/u126.png" alt="">
            <div class="hover-box">
              <a href="../../../editor/index.html">编辑</a>
              <a href="javascript:">重命名</a>
              <a href="javascript:">预览</a>
              <a href="alert.html">重新发布</a>
            </div>
            <input type="checkbox">
          </div>
          <div>六一儿童节</div>
          <!-- 重命名 -->
          <div class="rempname">
            <input type="text" value="六一儿童节">
            <a href="javaScript:" title="确定"></a>
            <a href="javaScript:" title="取消"></a>
          </div>
        </li>
    </ul>
  </div>

  <div class="gopage">
    <div class="clearfix">
      <a class="nonepage" href="?id=">上一页</a>
      <a class="nowpage" href="?id=">1</a>
      <a href="?id=">2</a>
      <a href="?id=">3</a>
      <a href="?id=">4</a>
      <a href="?id=">5</a>
      <a href="?id=">6</a>
      <a href="?id=">7</a>
      <a href="?id=">8</a>
      <a href="?id=">下一页</a>
    </div>
  </div>
</div>


</body>
</html>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/test.js"></script>
<script src="${pageContext.request.contextPath}/js/function/poweruser/AnotherPouser/myprom/myprom.js"></script>
<script src="${pageContext.request.contextPath}/js/layer/layer.min.js"></script>
<script>
  //单击显示隐藏 userbox
  $(".selectybtn").bind("click",function(){
    if($("#singleOutBox").is(":hidden")){
      $(".selectybtn").css({"background-position":"0% 100%"});
      $("#singleOutBox").show();
    }else{
      $(".selectybtn").css({"background-position":"0% 0%"});
      $("#singleOutBox").hide();
    };
  });
  // 划过图片显示hover-box
  var imgs = $('.imgs').find('li').find('.img-box');
  imgs.each(function(){
    $(this).hover(function(){
      $(this).children('.hover-box').show();
    },function(){
      $(this).children('.hover-box').hide();
    });
  });
  // 点击图片添加boeder在点击取消border;
  $('.imgs').find('li').find('.img-box').each(function(){
    $(this).click(function(){
      if( $(this).children('input').prop('checked')  ){
        $(this).removeClass('addborder');
        $(this).children('input').prop('checked',false);
      }else{
        $(this).addClass('addborder');
        $(this).children('input').prop('checked',true);
      }
    });
  });
  // 全选点击选中所有节目
  $('.checkall').click(function(){
    if ( $(this).prop('checked') ){
    	$('.btn .btnmu').css({'visibility':'visible'});
      $('.imgs').find('li').find('.img-box').each(function(){
        $(this).addClass('addborder');
        $(this).children('input').prop('checked',true);
      })
    }else{
    	$('.btn .btnmu').css({'visibility':'hidden'});
      $('.imgs').find('li').find('.img-box').each(function(){
        $(this).removeClass('addborder');
        $(this).children('input').prop('checked',false);
      })
    }
  });
  //遍历所有节目盒子，如果全部选中时取消其中一个 全选按钮false掉， 如果盒子全部被选中时，全选按钮为true。
  $('.img-box').click(function(){
    checkInput();
  });
  function checkInput(){
    var numTrue = 0;
    $('.img-box input').each(function(){
      if($(this).prop("checked")){
        numTrue += 1;
      }
    });
    if(numTrue != $('.img-box input').length){
      $('.checkall').prop("checked",false);
    }else{
      $('.checkall').prop("checked",true);
    }

    if(numTrue == 0){
			$('.btn .btnmu').css({'visibility':'hidden'});
		}else{
			$('.btn .btnmu').css({'visibility':'visible'});
		};
  }
</script>
</html>
