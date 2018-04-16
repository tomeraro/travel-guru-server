var mongoose = require('mongoose');

// *** import lodash functions ***//
var head = require('lodash/head');
var forEach = require('lodash/forEach');
var set = require('lodash/set');
var map = require('lodash/map');
var assign = require('lodash/assign');
var find = require('lodash/find');
var isEqual = require('lodash/isEqual');
var get = require('lodash/get');
var toString = require('lodash/toString');

// **** MODELS **** //
var CountrySchema = require('./models/CountrySchema');
var SeasonSchema = require('./models/SeasonSchema');
var TravelTypeSchema = require('./models/TravelTypeSchema');
var ParticipantsSchema = require('./models/ParticipantsSchema');
var EquipmentSchema = require('./models/EquipmentSchema');
var EquipmentListSchema = require('./models/EquipmentListSchema');
var EquipmentCategorySchema = require('./models/EquipmentCategorySchema');

// *** DB QUERIES *** //
var equipmentQueries = require('./db/equipmentQueries');
var counyryQueries = require('./db/countryQueries');
var seasonQueries = require('./db/seasonQueries');
var travelTypeQueries = require('./db/travelTypeQueries');
var equipmentListQueries = require('./db/equipmentListQueries');
var participantsQueries = require('./db/participantQueries');

module.exports = function(app)
{
    let Season = SeasonSchema.seasonModel;
    let Country = CountrySchema.countryModel;
    let TravelTypes = TravelTypeSchema.travelTypeModel;
    let Participants = ParticipantsSchema.participantsModel;
    let Equipment = EquipmentSchema.equipmentModel;
    let EquipmentList = EquipmentListSchema.equipmentListModel;
    let EquipmentCategory = EquipmentCategorySchema.equipmentCategoryModel;

    //************** routes ************//
    app.get('', function(req, res) {
        res.sendfile('index.html'); // load the single view file
    });


    //********** search routes  ************//
    app.get('/api/db/getAllDataForSearch', function(req, res) {
        let allcountries = counyryQueries.getAllCountries();
        let allSeasons = seasonQueries.getAllSeasons();
        let allTravelTypes = travelTypeQueries.getAllTravelTypes();
        let allParticipants = participantsQueries.getAllParticipants();
        Promise.all([allcountries, allSeasons, allTravelTypes, allParticipants]).then(values => {
            let searchData = [
                values[0], values[1], values[2], values[3]
            ];            
            res.send(searchData);
        });
    });

    //********** country routes ***********//
    app.get('/api/db/getAllCountries', function(req, res) {
        counyryQueries.getAllCountries().then(allCountries => res.send(allCountries));
    });

    //********** seasons routes ***********//
    app.get('/api/db/getAllSeasons', function(req, res) {
        seasonQueries.getAllSeasons().then(allSeasons => res.send(allSeasons));
    });

    //********** TravelTypes routes ***********//
    app.get('/api/db/getAllTravelTypes', function(req, res) {
        travelTypeQueries.getAllTravelTypes().then(allTravelTypes => res.send(allTravelTypes));
    });

    //********** participants routes ***********//
    app.get('/api/db/getAllParticipants', function(req, res) {
        participantsQueries.getAllParticipants().then(allParticipants => res.send(allParticipants));
    });

    //********** Equipment routes ***********//
    app.get('/api/db/getAllGeneralEquipment', function(req, res) {
        let answer = equipmentQueries.getAllGeneralEquipment();
        res.send(answer);
    });
    
    //********** EquipmentCategories routes ***********//
    app.get('/api/db/getAllEquipmentCategories', function(req, res) {
        EquipmentCategory.find({}, function(err, allCategories) {
            res.send(allCategories);
        });
    });

    //******** EquipmentsList routes *********//
    app.get('/api/db/createNewList', (req, res) => {
        let data = {
            countryId: req.query.countryId,
            seasonId: req.query.seasonId,
            travelTypeId: req.query.travelTypeId,
            participants: req.query.participants,
            creationDate: req.query.creationDate
        };

        let country = counyryQueries.getCountryById(data.countryId);
        let season = seasonQueries.getSeasonById(data.seasonId);
        let travelType = travelTypeQueries.getTravelTypeById(data.travelTypeId);
        let equipments = equipmentQueries.getEquipmentBySearchDetails(data);

        Promise.all([country, season, travelType, equipments]).then(values => {
            let newList = new EquipmentList();
            newList.country = values[0];
            newList.season = values[1];
            newList.travelType = values[2];
            newList.participantsIds = data.participants;
            newList.list = values[3];
            newList.creationDate = data.creationDate;
            
            map(newList.list, (item) => {
                item._doc = assign({}, item._doc, { selected: false });
                return item;
            });
            newList.save((err, createdList) => res.send(createdList));
        });
    });

    app.get('/api/db/getEquipmentListById', function (req, res) {
        let listId = req.query.id;
        equipmentListQueries.getEquipmentListById(listId).then(list => res.send(list));
    });

    app.post('/api/db/saveEquipmentList', function (req, res) {
        let listId = req.body.listId;
        let equipmentId = req.body.equipmentId;
        let checkboxValue = req.body.checked;
        equipmentListQueries.saveEquipmentList(listId, equipmentId, checkboxValue).then(list => res.send(list));
    });

    app.post('/api/db/addCustomEquipmentToList', function (req, res) {
        let listId = req.body.listId;
        let equipmentCategoryId = req.body.equipmentCategoryId;
        let equipmentValue = req.body.equipmentValue;
        equipmentListQueries.addCustomEquipmentToList(listId, equipmentCategoryId, equipmentValue).then(newCustomEquipment => res.send(newCustomEquipment));
    });

    app.delete('/api/db/deleteEquipmentFromList', (req, res) => {
        equipmentListQueries.deleteEquipmentFromList(req.query.listId, req.query.equipmentId)
            .then(data => res.send(data));
    });
};
