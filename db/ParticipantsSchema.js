var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ParticipantsSchema = new Schema({
    name: String
});

module.exports.participantsModel = mongoose.model('participants', ParticipantsSchema);
