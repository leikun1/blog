 <?php
include 'const.php';  //引入常量代码
include 'articletype.php';
include 'article.php';
include 'users.php';

//mysql_connect
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS,DB_DATABASENAME) or die("connect failed" . mysql_error());
//读取表中纪录条数
mysqli_query($conn,"set names 'utf8'"); //设置编码
$action = $_POST["action"];
//获取sql
$data = new $action();
$result = mysqli_query($conn,$data->getsql()); //sql
$r = new Result(); //结果集
$valueArr=array();
while($row=mysqli_fetch_object($result)){
    if(!empty($data))$valueArr[]=$data->getvalue($row);
}
$r->value = $valueArr;
//$valueArr;

echo json_encode($r,JSON_UNESCAPED_UNICODE);
mysqli_free_result($result);
mysqli_close($conn);
?>
