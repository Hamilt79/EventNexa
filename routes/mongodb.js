const mongodb = require('mongodb');
var url = "mongodb://localhost:27017/nexa-users";

MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    console.log("Database created!");
    db.close();
  });