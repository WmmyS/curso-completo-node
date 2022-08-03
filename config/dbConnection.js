const mysql = require('mysql');

const databaseConnection = function() {
    console.log('Database connection is successfuly')
    return mysql.createConnection({
        host: '127.0.0.1',
        port: '3308',
        user: 'root',
        password: '123',
        database: 'portal_noticias'
    })
}

module.exports = function () {
    console.log('Database connection module was loaded successfuly')
    return databaseConnection;
}
