/*
- Setup the server and create a new Express app
- Setup the View Engine of the Express to be EJS
- Allow the new application to open the url '/' to open index.ejs and /other to open the other.ejs file
<img class="img-fluid" src= <%= "http://openweathermap.org/img/w/"+(weatherAPI['list'][0].weather[0].icon)+ ".png"; %>  width="800px" style="height: 9.5rem"  alt="Responsive image" />
*/ 
const express = require ('express'); 
const app = express(); 
const path = require('path'); 
var weather = require('weather-js')
app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');
app.use(express.static('public')); 
var fetchUrl = require("fetch").fetchUrl;

const port = process.env.PORT || 8080; 
app.listen(port);//8080 is the port number 

app.use((req,res,next) => {
    console.log("Request Mode"); 
    console.log(`Host: ${req.hostname}`);
    console.log(`Path: ${req.path}`);
    console.log(`Method: ${req.method}`);
    next();
}); 

weather.find({search: 'Davao City', degreeType: 'C'}, function(err, result) {
    if(err) console.log(err);
    var data = JSON.stringify(result);
    console.log(Object.getOwnPropertyNames(data))
    console.log(data)

}); 

fetchUrl("https://api.openweathermap.org/data/2.5/forecast?q=Davao&units=metric&appid=4a13c29e47abc7587b529fde28e8d6ba",function(error,meta,body){
        var result = body.toString();
        console.log(result)});


/*routing 
'/' redirects end user to index.ejs page  */ 

var city = "Cebu" 

app.get('/',function(req,res){ 
    weather.find({search: city, degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
        var  dataJS = result; // object data 
        var fromWeatherJS = { 
            weatherJS : dataJS}//convert to JSON object
        
        fetchUrl("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=4a13c29e47abc7587b529fde28e8d6ba",function(error,meta,body){
            var dataAPI= JSON.parse(body); 
            console.log(dataAPI)
            var fromAPI = { 
                weatherAPI : dataAPI }//convert to JSON object

    res.render('index',{weatherJS:dataJS, weatherAPI:dataAPI})
        });
    });
}); 

// '/other' redirects end user to other.ejs page 
app.get('/other',function(req,res){
    weather.find({search: city, degreeType: 'C'}, function(err, result) {
        if(err) console.log(err);
        var  dataJS = result; // object data 
        console.log(dataJS)
        var fromWeatherJS = { 
            weatherJS : dataJS}//convert to JSON object
        
        fetchUrl("https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric&appid=4a13c29e47abc7587b529fde28e8d6ba",function(error,meta,body){
            dataAPI= JSON.parse(body); 
            var fromAPI = { 
                weatherAPI : dataAPI }//convert to JSON object

    res.render('other',{weatherJS:dataJS, weatherAPI:dataAPI})
        });
    });
}); 

