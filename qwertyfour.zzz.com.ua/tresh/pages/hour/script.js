let container = document.querySelector('.container');
let check = document.getElementById('check');
let text = document.querySelector('#text');
let startConstDate = '2022-01-07';
let endConstDate = curentDate();
text.value = endConstDate;
text.min = startConstDate;
text.max = endConstDate;
let res = '';

function go(data) {
    let xht = new XMLHttpRequest();
    xht.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            func(this.responseText);
        }
    };
    if (data == 1) {
        xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=1", true);
    }
    if (data == 3) {
        let docTextTime = document.getElementById('text');
        res = docTextTime.value.split('_');
        xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=3&data=" + res[0] + "&time=" + res[1], true);
    }
    if (data == 4) {
        res = text.value;
        let re = /-/gi;
        res = res.replace(re, '.');
console.log(res);
        xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=4&data=" + res, true);
    }
    if (data == 5) {
        let dat = new Date();
        let day = dat.getDate();
        let month = dat.getMonth() + 1;
        let year = dat.getFullYear();
        if (day < 10) {
            day = '0' + day;
        }
        if (month < 10) {
            month = '0' + month;
        }
        res = year + "." + month + "." + day;
        let res2 = day + "." + month + "." + year;
        xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=4&data=" + res, true);
        let docTextTime = document.getElementById('text');
        docTextTime.value = res2;
    }
    xht.send();
}

function convertDataJ(data) {
    let arr = data.split('.');
    arr.reverse();
    let resData = arr[0] + '.' + arr[1] + '.' + arr[2];
    return resData;
}

