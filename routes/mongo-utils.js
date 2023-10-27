var MongoClient = require('mongodb').MongoClient;

// var url = "mongodb://localhost:27017/";

// function connect() {

//     MongoClient.connect(url, function(err, db) {
//         if (err) throw err;
        
//         var dbo = db.db("user-info");
//         dbo.createCollection("username-pass", function(err, res) {
//             if (err) throw err;
//             console.log("Collection created!");
            
//             db.close();
//         });
//     });

// }

// module.exports = {
//     test: connect()
// };