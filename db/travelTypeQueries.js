
var mongoose = require('mongoose');
var TravelTypeSchema = require('./../models/TravelTypeSchema');
let TravelType = TravelTypeSchema.travelTypeModel;

exports.getTravelTypeById = function(travelTypeId) {
  return new Promise((resolve, reject) => 
  TravelType.findById(travelTypeId).exec((err, travelType) => resolve(travelType)));
};