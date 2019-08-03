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



app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

app.post('/mathObjectHere', (req, res) => {
    console.log('in POST mathObjectHere', req.body);
    mathHistoryArray.push(req.body);
    res.sendStatus(201);
})

app.get('/mathObjectHere', (req, res) => {
    console.log('in GET /mathObjectHere');
    res.send(mathHistoryArray);
})