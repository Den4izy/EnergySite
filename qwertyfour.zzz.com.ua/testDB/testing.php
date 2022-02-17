       <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Test</title>

    <!--<link rel="stylesheet" href="./style.css"> -->

    <link rel="stylesheet" type="text/css" href="http://qwertyfour.zzz.com.ua/pages/hour/style.css?ts=<?=time()?>" /> 
    <link rel="shortcut icon" href="./images/3.png" type="image/x-icon">
    
       

</head>

<body>
    <div id="divForm">

         <?php 

 $link = mysqli_connect("localhost", "denysyz", "Wiwelden132435", "qwertyfour");
	$textZ = '';
        if ($link == false){
            $result2 = "Ошибка: Невозможно подключиться к MySQL " . mysqli_connect_error();
        }
	else{
            $result2 = "This OK";
        }
        $sql = "SELECT * FROM `StanBlocks` WHERE Time = '22:00' AND Date = '2022.02.16'";
	$result = mysqli_query($link, $sql);
	$result = mysqli_fetch_assoc($result);
	$result = $result['Info'];
	mysqli_close($link);
        echo $result
        
         ?>
       
    </div>
    
</body>

</html>







 