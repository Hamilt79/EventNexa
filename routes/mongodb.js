const { MongoClient } = require("mongodb");
// Replace the uri string with your connection string.
const uri = "mongodb://localhost:27017/";
//const uri = "<connection string uri>";
const client = new MongoClient(uri);

async function run() {
  try {

    const database = client.db('eventnexa');
    const users = database.collection('users');

    let myUser = { username : 'John', password: 'Password!' };

    users.insertOne(myUser).then(function() {});

    const movie = await movies.findOne(query);
    console.log(movie);
    //console.log("Got here");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);