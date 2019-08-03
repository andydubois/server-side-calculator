$(document).ready(onReady);

function onReady() {
    console.log('jquery is good to go');
    $('#equalsButton').on('click', operation);
    $('#equalsButton').on('click', makeMathObject);
    getMathObject();
}
let operator = ''

function operation() {
    let ans = '';
    if (document.getElementById("addButton").checked) {
        ans = '+'
    } else if (document.getElementById("subtractButton").checked) {
        ans = '-'
    } else if (document.getElementById("multiplyButton").checked) {
        ans = '*'
    } else if (document.getElementById("divideButton").checked) {
        ans = '/'
    } else {
        ans = 'no entry';
    }
    console.log('the operator is', ans);
    operator = ans;
    console.log(operator);
}

function makeMathObject() {
    let mathObject = {
        num1: $('#numberOne').val(),
        num2: $('#numberTwo').val(),
        symbol: operator,
    }
    console.log(mathObject);

    $.ajax({
        type: 'POST',
        url: '/mathObjectHere',
        data: mathObject
    }).then(function (response) {
        $('#numberOne').val('');
        $('#numberTwo').val('');
    }).catch(function (err) {
        alert('Error posting math object to server', err);
    })
    getMathObject();
}

function getMathObject() {
    $.ajax({
        type: 'GET',
        url: '/mathObjectHere',
    }).then(function (response) {
        let list = $('#mathHistory');
        list.empty();

        for (let i = 0; i < response.length; i++) {
            list.prepend(`<li>${response[i].num1}${response[i].symbol}${response[i].num2}=<span class ="historyAnswer">${response[i].answer}</span></li>`);
            $('#answer').text(response[response.length - 1].answer);
        }
    })
}