var mongoose = require('mongoose');
var EquipmentSchema = require('./../models/EquipmentSchema');
let Equipment = EquipmentSchema.equipmentModel;
var concat = require('lodash/concat');
var flatten = require('lodash/flatten');
var uniqBy = require('lodash/uniqBy');


exports.getEquipmentBySearchDetails = function(data) {
  let generalEquipments = exports.getAllGeneralEquipment(data);
  let electricEquipment = exports.getElectricEquipment(data);
  let tualeticEquipment = exports.getTualeticEquipment(data);
  let clothingEquipment = exports.getClothingEquipment(data);
  return Promise.all([generalEquipments, electricEquipment, tualeticEquipment, clothingEquipment])
    .then(data => flatten(data));
}

exports.getEquipmentByEquipmentCategoryAndTravelType = function(equipmentCategoryId, travelTypeId) {
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: equipmentCategoryId, travelTypeIds: travelTypeId, isForAll: false })
    .exec((err, equipments) => resolve(equipments));
  });
};

exports.getEquipmentByEquipmentCategoryAndSeason = function(equipmentCategoryId, seasonId) {
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: equipmentCategoryId, seasonIds: seasonId, isForAll: false })
    .exec((err, equipments) => resolve(equipments));
  });
};

// ******* GENERAL EQUIPMENT ********* //
exports.getAllGeneralEquipment = function(data) {
  let generalEquipmentCategoryId = '59d8e609734d1d18c95c8396';
  return new Promise(function(resolve, reject) {
    Equipment.find({ $or: [{ equipmentCategoryId: generalEquipmentCategoryId, isForAll: true }, 
    {equipmentCategoryId: generalEquipmentCategoryId, countryIds: data.countryId, isForAll: false }]})
    .exec((err, generalEquipments) => resolve(generalEquipments));
  });
};


// ******* ELECTRIC EQUIPMENT ********* //
exports.getAllElectricEquipment = function() {
  let electricEquipmentCategoryId = '5a85c76dc9c0a1648855665b';
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: electricEquipmentCategoryId, isForAll: true })
    .exec((err, electricEquipments) => resolve(electricEquipments));
  });
};

exports.getElectricEquipment = function(data) {
  let electricEquipmentId = '5a85c76dc9c0a1648855665b';
  let electricEquipmentsForAll = exports.getAllElectricEquipment();
  let electricEquipmentsByTravelType = exports.getEquipmentByEquipmentCategoryAndTravelType(electricEquipmentId, data.travelTypeId);
  return Promise.all([electricEquipmentsForAll, electricEquipmentsByTravelType]).then(data => {
    let electricEquipmentsForAll = data[0];
    let electricEquipmentsByTravelType = data[1];
    let allFinalEquipment = concat(electricEquipmentsForAll, electricEquipmentsByTravelType);
    return new Promise((resolve, reject) => resolve(uniqBy(allFinalEquipment, '_id')));
  }); 
} 


// ******* TUALETIC EQUIPMENT ********* //
exports.getAllTualeticEquipment = function() {
  let tualeticEquipmentCategoryId = '5a85c782c9c0a1648855665c';
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: tualeticEquipmentCategoryId, isForAll: true })
    .exec((err, equipments) => resolve(equipments));
  });
};

exports.getTualeticEquipment = function(data) {
  let tualeticEquipmentsForAllPromise = exports.getAllTualeticEquipment();
  return Promise.all([tualeticEquipmentsForAllPromise]).then(data => {
    let tualeticEquipmentsForAll = data[0];
    return new Promise((resolve, reject) => resolve(uniqBy(tualeticEquipmentsForAll, '_id')));
  }); 
} 


// ******* CLOTHING EQUIPMENT ********* //
exports.getAllClothingEquipment = function() {
  let clothingEquipmentCategoryId = '5a85c6a9c9c0a16488556656';
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: clothingEquipmentCategoryId, isForAll: true })
    .exec((err, clothingEquipments) => resolve(clothingEquipments));
  });
};

exports.getClothingEquipment = function(data) {
  let clothingEquipmentCategoryId = '5a85c6a9c9c0a16488556656';
  let clothingEquipmentsForAllPromise = exports.getAllClothingEquipment();
  let clothingEquipmentsByTravelTypePromise = exports.getEquipmentByEquipmentCategoryAndTravelType(clothingEquipmentCategoryId, data.travelTypeId);
  let clothingEquipmentsBySeasonPromise = exports.getEquipmentByEquipmentCategoryAndSeason(clothingEquipmentCategoryId, data.seasonId);
  return Promise.all([clothingEquipmentsForAllPromise, clothingEquipmentsByTravelTypePromise, clothingEquipmentsBySeasonPromise])
    .then(data => {
      let clothingEquipmentsForAll = data[0];
      let clothingEquipmentsByTravelType = data[1];
      let clothingEquipmentsBySeason = data[2];
      let allFinalEquipment = concat(clothingEquipmentsForAll, clothingEquipmentsByTravelType, clothingEquipmentsBySeason);
      return new Promise((resolve, reject) => resolve(uniqBy(allFinalEquipment, '_id')));
  });
}; 