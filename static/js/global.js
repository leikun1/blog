/*===================================分割线========================================*/
//立即执行函数加分号否则
//Uncaught TypeError: (intermediate value)(intermediate value)(intermediate value) is not a function
;(function($){
  var global = {
    config : $.extend(window.config || {},{
      isDebug : true,
      server :
      "http://www.leikun01.com/server/server.php",
      //"http://localhost/blogH5/server/server.php",
      //"http://www.leikun01.com/server/server.php",
    }),
    GetQueryString : function(name){
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
    	var r = window.location.search.substr(1).match(reg);
    	if (r!=null) return decodeURI((r[2])); return null;
    },
    userBrowser : function(){
      var u_agent = navigator.userAgent;
    	var browser_name='Failed to identify the browser';
    	if(u_agent.indexOf('Firefox')>-1){
    	browser_name='Firefox';
    	}else if(u_agent.indexOf('Chrome')>-1){
    	browser_name='Chrome';
    	}else if(u_agent.indexOf('Trident')>-1&&u_agent.indexOf('rv:11')>-1){
    	browser_name='IE11';
    	}else if(u_agent.indexOf('MSIE')>-1&&u_agent.indexOf('Trident')>-1){
    	browser_name='IE(8-10)';
    	}else if(u_agent.indexOf('MSIE')>-1){
    	browser_name='IE(6-7)';
    	}else if(u_agent.indexOf('Opera')>-1){
    	browser_name='Opera';
    	}else{
    	browser_name+=',info:'+u_agent;
    	}
    	return browser_name;
    },
    isJSON :function(data){
      try {
         if(typeof data == "object"
         && Object.prototype.toString.call(data).toLowerCase() == "[object object]"
         && !data.length){
           return true;
         }else if(typeof data == 'string') {
           JSON.parse(data);
           return true;
         }else{
           console.log("data既不是object也不是string");
           return false;
         }
      } catch(e) {
          console.log(e);
          return false;
      }
    }
  }

  $.extend(window || {},global); //全局函数

  var g_func = function(jQuery){
       this.$ = jQuery;
       this._log = console.log;//日志
       this._post = jQuery.post;//post
       this._get = jQuery.get;//post
       this.topnav_a = jQuery("#topnav a");
       this.topnav_currentStr = "topnav_current";
  }

  g_func.prototype.init = function(){
      this.bindEvents();
      this.utils().consoleLogOverRiding();  //重载日志
      this.utils().postOverRiding();
      this.utils().getOverRiding();
      this.utils().addHrefFunc();
      this.utils().silder(); //当前导航
  }
  //事件绑定
  g_func.prototype.bindEvents = function(){}

  g_func.prototype.utils = function(){
      var _this = this;
      var utils = function(){}
      utils.prototype.consoleLogOverRiding = function(){
        console.log = function(data){
          if(window.config && window.config.isDebug){
            _this._log(data);
          }
        }
      }
      utils.prototype.postOverRiding = function(){
        _this.$.post = function(params,callback,url,type){
          var loading = layer.load();
          //layer.load(1, {shade: [0.8, '#393D49'], time: 3000});
          if(isJSON(params)){
            params = _this.$.extend(params || {},{"platform":"3"});
            _this.$.each(params,function(name,value) {});//此处可加密参数
          }else{
            if(params.indexOf("?") > -1 && params.indexOf("=") > -1){
              params = params+"&platform=3";
            }
          }
          return _this._post(url || window.config.server,params,function(data){
            layer.close(loading);
            if(!isJSON(data)){
              layer.alert("服务器结果集解析异常");
            }else{
              var data = JSON.parse(data);
              if(data && data.statusCode=="0"){
                  callback(data);
              }else{
                  layer.alert(data.message?data.message:"服务器异常");
              }
            }
          },type).error(function() { layer.close(loading);layer.alert("请求异常"); });
        };
      }
      utils.prototype.getOverRiding = function(){
        _this.$.get = function(params,callback,url){
          if(isJSON(params)){
         	  params = _this.$.extend(params || {},{"platform":"3"});
            _this.$.each(params,function(name,value) {});
          }else{
            if(params.indexOf("=") > -1){
            params = params+"&platform=3";
            }
          }
          return  _this._get(url || window.config.server,params,function(data){
            if(!isJSON(data)){
              layer.alert("服务器结果集解析异常");
              return false;
            }else{
              var data = JSON.parse(data);
              if(data && data.statusCode=="0"){
                  callback(data);
              }else{
                  layer.alert(data.message?data.message:"服务器异常");
              }
            }
          }).error(function() { layer.close(loading);layer.alert("请求异常"); });
        }
      }
      utils.prototype.addHrefFunc = function(){
        _this.$.href = function(url){
        	var open = arguments[1] ? true : false;
        	var jsessionid = arguments[2] ? arguments[2] : "";//此处可进行jessionid拼接
        	if(jsessionid){
        		url = url+";jsessionid="+jsessionid;
        	}
        	if(!open){
        	   	if(!arguments[3]){
            	    window.location.href = url;
            	}else{
            		arguments[3].location.href = url;
            	}
          }else{
            window.open(url);
          }
        };
      }
      utils.prototype.silder = function(){
        var obj = _this.topnav_a[0];
        _this.topnav_a.each(function(index){
             if(window.location.href.indexOf(this.href) >= 0){
               obj = this;
               return false;
            }
        });
        $(obj).attr("id",_this.topnav_currentStr);
      }
      return new utils();
  }


  var g_func_instance = new g_func($);
  g_func_instance.init();

})(jQuery);
