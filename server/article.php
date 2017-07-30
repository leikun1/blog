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
    ,'articleAuthor','articleAddTime','articleLabel','ac.`articleTypePK`','articleRemarks'
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
  function getsql($keyword){
    define(DB_TABLENAME, 'article');
    define(JOIN_TABLENAME, 'articletype');
    //查询条件
    $conditions = "";
    if(empty($keyword))$keyword = 'getAllArr';
    $dbcolarray = $this->$keyword();
    if(!empty($_POST["articleTypePK"]) && !empty($_POST["articleTypePPK"])){
       $conditions = "where (ac.`articleTypePK` ='".$_POST["articleTypePK"]."' or  act.`articleTypePPK` = '".$_POST["articleTypePPK"]."')";
    }else if(!empty($_POST["articleTypePK"])){
       $conditions = "where ac.`articleTypePK` ='".$_POST["articleTypePK"]."'";
    }else if(!empty($_POST["articleTypePPK"])){
       $conditions = "where act.`articleTypePPK` ='".$_POST["articleTypePPK"]."'";
    }
    foreach ($dbcolarray as $p){
        if(!empty($_POST[$p])){
           if($p == "articleTypePK" || $p == "articleTypePPK")continue;
           if(empty($conditions)){
             $conditions ="where ".$p." = '".$_POST[$p]."'";
           }else{
             $conditions .=" and ".$p." = '".$_POST[$p]."'";
           }
        }
    }

    //order by
    $order = $_POST["order"];
    if(!empty($order))$conditions.="order by ".$order;
    //分页
    if(!empty($limitStr))$conditions.=$limitStr;
    //添加引号
    if(!(strpos($conditions,";") !== false)){
      $conditions.=";";
    }
    $sql = sprintf("select %s from %s as ac left join %s as act ON ac.`articleTypePK`  = act.`articleTypePK` %s"
    , implode(",",$dbcolarray), DB_TABLENAME,JOIN_TABLENAME,$conditions);
    //echo $sql;
    return $sql;
  }

  function getvalue($row,$keyword){
    $t=new article();
    if(empty($keyword))$keyword = 'getAllArr';
    $dbcolarray = $this->$keyword();
    foreach ($dbcolarray as $p){
      $t->$p = $row->$p;
    }
    return $t;
  }

}

?>
