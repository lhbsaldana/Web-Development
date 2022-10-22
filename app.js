


/**like a server.js file **/ 

var express = require('express'); 
var app = express(); 
const path = require('path'); 
app.set('pages',path.join(__dirname,'/pages'));
app.use(express.static('templates'));

const port = process.env.PORT || 5500; 
app.listen(port,); 


app.get('/',function(req,res){
    res.render('index.ejs');
}); 