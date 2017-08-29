/**
 * Created by tomeraronovsky on 8/26/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = new Schema({
    name: String,
    continentId: String
});

module.exports = mongoose.model('countries', CountrySchema);
