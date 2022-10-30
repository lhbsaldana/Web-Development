/**like a server.js file **/ 

const express = require('express'); 
var app = express(); 
const router = express.Router(); 
const path = require('path'); 
app.use(express.json()); //NEEDED
app.use(express.urlencoded()); //NEEDED


// app.set('pages',path.join(__dirname, '/pages'));
app.set('views', __dirname + '/pages');
app.set('partials', __dirname + '/partials');
app.set('view engine', 'ejs');
app.use(express.static("templates"));
app.use(express.static('partials'));

const port = process.env.PORT || 3000; 
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


/* GET METHOD - to fetch data from a source */

app.get('/item/:itemid', async function (req, res) {
    try {
        console.log(req.params.itemid);

    } catch (e) {
    }
    const db = fs.firestore();
    const item_id = req.params.itemid;
    const item_ref = itemColl.doc(item_id);
    const doc = await item_ref.get();

    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }

    const citiesRef = db.collection('items').doc(item_id).collection('procurement');
    const snapshot = await citiesRef.get();
    proc_array = []
    snapshot.forEach(doc => {
        console.log(doc.data());
        proc_array.push(doc.data())
    });

    let data = {
        url: req.url,
        itemData: doc.data(),
        id: item_id,
        procid: doc.id,
        proc_array: proc_array,
        fs: fs
    }

    res.render('item', data);
});


app.post('/item/:itemid', async function (req, res) {
    try {
        console.log(req.params.itemid);

    } catch (e) {
    }
    const item_id = req.params.itemid;
    const item_ref = itemColl.doc(item_id);
    const doc = await item_ref.get();

    if (!doc.exists) {
        console.log('No such document!');
    } else {
        console.log('Document data:', doc.data());
    }

    console.log(req.body)
    // const items = await ingColl.get();
    var datainput = {
        Quantity: Number(req.body.ProcBox),
        dateCreated : new Date()
    }

    const db = fs.firestore();
    const item_proc = db.collection('items').doc(item_id).collection('procurement').add(datainput);

    let data = {
        url: req.url,
        itemData: doc.data(),
        id: item_id,
        fs:fs
    }
    res.render('item', data);
});



