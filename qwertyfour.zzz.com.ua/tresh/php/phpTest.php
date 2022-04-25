<?php

   header('Access-Control-Allow-Origin: *');

   include './phpFile.php';
   
function cr(){
$arr;
for($i = 4; $i < count($arrBlocksFull); $i++ ){
   $arr[$i][0] = $arrBlocksFull[$i][0];
   $arr[$i][1] = stan($arrBlocksFull[$i][0])[1];
   $arr[$i][2] = stan($arrBlocksFull[$i][0])[2];
}
return $arr;
}

   $textt = '';
   for($i = 4; $i < count($arrBlocksFull); $i++ ){
           $textt = $textt.'<div class="unitAes"> <div class="unitNameCount">'.$arrBlocksFull[$i][0].'<span class="spanCountBlocks">'.stan($arrBlocksFull[$i][0])[1].'</span></div><div class="power"><span class="powerText">'.stan($arrBlocksFull[$i][0])[2].' МВт.</span></div></div>';
   }

   $textt2 = '';
   for($i = 0; $i < 4; $i++ ){
           $textt2 = $textt2.'<div class="unitAes"> <div class="unitNameCount">'.$arrBlocksFull[$i][0].'<span class="spanCountBlocks">'.stan($arrBlocksFull[$i][0])[1].'</span></div><div class="power"><span class="powerText">'.stan($arrBlocksFull[$i][0])[2].' МВт.</span></div></div>';
   }

   $textt3 = '';
   for($i = 0; $i < count($arrBlocksFull); $i++ ){
           $textt3 = $textt3.'<div class="unitAes"> <div class="unitNameCount">'.$arrBlocksFull[$i][0].'<span class="spanCountBlocks">'.stan($arrBlocksFull[$i][0])[1].'</span></div><div class="power"><span class="powerText">'.stan($arrBlocksFull[$i][0])[2].' МВт.</span></div></div>';
   }
  


 
    if($_GET['act'] == '1'){
        echo json_encode($arrBlocksFull);
    }

    if($_GET['act'] == '2'){
        echo $textt;
    }

    if($_GET['act'] == '3'){
        echo $textt2;
    }

    if($_GET['act'] == '4'){
        echo $textt3;
    }

    if($_GET['act'] == '5'){
        echo json_encode(cr());
    }

?>					