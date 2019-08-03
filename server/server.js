const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const PORT = 5000;

let mathHistoryArray = [];

// Serve up static files (HTML, CSS, Client JS)
app.use(express.static('server/public'));



app.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})

app.post('/mathObjectHere', (req, res) => {
    console.log('in /mathObjectHere POST'
        req.body)
})