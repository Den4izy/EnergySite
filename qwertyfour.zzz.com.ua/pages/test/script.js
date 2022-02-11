let container = document.querySelector('.container');
let text = document.querySelector('#text');
let text2 = document.querySelector('#text2');
let tes = document.querySelector('#tes');
let months = ['Січень', 'Лютий', 'Березень', 'Квітень', 'Травень', 'Червень', 'Липень', 'Серпень', 'Вересень', 'Жовтень', 'Листопад', 'Грудень'];
function go() {
    let xht = new XMLHttpRequest();
    let resTes = tes.value;
    let resStart = text.value;
    let resEnd = text2.value;
    let ArrZ = forZapros(resStart, resEnd);
    let arrFull = [];
    for (let i = 0; i < ArrZ.length; i++) {
        xht.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                arrFull = arrFull.concat(JSON.parse(this.responseText));
            }
        }
        xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=5&data1=" + ArrZ[i][0] + "&data2=" + ArrZ[i][1], false);
        xht.send();
    }
    func(arrFull, resTes)
}

function func(data, tes) {

    Arr = data;
    console.log(Arr);
    let resArr = [];
    let countBlock;
    let countColl = Arr.length / 2;
    let numbersBlocks = [];
    for (let iHour = 0; iHour < Arr.length / 2;) {
        for (let iSt = 0; iSt < Arr[iHour].length; iSt++) {             //по станціям
            if (Arr[iHour][iSt][0] == tes) {
                countBlock = Arr[iHour][iSt].length - 3;               //кількість блоків
                for (let iBlock = 0; iBlock < countBlock; iBlock++) {     //цикл по кількості блоків
                    let x = 0;
                    if (Arr[iHour][iSt][iBlock + 3][1] == 'd') {            //вид блоку
                        resArr[iBlock] = [];
                        numbersBlocks.push(Arr[iHour][iSt][iBlock + 3][0]);
                        for (let iColl = 0; iColl < countColl; iColl++) {
                            resArr[iBlock][iColl] = [];
                            resArr[iBlock][iColl][0] = Arr[x][iSt][iBlock + 3][2];
                            
                            
                            
                            
                            
                            
                            console.log(Arr[x + 1][iSt][iBlock + 3][2]);
                            resArr[iBlock][iColl][1] = Arr[x + 1][iSt][iBlock + 3][2];
                            
                            resArr[iBlock][iColl][2] = Arr[x][iSt][iBlock + 3][4];
                            resArr[iBlock][iColl][3] = Arr[x + 1][iSt][iBlock + 3][4];
                            x = x + 2;
                        }
                    }
                    else {
                        resArr[iBlock] = [];
                        numbersBlocks.push(Arr[iHour][iSt][iBlock + 3][0]);
                        for (let iColl = 0; iColl < countColl; iColl++) {
                            resArr[iBlock][iColl] = [];
                            resArr[iBlock][iColl][0] = Arr[x][iSt][iBlock + 3][2];
                            resArr[iBlock][iColl][1] = Arr[x + 1][iSt][iBlock + 3][2];
                            x = x + 2;
                        }
                    }

                }
            }
        }
        iHour = iHour + 2;

    }
    container.innerHTML = createTable(resArr, numbersBlocks, countColl);
}

