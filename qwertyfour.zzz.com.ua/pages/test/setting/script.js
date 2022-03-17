let data = document.querySelector("#data");
let hour = document.querySelector("#hour");
let tes = document.querySelector("#tes");
let but = document.querySelector("#but");
let main = document.querySelector("#divMain");

let menu =
    '<option value="Реконструкція">Реконструкція</option>' +
    '<option value="Капітальний ремонт">Капітальний ремонт</option>' +
    '<option value="Середній ремонт">Середній ремонт</option>' +
    '<option value="Поточний ремонт">Поточний ремонт</option>' +
    '<option value="Аварійний ремонт">Аварійний ремонт</option>' +
    '<option value="Концервація">Концервація</option>' +
    '<option value="Резерв">Резерв</option>' +
    '<option value="Відсутність палива">Відсутність палива</option>' +
    '<option value="В роботі">В роботі</option>'
    ;



function go(date) {

    let xht = new XMLHttpRequest();
    xht.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            func(this.responseText,);
        }
    };

    if (date == 1) {
        let dataV = convertDataJ(data.value);
        let hourV = hour.value;
        xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=3&data=" + dataV + "&time=" + hourV, true);
    }

    xht.send();
}

let arrFull = [];
let arrStation = [];
let arrBuff = [];
let i = 0;




function func(data) {
    i = 0;
    let tesV = tes.value;
    arrFull = JSON.parse(data);
    console.log(arrFull);
    arrStation = [];
    // Перебираємо масів станцій
    for (let iSt = 0; iSt < arrFull.length; iSt++) {
        // находим потрібну станцію
        if (arrFull[iSt][0] == tesV) {
            //записуємо наш масів станції
            arrStation = arrFull[iSt];
        }
    }
    console.log(arrStation);

    let outText = '';
    let numberBlock = '';
    let doubleBlock = '';
    // цикл по блокам

    for (let iBl = 3; iBl < arrStation.length; iBl++) {
        numberBlock = arrStation[iBl][0];
        doubleBlock = arrStation[iBl][1];
        if (doubleBlock == 'd') {
            let corpusA = arrStation[iBl][2];
            let corpusB = arrStation[iBl][4];
            arrBuff.push(corpusA);
            arrBuff.push(corpusB);
            i += 1;
            outText += 'K-' + numberBlock + 'A<select name="' + i + '" size="1"><option disabled>Стан</option><option selected value="' + stanSwitch(corpusA) + '">' + stanSwitch(corpusA) + '</option>' + menu + '</select>';
            i += 1;
            outText += 'K-' + numberBlock + 'Б<select name="' + i + '" size="1"><option disabled>Стан</option><option selected value="' + stanSwitch(corpusB) + '">' + stanSwitch(corpusB) + '</option>' + menu + '</select>';
            i += 1;
            outText += 'Потужність<input name="' + i + '" type="text"><hr>';
        }
        if (doubleBlock == 'm') {
            let blockMono = arrStation[iBl][2];
            arrBuff.push(blockMono);
            i += 1;
            outText += 'Бл.' + numberBlock + '<select name="' + i + '" size="1"><option disabled>Стан</option><option selected value="' + stanSwitch(blockMono) + '">' + stanSwitch(blockMono) + '</option>' + menu + '</select>';
            i += 1;
            outText += 'Потужність<input name="' + i + '" type="text"><hr>';


        }



    }
    outText += ' <input id="but2" type="button" value="save" onclick="but2()">'
    main.innerHTML = outText;



}

