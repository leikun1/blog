(function($){
    $(function(){
      var index_instance = new index();
      index_instance.init();
    })

    var index = function(){
       this.bg_music = $("#bg_music")[0];  //背景音乐
       this.bg_music_flag = false;
    }

    index.prototype.init = function(){
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
        return new utils();
    }

})(jQuery);
