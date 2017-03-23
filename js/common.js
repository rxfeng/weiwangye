var _type = "app";
//var _type = "web";
//公共的
$(document).on("tap","[data-item = 'forword']",function(){
	var $this= $(this);
	var _fn = $this.attr("data-fn");      //跳转那个页面的标识
	if(_type == "app"){
		forward(this,_fn);
	}else{
		var a = subfun(this);
		if(a!=false){
			if($this.attr("data-url")==""){
				return;
			}else{
				window.location = $this.attr("data-url");
			}
		}
	}
});
//换肤

function one(){
	var skinOne = new auiSkin({
		name:"skin1",
		skinPath:'../css/skin-1.css',
	    default:false
	});
//	skinTwo.removeSkin();
	skinOne.setSkin();
	$($('#footer>div')[0]).children().attr('src','../img/voice.png')   
    $($('#footer>div')[2]).children().attr('src','../img/send.png') 
}

function two(){
	var skinTwo = new auiSkin({
		name:"skin2",
		skinPath:'../css/skin-2.css',
	    default:false
	});
	skinTwo.setSkin();
	$($('#footer>div')[0]).children().attr('src','../img/voice-1.png')   
    $($('#footer>div')[2]).children().attr('src','../img/send-1.png') 
}

function three(){
	var skinThree = new auiSkin({
		name:"skin3",
		skinPath:'../css/skin-3.css',
	    default:false
	});
	skinThree.setSkin();
	$($('#footer>div')[0]).children().attr('src','../img/voice-3.png')   
    $($('#footer>div')[2]).children().attr('src','../img/send-3.png') 
}
var skinInt = 2;
if(skinInt==1){
	var skinOne = new auiSkin({
		name:"skin1",
		skinPath:'../css/skin-1.css',
	    default:false
	});
	skinOne.setSkin();
	$($('#footer>div')[0]).children().attr('src','../img/voice.png')   
    $($('#footer>div')[2]).children().attr('src','../img/send.png') 
}else if(skinInt==2){
	var skinTwo = new auiSkin({
		name:"skin2",
		skinPath:'../css/skin-2.css',
	    default:false
	});
	skinTwo.setSkin();
	$($('#footer>div')[0]).children().attr('src','../img/voice-1.png')   
    $($('#footer>div')[2]).children().attr('src','../img/send-1.png') 
}else if(skinInt==3){
	var skinThree = new auiSkin({
		name:"skin3",
		skinPath:'../css/skin-3.css',
	    default:false
	});
	skinThree.setSkin();
	$($('#footer>div')[0]).children().attr('src','../img/voice-3.png')   
    $($('#footer>div')[2]).children().attr('src','../img/send-3.png') 
}
