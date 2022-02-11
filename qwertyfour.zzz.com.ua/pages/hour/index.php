<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Стан блоків</title>

    <!--<link rel="stylesheet" href="./style.css"> -->

    <link rel="stylesheet" type="text/css" href="http://qwertyfour.zzz.com.ua/pages/hour/style.css?ts=<?=time()?>" /> 
    <link rel="shortcut icon" href="./images/3.png" type="image/x-icon">
    
       

</head>

<body>
    <div id="divForm">
        <input id="butPot" type="button" value="поточний" onClick="go(5)">
        <input id="text" type="text" placeholder="чч.мм.рррр" title="чч.мм.рррр" value="">
        <input id="but" type="button" value="OK" onClick="go(4)">
        показувати години <input id="check" type="checkbox" checked>
    </div>
    <div class="mainTable">
          <div class="container">

          </div>
    </div>
   
    <script src="./script.js"></script>
</body>

</html>