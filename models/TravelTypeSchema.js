var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TravelTypeSchema = new Schema({
    name: String
});

module.exports.travelTypeModel = mongoose.model('Traveltypes', TravelTypeSchema);
