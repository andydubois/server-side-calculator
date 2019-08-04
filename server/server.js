const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

//empty array for history of equations to pushed into before being sent to client side
let mathHistoryArray = [];

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));
//settings up body parser to be used properly
app.use(bodyParser.urlencoded({
    extended: true
}));


//opens up PORT 5000 to use for localhost
app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})


//POST route that receives operations from server side
app.post('/mathObjectHere', (req, res) => {
    let mathObject = req.body;
    let answer = ''
    if (mathObject.symbol === '+') { //checks for addition operator
        answer = addinator(parseFloat(mathObject.num1), parseFloat(mathObject.num2));
        mathObject.answer = answer; //creates answer property in object and adds value
    } else if (mathObject.symbol === '-') { //checks for subtraction operator
        answer = subtractinator(mathObject.num1, mathObject.num2);
        mathObject.answer = answer;
    } else if (mathObject.symbol === '*') { //checks for multiplication operator
        answer = multiplicator(mathObject.num1, mathObject.num2);
        mathObject.answer = answer;
    } else if (mathObject.symbol === '/') { //checks for division operator
        answer = divisionator(mathObject.num1, mathObject.num2);
        mathObject.answer = answer;
    }
    mathHistoryArray.push(mathObject);
    console.log('in POST mathObjectHere', mathObject);
    res.sendStatus(201);
})


//GET route that send the array of the math history back to client side
app.get('/mathObjectHere', (req, res) => {
    console.log('in GET /mathObjectHere');
    res.send(mathHistoryArray);
})

//DELETE request that sets mathHistoryArray to empty
app.delete('/mathObjectHere', (req, res) => {
    mathHistoryArray = [];
    res.sendStatus(201);
})


//math operation functions to calculate numbers sent from client side

function addinator(num1, num2) {
    return num1 + num2;
}

function subtractinator(num1, num2) {
    return num1 - num2;
}

function multiplicator(num1, num2) {
    return num1 * num2;
}

function divisionator(num1, num2) {
    return num1 / num2;
}