//var user = require("./DB/user");


module.exports = function(app)
{
    //************** routes ************//
    app.get('', function(req, res) {
        res.sendfile('index.html'); // load the single view file
    });

};


