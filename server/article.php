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
  public $articleViewTimes;
  public $articleContent;

  //拼接sql
  function getsql(){
    define(DB_TABLENAME, 'article');
    //数据库表的列名
    $dbcolarray = array('articlePK','articleTitle', 'articleLittleTitle'
    ,'articleAuthor','articleAddTime','articleLabel','articleTypePK'
    ,'articleRemarks','articleProperty','articleStatus','articleViewTimes','articleContent');
    //查询条件
    $conditions = "";
    $params = array();
    //项目条目
    foreach ($dbcolarray as $col){
      Array_push($params, $col);
    }
    //查询条目
    foreach ($params as $p){
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
  function getvalue($row){
    $t=new article();
    $t->articlePK=$row->articlePK;
    $t->articleTitle=$row->articleTitle;
    $t->articleLittleTitle=$row->articleLittleTitle;
    $t->articleAuthor=$row->articleAuthor;
    $t->articleAddTime=$row->articleAddTime;
    $t->articleLabel = $row->articleLabel;
    $t->articleTypePK = $row ->articleTypePK;
    $t->articleRemarks=$row->articleRemarks;
    $t->articleProperty=$row->articleProperty;
    $t->articleStatus=$row->articleStatus;
    $t->articleViewTimes=$row->articleViewTimes;
    $t->articleContent=$row->articleContent;
    return $t;
  }
}

?>
