<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <link rel="stylesheet" type="text/css" href="http://qwertyfour.zzz.com.ua/css/style.css?ts=<?=time()?>" />

    <!-- <link rel="stylesheet" href="./css/style.css"> -->
    
    <title>Стан блоків</title>
</head>
<body>
    <?php
			
		header("Content-Type: text/html; charset=UTF-8");
		include './php/phpFile.php';		
	?>
    <div class="container">
        AES
        <div class="containerAes">
            <?php
                $textt = '';
                for($i = 0; $i < 4; $i++ ){
                        $textt = $textt.'<div class="unitAes"> <div class="unitNameCount">'.$arrBlocksFull[$i][0].'<span class="spanCountBlocks">'.stan($arrBlocksFull[$i][0])[1].'</span></div><div class="power"><span class="powerText">'.stan($arrBlocksFull[$i][0])[2].' МВт.</span></div></div>';
                }
                print_r($textt);
            ?>
        </div>
        TES
        <div class="containerTes">
            <?php
                $textt = '';
                for($i = 4; $i < count($arrBlocksFull); $i++ ){
                        $textt = $textt.'<div class="unitAes"> <div class="unitNameCount">'.$arrBlocksFull[$i][0].'<span class="spanCountBlocks">'.stan($arrBlocksFull[$i][0])[1].'</span></div><div class="power"><span class="powerText">'.stan($arrBlocksFull[$i][0])[2].' МВт.</span></div></div>';
                }
                print_r($textt);
            ?>
        </div>
        <div class="containerFoot">
            <div class="statistik">
                <a id="stat" href="./pages/statistik/stat.php">Статистика</a>
                <a id="stat2" href="./pages/hour">Почасовка</a>
            </div>
        </div>



    </div>
    
</body>
</html>