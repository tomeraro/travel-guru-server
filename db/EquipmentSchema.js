var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentSchema = new Schema({
    name: String,
    isGeneralEquipment: Boolean,
    isLeisureEquipment: Boolean,
    isSpecialEquipment: Boolean,
    countriesIds: Array,
    seasonsIds: Array,
    isForAdult: Boolean,
    isForKid: Boolean
});

module.exports.equipmentModel = mongoose.model('equipment', EquipmentSchema);