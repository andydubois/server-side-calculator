const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let mathHistoryArray = [];

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));

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
    if (mathObject.symbol === '+') {
        answer = addinator(parseInt(mathObject.num1), parseInt(mathObject.num2));
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


//math operation functions

function addinator(num1, num2) {
    return num1 + num2;
}

function subtractinator(num1, num2) {
    return num1 - num2;
}