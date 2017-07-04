(function($){
  //根据当前路径加载active样式
  var obj = $("#topnav a")[0];
  console.log(obj);
  $("#topnav a").each(function(index){
      console.log(this.href);
        console.log(window.location.href.indexOf(this.href));
       if(window.location.href.indexOf(this.href) >= 0){
         obj = this;
         return false;
      }
  });
  $(obj).attr("id","topnav_current");
})(jQuery);