function curentDate() {
    let D = new Date();
    D.setDate(D.getDate());
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

function func(data) {
console.log(data);
    let Arr = JSON.parse(data);

    let Arr2 = [];
    for (let i = 0; i < Arr.length; i++) {
        Arr2[i] = arrOffAes(Arr[i]);
    }
    let Arr3 = [];
    for (let i = 0; i < Arr2.length; i++) {
        Arr3[i] = arrTes(Arr2[i]);
    }
    container.innerHTML = out(Arr3);
}

function arrOffAes(arr) {
    let ar = [];
    for (let i = 4; i < arr.length; i++) {
        ar.push(arr[i]);
    }
    return ar;
}

function arrTes(arr) {
    let ar = [];
    for (let i = 0, k = 0; i < arr.length; i++, k++) {
        if (arr[i][0] == '????????-5' || arr[i][0] == '????????-6' || arr[i][0] == '????????-5') {
            k = k - 1;
            continue;
        } else {
            ar[k] = arr[i];
        }
    }
    return ar;
}

function convertData(data) {
    let arr = data.split('.');
    arr.reverse();
    let resData = arr[0] + '.' + arr[1] + '.' + arr[2];
    return resData;
}

function out(arr) {
    let text = '<table>';
    text += '<tr class="tableName">';
    if (check.checked == true) {
        text += '<td rowspan="1" class="hour">' + convertDataJ(res) + '</td>';
    }
    
    text += '<td> </td><td> </td><td> </td>';
    text += '<td> </td><td> </td><td> </td>';
    text += '<td colspan="3">??????????</td>';
    text += '<td colspan="3">????????????</td>';
    text += '<td colspan="3">????????????</td>';
    text += '<td colspan="3">??????????</td>';
    text += '<td> </td><td> </td><td> </td>';
    text += '<td colspan="3">??????????</td>';
    text += '<td colspan="3">??????????</td>';
    text += '<td colspan="3">??????????</td>';
    text += '<td colspan="3">??????????</td>';
    text += '<td colspan="3">??????????</td>';
    text += '<td colspan="3">????????????</td>';
    text += '<td colspan="3">??????????</td>';
    text += '<td colspan="3">????????????</td>';
    text += '</tr>';
    text += '<tr>';
    if (check.checked == true) {
        text += '<td class="legend">????????????</td>';
    }
    for (let i = 1; i < 16; i++) {
        if (i == 1 || i == 2 || i == 7) {
            text += '<td> </td><td> </td><td> </td>';
        }
        else {
            text += '<td class="legend">??????</td><td class="legend">?????????????????? ????????????</td><td class="legend">??? ????????????</td>';
        }
    }
    text += '</tr>';
    if (arr.length == 0) {
        text += '<tr class="tableError"><td colspan="44">???????? ????????????????. ?????????????? ???????????????? ?????? ?????? ???????????? 06.01.22??., ?????? ?????????????? ?????????????????? ????????. ?????????? ???????????????? ?????????? ???? ???????????????????????? ?????????????? ????????????????????(????.????.????????)</td></tr></table>';
    }
    for (let iHour = 0; iHour < arr.length; iHour++) {
        let time = (iHour + 1) * 1;
        let error = false;
        text += '<tr>';
        if (check.checked == true) {
            text += '<td class="hour">' + time + '</td>';
        }
        for (let i = 0; i < arr[iHour].length - 1; i++) {

            if (arr[iHour][i].length == 3) {
                text += '<td colspan="45" class="tableNone">???????? ????????????????</td>';
                break;
            }
            if (i == 0) {
                text += '<td> </td><td> </td><td> </td>';
                text += '<td> </td><td> </td><td> </td>';
            }
            //if (i == 1) {
                //text += '<td> </td><td> </td><td> </td>';
            //}
            if (i == 4) {
                text += '<td> </td><td> </td><td> </td>';
            }
            text += '<td class="powerTable">' + arr[iHour][i][2] + '</td><td>';

            if (Number(arr[iHour][i][1])) {


                if (arr[iHour][i][2] == 0) {
                    text += 0 + '</td><td>';

                }
                else {
                    text += arr[iHour][i][1] + '</td><td>';


                }
            } else {
                if (arr[iHour][i][2] == 0) {
                    text += 0 + '</td><td>';
                }
                else {
                    let sp = arr[iHour][i][1].split('+');
                    text += Number(sp[1]) + Number(sp[0]) + '</td><td>';
                }
            }
            if (arr[iHour][i][2] == 0) {
                text += 0 + '</td>';
            }
            else {
                for (let k = 3; k < arr[iHour][i].length; k++) {
                    if (arr[iHour][i][k][1] == 'd') {
                        if (arr[iHour][i][k][2] == 'py_v' && arr[iHour][i][k][4] != 'py_n') {
                            if (arr[iHour][i][k][3] == '0') {
                                text += '<span class="letter">' + arr[iHour][i][k][0] + '??,</span>';
                                error = true;
                            }
                            else {
                                text += arr[iHour][i][k][0] + '??,';
                            }
                        }
                        if (arr[iHour][i][k][2] != 'py_v' && arr[iHour][i][k][4] == 'py_n') {
                            if (arr[iHour][i][k][3] == '0') {
                                text += '<span class="letter">' + arr[iHour][i][k][0] + '??,</span>';
                                error = true;
                            }
                            else {
                                text += arr[iHour][i][k][0] + '??,';
                            }
                        }
                        if (arr[iHour][i][k][2] == 'py_v' && arr[iHour][i][k][4] == 'py_n') {
                            if (arr[iHour][i][k][3] == '0') {
                                text += '<span class="letter">' + arr[iHour][i][k][0] + '</span>' + ',';
                                error = true;
                            }
                            else {
                                text += arr[iHour][i][k][0] + ',';
                            }
                        }
                    }
                    else {
                        if (arr[iHour][i][k][2] == '0') {
                            text += '<span class="letter">' + arr[iHour][i][k][0] + '</span>' + ',';
                            error = true;
                        }
                        if (Number(arr[iHour][i][k][2])) {
                            text += arr[iHour][i][k][0] + ',';
                        }
                    }
                }
                text = text.slice(0, -1);
            }
            text += '</td>';
        }
        if (error == true) {
            text += '<td><span class="letter">!!!</td>';
        }
        text += '</tr>';
    }
    text += '</table>';
    text += '<div id="slava">?????????? ??????????????!</div>';

    return text;
}										