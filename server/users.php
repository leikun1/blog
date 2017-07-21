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

  function userInfoArr(){
    $dbcolarray = array('usersPK','usersName','usersEnName'
    ,'usersBrief','usersRole','usersAddTime','usersStatus','usersPhone','usersQQ'
    ,'usersEmail','usersPortrait','usersAddress','usersProfessional','usersRemarks');
    return $dbcolarray;
  }

  function usersAccountArr(){
    $dbcolarray = array('usersAccount', 'usersPassWord');
    return $dbcolarray;
  }

  function getAllArr(){
    $dbcolarray = $this->userInfoArr();
    $new = $this->usersAccountArr();
    foreach ($new as $col){
      Array_push($dbcolarray, $col);
    }
    return $dbcolarray;
  }

  //拼接sql
  function getsql($selectArr){
    define(DB_TABLENAME, 'users');
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
    $t=new users();
    if(empty($selectArr))$selectArr = 'getAllArr';
    $dbcolarray = $this->$selectArr();
    foreach ($dbcolarray as $p){
      $t->$p = $row->$p;
    }
    return $t;
  }
}

?>
