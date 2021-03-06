var mongoose = require('mongoose');
var EquipmentSchema = require('./../models/EquipmentSchema');
let Equipment = EquipmentSchema.equipmentModel;
var concat = require('lodash/concat');
var flatten = require('lodash/flatten');
var uniqWith = require('lodash/uniqWith');
var isEqual = require('lodash/isEqual');
var includes = require('lodash/includes');

exports.getEquipmentBySearchDetails = function(data) {
  let generalEquipments = exports.getGeneralEquipment(data);
  let electricEquipment = exports.getElectricEquipment(data);
  let tualeticEquipment = exports.getTualeticEquipment(data);
  let clothingEquipment = exports.getClothingEquipment(data);
  let leisureAndOtherEquipment = exports.getLeisureAndOtherEquipment(data);
  let medicalEquipment = exports.getMedicalEquipment(data);
  let specialEquipment = [];
  //babies special
  if(includes(data.participants, '5a7a9df8f36d283d3de74006', 0)) {
    let babiesSpecialEquipment = exports.getBabiesSpecialEquipment(data);
    specialEquipment.push(babiesSpecialEquipment);
  }
  //children & tenagers special

  return Promise.all(concat([
    generalEquipments, electricEquipment, 
    tualeticEquipment, clothingEquipment, 
    leisureAndOtherEquipment, medicalEquipment], 
    specialEquipment))
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

exports.getEquipmentByEquipmentCategoryAndCountry = function(equipmentCategoryId, countryId) {
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: equipmentCategoryId, countryIds: countryId, isForAll: false })
    .exec((err, equipments) => resolve(equipments));
  });
};

// ******* GENERAL EQUIPMENT ********* //
exports.getGeneralEquipment = function(data) {
  let generalEquipmentCategoryId = '59d8e609734d1d18c95c8396';
  let generalEquipmentForAllPromise = exports.getAllGeneralEquipment();
  let generalEquipmentByTravelTypePromise = exports.getEquipmentByEquipmentCategoryAndTravelType(generalEquipmentCategoryId, data.travelTypeId);
  let generalEquipmentByCountryPromise = exports.getEquipmentByEquipmentCategoryAndCountry(generalEquipmentCategoryId, data.countryId);
  return Promise.all([generalEquipmentForAllPromise, generalEquipmentByTravelTypePromise, generalEquipmentByCountryPromise]).then(data => {
    let generalEquipmentForAll = data[0];
    let generalEquipmentByTravelType = data[1];
    let generalEquipmentByCountry = data[2];
    let allFinalEquipment = concat(generalEquipmentForAll, generalEquipmentByTravelType, generalEquipmentByCountry);
    return new Promise((resolve, reject) => resolve(uniqWith(allFinalEquipment, isEqual)));
  }); 
}

exports.getAllGeneralEquipment = function(data) {
  let generalEquipmentCategoryId = '59d8e609734d1d18c95c8396';
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: generalEquipmentCategoryId, isForAll: true })
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
    return new Promise((resolve, reject) => resolve(uniqWith(allFinalEquipment, isEqual)));
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
    return new Promise((resolve, reject) => resolve(uniqWith(tualeticEquipmentsForAll, isEqual)));
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
      return new Promise((resolve, reject) => resolve(uniqWith(allFinalEquipment, isEqual)));
  });
}; 


// ******* LEISURE AND OTHER EQUIPMENT ********* //
exports.getAllLeisureAndOtherEquipment = function() {
  let leisureAndOtherEquipmentCategoryId = '5a85c759c9c0a1648855665a';
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: leisureAndOtherEquipmentCategoryId, isForAll: true })
    .exec((err, leisureEquipments) => resolve(leisureEquipments));
  });
};

