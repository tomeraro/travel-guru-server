var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = new Schema({
    name: String,
    continentId: String
});

module.exports.countryModel = mongoose.model('Countries', CountrySchema);
