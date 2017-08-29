var express = require('express');
var app = express();
var mongoose = require('mongoose');

//routes
require('./routes.js')(app); // load my routes

app.listen(8080, function() {
    console.log("Server is on");
});

// ************* DB **************//
var localDB = "mongodb://localhost/CompieInterview";

//connect to DB
//mongoose.Promise = global.Promise;
//
//mongoose.connect(localDB, function(err) {
//    if(err!=null)
//        console.log('connection error' + err);
//    else console.log('Connected to DB');
//});

