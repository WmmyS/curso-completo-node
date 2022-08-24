const { MongoClient } = require('mongodb');

const connectMongoDb = function() {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    client.connect();
    console.log('Database conectada com sucesso');
    const db = client.db('got');

    return db; 
}

module.exports = async function() {
    return await connectMongoDb;
}