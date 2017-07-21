<?php
class article{
  public $articlePK;
  public $articleTitle;
  public $articleLittleTitle;
  public $articleAuthor;
  public $articleAddTime;
  public $articleLabel;
  public $articleTypePK;
  public $articleRemarks;
  public $articleProperty;
  public $articleStatus;
  public $articleRecommend;
  public $articleViewTimes;
  public $articleContent;

  //获取简单字符串
  function getSimpleArr(){
    $dbcolarray = array('articlePK','articleTitle', 'articleLittleTitle'
    ,'articleAuthor','articleAddTime','articleLabel','articleTypePK','articleRemarks'
    ,'articleProperty','articleStatus','articleRecommend','articleViewTimes');
    return $dbcolarray;
  }
  
 //获取全部字符串
  function getAllArr(){
     $dbcolarray = $this->getSimpleArr();
     $new = array('articleContent');
     foreach ($new as $col){
       Array_push($dbcolarray, $col);
     }
     return $dbcolarray;
  }

  //拼接sql
  function getsql($selectArr){
    define(DB_TABLENAME, 'article');
    //查询条件
    $conditions = "";
    if(empty($selectArr))$selectArr = 'getAllArr';
    $dbcolarray = $this->$selectArr();
    foreach ($dbcolarray as $p){
        if(!empty($_POST[$p])){
           if(empty($conditions)){
             $conditions ="where ".$p." = '".$_POST[$p]."'";
           }else{
             $conditions .=" and ".$p." = '".$_POST[$p]."'";
           }
        }
    }
    //order by
    $order = $_POST["order"];
    if(!empty($order))$conditions.="order by".$order;
    //分页
    if(!empty($limitStr))$conditions.=$limitStr;
    //添加引号
    if(!(strpos($conditions,";") !== false)){
      $conditions.=";";
    }
    $sql = sprintf("select %s from %s %s", implode(",",$dbcolarray), DB_TABLENAME,$conditions);
    //echo $sql;
    return $sql;
  }

  function getvalue($row,$selectArr){
    $t=new article();
    if(empty($selectArr))$selectArr = 'getAllArr';
    $dbcolarray = $this->$selectArr();
    foreach ($dbcolarray as $p){
      $t->$p = $row->$p;
    }
    return $t;
  }

}

?>
