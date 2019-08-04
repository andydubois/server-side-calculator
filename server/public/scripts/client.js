$(document).ready(onReady);

function onReady() {
    console.log('jquery is good to go');
    $('#equalsButton').on('click', operation);
    $('#equalsButton').on('click', makeMathObject);
    $('#clearButton').on('click', clearFields);
    $('#clearHistoryButton').on('click', clearHistory);
    getMathObject();
}
//global variable used to determine which operator is being used each time equation is entered by user 
let operator = ''


//determines which operator is being used based on which button was checked in DOM, sets global operator variable value
function operation() {
    let ans = '';
    if ($('#addButton').is(':checked')) {
        ans = '+'
    } else if ($('#subtractButton').is(':checked')) {
        ans = '-'
    } else if ($("#multiplyButton").is(':checked')) {
        ans = '*'
    } else if ($("#divideButton").is(':checked')) {
        ans = '/'
    } else {
        ans = 'no entry';
    }
    console.log('the operator is', ans);
    //sets global operator variable equal to current operator symbol being used
    operator = ans;
    console.log(operator);
}


function required(numInput) {
    if (num.value.length == 0) {
        alert("message");
        return false;
    }
    return true;
}


//creates object for each equation to be used for functions server side
function makeMathObject() {
    //checks if both number input fields are filled out before sending info to server
    if ($('#numberOne').val() === '' || $('#numberTwo').val() === '') {
        alert('You must fill out both numbers fields before proceeding');
        //checks if an operator has been selected before sending info to server
    } else if (operator === "no entry") {
        alert('You must select an operator before proceeding');
    } else {
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
            //clears inputs after entry
            clearFields();
        }).catch(function (err) {
            alert('Error posting math object to server', err);
        })
        getMathObject();
    }
}

//retrieves math objects from server side with answer computer and prepends equations to DOM underneath inputs.
function getMathObject() {
    $.ajax({
        type: 'GET',
        url: '/mathObjectHere',
    }).then(function (response) {
        let list = $('#mathHistory');
        //clears history
        list.empty();
        //loops through whole math history array and prepends to DOM
        for (let i = 0; i < response.length; i++) {
            list.prepend(`<li>${response[i].num1}${response[i].symbol}${response[i].num2}=<span class ="historyAnswer">${response[i].answer}</span></li>`);
            $('#answer').text(response[response.length - 1].answer);
        }
    })
    console.log("getMathObject function complete")
}

//function used to clear input fields
function clearFields() {
    $('#numberOne').val('');
    $('#numberTwo').val('');
}

function clearHistory() {
    $.ajax({
        type: 'DELETE',
        url: '/mathObjectHere',
        success: function (result) {
            console.log('Deleted math history!');

        }
    })
    getMathObject();
}