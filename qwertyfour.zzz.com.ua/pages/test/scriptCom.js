//ініціалізуємо DOM елементи
let container = document.querySelector('.container');
let text = document.querySelector('#text');
let text2 = document.querySelector('#text2');
let tes = document.querySelector('#tes');
//let tes2 = document.querySelector('#tes2');
//масів місяців
let months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень',
    'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'
];
let stations =['ТрТЕС','ВугТЕС','ЗмТЕС','РАЕС','ЗАЕС','ЮУАЕС','ХАЕС','ЛуТЕС',
    'СлТЕС','КуТЕС','КрТЕС','ПдТЕС','ЗаТЕС',
    'ХТЕЦ-5','КТЕЦ-5','КТЕЦ-6','ЛадТЕС','БуТЕС','ДобТЕС'
];

for(let i = 1;i < stations.length;i++){
    tes.innerHTML +=  '<option value="' + stations[i] + '">' + stations[i] + '</option>';    
}
tes.innerHTML += ' </select>';

let startConstDate = '2022-01-07';
let endConstDate = curentDateMinus();

text.value = startConstDate;
text.min = startConstDate;
text.max = endConstDate;
text2.value = startConstDate;
text2.min = startConstDate;
text2.max = endConstDate;


function dat1(){
    text2.min = text.value;
    let D1 = new Date(text2.min);
    let D2 = new Date(text2.value);
  
    if(D2 <= D1){
        text2.value = text2.min
       
    }
}
function dat2(){
     text.max = text2.value;
     let D1 = new Date(text.max);
     let D2 = new Date(text.value);
     if(D1 <= D2){
        text.value = text.max
       
     }
}




//стартова ф-я реалізується кнопкою
function go() {
    //створюємо запрос
    let xht = new XMLHttpRequest();
    //витягуємо значення DOM елементів
    let resTes = tes.value;
    let resStart = text.value;
    let resEnd = text2.value;
    let re = /-/gi;
    resStart = resStart.replace(re, '.');
    resStart = convertDataJ(resStart);
    resEnd = resEnd.replace(re, '.');
    resEnd = convertDataJ(resEnd);


   

 
    //ініціалізуємо масів для запроса з метода, який формує масів діапазона дат кожного місяця 
    let ArrZ = forZapros(resStart, resEnd);

    //масів для кінцевого результату де буде результат всьої ф-ї тобто 
    let arrFull = [];
    //в циклі виконуємо запрос для кожного діапазона дат та сумуємо це в один єдиний масів
   
    for (let i = 0; i < ArrZ.length; i++) {
        //ф-я виконується при виконанні запроса
        xht.onreadystatechange = function () {
            //перевіряємо виконання запроса
            if (this.readyState == 4 && this.status == 200) {
                //сумуємо все в один масів і відразу конвертуємо його з JSON
                // this.responseText це результат запроса
                arrFull = arrFull.concat(JSON.parse(this.responseText));

            }
        }
        //параметри запроса
        xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=5&data1=" + ArrZ[i][0] + "&data2=" + ArrZ[i][1], false);
        //надсилання запроса
        xht.send();
    }
    //визиваємо ф-ю з параметрами загальним отриманим масівом та назвою станції
   

    func(arrFull, resTes)
}

