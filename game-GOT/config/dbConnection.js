const { MongoClient } = require('mongodb');

async function connectMongoDb(callback) {
    const url = 'mongodb://localhost:27017';
    const client = new MongoClient(url);

    client.connect();
    console.log('Database conectada com sucesso');
    const db = client.db('got');

    const result = await callback(db);
    if(result === 0) client.close();
    console.log('Conexão com database encerrada');
}

module.exports = function() {
    return connectMongoDb;
}