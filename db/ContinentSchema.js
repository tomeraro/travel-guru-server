var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContinentSchema = new Schema({
    name: String
});

module.exports.continentModel = mongoose.model('continents', ContinentSchema);