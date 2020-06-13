<?php
    header("Content-Type:text/html;charset=utf8"); 
	header("Access-Control-Allow-Origin: *"); //解决跨域
	header('Access-Control-Allow-Methods:POST');// 响应类型  
	header('Access-Control-Allow-Headers:*'); // 响应头设置 
	error_reporting(E_ALL);
    $code = $_POST['code'];
	$url='https://api.weixin.qq.com/sns/jscode2session?appid=wx50f4848c8903debb&secret=023P9Gbh0DW9Yu1UMsdh0JIybh0P9Gb3&js_code='.$code.'&grant_type=authorization_code';
	$html = file_get_contents($url);
	print($html);
?>