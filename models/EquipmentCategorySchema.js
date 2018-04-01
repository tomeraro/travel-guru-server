var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentCategorySchema = new Schema({
    name: String,
    displayName: String,
    comment: String,
    importance: Number
});

module.exports.equipmentCategoryModel = mongoose.model('EquipmentCategory', EquipmentCategorySchema);