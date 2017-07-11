<?php
include 'const.php';  //引入常量代码
include 'articletype.php';  //引入常量代码

//mysql_connect
$conn = mysqli_connect(DB_HOST, DB_USER, DB_PASS,DB_DATABASENAME) or die("connect failed" . mysql_error());

//读取表中纪录条数
mysqli_query($conn,"set names 'utf8'"); //设置编码
$result = mysqli_query($conn,$sql);

$valueArr=array();

while($row=mysqli_fetch_object($result)){
    $t=new ArticleType();
    $t->articleTypePK=$row->articleTypePK;
    $t->articleTypeName=$row->articleTypeName;
    $t->articleTypeValue=$row->articleTypeValue;
    $t->articleTypeBrief=$row->articleTypeBrief;
    $t->articleTypeLogo=$row->articleTypeLogo;
    $t->articleTypePPK = $row->articleTypePPK;
    $t->articleTypeSatus = $row ->articleTypeSatus;
    $t->articleTypeRemarks=$row->articleTypeRemarks;
    //填充数组
    $valueArr[]=$t;
}

$r = new Result();
$r->value = $valueArr;

//echo $test->message;
echo json_encode($r,JSON_UNESCAPED_UNICODE);

mysqli_free_result($result);
mysqli_close($conn);
?>
