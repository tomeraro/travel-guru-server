
var mongoose = require('mongoose');
var EquipmentListSchema = require('./../models/EquipmentListSchema');
var EquipmentSchema = require('./../models/EquipmentSchema');
let EquipmentList = EquipmentListSchema.equipmentListModel;
let Equipment = EquipmentSchema.equipmentModel;
var groupBy = require('lodash/groupBy');
var has = require('lodash/has');

exports.getEquipmentListById = function(listId) {
  return new Promise((resolve, reject) =>
    EquipmentList.findById(listId).exec((err, list) => {
      return resolve(list);
    })
  );
};

exports.saveEquipmentList = function(listId, equipmentId, checkboxValue) {
  return new Promise((resolve, reject) => {
    EquipmentList.update({ "_id": listId, "list._id": mongoose.Types.ObjectId(equipmentId) }, 
    {$set : {"list.$.selected" : checkboxValue} })
    .exec((err, updatedList) => resolve(updatedList));
  });
};

exports.deleteEquipmentFromList = function(listId, equipmentId) {
  return new Promise((resolve, reject) =>
  EquipmentList.update({ "_id": listId }, 
    {$pull : {"list" : { "_id": mongoose.Types.ObjectId(equipmentId) }}}).exec((err, deleteItem) => {
      if(has(deleteItem, 'writeError')){
        return resolve({ error: true, message: deleteItem.writeError.errmsg });
      }
      else if(has(deleteItem, 'writeConcernError')) {
        return resolve({ error: true, message: deleteItem.writeConcernError.errmsg });
      }
      return resolve({ error: false, message: '' });
    })
  );
};

exports.addCustomEquipmentToList = function(listId, equipmentCategoryId, equipmentValue) {
  return new Promise((resolve, reject) => {
    let customEquipment = new Equipment();
    customEquipment.name = equipmentValue;
    customEquipment.equipmentCategoryId = equipmentCategoryId;
    customEquipment.isForAll = true;
    EquipmentList.update({ "_id": listId }, { $push : {"list" : customEquipment} })
    .exec((err, newEquipment) => {
      if(!err && newEquipment.nModified == '1') {
        resolve(customEquipment);
      }
      resolve(err); 
    });
  });
}
