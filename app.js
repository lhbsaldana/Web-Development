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
const ingColl = db.collection('items');

app.get('/', async function (req, res) {
    const items = await ingColl.get();
    let data = {
        url: req.url,
        itemData: items.docs,
    }
    res.render('index', data);
});

app.get('/item/:itemid', async function (req, res) {
    try {
        console.log(req.params.itemid);

    } catch (e) {
    }
    const item_id = req.params.itemid;
    const item_ref = ingColl.doc(item_id);
    const doc = await item_ref.get();
    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }
    // const items = await ingColl.get();
    let item_data = {
        url: req.url,
        itemData: doc.data(),
    }
    // for sub-collection
    itemData.forEach(element)
    {
        var procurement = db.collection('items').doc(element);
        procurement.getCollections().then(collections=> { 
            collections.forEach(collection =>{
                const procure = procurement.get(); 
            if (!procure.exists){
                console.log('No such document');
            }else{
                console.log('Found subcollection with id:',procure.data());
            }

            })
        })
        const history = await procurement.listCollections();
        history.forEach(history => {
            history.get()
        console.log('Found subcollection with id:', history.doc.id);
        let procure_hist = {
            url: req.url,
            procureData: history.docs,
    }
    
    }
     

    }

});

    res.render('item', {item : item_data, procure: procure_hist});
});