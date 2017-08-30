var express = require('express');
var app = express();
var mongoose = require('mongoose');

app.listen(process.env.PORT  || 8080, function() {
    console.log("Server is on");
});

// Add headers
app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://travel-guru-app.herokuapp.com/');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

//routes
require('./routes.js')(app); // load my routes

// ************* DB **************//
var app_db = "mongodb://tomeraro:Tomer123@ds111754.mlab.com:11754/travel-guru-db";

//connect to DB
mongoose.Promise = global.Promise;

mongoose.connect(app_db, function(err) {
    if(err!=null)
        console.log('connection error' + err);
    else console.log('Connected to DB');
});

