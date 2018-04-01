var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var EquipmentListSchema = new Schema({
    creationDate: Date,
    country: Object,
    season: Object,
    travelType: Object,
    participantsIds: Array,
    list: Object
});

module.exports.equipmentListModel = mongoose.model('EquipmentList', EquipmentListSchema);