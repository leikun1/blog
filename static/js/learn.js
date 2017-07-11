(function($){
    $(function(){
      var learn_instance = new learn();
      learn_instance.init();
    })

    var learn = function(){
       //this.queryArticleTypeUrl = "http://www.leikun01.com/server/articletypeserver.php";
       this.queryArticleTypeUrl = "http://localhost/blogH5/server/articletypeserver.php";
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
          $.post(_this.queryArticleTypeUrl,{
            articleTypePPK:"1",
            articleTypeSatus:"1",
            queryNum:"-1"
          },function(data){
            var data = JSON.parse(data);
            if(data.statusCode=="0"){
              var html = "";
              if(data.value && data.value.length > 0){
                // /
                for(var i = 0; i < data.value.length;i++){
                  html += "<li><a href='javascript:;' title='"+data.value[i].articleTypeBrief
                  +"' >"+data.value[i].articleTypeName+"</a></li>";
                }
              }
               _this.learn_article_typelist.html(html);
            }else{
               layer.alert(data.message?data.message:"服务器异常");
            }
          });
        }
        return new utils();
    }

})(jQuery);
