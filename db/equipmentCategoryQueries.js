
var mongoose = require('mongoose');
var EqipmentCategorySchema = require('./../models/EquipmentCategorySchema');
let EquipmentCategory = EqipmentCategorySchema.equipmentCategoryModel;

exports.getAllEquipmentCategories = function() {
  return new Promise((resolve, reject) => 
    EquipmentCategory.find({}).exec((err, categories) => resolve(categories)));
};