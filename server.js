

var express = require("express");
var path = require('path');
var api = require('./routes/api.js');
var routes = require("./routes/index.js");

var app = express();

app.locals.title = "Image Search";

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');




routes(app);
api(app);






var port = process.env.PORT || '3000';

app.listen(port, function(){
  console.log("Listening on port " + port + "...");
});


