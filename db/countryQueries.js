
var mongoose = require('mongoose');
var CountrySchema = require('./../models/CountrySchema');
let Country = CountrySchema.countryModel;

exports.getCountryById = function(countryId) {
  return new Promise((resolve, reject) => 
    Country.findById(countryId).exec((err, country) => resolve(country)));
};