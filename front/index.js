
const express = require('express');
const bodyParser = require('body-parser');


const app = express();
const path = require('path');
//tell the app to look for static file in these directories
app.use(express.static('./server/static/'));
app.use(express.static('./client/dist/'));
//Tell the app to parse http message body
app.use(bodyParser.urlencoded({extended: false}));

app.get('*', function (request, response) {
    response.sendFile(path.resolve(__dirname, 'server/static', 'index.html'))
});

//start the server
app.listen(3000, () =>{
    console.log("========== SERVER EXPRESS IS UP ==========");
});