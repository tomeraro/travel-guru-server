
var mongoose = require('mongoose');
var ParticipantsSchema = require('./../models/ParticipantsSchema');
let Participant = ParticipantsSchema.participantsModel;

exports.getAllParticipants = function() {
  return new Promise((resolve, reject) => 
    Participant.find({}).exec((err, allParticipants) => resolve(allParticipants)));
};