function createTable(arr, arr2, days) {
    let resStart = text.value;
    let resText = arrData(resStart, days);
    for (let iBlock = 0; iBlock < arr.length; iBlock++) {
        arr[iBlock] = transpose(arr[iBlock]);
        resText += '';
        for (let iStan = 0; iStan < arr[iBlock].length; iStan++) {
            if (iStan == 0) {
                if (arr[iBlock].length == 2) {
                    resText += '<tr><td colspan="2" rowspan="' + arr[iBlock].length + '" class="monoblok">' + arr2[iBlock] + '</td>';
                }
                else {
                    resText += '<tr><td rowspan="' + arr[iBlock].length + '" class="numberBlock">' + arr2[iBlock] + '</td>';
                }
                if (arr[iBlock].length == 4) {
                    b = true;
                    if (arr[iBlock].length) {
                        resText += '<td rowspan="2">A</td>'
                    }
                }
            }
            if (b == true) {
                if (iStan == 2) {
                    resText += '<td rowspan="2">Б</td>'
                }
            }
            else {

                resText += '<tr>';
            }
            for (let iHour = 0; iHour < arr[iBlock][iStan].length; iHour++) {
                resText += '<td class ="' + arr[iBlock][iStan][iHour] + '"></td>';
            }
            resText += '</tr>';
        }
        if (iBlock == arr.length - 1) {
            resText += '</table>';
        }
        else {
            let daysPr = days + 2;
            resText += '<tr><td class="otstup" colspan="' + daysPr + '"></td></tr>';
        }
    }
    return resText;
}

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
function arrData(startData, da) {
    let days = da;
    let month;
    let arrFull = [];
    let arr = startData.split('.');
    arr.reverse();
    let strData = arr[0] + '-' + arr[1] + '-' + arr[2];
    let D = new Date(strData);
    let monthStart = D.getMonth();
    D.setDate(D.getDate() + days - 1);
    let monthEnd = D.getMonth();
    month = monthEnd - monthStart;
    D = new Date(strData);
    let d = 0
    if (days != 0) {
        for (let iM = 0; iM < month + 1; iM++) {
            arrFull[iM] = [];
            for (let iD = 0; ; iD++) {
                if (iD == 0 && iM == 0) {
                    arrFull[iM][iD] = D.getDate();
                    d++;
                    iD++;
                }
                D.setDate(D.getDate() + 1);
                let stM = D.getMonth();
                D.setDate(D.getDate() + 1);
                if (stM == D.getMonth()) {
                    D.setDate(D.getDate() - 1);
                    arrFull[iM][iD] = D.getDate();
                    d++;
                }
                else {
                    D.setDate(D.getDate() - 1);
                    arrFull[iM][iD] = D.getDate();
                    d++;
                    break;
                }
                if (d >= days) {
                    break;
                }
            }
        }
    }
    return createTableData(arrFull, strData);
}

function createTableData(arr, startData) {
    console.log(arr);
    let = resText = '';
    if (arr.length != 0) {
        let D = new Date(startData);
        let days = 0;
        resText += '<table><tr>';
        resText += '<td class="leftUpCorner" colspan="2" rowspan="2"></td>';
        for (let i = 0; i < arr.length; i++) {
            days += arr[i].length;

            D.setMonth(D.getMonth() + i);
            let month = D.getMonth();
            resText += '<td class="tdMonth" colspan="' + days + '">' + months[month] + '</td>';
        }
        resText += '</tr><tr>';
        D = new Date(startData);
        for (let i = 0; i < days; i++) {
            resText += '<td>' + D.getDate() + '</td>';
            D.setDate(D.getDate() + 1);
        }
        resText += '</tr>';
    }
    else {
        resText = '';
    }
    return resText
}

function forZapros(data1, data2) {
    let dataSt = convertData(data1);
    let arr1 = data1.split('.');
    let arr2 = data2.split('.');
    let month = arr2[1] - arr1[1];
    D = new Date(dataSt);
    let resArr = [];
    for (let iM = 0; iM < month + 1; iM++) {
        resArr[iM] = []
        if (iM == 0) {
            let m = D.getMonth() + 1
            if (m < 10) {
                m = '0' + m;
            }
            if (month == 0) {
                resArr[iM][0] = data1;
                resArr[iM][1] = data2;
                continue;
            }
            resArr[iM][0] = data1;
            resArr[iM][1] = daysInMonth(D.getMonth(), '2022') + '.' + m + '.2022';
            continue;
        }
        if (iM == month) {
            let m = D.getMonth() + iM + 1;
            if (m < 10) {
                m = '0' + m;
            }
            resArr[iM][0] = '01.' + m + '.2022';
            resArr[iM][1] = data2;
            continue;
        }
        let m = D.getMonth() + iM + 1;
        if (m < 10) {
            m = '0' + m;
        }
        let mU = D.getMonth() + iM;
        resArr[iM][0] = '01.' + m + '.2022';
        resArr[iM][1] = daysInMonth(mU, '2022') + '.' + m + '.2022';
    }
    return resArr;
}

function convertData(data) {
    let arr = data.split('.');
    arr.reverse();
    let resData = arr[0] + '-' + arr[1] + '-' + arr[2];
    return resData
}

function daysInMonth(iMonth, iYear) {
    return 32 - new Date(iYear, iMonth, 32).getDate();
}





