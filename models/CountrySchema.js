var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = new Schema({
    name: String,
    bgImageName: String
});

module.exports.countryModel = mongoose.model('Country', CountrySchema);
