<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <?php


include '../php/phpFileGet.php';


$d = getdate();
$day = $d[mday];
$mon = $d[mon];
$year = $d[year];
$hours = $d[hours] + 1;
$minutes = $d[minutes];
if($hours < 10){
    $hours = '0'.$hours;
}
if($minutes < 10){
    $minutes = '0'.$minutes;
}
if($day < 10){
    $day = '0'.$day;
}
if($mon < 10){
    $mon = '0'.$mon;
}

$time = $hours.':'.$minutes;
$date = $year.'.'.$mon.'.'.$day;

$info = allStations2();

$str = ',';

for($i = 0; $i < count($info);$i++){
     //$str = $str.',';
     $str = $str.$info[$i][0].',';
     $str = $str.$info[$i][1].',';
     $str = $str.$info[$i][2].',';
     //$str = $str.'INF)';
     //$str = $str.'(BLS';
     for($k = 3; $k < count($info[$i]);$k++){
          //$str = $str.',';
          for($x = 0; $x < count($info[$i][$k]);$x++){
              $str = $str.$info[$i][$k][$x].',';             
	  }   
          //$str = $str.',';  
     }
     //$str = $str.'BLS)';
     //$str = $str.',';
}

$infoF = implode(",", $info[0]);

$link = mysqli_connect("localhost", "denysyz", "Wiwelden132435", "qwertyfour");

if ($link == false){
    print("Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error());
}
else {
    print("Соединение установлено успешно <br>");
}

$sql = 'INSERT INTO StanBlocks (Time, Date, Info) VALUES ("'.$time .'", "'.$date .'", "'.$str .'")';
//$sql2 = 'SELECT * FROM testtable';
$result = mysqli_query($link, $sql);

print($str);






 ?>
 
</body>
</html>		