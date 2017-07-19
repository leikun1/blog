(function($){
    $(function(){
      var index_instance = new index();
      index_instance.init();
    })

    var index = function(){
       this.bg_music = $("#bg_music")[0];  //背景音乐
       this.bg_music_flag = true;
       this.index_user_info = $(".index_user_info");
    }

    index.prototype.init = function(){
       this.utils().playmusic();
       this.utils().users();
       this.utils().article();
       this.bindEvents();
    }
    //事件绑定
    index.prototype.bindEvents = function(){

    }

    index.prototype.utils = function(){
        var _this = this;
        var utils = function(){}
        utils.prototype.users = function(){
          $.post({
            action:"users", //类名
            usersAccount:"admin",
            usersPassWord:"admin",
            queryNum:"1"
          },function(data){
              var user_info_html = "";
              if(data.value && data.value.length > 0){
                user_info_html = "<h1>我的名片</h1>"+
               "<p class='user_info_usersEnName'>网名："+data.value[0].usersEnName+"</p>"+
               "<p class='user_info_usersProfessional'>职业："+data.value[0].usersProfessional+"</p>"+
               "<p class='user_info_usersPhone'>电话："+data.value[0].usersPhone+"</p>"+
               "<p class='user_info_usersEmail'>Email："+data.value[0].usersEmail+"</p>"+
               "<ul class=\"linkmore\">"+
               "<li><a href='javascript:;' class=\"talk user_info_talk\" title=\"给我留言\"></a></li>"+
               "<li><a href='javascript:;' class=\"email user_info_email\" title="+data.value[0].usersEmail+"></a></li>"+
               "<li><a href='javascript:;' class=\"address user_info_address\" title="+data.value[0].usersAddress+"></a></li>"+
               "</ul>";
               // <li><a href="#" class="photos" title="生活照片"></a></li>
               // <li><a href="#" class="heart" title="关于我"></a></li>
              }
              _this.index_user_info.html(user_info_html);
          });
        }
        utils.prototype.article = function(){
          $.post({
            action:"article", //类名
          },function(data){
              var index_article_html = "";
              console.log(data);
              if(data.value && data.value.length > 0){

              }
          });
        }
        utils.prototype.playmusic = function(){
          window.setTimeout(function(){
            if(_this.bg_music_flag)_this.bg_music.play();
          },1000);
        }
        return new utils();
    }

})(jQuery);
