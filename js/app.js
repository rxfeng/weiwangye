(function(window) {
	var u = {};
    u.Voicemodule = function(obj,callback){
    	u.Voicemodule.callback = callback;
    	u.Voicemodule.obj = obj;
    	//加载页面结构
		var Voicehtml = '<div id="VoiceMain">'+	
							'<div id="Voice">'+
								'<div class="voicestart" type="stop">'+
									'<span class="voicesleft">松手播放</span>'+
									'<span class="voicesright">松手取消录音</span>'+
									'<span class="voicestext">按住说话</span>'+
									'<span class="voicesplaytime">00:00</span>'+
									'<div id="colorfulPulse">'+
										'<span class="item-1"></span>'+
										'<span class="item-2"></span>'+
										'<span class="item-3"></span>'+
										'<span class="item-4"></span>'+
										'<span class="item-5"></span>'+
										'<span class="item-6"></span>'+
										'<span class="item-7"></span>'+
										'<div id="voicestime">00:00</div>'+
										'<span class="item-7"></span>'+
										'<span class="item-6"></span>'+
										'<span class="item-5"></span>'+
										'<span class="item-4"></span>'+
										'<span class="item-3"></span>'+
										'<span class="item-2"></span>'+
										'<span class="item-1"></span>'+
									'</div>'+
									'<div id="voicerecord">'+
										'<i class="fa fa-microphone"></i>'+
									'</div>'+
//									'<div id="voiceplay">'+
//										'<i class="fa fa-pause"></i>'+
//									'</div>'+
//									'<div id="voicedel">'+
//										'<i class="fa fa-trash-o"></i>'+
//									'</div>'+
//									'<div id="voicesave">'+
//										'<i class="fa fa-save"></i>'+
//									'</div>'+

								'</div>'+
							'</div>'+
						'</div>';
    	$api.append($api.dom("body"),Voicehtml);
    	//主要对象声明
    	//界面对象
    	 var voiceUI = $api.dom("#VoiceMain");
    	 var voiceDel = $api.dom("#voicedel");
    	 var voicePlay = $api.dom("#voiceplay");
    	//对象绑定是否开启语音界面
    	$api.addEvt($api.dom(obj), 'click', function(){
    		//显示
			$api.toggleCls(voiceUI, 'active');
			//设置当前页面弹动
			api.setFrameAttr({
			    name: api.frameName,
			    bounces: $api.hasCls(voiceUI,"active")?false:true,
			});
			if($api.hasCls(this,"active")){
				var path = $api.attr(this,"path").split("=");
				u.Voicemodule.time = path[1];
				u.Voicemodule.temporarytime = path[1];
				var time =  u.Voicemodule_time_();
    			$api.html($api.dom(".voicesplaytime"),time);
    			u.Voicemodule.path = path[0];
    			u.Voicemodule.savepath = path[0];
    			$api.removeCls(voicePlay,"active");
		        $api.attr($api.dom(".voicestart"),"type","left");
    		}

		});
		//设置当前状态
    	u.Voicemodule.state = "stop";
    	//设置初始化时间
    	u.Voicemodule.time = 0;
    	//设置录音路径
    	u.Voicemodule.path = 'fs://voices/voices_'+u.returnstr(10)+'.amr';
    	
    	u.Voicemodule.savepath = "";
    	//初始化主要手势对象
		var hammer_trigger = new Hammer($api.dom("#voicerecord"));
		//录音绑定长按手势
		hammer_trigger.on("press", function (ev) {
			//开启录音UI视图
            $api.attr($api.dom(".voicestart"),"type","voices");
            //更改当前状态
            u.Voicemodule.state = "Voices";
            //开启计时器
            u.Voicemodule_time();
            //开始录音
            api.startRecord({
			    path: u.Voicemodule.path
			});
        });
        //当离开屏幕后
        hammer_trigger.on("pressup panend", function (ev) {
        	//结束计时器
        	clearInterval(u.Voicemodule_time_obj);
        	api.stopRecord(function( ret, err ){
			    if( ret ){
			    	u.Voicemodule.savepath = ret.path;
			    	u.Voicemodule_del()
			    	//播放时间
			    	u.Voicemodule.temporarytime = ret.duration;
			    	var time =  u.Voicemodule_time_();
			    	$api.html($api.dom(".voicesplaytime"),time);
			    	switch(true){
		            	case u.Voicemodule.state == "left":
		            		//执行播放
		            		$api.removeCls(voicePlay,"active");
		            		$api.attr($api.dom(".voicestart"),"type","left");
		            		break;
		            	case u.Voicemodule.state == "right":
		            		//执行删除
		            		$api.removeCls(voiceDel,"active");
		            		u.Voicemodule_del();
		            		break;
		            	case u.Voicemodule.state == "Voices":
		            		//未操作
		            		u.Voicemodule_hide();
		            		$api.addCls($api.dom(u.Voicemodule.obj),"active");
							$api.attr($api.dom(u.Voicemodule.obj),"path",u.Voicemodule.savepath+"="+u.Voicemodule.temporarytime);
		            		u.Voicemodule.callback(u.Voicemodule.savepath,u.Voicemodule.temporarytime);
		            		break;  
		            }
			    }
			//停止计时
			clearInterval(u.Voicemodule_time_obj);
			//初始并删除已存在录音
			u.Voicemodule_del();

			$api.removeCls($api.dom(u.Voicemodule.obj),"active");
			$api.attr($api.dom(u.Voicemodule.obj),"path","");
			    //初始化时间
	            //u.Voicemodule.time = 0;
	            //$api.html($api.dom("#voicestime"),"00:00");
	            //初始化状态
	            //u.Voicemodule.state = "stop";
			});
        });
        hammer_trigger.on("panmove", function (ev) {
        	
            switch(true){
            	case ev.center.x>api.winWidth/2 && (ev.center.x-api.winWidth/2)>40:
            	//向右滑动
            		ev.center.x2 = api.winWidth-50;
            		ev.center.y2 = api.winHeight-120;
            		//判断是否在圆内
            		var sta = u.Voicemodule_Centerdistance(ev.center);
            		
            		//更改ui效果
            		$api[sta?"addCls":"removeCls"](voiceDel,"active");
            		//更改当前状态
            		u.Voicemodule.state = sta?"right":"Voices";
            		$api.attr($api.dom(".voicestart"),"type",sta?"right":"voices");
            		break;
            	case ev.center.x<api.winWidth/2 && (ev.center.x-api.winWidth/2)<-40:
            	//向左滑动
            		ev.center.x2 = 50;
            		ev.center.y2 = api.winHeight-120;
            		//判断是否在圆内
            		var sta = u.Voicemodule_Centerdistance(ev.center);
            		//更改ui效果
            		$api[sta?"addCls":"removeCls"](voicePlay,"active");
            		//更改当前状态
            		u.Voicemodule.state = sta?"left":"Voices";
            		$api.attr($api.dom(".voicestart"),"type",sta?"left_":"voices");
            		break; 
            }
        });
		//播放录音
		$api.addEvt(voicePlay,"click",function (ev) {
			ev.stopPropagation();
			if(!$api.hasCls(voicePlay,"active")){
				//更新播放ui
				$api.addCls(voicePlay,"active");
				//恢复录音时间
				u.Voicemodule.time = u.Voicemodule.temporarytime;
				//播放录音
				u.Voicemodule.netAudio = api.require('netAudio');
		
				u.Voicemodule.netAudio.play({
				    path:u.Voicemodule.path
				},function( ret, err ){      
			
				   if(ret){
				   		u.Voicemodule.time = ret.duration - ret.current;
				   		var time = u.Voicemodule_time_();
    					$api.html($api.dom(".voicesplaytime"),time);
				   		
				   		if(ret.complete){
				   
				   			u.Voicemodule_stop();
				   		}
				   }
				});
				// api.startPlay({
				//     path: u.Voicemodule.path
				// },function( ret, err ){
				// 	//初始化播放ui
			 //    	u.Voicemodule_stop();
				// });
			}else{
				//初始化播放ui
				u.Voicemodule_stop();
				//停止播放
				// api.stopPlay();
				u.Voicemodule.netAudio.stop();
			}
			
		})
		//删除录音
		$api.addEvt($api.dom("#voicedel"),"click",function (ev) {
			ev.stopPropagation();
			//停止计时
			clearInterval(u.Voicemodule_time_obj);
			//初始并删除已存在录音
			u.Voicemodule_del();

			$api.removeCls($api.dom(u.Voicemodule.obj),"active");
			$api.attr($api.dom(u.Voicemodule.obj),"path","");
		})
		//保存录音
		$api.addEvt($api.dom("#voicesave"),"click",function (ev) {
			ev.stopPropagation();
			//初始化并隐藏视图界面
			u.Voicemodule_hide();

			$api.addCls($api.dom(u.Voicemodule.obj),"active");
			$api.attr($api.dom(u.Voicemodule.obj),"path",u.Voicemodule.savepath+"="+u.Voicemodule.temporarytime);
			//回调返回路径
			u.Voicemodule.callback(u.Voicemodule.savepath,u.Voicemodule.temporarytime);
		})
		//关闭视图界面
		$api.addEvt(voiceUI,"click",function (ev) {
			//初始化并隐藏视图界面
			u.Voicemodule_hide();
		})
		//bug
		$api.addEvt($api.dom("#Voice"),"click",function (ev) {
			ev.stopPropagation();
		})
    }
    //初始化并隐藏视图
    u.Voicemodule_hide = function(){
    	clearInterval(u.Voicemodule_time_obj);
    	//
    	u.Voicemodule.time = 0;
    	$api.html($api.dom("#voicestime"),"00:00");
    	$api.html($api.dom(".voicesplaytime"),"00:00");
    	//从新生成路径
    	u.Voicemodule.path = 'fs://voices/voices_'+u.returnstr(10)+'.amr';
    	//隐藏视图界面
    	$api.removeCls($api.dom("#VoiceMain"), 'active');
    	//初始化录音ui
    	$api.attr($api.dom(".voicestart"),"type","stop");
    	//恢复页面弹动
    	api.setFrameAttr({
		    name: api.frameName,
		    bounces: true,
		});
    }
    //删除录音
    u.Voicemodule_del = function(){
    	//初始化并隐藏视图
		u.Voicemodule_hide();
		//删除录音
    	var fs = api.require('fs');
		fs.remove({
		    path: u.Voicemodule.path
		},function( ret, err ){});
    }
   //初始化播放ui
    u.Voicemodule_stop = function(){
    	//停止计时
    	clearInterval(u.Voicemodule_time_obj);
    	//恢复录音时间
		u.Voicemodule.time = u.Voicemodule.temporarytime;
		//更新时间
		var time =  u.Voicemodule_time_();
    	$api.html($api.dom(".voicesplaytime"),time);
    	//初始化
		$api.removeCls($api.dom("#voiceplay"),"active");
    }
    //返回是否处于某个圆内
    u.Voicemodule_Centerdistance = function(coordinate){
    	var x1 = eval(coordinate.x);   // 第一个点的横坐标
		var y1 = eval(coordinate.y);   // 第一个点的纵坐标
		var x2 = eval(coordinate.x2);   // 第二个点的横坐标
		var y2 = eval(coordinate.y2);   // 第二个点的纵坐标
		var xdiff = x2 - x1;            // 计算两个点的横坐标之差
		var ydiff = y2 - y1;            // 计算两个点的纵坐标之差
		var distance = Math.pow((xdiff * xdiff + ydiff * ydiff), 0.5);  
	
		return distance>30?false:true;
    }
    //计时器
    u.Voicemodule_time = function(sta){
    	u.Voicemodule_time_obj = setInterval(function(){
    		sta?u.Voicemodule.time--:u.Voicemodule.time++;
    		var time = u.Voicemodule_time_();
    		$api.html(sta?$api.dom(".voicesplaytime"):$api.dom("#voicestime"),time);
    	},1000);
    }
    //转换成固定时间格式
    u.Voicemodule_time_ = function(){
    	var time = "00:00";
    	if(u.Voicemodule.time>=60){
			var Minute = parseInt(u.Voicemodule.time/60);
			var Second = parseInt(u.Voicemodule.time%60);
			Minute = Minute>=10?Minute:"0"+Minute;
			Second = Second>=10?Second:"0"+Second;
			time = Minute + ":" + Second;
		}else{
			time = u.Voicemodule.time>=10?"00:"+u.Voicemodule.time:"00:0"+u.Voicemodule.time;
		} 
		return time;
    }
     u.setFrame = function(bounces,type){
    	if(bounces){
    		api.setFrameAttr({
			    name: api.frameName,
			    rect: {
			        y: 25,
			    },
			    bounces: true,
			});
    	}else{
    		api.setFrameAttr({
			    name: api.frameName,
			    rect: {
			        y: 0
			    },
			    bounces: false,
			});
    	}
    }
    u.returnstr = function(len) {
		var len = len || 32;
		var chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
		var maxPos = chars.length;
		var string = '';
		for ( i = 0; i < len; i++) {
			string += chars.charAt(Math.floor(Math.random() * maxPos));
		}
		return string;
	}
	window.$app = u;
})(window);
