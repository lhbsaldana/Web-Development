/**like a server.js file **/ 

const express = require('express'); 
var app = express(); 
const path = require('path'); 

// app.set('pages',path.join(__dirname, '/pages'));
app.set('views', __dirname + '/pages');
app.set('view engine', 'ejs');
app.use(express.static('templates'));

const port = process.env.PORT || 5500; 
app.listen(port);

app.use((req,res,next) => {
    console.log("Request Mode"); 
    console.log(`Host: ${req.hostname}`);
    console.log(`Path: ${req.path}`);
    console.log(`Method: ${req.method}`);
    next();
}); 

var fs = require("firebase-admin");
let serviceAccount;
if (process.env.GOOGLE_CREDENTIALS != null) {
    serviceAccount = JSON.parse(process.env.GOOGLE_CREDENTIALS)
}
else {
    serviceAccount = require("./organic-vegetables-f858e-firebase-adminsdk-7seat-e1598a131c.json");
}
fs.initializeApp({
    credential: fs.credential.cert(serviceAccount)
});

const db = fs.firestore();
const itemColl = db.collection('items');


app.get('/', async function (req, res) {
    const items = await itemColl.get();
    let data = {
        url: req.url,
        itemData: items.docs,
    }
    res.render('index', data);
});

app.get('/item/:itemid', async function (req, res) {
    const items = await itemColl.get();
    if (items.length > 0){
        items.forEach(product =>{
            product.collection('users').doc(product.id)
            .collection('procurement')
            .get()
            .then(subCol => {
                subCol.docs.forEach(element => {
                    console.log(element.data()); 
                }
            )}
        )}
    )}

})
   //res.render('item', {item : item_data, procure: procure_hist});


    
