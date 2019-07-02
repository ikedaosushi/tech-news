const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const bodyParser = require('body-parser');
const querystring = require('querystring');

// The Firebase Admin SDK to access the Firebase Realtime Database.
// const admin = require('firebase-admin');
// admin.initializeApp();

const app = express()
app.use(bodyParser.urlencoded({extended: true}));
app.use(cors({
    origin: true,
    allowedHeaders: ["Authorization", "Content-Type"]
}));

app.get('/', (req, res) => res.send('Hello World!'))

app.all("/news", (req, resp) => {
    const api = "https://api.github.com/repos/ikedaosushi/tech-news/issues"
    axios({
        method: req.method,
        url: url,
        headers: headers
    }).then(r => {
        resp.status(r.status).json(r.data)
    }).catch(e => {
        resp.status(e.response.status).json(e.response.data)
    })
})

exports.api = functions.https.onRequest(app);
