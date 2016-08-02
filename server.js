// start mongod --nojournal
// start server nodemon server.js

var express = require("express");
var path = require('path');
var mongo = require('mongodb').MongoClient;

var api = require('./routes/api.js');
var routes = require("./routes/index.js");
var latest = require('./routes/latest.js');

var app = express();

// global variable, used for tab title
app.locals.title = "Image Search";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);


// use public directory for stylesheets
app.use(express.static(path.join(__dirname, 'public')));


//set up database
var url = 'mongodb://localhost:27017/myDb';

//set MONGOLAB_URI for heroku
mongo.connect(process.env.MONGOLAB_URI || url, function(err, db){
    if(err) throw 'Database failed to connect';
    
    
    // limit database size - removes oldest document when max is reached
    db.createCollection('history', {
        capped: true,
        size: 3000000,
        max: 10
    });
    
    
    
    routes(app);
    latest(app, db);
    api(app, db);


    //start server
    var port = process.env.PORT || 8080;
    
    app.listen(port, function(){
      console.log("Listening on port " + port + "...");
    });
    
});










