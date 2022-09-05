const express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const port = 8080;
app.listen(port);

const db = new mongodb.Db('instagram', new mongodb.Server('localhost', 27017, {}));

console.log('HTTP Server listening on http://localhost:' + port);

app.get('/', function(req, res) {
    res.send({msg: 'Hello, world'});
})

app.post('/api', function(req, res) {
    const dados = req.body

    db.open(function(error, mongoclient) {
        mongoclient.collection('postagens', function(error, collection) {
            collection.insert(dados, function(error, records) {
                if (error) {
                    res.json(error)
                } else {
                    res.json(records);
                }

                mongoclient.close();
            })
        })
    })
})
