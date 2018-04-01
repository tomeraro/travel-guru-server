var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
    name: String,
    comment: String,
    equipmentCategoryId: String,
    isForAll: Boolean,
});

module.exports.equipmentModel = mongoose.model('Equipment', EquipmentSchema);