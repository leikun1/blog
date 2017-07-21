<?php
class ArticleType{
  public $articleTypePK;
  public $articleTypeName;
  public $articleTypeValue;
  public $articleTypeBrief;
  public $articleTypeLogo;
  public $articleTypePPK;
  public $articleTypeSatus;
  public $articleTypeRemarks;

  function getAllArr(){
     $dbcolarray = array('articleTypePK','articleTypeName', 'articleTypeValue'
     ,'articleTypeBrief','articleTypeLogo','articleTypePPK','articleTypeSatus','articleTypeRemarks');
     return $dbcolarray;
  }

  //拼接sql
  function getsql($selectArr){
    define(DB_TABLENAME, 'articletype');
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

  //设置结果集
  function getvalue($row,$selectArr){
    $t=new ArticleType();
    if(empty($selectArr))$selectArr = 'getAllArr';
    $dbcolarray = $this->$selectArr();
    foreach ($dbcolarray as $p){
      $t->$p = $row->$p;
    }
    return $t;
  }
}

?>
