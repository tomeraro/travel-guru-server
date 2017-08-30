var mongoose = require('mongoose');
var user = require("./db/ContinentSchema");


module.exports = function(app)
{
    var Continent = mongoose.model('Continent', module.exports.continentModel);

    //************** routes ************//
    app.get('', function(req, res) {
        res.sendfile('index.html'); // load the single view file
    });


    //********** continent routes ***********//
    app.get('/api/db/getAllContinents', function(req, res) {
        Continent.find({}, function(err, allContinents) {
            res.send(allContinents);
        });
    });


};


