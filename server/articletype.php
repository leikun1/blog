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

  //拼接sql
  function getsql(){
    define(DB_TABLENAME, 'articletype');
    //数据库表的列名
    $dbcolarray = array('articleTypePK','articleTypeName', 'articleTypeValue'
    ,'articleTypeBrief','articleTypeLogo','articleTypePPK','articleTypeSatus','articleTypeRemarks');
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

    echo $sql;
    return $sql;
  }

  //设置结果集
  function getvalue($row){
    $t=new ArticleType();
    $t->articleTypePK=$row->articleTypePK;
    $t->articleTypeName=$row->articleTypeName;
    $t->articleTypeValue=$row->articleTypeValue;
    $t->articleTypeBrief=$row->articleTypeBrief;
    $t->articleTypeLogo=$row->articleTypeLogo;
    $t->articleTypePPK = $row->articleTypePPK;
    $t->articleTypeSatus = $row ->articleTypeSatus;
    $t->articleTypeRemarks=$row->articleTypeRemarks;
    return $t;
  }
}

?>
