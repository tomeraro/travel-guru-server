/**
 * Created by tomeraronovsky on 8/26/17.
 */

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var ContinentSchema = new Schema({
    name: String
});


var Continent = mongoose.model('Continent', ContinentSchema);

// Create a Continent collection
var todo = new Continent({name: 'Master NodeJS'});
// Save it to database
todo.save(function(err){
    if(err)
        console.log(err);
    else
        console.log(todo);
});






//module.exports = mongoose.model('continents', ContinentSchema);
