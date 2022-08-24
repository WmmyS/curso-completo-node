const { MongoClient } = require('mongodb');

function connectMongoDb() {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    client.connect();
    console.log('Database conectada com sucesso');
    const db = client.db('got');

    return db; 
}

module.exports = function() {
    return connectMongoDb;
}