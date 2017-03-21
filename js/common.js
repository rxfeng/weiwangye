//var _type = "app";
var _type = "web";
//公共的
$(document).on("tap","[data-item = 'forword']",function(){
	var $this= $(this);
	var _fn = $this.attr("data-fn");      //跳转那个页面的标识
	if(_type == "app"){
		forward(this,_fn);
	}else{
		subfun(this);
		if($this.attr("data-url")==""){
			return;
		}else{
			window.location = $this.attr("data-url");
		}
	}
});
