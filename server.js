var express = require('express');
var app = express();
var mongoose = require('mongoose');

//routes
require('./routes.js')(app); // load my routes

app.listen(process.env.PORT  || 8080, function() {
    console.log("Server is on");
});

// ************* DB **************//
var app_db = "mongodb://tomeraro:Tomer123@ds111754.mlab.com:11754/travel-guru-db";

//connect to DB
mongoose.Promise = global.Promise;

mongoose.connect(app_db, function(err) {
    if(err!=null)
        console.log('connection error' + err);
    else console.log('Connected to DB');
});

