
var mongoose = require('mongoose');
var CountrySchema = require('./../models/CountrySchema');
let Country = CountrySchema.countryModel;

exports.getAllCountries = function() {
  return new Promise((resolve, reject) => 
    Country.find({}).exec((err, allCountries) => resolve(allCountries)));
};

exports.getCountryById = function(countryId) {
  return new Promise((resolve, reject) => 
    Country.findById(countryId).exec((err, country) => resolve(country)));
};