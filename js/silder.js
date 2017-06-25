//根据当前路径加载active样式
var obj=null;
var As=document.getElementById('topnav').getElementsByTagName('a');
obj = As[0];
for(i=1;i<As.length;i++){if(window.location.href.indexOf(As[i].href)>=0)
obj=As[i];}
obj.id='topnav_current';


(function($){
    $(function(){
      var index_instance = new index();
      index_instance.init();
    })

    var index = function(){
       this.bg_music = $("#bg_music")[0];
    }

    index.prototype.init = function(){
       this.utils().playmusic();
    }

    index.prototype.utils = function(){
        var _this = this;
        var utils = function(){}
        utils.prototype.playmusic = function(){
          window.setTimeout(function(){
            _this.bg_music.play();
          },1000);
        }
        return new utils();
    }

})(jQuery);
