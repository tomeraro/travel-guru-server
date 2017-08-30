/**
 * Created by tomeraronovsky on 8/26/17.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContinentSchema = new Schema({
    name: String
});

var Continent = mongoose.model('Continent', ContinentSchema);

module.exports.continentModel = Continent;

//var asia = new Continent({name: 'אנטארטיקה'});
//// Save it to database
//asia.save(function(err){
//    if(err)
//        console.log(err);
//    else
//        console.log(asia);
//});





//module.exports = mongoose.model('continents', ContinentSchema);
