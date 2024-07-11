const { MongoClient } = require('mongodb');
require('dotenv').config(); // To load environment variables from a .env file

const mongoUri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let db;

const connectToDB = async () => {
  if (db) return db;
  try {
    const client = await MongoClient.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db(dbName);
    console.log(`Connected to database: ${dbName}`);
    return db;
  } catch (error) {
    console.error(`Error connecting to database: ${error}`);
    throw error;
  }
};

module.exports = connectToDB;
