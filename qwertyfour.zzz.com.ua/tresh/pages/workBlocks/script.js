let container = document.querySelector('.container');
function go() {
    let xht = new XMLHttpRequest();

    xht.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            func2(this.responseText);
        }
    }
   
    xht.open("GET", "http://qwertyfour.zzz.com.ua/php/phpFileGet.php?act=5&data1=15.01.2022&data2=20.01.2022", true);
    
    xht.send();
}

go();


function func2(data){
    let resArr = [];
    let resText = '<Table>';
    Arr = JSON.parse(data);
    console.log(Arr);



    for(let iHour = 0;iHour < Arr.length; iHour++){

        console.log(iHour);

        for(let iSt = 0;iSt < Arr[iHour].length; iSt++){

            if(Arr[iHour][iSt][0] == 'ТрТЕС'){
                console.log('TrTES');
                console.log(Arr[iHour][iSt][0]);
                for(iBlock = 3; iBlock < Arr[iHour][iSt].length; iBlock++){
                   if(Arr[iHour][iSt][iBlock][1] == 'd'){
                       console.log('ok');

                       
                       resText += '<tr><td rowspan="4">' + Arr[iHour][iSt][iBlock][0] + '</td>';
                          for(let iHour2 = 0;iHour2 < Arr.length; iHour2+2){
                             resText += '<td>' + Arr[iHour2][iSt][iBlock][2] + '</td>';
                          }

                   }
                   else{
                       resText += '<tr><td rowspan="2">' + Arr[iHour][iSt][iBlock][0] + '</td>';
                   }



                }     

   
             }
  
         }
    }
    container.innerHTML = resText;





}

function func(data) {
    //console.log(data);
    Arr = JSON.parse(data);
    //console.log(Arr);





    







    let Arr2 = [];
    for (let i = 0; i < Arr.length; i++) {
        Arr2[i] = arrOffAes(Arr[i]);
    }




    let Arr3 = [];
    for (let i = 0; i < Arr2.length; i++) {
        Arr3[i] = arrTes(Arr2[i]);
    }



    //console.log(Arr2);
    console.log(Arr3);
    //Arr = arrOffAes(Arr);
    //Arr = arrTes(Arr);


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
        if (arr[i][0] == 'КТЕЦ-5' || arr[i][0] == 'КТЕЦ-6' || arr[i][0] == 'ХТЕЦ-5') {
            k = k - 1;
            continue
        } else {
            ar[k] = arr[i];
        }
    }
    return ar;
}

function out(arr) {

    

    let text = '<table>';
    text += '<tr class="tableName">';
    if (check.checked == true) {
        text += '<td class="hour">Год.</td>';
    }
    text += '<td colspan="3">ЛуТЕС</td>';
    text += '<td> </td><td> </td><td> </td>';
    text += '<td colspan="3">СлТЕС</td>';
    text += '<td> </td><td> </td><td> </td>';
    text += '<td colspan="3">ВугТЕС</td>';
    text += '<td colspan="3">КуТЕС</td>';
    text += '<td> </td><td> </td><td> </td>';
    text += '<td colspan="3">КрТЕС</td>';
    text += '<td colspan="3">ПдТЕС</td>';
    text += '<td colspan="3">ЗаТЕС</td>';
    text += '<td colspan="3">ЗмТЕС</td>';
    text += '<td colspan="3">ТрТЕС</td>';
    text += '<td colspan="3">ЛадТЕС</td>';
    text += '<td colspan="3">БуТЕС</td>';
    text += '<td colspan="3">ДобТЕС</td>';
    text += '</tr>';

    if (arr.length == 0) {
        text += '<tr class="tableError"><td colspan="44">Дані відсутні. Можливо введений час був раніше 06.01.22р., або пізніше поточного часу. Також зверніть увагу на правильність формату заповнення(чч.мм.рррр)</td></tr></table>';
    }
    for (let iHour = 0; iHour < arr.length; iHour++) {
        let time = (iHour + 1) * 1;
        let error = false;
        text += '<tr>';
        if (check.checked == true) {
            text += '<td class="hour">' + time + '</td>';
        }
        for (let i = 0; i < arr[iHour].length; i++) {


            if (i == 1) {
                text += '<td> </td><td> </td><td> </td>';
            }
            if (i == 2) {
                text += '<td> </td><td> </td><td> </td>';

            }
            if (i == 4) {
                text += '<td> </td><td> </td><td> </td>';

            }
            text += '<td>' + arr[iHour][i][2] + '</td><td>';
            if (Number(arr[iHour][i][1])) {


                if (arr[iHour][i][2] == 0) {
                    text += 0 + '</td><td>';
                }
                else {
                    text += arr[iHour][i][1] + '</td><td>';
                }



            } else {
                let sp = arr[iHour][i][1].split('+');
                text += Number(sp[1]) + Number(sp[0]) + '</td><td>';
            }


            if (arr[iHour][i][2] == 0) {
                text += 0 + '</td>';
            }
            else {




                for (let k = 3; k < arr[iHour][i].length; k++) {
                    if (arr[iHour][i][k][1] == 'd') {
                        if (arr[iHour][i][k][2] == 'py_v' && arr[iHour][i][k][4] != 'py_n') {

                            if(arr[iHour][i][k][3] == '0'){
                                  text += '<span class="letter">' + arr[iHour][i][k][0] + 'А,</span>';
                                  error = true;
                            }
                            else{
                                  text += arr[iHour][i][k][0] + 'А,';
                            }
                        }
                        if (arr[iHour][i][k][2] != 'py_v' && arr[iHour][i][k][4] == 'py_n') {

                            if(arr[iHour][i][k][3] == '0'){
                                  text += '<span class="letter">' + arr[iHour][i][k][0] + 'Б,</span>';
                                  error = true;
                            }
                            else{
                                  text += arr[iHour][i][k][0] + 'Б,';
                            }                    
                        }
                        if (arr[iHour][i][k][2] == 'py_v' && arr[iHour][i][k][4] == 'py_n') {
                           if(arr[iHour][i][k][3] == '0'){
                                  text += '<span class="letter">' + arr[iHour][i][k][0] + '</span>' + ',';
                                  error = true;
                            }
                            else{
                                 text += arr[iHour][i][k][0] + ',';
                            }
                        }
                    } 
                    else {


                        if(arr[iHour][i][k][2] == '0'){
                                  text += '<span class="letter">' + arr[iHour][i][k][0] + '</span>' + ',';
                                  error = true;
                        }
                        if (Number(arr[iHour][i][k][2])) {
                             text += arr[iHour][i][k][0] + ',';



                            
                           
                        }
                    }
                }

                text = text.slice(0, -1)
            }
            text += '</td>';
  
        }
        if(error == true){
            text += '<td><span class="letter">!!!</td>';
        }
        text += '</tr>';
       
            
    }
    text += '</table>';
    return text;

}									