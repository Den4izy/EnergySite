<?php
$arrBlocksFull = array( array("РАЕС", 4 ),
									array("ЗАЕС", 6),
									array("ЮУАЕС", 3),
									array("ХАЕС", 2),
									array("ЛуТЕС", 6),
									array("СлТЕС", 2),
									array("ВугТЕС", 7),
									array("КуТЕС", 7),
									array("КрТЕС", 8),
									array("ПдТЕС", 5),
									array("ЗаТЕС", 6),
									array("ЗмТЕС", 10),
									array("ХТЕЦ-5", 4),
									array("ТрТЕС", 6),
									array("КТЕЦ-5", 4),
									array("КТЕЦ-6", 2),
									array("ЛадТЕС", 6),
									array("БуТЕС", 12),
									array("ДобТЕС", 4)
							); 
$borgs=file_get_contents( "https://disp.ua.energy/Blocksf/" );
$text = iconv('WINDOWS-1251', 'UTF-8', $borgs);
function stan($station){                                      //функція з пареметром назва станції
				global $arrBlocksFull;		//Массів станцій
				global $text;
				
				for($i = 0; $i < count($arrBlocksFull);$i++){
					$pos = strripos($arrBlocksFull[$i][0], $station);
					if($pos !== false){
						$countStation = $i;
					}
				}
				$countBlocks = $arrBlocksFull[$countStation][1];     //знаходими кількість блоків
				
				
				if($station == 'ДобТЕС'){
					preg_match_all('#'.$arrBlocksFull[$countStation][0].'(.*?)<tr><td></td> <td></td>#', $text, $arrText);
				}else{
					preg_match_all('#'.$arrBlocksFull[$countStation][0].'(.*?)'.$arrBlocksFull[$countStation + 1][0].'#', $text, $arrText); //обрізаємо текст даної станції
				}
				$textAll = $arrText[1][0];  //записуємо в переменну
				
				preg_match_all('#<TD class=y>(.*?)</TD>#', $textAll, $arrCount); //обрізаємо тект кількості робочих блоків
				$countWorkBlocks = $arrCount[1][0]; //записуємо в перемінну
				
				
				preg_match_all('#<TD class=R>(.*?)</TD>#', $textAll, $arrAllPower);  //текст загальної потужності
				$allPower = $arrAllPower[1][0];
				$arrFinish  = array($countBlocks, $countWorkBlocks, $allPower);
				return $arrFinish;
			}	
						
							
?>