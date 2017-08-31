/**
 * Created by tomeraronovsky on 8/26/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContinentSchema = new Schema({
    name: String
});

module.exports.continentModel = mongoose.model('Continent', ContinentSchema);;
