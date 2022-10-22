/**like a server.js file **/ 

const express = require('express'); 
var app = express(); 
const path = require('path'); 

// app.set('pages',path.join(__dirname, '/pages'));
app.set('views', __dirname, '/pages');
app.set('view engine', 'ejs');
app.use(express.static('templates'));



app.use((req,res,next) => {
    console.log("Request Mode"); 
    console.log(`Host: ${req.hostname}`);
    console.log(`Path: ${req.path}`);
    console.log(`Method: ${req.method}`);
    next();
}); 

app.get('/',function(req,res){
    res.render('index.ejs');
}); 

const port = process.env.PORT || 5500; 
app.listen(port);