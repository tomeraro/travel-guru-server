
var mongoose = require('mongoose');
var SeasonSchema = require('./../models/SeasonSchema');
let Season = SeasonSchema.seasonModel;

exports.getSeasonById = function(seasonId) {
  return new Promise((resolve, reject) => 
    Season.findById(seasonId).exec((err, season) => resolve(season)));
};