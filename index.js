var express = require('express');
var logger = require('morgan');
var app = express();

app.set('port', (process.env.PORT || 5000));
app.use(logger('combined'));
app.use(express.static(__dirname + '/public'));

// express returns index.html automagically

//app.get('/', function(request, response) {
//  console.log('set location');
//  response.location('index.html');
//});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost: " + app.get('port'));
});
