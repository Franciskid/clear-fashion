var products = require("./products.json");
var secret = require("dotenv").config({ path: "./.env" });
const { MongoClient } = require("mongodb");
const MONGODB_DB_NAME = 'clearfashion';
const MONGO_COLLECTION = 'products';
const MONGODB_URI = 'mongodb+srv://anfroiyan:temalakichta69@clearfashioncluster.vqzn2.mongodb.net/clearfashion?retryWrites=true&w=majority';

let database = null;
let client = null;

const getDB = async () => {
  try {
    if (database) {
      console.log("Already connected to db!");
    } else {
      console.log("Connecting to db...");
      client = await MongoClient.connect(MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      database = client.db(MONGODB_DB_NAME);
      console.log("connected to database successfully!");
    }
    return database;
  } catch (err) {
    console.error(err);
  }
};



const removeProducts = async (query) => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGO_COLLECTION);
    const num_doc = await collection.countDocuments();
    if (num_doc > 0) {
      await collection.deleteMany(query);
      console.log("Removed products!");
    } else {
      console.log("No products to delete...");
    }
  } catch (err) {
    console.error(err);
  }
};

const insertProducts = async () => {
  try {
    const db = await getDB();

    const collection = db.collection(MONGO_COLLECTION);
    const num_doc = await collection.countDocuments();
    if (num_doc === 0) {
      const result = await collection.insertMany(products);
      console.log("Inserted products successfully!");
      console.log(result);
    } else {
      console.log("Documents already insterted!");
    }

    console.log(num_doc);
  } catch (err) {
    console.error(err);
  }
};

const query = module.exports.query = async (query, sort = {}) => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGO_COLLECTION);
    const result = await collection.find(query).sort(sort).toArray();
    return result;
  } catch (err) {
    console.error(err);
  }
};

const close = async () => {
  try {
    if (client) {
      await client.close();
      console.log("Successfully closed the connection!");
    } else {
      console.log("Client doesnt exist...");
    }
  } catch (err) {
    console.error(err);
  }
};

const main = async () => {
  await removeProducts({});
  await insertProducts();
    const query1 = { brand: "dedicated" };
    const result1 = await query(query1);
    console.log(result1);

    const query2 = { price: { $lt: 40 } };
    const result2 = await query(query2);
    console.log(result2);

  await close();
};

main();

module.exports.findSortLimit = async (query, sort,limit) => {
  try {
    const db = await getDB();
    const collection = db.collection(MONGO_COLLECTION);
    const result = await collection.find(query).sort(sort).limit(limit).toArray();
    console.log(result)
    return result;
  } catch (error) {
    console.error(error);
    console.log(client);
    console.log(database);
    
  }
};