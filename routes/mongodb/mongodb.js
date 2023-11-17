const { MongoClient } = require("mongodb");

class MongoConnection {

  static mongoConnection = null;

  /**
   * 
   * @returns mongoConnection
   */
  static get() {
    return MongoConnection.mongoConnection;
  }

  /**
   * Initializes the static MongoCollection
   */
  static init() {
    if(MongoConnection.mongoConnection == null) {
      MongoConnection.mongoConnection = new MongoConnection();
    }
  }

  constructor() {
    this.client = this.#createClient();
  }

  /**
   * Enum containing the names of collections
   */
  static COLLECTION_E = {
    Users: "users",
    Events: "events"
  };

  // Link to local eventnexa database
  static uri = "mongodb://localhost:27017/eventnexa";

  /**
   * Creates a new MongoClient object
   * 
   * @returns created MongoClient object
   */
  #createClient() {
    return new MongoClient(MongoConnection.uri);
  }

  /**
   * Gets the default "eventnexa" database.
   * 
   * @returns eventnexa database
   */
  #getDefaultDatabase() {
    return this.client.db();
  }

  /**
   * Gets a collection from the default database
   * 
   * @param {*} collection collection to return
   */
  #getCollection(collection) {

    return this.#getDefaultDatabase().collection(collection);

  }

  /**
   * Queries the collection and returns the first result
   * 
   * @param {*} query query object
   * @param {*} collection collection to query
   * @returns query result
   */
  async queryCollection(query, collection) {

      const collectionData = this.#getCollection(collection);  
      return await collectionData.findOne(query);

  }

  /**
   * Checks if a query returns a result.
   * 
   * @param {*} query Query object
   * @param {*} collection Collection to query
   * @returns True if exists, false if it doesn't
   */
  async queryExists(query, collection) {
    const result = await this.queryCollection(query, collection);
    //console.log(result);
    if (result == null || result == undefined) {
      return false;
    }
    return true;
  }

  /**
   * Inserts one object into the collection
   * 
   * @param {*} data data to insert
   * @param {*} collection collection to insert into
   */
  async insertData(data, collection) {
    const collectionData = this.#getCollection(collection);
    await collectionData.insertOne(data);
  }

  /**
   * Inserts data into the collection if it's not already there.
   * 
   * @param {*} data data to inset
   * @param {*} collection collection to insert into
   * @returns true if it inserted, false if it already existed
   */
  async insertIfNotExist(data, collection) {
    if (await this.queryExists(data, collection)) {
      return false;
    } 
    await this.insertData();  
    return true;
  }

  /**
   * Updates one object in the collection
   * 
   * @param {*} data data to update
   * @param {*} collection collection to update data in
   */
  async updateData(filter, updateFilter, collection) {
    const collectionData = this.#getCollection(collection);
    await collectionData.updateOne(filter, updateFilter);
    // Example of update
    /*
    await collectionData.update(
      { _id: 1 },
      {
        $inc: { stock: 5 },
        $set: {
          item: "ABC123",
          "info.publisher": "2222",
          tags: [ "software" ],
          "ratings.1": { by: "xyz", rating: 3 }
        }
      }
      
   )*/

  }

  /**
   * Close internal MongoClient
   */
  async close() {
    await this.client.close();
  }
}

module.exports = {
  MongoConnection
};