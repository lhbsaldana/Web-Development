<!DOCTYPE html>
<html lang="en">

  <body>
    <h1>About Us</h1>
    <h2>We merge tradition with technology</h2>

  </body>
</html>


/**like a server.js file 

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
}); **/ 