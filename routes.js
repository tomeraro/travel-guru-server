var mongoose = require('mongoose');


module.exports = function(app)
{
    var Continent = mongoose.model('Continent', module.exports.continentModel);
    var Country = mongoose.model('Country', module.exports.countryModel);

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



    //********** country routes ***********//
    app.get('/api/db/getAllCountries', function(req, res) {
        Country.find({}, function(err, allCountries) {
            res.send(allCountries);
        });
    });

};