exports.getLeisureAndOtherEquipment = function(data) {
  let leisureAndOtherEquipmentCategoryId = '5a85c759c9c0a1648855665a';
  let leisureAndOtherEquipmentsForAllPromise = exports.getAllLeisureAndOtherEquipment();
  let leisureAndOtherEquipmentsByTravelTypePromise = exports.getEquipmentByEquipmentCategoryAndTravelType(leisureAndOtherEquipmentCategoryId, data.travelTypeId);
  let leisureAndOtherEquipmentsBySeasonPromise = exports.getEquipmentByEquipmentCategoryAndSeason(leisureAndOtherEquipmentCategoryId, data.seasonId);
  return Promise.all([leisureAndOtherEquipmentsForAllPromise, leisureAndOtherEquipmentsByTravelTypePromise, leisureAndOtherEquipmentsBySeasonPromise])
    .then(data => {
      let leisureAndOtherEquipmentsForAll = data[0];
      let leisureAndOtherEquipmentsByTravelType = data[1];
      let leisureAndOtherEquipmentsBySeason = data[2];
      let allFinalEquipment = concat(leisureAndOtherEquipmentsForAll, leisureAndOtherEquipmentsByTravelType, leisureAndOtherEquipmentsBySeason);
      return new Promise((resolve, reject) => resolve(uniqWith(allFinalEquipment, isEqual)));
  });
};


// ******* MEDICAL EQUIPMENT ********* //
exports.getAllMedicalEquipment = function() {
  let medicalEquipmentCategoryId = '5a85c709c9c0a16488556657';
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: medicalEquipmentCategoryId, isForAll: true })
    .exec((err, medicalEquipments) => resolve(medicalEquipments));
  });
};

exports.getMedicalEquipment = function(data) {
  let medicalEquipmentCategoryId = '5a85c709c9c0a16488556657';
  let medicalEquipmentsForAllPromise = exports.getAllMedicalEquipment();
  let medicalEquipmentsByTravelTypePromise = exports.getEquipmentByEquipmentCategoryAndTravelType(medicalEquipmentCategoryId, data.travelTypeId);
  return Promise.all([medicalEquipmentsForAllPromise, medicalEquipmentsByTravelTypePromise])
    .then(data => {
      let medicalEquipmentsForAll = data[0];
      let medicalEquipmentsByTravelType = data[1];
      let allFinalEquipment = concat(medicalEquipmentsForAll, medicalEquipmentsByTravelType);
      return new Promise((resolve, reject) => resolve(uniqWith(allFinalEquipment, isEqual)));
  });
};


// ******* PARTICIPANTS EQUIPMENT ********* //
// BABIES 
exports.getAllBabiesSpecialEquipment = function() {
  let babiesSpecialEquipmentCategoryId = '5a85c743c9c0a16488556659';
  return new Promise(function(resolve, reject) {
    Equipment.find({ equipmentCategoryId: babiesSpecialEquipmentCategoryId, isForAll: true })
    .exec((err, babiesSpecialEquipment) => resolve(babiesSpecialEquipment));
  });
};

exports.getBabiesSpecialEquipment = function(data) {
  let babiesSpecialEquipmentCategoryId = '5a85c743c9c0a16488556659';
  let babiesSpecialEquipmentsForAllPromise = exports.getAllBabiesSpecialEquipment();
  let babiesSpecialEquipmentsByTravelTypePromise = exports.getEquipmentByEquipmentCategoryAndTravelType(babiesSpecialEquipmentCategoryId, data.travelTypeId);
  let babiesSpecialEquipmentsBySeasonPromise = exports.getEquipmentByEquipmentCategoryAndSeason(babiesSpecialEquipmentCategoryId, data.seasonId);
  return Promise.all([babiesSpecialEquipmentsForAllPromise, babiesSpecialEquipmentsByTravelTypePromise, babiesSpecialEquipmentsBySeasonPromise])
    .then(data => {
      let babiesSpecialEquipmentsForAll = data[0];
      let babiesSpecialEquipmentsByTravelType = data[1];
      let babiesSpecialEquipmentsBySeason = data[2];
      let allFinalEquipment = concat(babiesSpecialEquipmentsForAll, babiesSpecialEquipmentsByTravelType, babiesSpecialEquipmentsBySeason);
      return new Promise((resolve, reject) => resolve(uniqWith(allFinalEquipment, isEqual)));
  });
};
