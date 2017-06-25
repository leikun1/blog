(function($){
    $(function(){
      var index_instance = new index();
      index_instance.init();
    })

    var index = function(){
       this.topnav_a = $("#topnav a");
       this.bg_music = $("#bg_music")[0];  //背景音乐
       this.bg_music_flag = false;
    }

    index.prototype.init = function(){
       this.utils().findCurrent();
       if(this.bg_music_flag)this.utils().playmusic();
       this.bindEvents();
    }
    //事件绑定
    index.prototype.bindEvents = function(){

    }

    index.prototype.utils = function(){
        var _this = this;
        var utils = function(){}
        utils.prototype.playmusic = function(){
          window.setTimeout(function(){
            _this.bg_music.play();
          },1000);
        }
        utils.prototype.findCurrent = function(){
          //根据当前路径加载active样式
          var obj = _this.topnav_a[0];
          //console.log(obj);
          _this.topnav_a.each(function(index){
               if(window.location.href.indexOf(this.href) >= 0){
                 obj = this;
                 return false;
              }
          });
          $(obj).attr("id","topnav_current");
        }
        return new utils();
    }

})(jQuery);
