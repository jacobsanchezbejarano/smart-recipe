const dotenv = require('dotenv');
dotenv.config();
const {MongoClient} = require('mongodb');

const uri = process.env.MONGO_CONNECTION_URI;
const _client = new MongoClient(uri);

let _db;

const initDb = (callback) => {
  if (_db) {
    console.log('Db is already initialized!');
    return callback(null, _db);
  }
  _client.connect()
    .then((client) => {
      _db = client;
      callback(null, _db);
    })
    .catch((err) => {
      callback(err);
    });
};

const getCluster = () => {
  if (!_db) {
    throw Error('Db not initialized');
  }
  return _db;
};

const main = async function () {
	try {
        await _client.connect();
        await listDatabases(_client);
     
    } catch (e) {
        console.error(e);
    
    } finally {
        await _client.close();
        
    }
};

const listDatabases = async function (client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

module.exports = Object.freeze({
    main,
    listDatabases,
    initDb,
    getCluster,
});