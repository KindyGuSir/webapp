<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2017/1/5
  Time: 9:49
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/global.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/style/global/iframeglobal.css">
  <link rel="stylesheet" href="${pageContext.request.contextPath}/style/proweruser/nprograme.css">
</head>
<body>
<!-- 弹框盒子 -->
<div class="alertBox">
  <!-- title -->
  <!-- 新建节目 -->
  <!-- content -->
  <div class="alert-con clearfix">



    <div class="conbox">
      <form class="protab" action="">
        <div>
          <p>节目名称:</p>
          <input id = "promName" type="text" name="" value="">
        </div>
        <div>
          <p>设置比例:</p>
          <select id="selt" name="set">
            <option value="16:10">16 : 10</option>
            <option value="16:9">16 : 9</option>
            <option value="4:3">4 : 3</option>
            <option value="0">自定义</option>
          </select>
          <p>
            <span id="hidep" style="display: none">
              <input placeholder="宽:" class="hideinput hideinputW" type="text">
              <input placeholder="高:" class="hideinput hideinputH" type="text">
            </span>
          </p>
        </div>
        <div>
          <p>备注:</p>
          <textarea name="" maxlength="45"></textarea>
          <p>(最多45个汉字)</p>
        </div>
        <div>
          <button type="submit" onclick="newProm()">确定</button>
          <a href="javascript:cancle()">取消</a>
        </div>
      </form>
    </div>



  </div>
</div>
</body>
</html>
<script src="${pageContext.request.contextPath}/js/jquery-3.1.1.min.js"></script>
<script src="${pageContext.request.contextPath}/js/layer/layer.min.js"></script>
<script>
  $('#selt').change(function(){
    if($(this).val() == '0'){
      $('#hidep').show(500);
    }else{
      $('#hidep').hide(500);
    }
  });
  $('.hideinput').keyup(function(){
    var c=$(this);
    if(/[^\d]/.test(c.val())){//替换非数字字符
      var temp_amount=c.val().replace(/[^\d]/g,'');
      $(this).val(temp_amount);
    }
    if(this.value.length>4){
      this.value=this.value.substr(0,4);
    };
    this.value=this.value.replace(/[^\d]/g,'');
  });
  $('.hideinput').blur(function(){
    // 宽高不为空时 执行添加 修改
    if($('.hideinput:eq(0)').val() != "" &&  $('.hideinput:eq(1)').val() != "") {
      // 获取option 长度
      var optionLength = $('#selt option').length;
      var W = $('.hideinputW').val();
      var H = $('.hideinputH').val();
      // 只能有5个option
      if (optionLength < 5){
        var $htmlOption = $("<option value='"+ W +" : "+H +"' selected>"+ W +" : "+H +"</option>");
        $('#selt > option:last-child').after($htmlOption);
      }else{
        $('#selt > option:last-child').val(W+" : "+H);
        $('#selt > option:last-child').html(W+" : "+H);
      };
    };
  });
  function cancle(){
    parent.layer.closeAll();
  }
  //新建节目
  function newProm(){
    var promName = $("#promName").val();
    var selt = $("#selt").val();
    var remarks = $("#remarks").val();
    var rootpath = $("#root_path", window.parent.document).val();
    var nlong = "";
    var nwide = "";
    if(promName.length<1){
      layer.msg("名称不能为空");
      return;
    }
    if(selt.length<1){
      layer.msg("请设置分辨率");
      return;
    }
    var list = selt.split(":");
    parent.window.location.href=rootpath+"/program/Program_add.do?nLong="+list[0]+"&nWide="+list[1]+"&pName="+promName;
//    $.post(rootpath+"/program/Program_add.do",{
//      nLong:list[0],
//      nWide:list[1],
//      pName:promName
//    },function(data){
//    });
  }
</script>
</html>
