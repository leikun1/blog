 <?php
include 'const.php';  //引入常量代码
include 'articletype.php';
include 'article.php';
include 'users.php';

//mysql_connect
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS,DB_DATABASENAME) or die("connect failed" . mysql_error());
//读取表中纪录条数
mysqli_query($conn,"set names 'utf8'"); //设置编码
$action = $_POST["action"]; //类名
$method = $_POST["method"];
if(empty($method))$method = 'getvalue';
$r = new Result(); //结果集
if(!empty($action)){
  $data = new $action();
  $result = mysqli_query($conn,$data->getsql()); //sql
  $valueArr=array();
  while($row=mysqli_fetch_object($result)){
      if(!empty($data))$valueArr[]=$data->$method($row);
  }
  $r->value = $valueArr;
  mysqli_free_result($result);
  mysqli_close($conn);
}else{
$r->statusCode = "1001";
$r->message = "执行动作未知";
}

echo json_encode($r,JSON_UNESCAPED_UNICODE);

?>