//функція яка формує спец. масів по стану блоків конкретної станції
function func(data, tes) {
    //вхідний масів
    Arr = data;

 for (let iHour2 = 0; iHour2 < Arr.length;iHour2++) {
     for (let iSt2 = 0; iSt2 < Arr[iHour2].length; iSt2++) {
            //якщо станція знайдена
            if (Arr[iHour2][iSt2][0] == 'МирТЕС') {
                
Arr[iHour2].splice(iSt2, 1);
            }
     }
}




    //кінцевий масів
    let resArr = [];
    //кількість блоків
    let countBlock;
    //кількість днів(колонки) половина масіва так як в кожному дні 2 результата
    let countColl = Arr.length / 2;
    //масів з нумераціями блоків
    let numbersBlocks = [];
    //цикл по кожному дню
    for (let iHour = 0; iHour < Arr.length / 2;) {
        //цикл по станціям
        for (let iSt = 0; iSt < Arr[iHour].length; iSt++) {
            //якщо станція знайдена
            if (Arr[iHour][iSt][0] == tes) {
                //визначаємо кількість блоків(так як перші 3 параметри не є блоками)
                countBlock = Arr[iHour][iSt].length - 3;
                //цикл по блокам
                for (let iBlock = 0; iBlock < countBlock; iBlock++) {
                    //для добавлення годин в циклі   
                    let x = 0;
                    //якщо блок є дубль блоком
                    if (Arr[iHour][iSt][iBlock + 3][1] == 'd') {
                        //масів даних блока та вказуємо що блок є масівом          
                        resArr[iBlock] = [];
                        //дописуємо номер блоку в масів нумерацій блоків
                        numbersBlocks.push(Arr[iHour][iSt][iBlock + 3][0]);
                        //цикл по дням
                        for (let iColl = 0; iColl < countColl; iColl++) {
                            //вказуємо шо стан кожного блоку є масівом з днями
                            resArr[iBlock][iColl] = [];
                            //присоюємо стану блока стан по кожному дню
                            resArr[iBlock][iColl][0] = Arr[x][iSt][iBlock + 3][2];
                            resArr[iBlock][iColl][1] = Arr[x + 1][iSt][iBlock + 3][2];
                            resArr[iBlock][iColl][2] = Arr[x][iSt][iBlock + 3][4];
                            resArr[iBlock][iColl][3] = Arr[x + 1][iSt][iBlock + 3][4];
                            //переходимо на наступний день через 2 записа в масиві так як день це 2 години тобто 2 записа
                            x = x + 2;
                        }
                    }
                    //якщо моноблок
                    else {
                        //масів даних блока та вказуємо що блок є масівом
                        resArr[iBlock] = [];
                        //дописуємо номер блоку в масів нумерацій блоків
                        numbersBlocks.push(Arr[iHour][iSt][iBlock + 3][0]);
                        //цикл по дням
                        for (let iColl = 0; iColl < countColl; iColl++) {
                            //вказуємо шо стан кожного блоку є масівом з днями
                            resArr[iBlock][iColl] = [];
                            //присоюємо стану блока стан по кожному дню
                            resArr[iBlock][iColl][0] = Arr[x][iSt][iBlock + 3][2];
                            resArr[iBlock][iColl][1] = Arr[x + 1][iSt][iBlock + 3][2];
                            //переходимо на наступний день через 2 записа в масиві так як день це 2 години тобто 2 записа
                            x = x + 2;
                        }
                    }

                }
            }
        }
        //переходимо на наступний день через 2 записа в масиві так як день це 2 години тобто 2 записа
        iHour = iHour + 2;

    }
    //записумо в DOM елемент методом з параметрами масів який получили, масівв нумерації блоків, кількість колонок(днів)
    container.innerHTML = createTable(resArr, numbersBlocks, countColl);
}
//ф-я формує текст таблиці з станами блоків(масів стана блоків, масів нумерації блоків, кількість днів)
function createTable(arr, arr2, days) {
    // беремо початкову дату з DOM елемента
    let resStart = text.value;
    //масів дат з ф-ї(початкова дата, кількість днів) текст шапки таблиці з датами
    let resText = arrData(resStart, days);
    //цикл по вхідному масіву кількості блоків
    for (let iBlock = 0; iBlock < arr.length; iBlock++) {
        //транспонуємо масів щоб перебір робити не по блокам а по дням
        arr[iBlock] = transpose(arr[iBlock]);


        // цикл по станам блока
        for (let iStan = 0; iStan < arr[iBlock].length; iStan++) {
            let b = true;
            //якщо перша ітерація то робимо лівий заголовок(№блока та корпус якщо потрібно)
            if (iStan == 0) {
                //якщо довжина блока 2 то це моноблок
                if (arr[iBlock].length == 2) {
                    //записуємо 1-й стовпчик на 2 ячейки по горизонталі а по вертикалі довжину стана блока та вписуємо номер блоку
                    resText += '<tr><td colspan="2" rowspan="' + arr[iBlock].length + '" class="monoblok">' + arr2[iBlock] + '</td>';
                }
                else {
                    //інакше дубль блок, 1 стовчик на 4 по вертикалі та вписуєм туда номер блоку 
                    resText += '<tr><td rowspan="' + arr[iBlock].length + '" class="numberBlock">' + arr2[iBlock] + '</td>';
                }
                //якщо дубль блок то вписуємо номер корпусу
               
                if (arr[iBlock].length == 4) {
                    //якщо тру то дубль блок
                    b = true;
                    //вписуємо корпус А
                    resText += '<td rowspan="2" class="korpus">A</td>'
                }
            }
            //перевіряємо чи ми проходимо цикл по дубльблоку
            if (b == true) {
                //якщо 2-га ітерація тобто 3 рядок дубльблока то вписуємо корпус Б
                if (iStan == 2) {
                    //вписуємо корпус Б
                    resText += '<td rowspan="2" class="korpus">Б</td>'
                }
            }
            else {
                //не знаю навіщо це, працює і без нього)) 
                resText += '<tr>';
            }//цикл по стану кожну годину
            for (let iHour = 0; iHour < arr[iBlock][iStan].length; iHour++) {
                //добавляємо ячейку з класом відповідного стану, для подальшого присвоїння кольору
                resText += '<td class ="' + arr[iBlock][iStan][iHour] + '"></td>';
            }
            //закриваємо рядок таблтці
            resText += '</tr>';
        }
        //якщо останній рядок то закриваємо таблицю
        if (iBlock == arr.length - 1) {
            //закриваєм таблицю
            resText += '</table>';
        }
        //якщо рядок не останній робим пропуск після кожного блоку
        else {
            //визначаємо на скілько розтягувати ячейку по горизонталі(кількість днів + 2 ячейки лівого заголовку)
            let daysPr = days + 2;
            //задаємо ячейку пропуска 
            resText += '<tr><td class="otstup" colspan="' + daysPr + '"></td></tr>';
        }
    }
    //вертаємо результат ф=ї(текст таблиці)

    return resText;
}

