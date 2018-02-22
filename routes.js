var mongoose = require('mongoose');
var CountrySchema = require('./db/CountrySchema');
var SeasonSchema = require('./db/SeasonSchema');
var TravelTypeSchema = require('./db/TravelTypeSchema');
var ParticipantsSchema = require('./db/ParticipantsSchema');
var EquipmentSchema = require('./db/EquipmentSchema');


module.exports = function(app)
{
    let Season = SeasonSchema.seasonModel;
    let Country = CountrySchema.countryModel;
    let TravelTypes = TravelTypeSchema.travelTypeModel;
    let Participants = ParticipantsSchema.participantsModel;

    let Equipment = EquipmentSchema.equipmentModel;

    //************** routes ************//
    app.get('', function(req, res) {
        res.sendfile('index.html'); // load the single view file
    });

    //********** country routes ***********//
    app.get('/api/db/getAllCountries', function(req, res) {
        Country.find({}, function(err, allCountries) {
            res.send(allCountries);
        });
    });

    app.get('/api/db/createAllCountries', function(req, res) {
        let arr = ["לסוטו", "מאוריטניה", "מאוריציוס", "מאלי", "מדגסקר", "מוזמביק", "מולדובה", "מונגוליה",
    "מונטנגרו", "מונקו", "מזרח טימור", "מיאנמר", "מיקרונזיה", "מלאווי", "מלזיה", "מלטה", "מצרים",
"מקדוניה", "מקסיקו", "מרוקו", "נאורו", "נורווגיה", "ניגריה", "ניו זילנד", "ניז'ר", "ניקרגואה", "נמיביה",
"נפאל", "סאו טומה ופרינסיפה", "סודאן", "סווזילנד", "סומליה", "סוריה", "סורינאם", "סיירה לאון",
"סין", "סינגפור", "סלובניה", "סלובקיה", "סמואה", "סן מרינו", "סנגל", "סנט וינסנט והגרנדינים",
"סנט לוסיה", "סנט קיטס ונוויס", "ספרד", "סרביה", "סרי לנקה", "עומאן", "עיראק", "ערב הסעודית", 
"פולין", "פורטוגל", "פיג'י", "פינלנד", "פלאו", "פנמה", "פפואה גינאה החדשה", "פקיסטן", "פרגוואי",
"פרו", "צ'אד", "צ'ילה", "צ'כיה", "צרפת", "קובה", "קולומביה", "קומורו", "קוסטה ריקה", "קוריאה הדרומית", "קוריאה הצפונית", 
"קזחסטן", "קטאר", "קירגיזסטן", "קיריבטי", "קמבודיה", "קמרון", "קנדה", "קניה", "קפריסין", "קרואטיה", 
"רואנדה", "רומניה", "רוסיה", "שוודיה", "שווייץ", "תאילנד", "תוניסיה", "תימן"];
          
        let counter = 0;
        for(var i = 0; i < arr.length; i++) {
            let country = new Country();
            country.name = arr[i];
            country.save((err, createdObject)=> {
                if (err) {
                    res.status(500).send(err);
                }
                counter++;
            });
        }
        res.status(200).send(counter + " countries were added");  
    });



    //********** seasons routes ***********//
    app.get('/api/db/getAllSeasons', function(req, res) {
        Season.find({}, function(err, allSeasons) {
            res.send(allSeasons);
        });
    });

    //********** TravelTypes routes ***********//
    app.get('/api/db/getAllTravelTypes', function(req, res) {
        TravelTypes.find({}, function(err, allTravelTypes) {
            res.send(allTravelTypes);
        });
    });

    //********** participants routes ***********//
    app.get('/api/db/getAllParticipants', function(req, res) {
        Participants.find({}, function(err, allParticipants) {
            res.send(allParticipants);
        });
    });

    //********** Equipment routes ***********//
    app.get('/api/db/getAllEquipment', function(req, res) {
        Equipment.find({}, function(err, allEquipment) {
            res.send(allEquipment);
        });
    });
};


