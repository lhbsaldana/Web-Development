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

/*routing 
'/' redirects end user to index.ejs page  */ 
app.get('/',function(req,res){ 
    weather.find({search: 'Davao City', degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
        var data = JSON.stringify(result,null,2);
        var weatherData = { 
            weatherToday : data
        }
        res.render('index', weatherData)
    });
}); 

// '/other' redirects end user to other.ejs page 
app.get('/other',function(req,res){
    res.render('other')
}); 

