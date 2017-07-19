(function($){
    $(function(){
      var learn_instance = new learn();
      learn_instance.init();
    })

    var learn = function(){
       this.learn_article_typelist = $(".learn_article_typelist");
    }

    learn.prototype.init = function(){
       this.utils().queryArticleType();
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
        return new utils();
    }

})(jQuery);
