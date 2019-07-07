//////////////////////////////////////////////////////////////////////////////////////
// Лабораторная работа 1 по дисциплине МРЗ
// Выполнена студенткой группы 721702
// БГУИР Лукашевич Ириной Александровной
//
// 15.04.2019
//
// часть алгоритма взята из
// https://github.com/kozel-stas/MRZ/blob/master/MRZ_1_LAB/logic.js
//


function addBit(a, num) {
    var temp = a;
    a = "";
    for (var i = 0; i < num; i++) {
        a += "0";
    }
    a += temp;
    return a;
}


function multiply(a, b) {
    if (b == '0'){
        return '00000000';
    }
    else return a;
}


function addition(addend1, addend2){
    addend2 += "00000000";
    var sum = (parseInt(addend1, 2) + parseInt(addend2, 2)).toString(2);
    var sum2 = sum;
    if (sum == 0) sum = '0000000000000000';
    else for (var i=0; i < 16 - sum2.length; i++) sum = '0' + sum; 
    return sum;
}

function dec(sum){
    sum = '0' + sum.substring(0, sum.length-1)
    return sum; 
}

function createTable(num) {
    var body = document.querySelector("body"),
        table = document.querySelector("table"),
        height = 60,
        width = 3500,
        rows = (7 + num),
        columns = 26,
        tableRow = "",
        tableData = "",
        tableHeader = "",
        firstTable = document.querySelector("table");
////////////////////////////////////////////////////////////////////////////////
    table = document.createElement("table");
    table.setAttribute("width", width);
    table.setAttribute("border", "3px")
    table.setAttribute("bordercolor", "black");
    table.setAttribute("align", "center");
//////////////////////////////////////////////////////////////////////////////////
    tableRow = document.createElement("tr");
    tableHeader = document.createElement("th");
    tableHeader.setAttribute("rowspan", "2");
    text = document.createTextNode("Такты");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
////////////////////////////////////////////////////////////////////////////////////
    for (var i = 0; i < 8; i++) {
        tableHeader = document.createElement('th');
        tableHeader.setAttribute("colspan", "3");
        text = document.createTextNode('Этап ' + (i + 1));
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
    }
//////////////////////////////////////////////////////////////////////////////////////////////
    tableHeader = document.createElement("th");
    tableHeader.setAttribute("rowspan", "2");
    text = document.createTextNode("Результат");
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
    table.appendChild(tableRow);
    tableRow = document.createElement("tr");
///////////////////////////////////////////////////////////////////////////////////////////
    for (var i = 0; i < 8; i++) {
        tableHeader = document.createElement("th");
        text = document.createTextNode("Ab" + i);
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
        tableHeader = document.createElement("th");
        text = document.createTextNode("P" + i + "+Ab" + i);
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
        tableHeader = document.createElement("th");
        text = document.createTextNode("P" + (i+1) + "*2^-1");
        tableHeader.appendChild(text);
        tableRow.appendChild(tableHeader);
    }
    table.appendChild(tableRow);
//////////////////////////////////////////////////////////////////////////////////////////////////
    for (var rowNum = 0; rowNum < rows; rowNum++) {
        tableRow = document.createElement("tr");
        for (var colNum = 0; colNum < columns; colNum++) {
            tableData = document.createElement("td");
            tableData.id = ((rowNum + 1) + "." + (colNum + 1));
            tableRow.appendChild(tableData);
            tableData.setAttribute("height", height);
        }
        table.appendChild(tableRow);
    }
    table.appendChild(tableRow);
///////////////////////////////////////////////////////////////////////////////////////////////////
    if (firstTable == null) {
        return body.appendChild(table);
    } else {
        var newTable = body.appendChild(table);
        return document.body.replaceChild(newTable, firstTable);
    }
}

