//like a server.js file 

var express = require('express'); 
var app = express(); 
app.use(express.static('assets')); //to use assets folder

const port = process.env.PORT || 8080; 
app.listen(port,); 
app.set('view engine','ejs'); 

app.get('/',asyncfunction(req,res){
    let data = {
        url:req.url, 
    }
    res.render('pages/index',data);
}); 