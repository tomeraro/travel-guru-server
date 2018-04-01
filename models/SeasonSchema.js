var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SeasonSchema = new Schema({
    name: String
});

module.exports.seasonModel = mongoose.model('Seasons', SeasonSchema);
