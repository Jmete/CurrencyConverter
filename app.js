// Currency Converter
// By James Mete 2017
// www.jamesmete.com

require('dotenv').config();
const express = require('express');
const app = express();
var oxr = require('open-exchange-rates'),
    fx = require('money');

// For static files
app.use(express.static('public'));

// Serve the HTML file
app.get('/', function(req, res){
  res.sendFile(__dirname + '/index.html');
});

// For Conversion queries
app.get("/xr/", function(req, res) {
    let n = req.query.num;
    let f = req.query.from;
    let t = req.query.to;
    let q = fx(n).from(f).to(t);
    res.send(q.toFixed(2));
});

// Helps get list of currencies
app.get("/xr/all", function(req, res) {
    res.send(fx.rates);
});

// SET YOUR APP ID HERE FROM OPEN EXCHANGE RATES, or configure from .env file like I am.
oxr.set({ app_id: process.env.APP_ID })

// Sets up Money.js
oxr.latest(function() {
    // Apply exchange rates and base rate to `fx` library object:
    fx.rates = oxr.rates;
    fx.base = oxr.base;

    // money.js is ready to use:
    console.log('Money.js ready');
});

// Listens on Port 3000
app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
