//toggle page
var nav = document.getElementById('left-navs');
var lis = nav.getElementsByTagName('li');

var leftNav = document.getElementById('left-navs');
var uls = leftNav.getElementsByTagName('ul');
var control = document.getElementById('control');
var contLis = control.getElementsByTagName('li');
var tit = document.getElementById('tit');




//iframe 切换
function targetRight(trUrl){
	var iframe = document.getElementsByTagName('iframe')[0];
	iframe.src = trUrl;
}
for (i = 0; i < lis.length; i++) {
	lis[i].value = i; //下标
	lis[i].onclick = function() {
		//li css
		for (j = 0; j < lis.length; j++) {
			lis[j].getElementsByTagName('span')[0].className = '';
		}
		this.getElementsByTagName('span')[0].className = 'active';
	}
}

//二级栏目切换
for (i = 0; i < contLis.length; i++) {
	contLis[i].id = i;
	contLis[i].onclick = function() {
		for (j = 0; j < contLis.length; j++) {
			contLis[j].className = "";
			uls[j].style.display = "none";
		}
		this.className = "top-select";
		uls[this.id].style.display = "block";
		uls[this.id].getElementsByTagName('span')[0].click();

		tit.innerHTML = this.getElementsByTagName('a')[0].innerHTML;
	}

}

//初始显示页面
contLis[0].click();