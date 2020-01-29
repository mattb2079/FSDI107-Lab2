var express = require("express");
var app = express(); // create an app
var itemList = []; // store items on this array


/**********************************************
 * Configuration 
 **********************************************/

 // enable CORS

 app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, PATCH, DELETE, OPTIONS");
    res.header("Access-Control-Allow-Headers", "Origin, X-Rquested-With, Content-Type, Accept");
    next();
});

// config body-parse to read info in request
var bparser = require("body-parser");
app.use(bparser.json());

// to server static files (css, js, img, pdfs)
app.use(express.static( __dirname + '/public'));

var ejs = require('ejs');
app.set('views', __dirname + '/public'); // where are the HTML files?
app.engine('html', ejs.renderFile);
app.set('view engine', ejs);

 /*********************************************
  * Web Server Enpoints
  *********************************************/

app.get('/', (req, res) =>{
    res.render('catalog.html');
});


// contact endpoint
app.get('/contact', (req, res) => {
    res.send("This will be the contact page, people working over here!!");
});

app.get('/exc/:message', (req, res) => {
    console.log("Message from client: ", req.params.message);
    
    var msj = req.params.message;
    var vowels = '';
    var allVowels = ['a', 'e', 'i', 'o', 'u'];

    for (var i=0; i<msj.length; i++){
        var letter = msj[i];
        console.log(letter);
        if (allVowels.indexOf(letter.toLowerCase()) != -1 &&
            vowels.indexOf(letter.toLowerCase()) == -1){
            
            vowels += letter;
        }
    }

    // return each vowel only once
    // hellooo -> eo
    // this is a test -> iae

    res.status(202);
    res.send(vowels);

});



/***********************************************
 * API END POINTS
 * 
 * Application Programming Interface
 ***********************************************/

 app.post('/api/items', (req, res) => {
    console.log("client wants to store items");

    var item = req.body;
    item.id = itemList.length + 1; // create a consecutive id
    itemList.push(item);

    res.status(201);// 201 => created
    res.json(item); // return the item as JSON
 });

 app.get('/api/items', (req, res) => {
    res.json(itemList);
 });

 /**********************************************
  * START Server
  **********************************************/



app.get('/aboutme', (req, res) =>{
    res.render('about.html');
});

app.listen(8080, function(){
    console.log("Server running at http://localhost:8080:");
    console.log("Press Ctrl+C to kill it");
});