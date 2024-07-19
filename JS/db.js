const { MongoClient } = require('mongodb');

const mongoUri = 'mongodb+srv://Admin:IMXshfqLgjgzNZwN@originalcluster.g2m81ys.mongodb.net/?retryWrites=true&w=majority&appName=OriginalCluster'; 
const dbName = 'Capstone'; 

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