function insertInTable(firstNumbers, secondNumbers, P, num, numOfBit, i, j, numberTic) {
    var ansMultiply = multiply(firstNumbers[num], secondNumbers[num][secondNumbers[num].length-i]);
    var sum = addition(P[num], ansMultiply);
    var sdvig = dec(sum);
    if (numOfBit < 0 || numOfBit > 7) {
        return;
    }
    document.getElementById(i + "." + (j)).innerHTML = "<p>A[" + (num + 1) + "]=" + firstNumbers[num] + "</p><p>B[" + (num + 1) + "]=" + secondNumbers[num] + "</p><p>P" + (i-1) + "[" + (num + 1) + "]=" + P[num] + "</p><hr>";
    document.getElementById(i + "." + (j)).innerHTML += "<p>Ab" + (i-1) + "[" + (num + 1) + "]=" + ansMultiply + "</p>";

    document.getElementById(i + "." + (j + 1)).innerHTML = "<p>A[" + (num + 1) + "]=" + firstNumbers[num] + "</p><p>B[" + (num + 1) + "]=" + secondNumbers[num] + "</p><p>P" + (i-1) + "[" + (num + 1) + "]=" + P[num] + "</p><hr>";
    document.getElementById(i + "." + (j + 1)).innerHTML += "<p>P" + i + "[" + (num + 1) + "]=" + sum + "</p>";

    document.getElementById(i + "." + (j + 2)).innerHTML = "<p>A[" + (num + 1) + "]=" + firstNumbers[num] + "</p><p>B[" + (num + 1) + "]=" + secondNumbers[num] + "</p><p>P" + i + "[" + (num + 1) + "]=" + sum + "</p><hr>";
    document.getElementById(i + "." + (j + 2)).innerHTML += "<p>P" + i + "*2^-1[" + (num + 1) + "]=" + sdvig + "</p>";
    P[num]=sdvig;
    if (numOfBit == 7) {
        document.getElementById((numOfBit + num + 1) + "." + 26).innerHTML = "<p>Время: " + (numOfBit + num + 1) * numberTic + " тактов</p>";
        
    }
}

function parseSet(Set) {
    var num = [];
    var index = 0;
    for (var i = 0; i < Set.length + 1; i++) {
        if (Set.charAt(i) === "," || i == Set.length) {
            num.push(parseInt(Set.substring(index, i), 10));
            index = i + 1;
        }
    }
    return num;
}

function start() {
    var setA = document.getElementById("setA").value;
    var setB = document.getElementById("setB").value;
    var numberTic = 1;
    /*if ( (setB.match(/(\d{1,2},)*\d{1,2}$/) == null && setB.match(/(\d{1,2}){1}$/) == null) || (setA.match(/(\d{1,2},)*\d{1,2}$/) == null && setA.match(/(\d{1,2}){1}$/) == null)) {
        alert("Введены некорректные данные, попробуйте снова!!");
        return;
    }*/
    if ((setA === '') || (setB === '')) {
        alert("Введены некорректные данные, попробуйте снова!!");
        return;
    }
    var firstNumbers = parseSet(setA);
    var secondNumbers = parseSet(setB);
    if (firstNumbers.length != secondNumbers.length) {
        alert("Введены вектора различной длины!");
        return;
    }

    //исправить ограничение
    for (var i = 0; i < firstNumbers.length; i++) {
        if (firstNumbers[i] > 63 || firstNumbers[i] < 0 || secondNumbers[i] > 63 || secondNumbers[i] < 0 || numberTic < 0) {
            alert("Введены некорректные данные, попробуйте снова!");
            return;
        }
    }
    createTable(firstNumbers.length);
    for (var i = 1; i < 8 + firstNumbers.length; i++) {
        document.getElementById(i + "." + 1).innerHTML = "Такты: " + i;
    }
    for (var i = 0; i < firstNumbers.length; i++) {
        firstNumbers[i] = addBit(firstNumbers[i].toString(2), 8 - firstNumbers[i].toString(2).length);
        secondNumbers[i] = addBit(secondNumbers[i].toString(2), 8 - secondNumbers[i].toString(2).length);
    }
    var Ans = [];
    for (var i = 0; i < firstNumbers.length; i++) {
        Ans.push("0000000000000000");
        document.getElementById((i + 1) + "." + 1).innerHTML += "<p>A[" + (i + 1) + "]<sub>10</sub>=" + parseInt(firstNumbers[i], 2) + "</p><p>A[" + (i + 1) + "]<sub>2</sub>=" + firstNumbers[i] + "</p><p>B[" + (i + 1) + "]<sub>10</sub>=" + parseInt(secondNumbers[i], 2) + "</p></p>B[" + (i + 1) + "]<sub>2</sub>=" + secondNumbers[i] + "</p>";
    }
    for (var tic = 0; tic < 7 + firstNumbers.length; tic++) {
        for (var j = 0; j < firstNumbers.length; j++) {
            insertInTable(firstNumbers, secondNumbers, Ans, j, tic - j, (tic + 1), (tic * 3) + 2 - j * 3, numberTic);
        }
    }
    for (var i = 0; i < Ans.length; i++) {
        document.getElementById((8 + i) + "." + 26).innerHTML += Ans[i] + "<sub>2</sub>=" + parseInt(Ans[i], 2) + "<sub>10</sub>";
    }
}
