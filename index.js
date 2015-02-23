var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var MongoClient = require('mongodb').MongoClient;

app.set('port', (process.env.PORT || 5000));
app.use(logger('combined'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

var mongo_url = 'mongodb://localhost:27017/uberlist';

var findLists = function (name, callback) {
  MongoClient.connect(mongo_url, function (err, db) {
    if (err) {
      callback(err, null);
    } else {
      var collection = db.collection('lists');
      collection.find({_id: name}).toArray(function (err, docs) {
        db.close();
        if (err) {
          callback(err, null);
        } else if (docs.length != 1) {
          callback(null, null);
        } else {
          callback(null, docs[0]['lists']);
        }
      });
    }
  });
};

var updateLists = function (name, doc, callback) {
  MongoClient.connect(mongo_url, function (err, db) {
    if (err) {
      callback(err, null);
    } else {
      var collection = db.collection('lists');
      collection.update({_id: name}, {$set: {'lists': doc}}, {upsert: true}, function(err, result) {
        db.close();
        if (err) {
          callback(err, null);
        } else {
          callback(null, result);
        }
      });
    }
  });
};

// express returns index.html automagically

//app.get('/', function(request, response) {
//  console.log('set location');
//  response.location('index.html');
//});

app.get('/api/lists', function (request, response) {
  findLists('scott', function (err, doc) {
    if (err) {
      response.status(404).end();
    } else if (doc == null) {
      response.status(304).end();
    } else {
      response.send(doc);
    }
  });
});

app.post('/api/lists', function (request, response) {
  updateLists('scott', request.body, function (err, result) {
    if (err) {
      response.status(404).end();
    } else if (result.result.n == 0) {
      response.status(304).end();
    } else {
      response.status(200).end();
    }
  });
});

app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost: " + app.get('port'));
});
