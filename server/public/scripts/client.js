$(document).ready(onReady);

function onReady() {
    console.log('jquery is good to go');
    $('#equalsButton').on('click', operation);
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
}