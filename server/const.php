<?php

/*数据库标准配置*/
define(DB_HOST, 'qdm108781649.my3w.com');
define(DB_USER, 'qdm108781649');
define(DB_PASS, '********');  //passWord
define(DB_DATABASENAME, 'qdm108781649_db');
class PageVo{
   public $beginNum  = 0;  //起始个数
   public $queryNum  = 10;  //查询个数
   public $totalCount;  //总个数
   public $currentPage = 1;  //当前页

   function getLimitStr(){
        //不传查询个数默认查十条，传查询个数，-1，不查
        if(empty($this->currentPage) || $this->currentPage < 0){
            $this->currentPage = 1;
        }
        if(empty($this->queryNum) || ($this->queryNum < 0 && $this->queryNum != -1)){
           $this->queryNum = 10;
        }
        if($this->queryNum != -1){
          return ' limit '.($this->currentPage -1)*$this->queryNum.','.$this->queryNum.";";
        }else{
           return "";
        }
   }

}

class Result{
    public $statusCode = "0";
    public $message="查询成功";
    public $value;
    public $pagevo ;
    public $extra;
}

$pagevo = new PageVo();
$pagevo->currentPage = $_POST["currentPage"];
$pagevo->queryNum = $_POST["queryNum"];
$limitStr = $pagevo->getLimitStr();

// error_reporting(E_ALL || ~E_NOTICE);  //报告所有非通知错误
// header("Access-Control-Allow-Origin:*");//此处使网站可以进行跨域访问
// header("Content-Type:application/json;charset=UTF-8");//此处声明返回的是json类型及字符集为utf-8
// mysqli_query($conn,"set names 'utf8'"); //设置编码
// $sql = sprintf("select count(*) from %s", DB_TABLENAME);
// $result = mysqli_query($conn,$sql);
// if ($result)
// {
//     $count = mysqli_fetch_row($result);
// }
// else
// {
//     die("query failed");
// }
//echo "表中有$count[0] 条记录<br/>";

 ?>
