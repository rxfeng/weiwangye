//	换肤
	if(10>11){
			var css=document.createElement("link");
		    css.href = "../css/skin-1.css";
		    css.rel = "stylesheet";
		    css.type = "text/css";
		    document.getElementsByTagName('head').item(0).appendChild(css); 
		    //		    换底部图片
        	$($('#footer>div')[0]).children().attr('src','../img/voice-1.png')   
        	$($('#footer>div')[2]).children().attr('src','../img/send-1.png') 
	}