<?php
class users{
  public $usersPK;
  public $usersAccount;
  public $usersPassWord;
  public $usersName;
  public $usersEnName;
  public $usersBrief;
  public $usersRole;
  public $usersAddTime;
  public $usersStatus;
  public $usersPhone;
  public $usersQQ;
  public $usersEmail;
  public $usersPortrait;
  public $usersAddress;
  public $usersProfessional;
  public $usersRemarks;

  //拼接sql
  function getsql(){
    define(DB_TABLENAME, 'users');
    //数据库表的列名
    $dbcolarray = array('usersPK','usersAccount', 'usersPassWord','usersName','usersEnName'
    ,'usersBrief','usersRole','usersAddTime','usersStatus','usersPhone','usersQQ'
    ,'usersEmail','usersPortrait','usersAddress','usersProfessional','usersRemarks');
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

  function  getAccount($row){
    $t=self::getvalue($row);
    $t->usersAccount=$row->usersAccount;
    $t->usersPassWord=$row->usersPassWord;
    return $t;
  }

  function getvalue($row){
    $t=new users();
    $t->usersPK=$row->usersPK;
    $t->usersName=$row->usersName;
    $t->usersEnName=$row->usersEnName;
    $t->usersBrief=$row->usersBrief;
    $t->usersRole = $row->usersRole;
    $t->usersAddTime = $row->usersAddTime;
    $t->usersStatus=$row->usersStatus;
    $t->usersPhone=$row->usersPhone;
    $t->usersQQ=$row->usersQQ;
    $t->usersEmail=$row->usersEmail;
    $t->usersPortrait=$row->usersPortrait;
    $t->usersAddress=$row->usersAddress;
    $t->usersProfessional=$row->usersProfessional;
    $t->usersRemarks=$row->usersRemarks;
    return $t;
  }
}

?>
