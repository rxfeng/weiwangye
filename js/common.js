//var _type = "app";
var _type = "web";
//公共的
$(document).on("tap","[data-item = 'forword']",function(){
	var $this= $(this);
	var _fn = $this.attr("data-fn");      //跳转那个页面的标识
	if(_type == "app"){
		appfun(this,_fn);
		api.showProgress({
		    title: '努力加载中...',
		    text: '先喝杯茶...'
		});
		setTimeout(function(){
			api.hideProgress();
		},2000)
	}else{
		var a = webfun(this);
		if(a!=false){
			if($this.attr("data-url")==""){
				return;
			}else{
				window.location = $this.attr("data-url");
			}
		}
	}
});
//cookie 一个存 一个取
function setCookies(name,value){
   var Days = 360; //此 cookie 将被保存 360 天
   var exp= new Date();     //new Date("December 31, 9998");
   exp.setTime(exp.getTime() + Days*24*60*60*1000);
   document.cookie = name + "="+ escape(value) +";expires="+ exp.toGMTString();
// document.cookie = name + "="+ escape(value) +";expires="+ new Date((new Date()).getTime() + hours * 3600000);   //永久保存
}
function getCookies(name){
   var arr = document.cookie.match(new RegExp("(^| )"+name+"=([^;]*)(;|$)"));
   if(arr != null) return unescape(arr[2]); return null;
}

//换肤
var skinInt = 2;

function one(){
	var skinOne = new auiSkin({
		name:"skin1",
		skinPath:'../css/skin-1.css',
	    default:false
	});
//	skinTwo.removeSkin();
	skinOne.setSkin();
	$($('#footer>div')[0]).children().attr('src','../img/voice.png');   
    $($('#footer>div')[2]).children().attr('src','../img/send.png');
    skinInt = 1;
}

function two(){
	var skinTwo = new auiSkin({
		name:"skin2",
		skinPath:'../css/skin-2.css',
	    default:false
	});
	skinTwo.setSkin();
	$($('#footer>div')[0]).children().attr('src','../img/voice-1.png');   
    $($('#footer>div')[2]).children().attr('src','../img/send-1.png');
    skinInt = 2;
}

function three(){
	var skinThree = new auiSkin({
		name:"skin3",
		skinPath:'../css/skin-3.css',
	    default:false
	});
	skinThree.setSkin();
	$($('#footer>div')[0]).children().attr('src','../img/voice-3.png');   
    $($('#footer>div')[2]).children().attr('src','../img/send-3.png');
    skinInt = 3;
}

if(skinInt==1){
	one();
}else if(skinInt==2){
	two();
}else if(skinInt==3){
	three();
}
//	手机号验证
function checkMobile(s){  
    var length = s.length;  
    if(length == 11 && /^(((13[0-9]{1})|(15[0-9]{1})|(18[0-9]{1})|(14[0-9]{1})|)+\d{8})$/.test(s) )  
    {  
        return true;  
    }else{  
        return false;  
    }  
} 