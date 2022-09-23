/*
- Setup the server and create a new Express app
- Setup the View Engine of the Express to be EJS
- Allow the new application to open the url '/' to open index.ejs and /other to open the other.ejs file

*/ 
const express = require ('express'); 
const app = express(); 
const path = require('path'); 
var weather = require('weather-js')
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs'); 

app.listen(8080); //8080 is the port number 

app.use((req,res,next) => {
    console.log("Request Mode"); 
    console.log(`Host: ${req.hostname}`);
    console.log(`Path: ${req.path}`);
    console.log(`Method: ${req.method}`);
    next();
}); 

var weather_today = weather.find({search: 'Davao City', degreeType: 'C'}, function(err, result) {
    if(err) console.log(err);
    //console.log(result, null, 2);
});


/*routing 
'/' redirects end user to index.ejs page  */ 
app.get('/',function(req,res){ 
    res.render('index', weather_today)
}); 

// '/other' redirects end user to other.ejs page 
app.get('/other',function(req,res){
    res.render('other')
}); 

