(function($){
    $(function(){
      var learn_instance = new learn();
      learn_instance.init();
    })

    var learn = function(){
       this.learn_article_typelist = $(".learn_article_typelist");
       this.article_detail_url = "../page/new.html";
       this.learn_article_recommend = $(".learn_article_recommend");
       this.learn_article_newest = $(".learn_article_newest");
       this.learn_article_view = $(".learn_article_view");
       this.article_detail_btnStr = ".article_detail_btn";
    }

    learn.prototype.init = function(){
       this.utils().queryArticleType();
       this.utils().article();
       this.bindEvents();
    }

    //事件绑定
    learn.prototype.bindEvents = function(){

    }

    learn.prototype.utils = function(){
        var _this = this;
        var utils = function(){}
        utils.prototype.queryArticleType = function(){
          $.post({
            action:"articletype", //类名
            articleTypePPK:"1",
            articleTypeSatus:"1",
            queryNum:"-1"
          },function(data){
              var html = "";
              if(data.value && data.value.length > 0){
                for(var i = 0; i < data.value.length;i++){
                  html += "<li><a href='javascript:;' title='"+data.value[i].articleTypeBrief
                  +"' >"+data.value[i].articleTypeName+"</a></li>";
                }
              }
              _this.learn_article_typelist.html(html);
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
                  article_recommend_html+=
                  "<h2>"+(data.value[i].articleTitle ? data.value[i].articleTitle : "")+"</h2>"+
                  "<p class=\"dateview\"><span>发布时间："+
                  (data.value[i].articleAddTime?data.value[i].articleAddTime:"--")+
                  "</span><span>作者："+(data.value[i].articleAuthor?data.value[i].articleAuthor:"--")+
                  "</span><span>分类：[<a href='javascript:;'>"+(data.value[i].articleProperty == '1'
                  ? "原创" : data.value[i].articleProperty == '2' ? "转载" : "--")+"</a>]</span></p>"+
                  "<figure><img src=\"../static/images/01.jpg\"></figure>"+
                  "<ul class=\"nlist\">"+
                  "<p>"+(data.value[i].articleRemarks?data.value[i].articleRemarks:"")+"</p>"+
                  "<a title=\"阅读全文\" href='javascript:;' data-pk='"+data.value[i].articlePK+
                  "' class=\"readmore article_detail_btn\">详细信息>></a>"+
                  "</ul>"+
                  "<div class=\"line\"></div>";
               }
             }
             article_recommend_html += "<div class=\"blank\"></div>"+
             "<div class=\"page\">"+
             "<b>1</b>"+
             "<a href='javascript:;' >2</a>"+
             "<a href='javascript:;' >&gt;</a>"+
             "<a title=\"Total record\">"+
             "<b>41</b>"+
             "</a>"+
             "<a href='javascript:;' >&gt;&gt;</a></div>";
             _this.learn_article_recommend.html(article_recommend_html);
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
            _this.learn_article_newest.html(article_newest_html);
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
            _this.learn_article_view.html(article_view_html);
          });
        }
        return new utils();
    }

})(jQuery);
