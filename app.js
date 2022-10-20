


/**like a server.js file **/ 

var express = require('express'); 
var app = express(); 
app.use(express.static('assets')); //to use assets folder

const port = process.env.PORT || 2020; 
app.listen(port,); 
app.set('view engine','ejs'); 

app.get('/',function(req,res){
    res.render('pages/index');
}); 