function but2() {
    let arrRes = [];
    for (let ik = 0; ik < i; ik++) {
        ik += 1;
        let el = document.getElementsByName(ik);
        ik = ik - 1;
        arrRes[ik] = stanSwitchConvert(el[0].value);
    }
    console.log(arrRes);
    let i3 = 0;
    for (let i2 = 3; i2 < arrStation.length; i2++) {

        if (arrStation[i2][1] == 'd') {
            //Якщо жоден з корпусів не в роботі а в загальному стані блоку стоїть якесь навантаження(цифра)
            //Потрібно для того щоб якщо блок був в роботі будь-який з корпусів, а змінили його на не в роботі
            //будь-який стан то таким чином ми цифри навантаження замінюємо іншим станом, щоб не світилося на ньому навантаження
            if (arrRes[i3] != 'inWork' & arrRes[i3 + 1] != 'inWork' & isNaN(parseInt(arrStation[i2][3], 10)) == false) {
                //То ми змінюємо цифру загального стану блоку на стан корпуса А
                arrStation[i2][3] = arrRes[i3];
            }
            arrStation[i2][2] = arrRes[i3];
            i3 += 1;
            arrStation[i2][4] = arrRes[i3];
            i3 += 1;
            if (arrStation[i2][2] == 'inWork' | arrStation[i2][4] == 'inWork') {
                if (isNaN(parseInt(arrStation[i2][3], 10)) == true) {
                    arrStation[i2][3] = arrRes[i3];
                    i3 += 1;
                }
                else {
                    i3 += 1;
                }
            } else {
                i3 += 1;
            }
        }
        if (arrStation[i2][1] == 'm') {
            if (arrRes[i3] == 'inWork') {
                i3 += 1;
                arrStation[i2][2] = arrRes[i3];
                i3 += 1;
            }
            else {
                if (arrRes[i3] == '') {
                    i3 += 1;
                }
                arrStation[i2][2] = arrRes[i3];
                i3 += 1;
            }
        }
    }
    console.log(arrStation);
    for (let iSt = 0; iSt < arrFull.length; iSt++) {
        // находим потрібну станцію
        if (arrFull[iSt][0] == tes.value) {
            //записуємо наш масів станції
            arrFull[iSt] = arrStation;
        }
    }
    console.log(arrFull);

    console.log(i);
    console.log(textWithArr(arrFull));



    let xht2 = new XMLHttpRequest();
    xht2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText,);
        }
    };


    xht2.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=6&data1=" + textWithArr(arrFull) + "&data2=" + convertDataJ(data.value) + "&data3=" + hour.value, true);


    xht2.send();

}


function textWithArr(date) {
    let str = ',';
    for (let ik = 0; ik < date.length; ik++) {
        str += date[ik][0];
 str += ',';
        str += date[ik][1];
 str += ',';
console.log(date[ik][1]);
        str += date[ik][2];
 str += ',';
        for (let ik2 = 3; ik2 < date[ik].length; ik2++) {
            for (let x = 0; x < date[ik][ik2].length; x++) {
                str += date[ik][ik2][x] + ',';
            }
        }
    }
    return encodeURIComponent(str);
}








function convertDataJ(data) {
    let arr = data.split('-');
    let resData = arr[0] + '.' + arr[1] + '.' + arr[2];
    return resData
}


function stanSwitchConvert(data) {
    let out = '';
    let input = data;
    switch (input) {
        case 'Реконструкція':
            out = 'clMaroon';
            break;
        case 'Капітальний ремонт':
            out = 'clOlive';
            break;
        case 'Середній ремонт':
            out = 'clGreen';
            break;
        case 'В роботі':
            out = 'inWork';
            break;
        case 'Концервація':
            out = 'clTeal';
            break;
        case 'Відсутність палива':
            out = 'clYellow';
            break;
        case 'Аварійний ремонт':
            out = 'clRed';
            break;
        case 'Поточний ремонт':
            out = 'clNavy';
            break;
        case 'Резерв':
            out = 'clSilver';
            break;
        default:
            out = data;
    }
    return out;
}

function stanSwitch(data) {

    let out = '';




    let input = data.trim();
    switch (input) {
        case "clMaroon":
            out = 'Реконструкція';
            break;
        case "clMaroon2v":
            out = 'Реконструкція';
            break;
        case "clMaroon2n":
            out = 'Реконструкція';
            break;
        case "clOlive":
            out = 'Капітальний ремонт';
            break;
        case "clOlive2v":
            out = 'Капітальний ремонт';
            break;
        case "clOlive2n":
            out = 'Капітальний ремонт';
            break;
        case "clGreen":
            out = 'Середній ремонт';
            break;
        case "clGreen2v":
            out = 'Середній ремонт';
            break;
        case "clGreen2n":
            out = 'Середній ремонт';
            break;
        case "py_n":
            out = 'В роботі';
            break;
        case "py_v":
            out = 'В роботі';
            break;
        case "inWork":
            out = 'В роботі';
            break;
        case "clTeal":
            out = 'Концервація';
            break;
        case "clTeal2v":
            out = 'Концервація';
            break;
        case "clTeal2n":
            out = 'Концервація';
            break;
        case "clYellow":
            out = 'Відсутність палива';
            break;
        case "clYellow2v":
            out = 'Відсутність палива';
            break;
        case "clYellow2n":
            out = 'Відсутність палива';
            break;
        case "clRed":
            out = 'Аварійний ремонт';
            break;
        case "clRed2v":
            out = 'Аварійний ремонт';
            break;
        case "clRed2n":
            out = 'Аварійний ремонт';
            break;
        case "clNavy":
            out = 'Поточний ремонт';
            break;
        case "clNavy2v":
            out = 'Поточний ремонт';
            break;
        case "clNavy2n":
            out = 'Поточний ремонт';
            break;
        case "clSilver":
            out = 'Резерв';
            break;
        case "clSilver2v":
            out = 'Резерв';
            break;
        case "clSilver2n":
            out = 'Резерв';
            break;
        default:
            out = data;
    }

    return out;
}	