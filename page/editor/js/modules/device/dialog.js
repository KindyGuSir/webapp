/**
 * Created with JetBrains WebStorm.
 * User: hht
 * Date: 14-3-18
 * Time: 下午2:11
 * To change this template use File | Settings | File Templates.
 */
IWIN.MdDialog = {
    crEle : function (p){
        var el = document.createElement('div');
        p.appendChild(el);
        return el;
    },
    open : function (url,sureFn,closeFn){
    	
    	
        if(!this.dialog){
            this.dialog = this.crEle(document.body);
            this.dialog.style.cssText = "position:absolute;left:50%;top:55%;z-index:999;";

            this.mask = this.crEle(document.body);
            this.mask.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;background-color:rgba(0,0,0,0.3);z-index:99;";

            this.inner = this.crEle(this.dialog);
            this.inner.style.cssText = "position: fixed;margin-left:-350px;background-color:#ffffff;width:800px;"+"margin-top:"+(/*-553/2*/-400)+"px";
            
            this.closeBtn = this.crEle(this.inner);
            this.closeBtn.style.cssText = "position:absolute;width:15px;height:15px;border-radius:100px;top:10px;right:10px;z-index:50;font-size:28px;color:#FFFFFF;cursor:pointer;background:url("+"/ManagementCenter/images/project/04.png"+") no-repeat";
            this.closeBtn.innerHTML = '';
            this.closeBtn.title = '关闭';
            this.addEvents();
        }
        this.dialog.style.display = 'block';
        this.mask.style.display = 'block';
        this.closeFn = closeFn;
        

        var ifm = document.createElement('iframe');
        this.inner.insertBefore(ifm,this.btnBar);
        ifm.style.cssText = "width:800px;height:660px;overflow-x:hidden;overflow-y:hidden;overflow:hidden;border:none;";
        ifm.src = url;
    },
    close : function (){
        var ifm = this.inner.getElementsByTagName('iframe')[0];
        if(ifm){
            ifm.onload = null;
            this.inner.removeChild(ifm);
        }
        this.dialog.style.display = 'none';
        this.mask.style.display = 'none';
    },
    addEvents:function (){
        var that = this;
        this.closeBtn.onclick = function (){
            if(that.closeFn)that.closeFn();
            that.close();
        };
    }
};
