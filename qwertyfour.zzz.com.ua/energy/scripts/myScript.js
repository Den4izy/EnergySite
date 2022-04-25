let elem = document.querySelector('#siteTime');
console.log(elem);
function getTime() {
    let d = new Date();
    let year = d.getFullYear();
    let month = d.getMonth();
    let date = d.getDate();
    let hour = d.getHours();
    let minute = d.getMinutes();
    let second = d.getSeconds();
    year = String(year).split('');
    year = year[2] + year[3];
    if (date < 10) {
        date = '0' + date;
    }
    month = month + 1;
    if (month < 10) {
        month = '0' + month;
    }
    if (hour < 10) {
        hour = '0' + hour;
    }
    if (minute < 10) {
        minute = '0' + minute;
    }
    if (second < 10) {
        second = '0' + second;
    }
    let res = date + '.' + month + '.' + year + ' ' + hour + ':' + minute + ':' + second;
    elem.innerHTML = res;
}
setInterval(getTime, 1000);
