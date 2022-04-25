<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Статистика</title>



     <!--<link rel="stylesheet" href="./css/style.css"> -->

     <link rel="stylesheet" type="text/css" href="http://qwertyfour.zzz.com.ua/pages/statistik/css/style.css?ts=<?=time()?>" /> 
       





</head>

<body id="bod">
    <footer>Статистика</footer>

    <div id="time">
        <input id="butNow" type="button" value="Поточний" onclick="go(1)">
        
        <input id="textDate" type="date" value="" min="2022-01-07">
        <input id="textTime" type="text"  value="" placeholder="чч:00">
        <input id="butOK" type="button" value="OK" onclick="go(3)">
        <div id="timeNow"></div>
        <div id="timeStan"></div>

    </div>

    <div id="main"></div>
    <div id="sum"></div>
    <div id="divCheck">
        <input id="buTes" type="checkbox" checked>БуТЕС
        <input id="CE" type="checkbox">ЦЕ
        <input id="Tets" type="checkbox">ТЕC
        <input type="button" value="GO" onclick="go(v)">
    </div>
    <script defer src="./js/index.js"></script>
</body>

</html>