const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const url = 'mongodb://localhost:27017';

const dbName = 'propuestas';

const client = new MongoClient(url, { useUnifiedTopology: true });

const getDatabase = (callback) => {
    client.connect(function (err) {
        assert.equal(null, err);
        console.log("Connected successfully to server");

        const db = client.db(dbName);

        callback(db, client);
    });
}

const insertPropuesta = (db, callback, message) => {
    const collection = db.collection('propuestas');
    collection.insertMany([message], function (err, result) {
        console.log("Inserting document!")
        callback(result);
    });
}

const findPropuestas = function (db, callback) {
    // Get the documents collection
    const collection = db.collection('propuestas');
    // Find some documents
    collection.find({}).toArray(function (err, docs) {
        assert.equal(err, null);
        console.log("Found the following records");
        console.log(docs)
        callback(docs);
    });
}

exports.getDatabase = getDatabase;
exports.findPropuestas = findPropuestas;
exports.insertPropuesta = insertPropuesta;