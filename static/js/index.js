(function($){
    $(function(){
      var index_instance = new index();
      index_instance.init();
    })

    var index = function(){
       this.document = $(document);
       this.article_detail_url = "./page/new.html";
       this.bg_music = $("#bg_music")[0];  //背景音乐
       this.bg_music_flag = false;
       this.index_user_info = $(".index_user_info");
       this.index_article_recommend = $(".index_article_recommend");
       this.index_article_newest = $(".index_article_newest");
       this.index_article_view = $(".index_article_view");
       this.article_detail_btnStr = ".article_detail_btn";
    }

    index.prototype.init = function(){
       this.utils().playmusic();
       this.utils().users();
       this.utils().article();
       this.bindEvents();
    }
    //事件绑定
    index.prototype.bindEvents = function(){
       var _this = this;
       _this.document.on("click",_this.article_detail_btnStr,function(e){
          var data_pk = $(this).attr("data-pk");
          $.href(_this.article_detail_url+"?dataPK="+data_pk,true);
       });

       document.onkeydown=function(e){
		      /*禁止复制if((event.ctrlKey) && (event.keyCode==67)){event.returnValue=false;}*/
          /*谷歌中window.event == e ,火狐中不存在window.event对象*/
          //keyup时已经提交，处理submit要在keydown和keypress前处理
		      var keyc=e.keyCode;
	        if(keyc==13){console.log(e);return false;}
	    }
    }

    index.prototype.utils = function(){
        var _this = this;
        var utils = function(){}
        utils.prototype.users = function(){
          $.post({
            action:"users", //类名
            usersAccount:"admin",
            usersPassWord:"admin",
            keyword:"userInfoArr",
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
            this.articleRecommend();
            this.articleNewest();
            this.articleView();
        }
        utils.prototype.articleRecommend = function(){
          $.post({
            action:"article",keyword:"getSimpleArr",articleRecommend:"1"
         },function(data){
             var article_recommend_html = "";
             if(data.value && data.value.length > 0){
               for(var i = 0; i < data.value.length; i++ ){
                  article_recommend_html+="<h3>"+(data.value[i].articleTitle ? data.value[i].articleTitle : "未知")+"</h3>"+
                  "<figure><img src=\"./static/images/001.png\"></figure>"+
                  "<ul>"+
                  "<p>"+(data.value[i].articleRemarks?data.value[i].articleRemarks:"")+"</p>"+
                  "<a title=\"阅读全文\" href='javascript:;' data-pk='"+data.value[i].articlePK+
                  "' class=\"readmore article_detail_btn\">阅读全文>></a>"+
                  "</ul>"+
                  "<p class=\"dateview\">"+
                  "<span>"+(data.value[i].articleAddTime?data.value[i].articleAddTime:"--")+"</span>"+
                  "<span>作者："+(data.value[i].articleAuthor?data.value[i].articleAuthor:"--")+"</span>"+
                  "<span>属性：[<a href='javascript:;'>"+(data.value[i].articleProperty == '1'
                  ? "原创" : data.value[i].articleProperty == '2' ? "转载" : "--")+"</a>]</span>"+
                  "</p>";
               }
             }
             _this.index_article_recommend.html(article_recommend_html);
          });
        }
        utils.prototype.articleNewest = function(){
          $.post({action:"article",keyword:"getSimpleArr",order:"articleViewTimes desc"},function(data){
            var article_newest_html = "";
            if(data.value && data.value.length > 0){
              for(var i = 0; i < data.value.length; i++ ){
                var articleTitle = (data.value[i].articleTitle ? data.value[i].articleTitle : "**");
                 article_newest_html+="<li><a href='javascript:;' title='"+articleTitle+
                 "' data-pk='"+data.value[i].articlePK+"' class=\"article_detail_btn\" >"+articleTitle+"</a></li>";;
              }
            }
            _this.index_article_newest.html(article_newest_html);
          });
        }
        utils.prototype.articleView = function(){
          $.post({action:"article",keyword:"getSimpleArr",order:"articleAddTime desc"},function(data){
            var article_view_html = "";
            if(data.value && data.value.length > 0){
              for(var i = 0; i < data.value.length; i++ ){
                var articleTitle = (data.value[i].articleTitle ? data.value[i].articleTitle : "**");
                 article_view_html+="<li><a href='javascript:;' title='"+articleTitle+
                 "' data-pk='"+data.value[i].articlePK+"' class=\"article_detail_btn\" >"+articleTitle+"</a></li>";;
              }
            }
            _this.index_article_view.html(article_view_html);
          });
        }
        utils.prototype.share = function(){
          
        }
        utils.prototype.playmusic = function(){
          window.setTimeout(function(){
            if(_this.bg_music_flag)_this.bg_music.play();
          },1000);
        }
        return new utils();
    }

})(jQuery);
