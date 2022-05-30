<!DOCTYPE html>
<html lang="en">

<head>


    <script async src="https://www.googletagmanager.com/gtag/js?id=G-WNF9SS2JT0"></script>
    <script>
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('config', 'G-WNF9SS2JT0');
    </script>



    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Графік роботи блоків</title>

    <!-- <link rel="stylesheet" href="./style.css"> -->

    <link rel="stylesheet" type="text/css"
        href="http://qwertyfour.zzz.com.ua/energy/pages/workBlocks/style.css?ts=<?=time()?>" /> 

    <link rel="shortcut icon" href="./images/blocks.png" type="image/x-icon">



</head>
<body>
    <div id="divForm">
        <input id="text" type="date" value="2022-01-07" onchange="dat1()">
        <input id="text2" type="date" value="2022-01-07" onchange="dat2()" >
        <!-- <input id="tes2" type="text" title="Станція" value="ТрТЕС"> -->
        <select id="tes" size="1" name="hero">
            <option disabled>Станція</option>
            <option selected value="ТрТЕС">ТрТЕС</option>  
        </select>
        <input id="but" type="button" value="OK" onClick="go()">
    </div>

    <div class="mainLegend">
        <div class="clMaroon legendBlok textWhite">РК</div>
        <div class="clOlive legendBlok">КР</div>
        <div class="clGreen legendBlok">СР</div>
        <div class="inWork legendBlok">ОР</div>
        <div class="clTeal legendBlok">КС</div>
        <div class="clYellow legendBlok">ОТ</div>
        <div class="clRed legendBlok">АР</div>
        <div class="clNavy legendBlok textWhite">ТР</div>
        <div class="clSilver legendBlok">РЗ</div>
    </div>
    <div class="mainTable">
        <div class="container"></div>
    </div>
    <footer>
       <a id="aFooter" href="http://qwertyfour.zzz.com.ua/energy/">На головну</a>
    </footer>
    <script src="./scriptTest.js"></script>
</body>

</html>	