//ф-я транспонує масів( не знаю як працює, не внікав, взяв готову з інтернета)
function transpose(a) {
    let w = a.length || 0;
    let h = a[0] instanceof Array ? a[0].length : 0;
    if (h === 0 || w === 0) { return []; }
    let i, j, t = [];
    for (i = 0; i < h; i++) {
        t[i] = [];
        for (j = 0; j < w; j++) {
            t[i][j] = a[j][i];
        }
    }
    return t;
}
//ф-я робить масів місяців з датами для шапки таблиці(початкова дата, кількість днів)
function arrData(startData, da) {

    //кількість днів
    let days = da;
    //місяць
    let month;
    //кінцевий масів
    let arrFull = [];
    //конвертуєму дату в правильний JS формат з чч.мм.рррр в рррр.мм.чч
    let strData = startData;

    //встановлюємо дату початкового дня
    let D = new Date(strData);
    //витягуємо початковий місяць
    let monthStart = D.getMonth();
    //встановлюємо дату кінцевого дня
    D.setDate(D.getDate() + days - 1);
    //витягуємо кінцеви місяць
    let monthEnd = D.getMonth();
    //визначаємо кількість місяців
    month = monthEnd - monthStart;
    //вертаємо дату на початок
    D = new Date(strData);
    //для ітерації кожного дня
    let d = 0
    //якщо кількість днів не 0
    if (days != 0) {
        //цикл по місяцям
        for (let iM = 0; iM < month + 1; iM++) {
            //вказуємо що кожен місяць це масів
            arrFull[iM] = [];
            //цикл по дням кожного місяця
            for (let iD = 0; ; iD++) {
                //якщо день і місяць є початковими то витягуємо просто початкову дату
                if (iD == 0 && iM == 0) {
                    //присвоюємо початкову дату
                    arrFull[iM][iD] = D.getDate();
                    //додаємо до кількості загальних днів
                    d++;
                    //додаємо до кількості днів місяця
                    iD++;
                }
                //встановлюємо дату на 1 день вперед
                D.setDate(D.getDate() + 1);
                //витягуємо місяць
                let stM = D.getMonth();
                //встановлюємо дату на 1 день вперед
                D.setDate(D.getDate() + 1);
                //перевіряємо чи не змінився місяць через 1 день
                if (stM == D.getMonth()) {
                    //вертаємо дату на 1 день назад
                    D.setDate(D.getDate() - 1);
                    //додаємо до масіва поточного місяця число дня
                    arrFull[iM][iD] = D.getDate();
                    //переходимо на наступний день місяця
                    d++;
                }
                //якщо в наступному дні місяць змінився
                else {
                    //вертаємо дату на 1 день назад
                    D.setDate(D.getDate() - 1);
                    //додаємо в масів місяця число дня(останнє число в місяці)
                    arrFull[iM][iD] = D.getDate();
                    //прерходимо на наступний день
                    d++;
                    //виходимо з цикла місяця і переходимо на наступний місяць
                    break;
                }//якщо кількість днів цикла більша чи рівна загальній кількості днів
                if (d >= days) {
                    //виходимо повністю з цикла
                    break;
                }
            }
        }
    }
    //вертаємо дані в ф-ю(результат ф-ї(масів), початкова дата)
   
    return createTableData(arrFull, strData);
}
//створює текст шапки таблиці з датами
function createTableData(arr, startData) {
   
    //кінцевий текст
    let = resText = '';
    //якщо масів не пустий
    if (arr.length != 0) {
        //початкова дата
        let D = new Date(startData);
        //кількість днів
        let days = 0;
        let days2 = 0;
        //початок таблиці та нового рядка
        resText += '<table><tr>';
        //перша ячейка шапки(2х2)
        resText += '<td class="leftUpCorner" colspan="2" rowspan="2"></td>';
        //цикл по місяцям
console.log(arr.length);
        for (let i = 0; i < arr.length; i++) {
            //кількість днів для розтягування ячейки по горизонталі(незнаю чому додаємо)
            days += arr[i].length;
            days2 = arr[i].length;
console.log('days ' + days); 
            //додаємо до дати 1 місяць
            if(i == 0){
                D.setMonth(D.getMonth());
            }
            else{
                D.setMonth(D.getMonth() + 1);
            }
           
            //отримуємо номер місяця
console.log('month ' + D.getMonth()); 
            let month = D.getMonth();
            //вписуємо назву місяця по готовому масіву з назвами і розтягуємо по горизонталі на кількімть днів
            resText += '<td class="tdMonth" colspan="' + days2 + '">' + months[month] + '</td>';
        }
        //закриваємо і відкриваємо новий рядок
        resText += '</tr><tr>';
        //встановлюємо початкову дату
        D = new Date(startData);
        //цикл по всіх днях
        for (let i = 0; i < days; i++) {
            //додаємо ячейку з числом
            resText += '<td class="day">' + D.getDate() + '</td>';
            //переходим на наступний день
            D.setDate(D.getDate() + 1);
        }
        //закриваємо рядок
        resText += '</tr>';
    }
    //якщо масів пустий(нема данних)
    else {
        //нічого не пишем
        resText = '';
    }
    //вертаємо получений текст таблиці
    return resText
}
//ф-я робитьмасів в яких вказана початкова і кінцева дата кожного місяця в звдвному діапазоні дат(початкова дата, кінцева дата)
function forZapros(data1, data2) {
    //конвертуємо дату в правельний формат
    let dataSt = convertData(data1);
    // визначаємо місяці початка і кінця
    let arr1 = data1.split('.');
    let arr2 = data2.split('.');
    //знаходим кількість місяців
    let month = arr2[1] - arr1[1];
    //встановлюємо початкову дату
    D = new Date(dataSt);
    //кінцевий масів
    let resArr = [];
    //цикл по місяцям
    for (let iM = 0; iM < month + 1; iM++) {
        //вказуємо що місяць це масів
        resArr[iM] = [];
        //якщо перший місяць
        if (iM == 0) {
            //витягуємо номер місяця
            let m = D.getMonth() + 1
            //робимо привабливий формат( добавляємо нуль до одної цифри)
            if (m < 10) {
                m = '0' + m;
            }
            //якшо місяць всього один
            if (month == 0) {
                //просто вписуємо початкову і кінцеву дати до масіва
                resArr[iM][0] = data1;
                resArr[iM][1] = data2;
                //виходимо з ітерації
                continue;
            }
            //присвоюємо початкову дату пешого місяці
            resArr[iM][0] = data1;
            //присвоюємо дату кінця місяця в поточному місяці
            //ф-ю яка визначає кількість днів у місяці визнвчаємо кінцеве число місяця
            resArr[iM][1] = daysInMonth(D.getMonth(), '2022') + '.' + m + '.2022';
            //виходимо з ітерації
            continue;
        }
        //якщо місяць ітерації дорівнює кількості місяців(остання ітерація)
        if (iM == month) {
            //визначаємо номер місяця
            let m = D.getMonth() + iM + 1;
            //привабливий формат
            if (m < 10) {
                m = '0' + m;
            }
			//ставим початкову дату як 1 число поточного місяця(останнього)
            resArr[iM][0] = '01.' + m + '.2022';
			//ставим кінцеву дату як повністю кінцеву так як це останній місяць
            resArr[iM][1] = data2;
			//виходимо з ітерації
            continue;
        }
		//переходимо на наступний місяць
        let m = D.getMonth() + iM + 1;
		//привабливий формат
        if (m < 10) {
            m = '0' + m;
        }
		//номер місяця на 1 менше дял функції щоб визначити кількість днів
        let mU = D.getMonth() + iM;
		//додаємо почткову дату як початок місяця
        resArr[iM][0] = '01.' + m + '.2022';
		//додаємо кінцеву дату як кінець місяця
        resArr[iM][1] = daysInMonth(mU, '2022') + '.' + m + '.2022';
    }
    for(let iM = 0;iM < resArr.length;iM++){
        for(let iD = 0;iD < resArr[iM].length;iD++){
            resArr[iM][iD] = convertDataJ(resArr[iM][iD]);
        }

    }
	//вертаємо отриманий масів
    return resArr;
}
//ф-я конвертує дату в правильний формат
function convertData(data) {
    let arr = data.split('.');
    arr.reverse();
    let resData = arr[0] + '-' + arr[1] + '-' + arr[2];
    return resData
}

function convertDataJ(data) {
    let arr = data.split('.');
    arr.reverse();
    let resData = arr[0] + '.' + arr[1] + '.' + arr[2];
    return resData
}

//ф-я визначає кількість днів місяця
function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}

function curentDateMinus(){
    let D = new Date();
    D.setDate(D.getDate() - 1);
    let day = D.getDate();
    let month = D.getMonth();
    month += 1;
    let year = D.getFullYear();
    if (day < 10) {
        day = '0' + day;
    }
    if (month < 10) {
        month = '0' + month;
    }
    let text = year + '-' + month + '-' + day;
    return text;

}





									