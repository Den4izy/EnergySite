let v = 1;
let timeDiv = document.getElementById('timeNow');
let timeStan = document.getElementById('timeStan');

function go(dat) {
    let xht = new XMLHttpRequest();
    docBuTes = document.getElementById('buTes');
    docCE = document.getElementById('CE');
    docTets = document.getElementById('Tets');

    xht.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            func(this.responseText);
        }
    }

    if (dat == 1) {

        xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=1", true);
        v = 1;
        timeStan.innerHTML = '';
    }
    if (dat == 2) {

        xht.open("GET", "http://localhost/www/Projects/stanBlocksWork/php/phpFileGet.php?act=2", true);
    }
    if (dat == 3) {
        docTextTime = document.getElementById('textTime');

        let res = docTextTime.value.split('_');


        console.log(res[0]);
        console.log(res[1]);

        console.log(docTextTime.value);

        xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=3&data=" + res[0] + "&time=" + res[1], true);
        v = 3;
        if (docTextTime.value == '') {
            timeStan.innerHTML = "Спробуй ще!";
        }
        else {
            timeStan.innerHTML = 'Станом на ' + res[0] + ' ' + res[1];
        }

    }



    xht.send();

}
go(v);
setInterval(time, 1000);








let doc = document.getElementById('main');
let docSum = document.getElementById('sum');




function func(data) {
    fullArr = JSON.parse(data);
    let arrNorm = fullArr;
    console.log(arrNorm);
    if (docBuTes.checked == false) {
        arrNorm = arrOffButes(arrNorm);
    }
    if (docCE.checked) {
        arrNorm = arrCE(arrNorm);
    }
    if (docTets.checked) {
        arrNorm = arrTes(arrNorm);
    }
    let maximum = max(arrNorm);
    bubbleSort(arrNorm);
    doc.innerHTML = out(maximum, arrNorm);
    docSum.innerHTML = 'Потужність: <b>' + sum(arrNorm) + 'МВт.</b>';



}



function arrOffButes(arr) {                               //робить масів без БуТЕС
    let ar = [];
    for (let i = 0, k = 0; i < arr.length; i++, k++) {
        if (arr[i][0] == 'БуТЕС') {
            k = k - 1;
            continue
        } else {
            ar[k] = arr[i];
        }

    }
    console.log(ar);
    return ar;
}

function arrCE(arr) {
    let ar = [];
    for (let i = 0; i < arr.length; i++) {
        if (arr[i][0] == 'ВугТЕС' || arr[i][0] == 'ЗмТЕС' || arr[i][0] == 'ТрТЕС') {
            ar.push(arr[i]);
        }
    }
    console.log(ar);
    return ar;
}

function arrTes(arr) {
    let ar = [];
    for (let i = 0, k = 0; i < arr.length; i++, k++) {
        if (arr[i][0] == 'КТЕЦ-5' || arr[i][0] == 'КТЕЦ-6' || arr[i][0] == 'ХТЕЦ-5' || arr[i][0] == 'ЗАЕС' || arr[i][0] == 'ЮУАЕС' || arr[i][0] == 'ХАЕС' || arr[i][0] == 'РАЕС') {
            k = k - 1;
            continue
        } else {
            ar[k] = arr[i];
        }
    }
    console.log(ar);
    return ar;
}

function max(arr) {                                //Шукає макстмальну потужність
    let maxi = 0;
    for (let i = 0; i < arr.length - 1; i++) {


        if (Number(arr[i][2]) > maxi) {
            maxi = Number(arr[i][2]);
        }
    }
    return maxi;
}
function out(max, arr) {                              //Робить готову строку html на основі масіва та максимального значення
    let koef = 100 / max;

    let text = '<div class="container">';
    for (let i = 0; i < arr.length; i++) {
        text += '<div class="unit"><div class="name">' + arr[i][0] + '</div><div class="power">' + arr[i][2] + '</div><div class="contScall"><div class="scall" style="width: ' + arr[i][2] * koef + '%"></div></div></div>';

    }
    text += '</div>';
    return text;
}

function bubbleSort(arr) {                                     //Сортує масів по потужності
    for (let i = 0; i < arr.length; i++) {
        let wasSwap = false;
        for (let j = 0; j < arr.length - 1; j++) {
            if (Number(arr[j][2]) < Number(arr[j + 1][2])) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                wasSwap = true;
            }
        }
        if (!wasSwap) break;
    }
    return arr;
};

function sum(arr) {                                       //Загальна сума потужності
    let summ = 0;
    for (let i = 0; i < arr.length; i++) {
        summ += Number(arr[i][2]);
    }
    return summ;
}
function time() {
    let dat = new Date();
    let hour = dat.getHours();
    let min = dat.getMinutes();
    let sec = dat.getSeconds();
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (min < 10) {
        min = '0' + min;
    }
    if (sec < 10) {
        sec = '0' + sec;
    }
    let time = hour + ':' + min + ':' + sec;
    timeDiv.innerHTML = time;


}




