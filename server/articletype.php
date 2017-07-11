<?php

define(DB_TABLENAME, 'articletype');
class ArticleType{
  public $articleTypePK;
  public $articleTypeName;
  public $articleTypeValue;
  public $articleTypeBrief;
  public $articleTypeLogo;
  public $articleTypePPK;
  public $articleTypeSatus;
  public $articleTypeRemarks;
}

//数据库表的列名
$dbcolarray = array('articleTypePK','articleTypeName', 'articleTypeValue'
,'articleTypeBrief','articleTypeLogo','articleTypePPK','articleTypeSatus','articleTypeRemarks');
//$pagearray = array('currentPage','queryNum');

$conditions = "";

$params = array();
//项目条目
foreach ($dbcolarray as $col){
  Array_push($params, $col);
}

//$params = $_POST["params"];
foreach ($params as $p){
    if(!empty($_POST[$p])){
       if(empty($conditions)){
         $conditions ="where ".$p." = '".$_POST[$p]."'";
       }else{
         $conditions .=" and ".$p." = '".$_POST[$p]."'";
       }
    }
}

if(!empty($limitStr))$conditions.=$limitStr;

if(!(strpos($conditions,";") !== false)){
  $conditions.=";";
}

$sql = sprintf("select %s from %s %s", implode(",",$dbcolarray), DB_TABLENAME,$conditions);
//echo $sql;

?>
