const { MongoClient } = require("mongodb");
// Link to local eventnexa database
const uri = "mongodb://localhost:27017/eventnexa";

const COLLECTION_E = { 
    Users: "users"
 };

async function run() {
  const client = new MongoClient(uri);
  try {
    // Create MongoClient to eventnexa dbs
    // Make variable to the database
    const database = client.db();
    //await database.createCollection('users');
    const users = database.collection(COLLECTION_E.Users);

    const userTest = { username: 'John', password: 'Passwordddd!' };

    

    let query = { username: 'John' };
    await users.findOne(query).then(value => { console.log(value); });
    
    //console.log(movie);
    //console.log("Got here");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}

run().catch(console.dir);

module.exports.run = run;

module.exports = {
  COLLECTION_E
};