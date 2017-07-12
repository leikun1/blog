(function($){
    $(function(){
      var learn_instance = new learn();
      learn_instance.init();
    })

    var learn = function(){
       //this.queryArticleTypeUrl = "http://www.leikun01.com/server/server.php";
       this.queryArticleTypeUrl = "http://localhost/blogH5/server/server.php";
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
            action:"articletype",
            articleTypePPK:"1",
            articleTypeSatus:"1",
            queryNum:"-1"
          },function(data){
            if(!_this.utils().isJSON(data)){
              layer.alert("服务器结果集解析异常");
              return false;
            }
            var data = JSON.parse(data);
            if(data && data.statusCode=="0"){
              var html = "";
              if(data.value && data.value.length > 0){
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
        utils.prototype.isJSON = function(data) {
          try {
             if(typeof data == "object"
             && Object.prototype.toString.call(obj).toLowerCase() == "[object object]"
             && !obj.length){
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
        return new utils();
    }

})(jQuery);
