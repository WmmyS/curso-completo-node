const express = require('express'),
    bodyParser = require('body-parser'),
    mongodb = require('mongodb'),
    objectId = require('mongodb').ObjectId;

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

//Insert
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

//Get All
app.get('/api', function(req, res) {
    db.open(function(error, mongoclient) {
        mongoclient.collection('postagens', function(error, collection) {
            collection.find().toArray(function(err, results) {
                if (err) {
                    res.json(err);
                } else {
                    res.json(results);
                }
                mongoclient.close();
            });
        })
    })
})

//Get By Id
app.get('/api/:id', function(req, res) {
    db.open(function(error, mongocliente) {
        mongocliente.collection('postagens', function(error, collection) {
            collection.find(objectId(req.params.id)).toArray(function(error, results) {
                if (error) {
                    res.json(error);
                } else {
                    res.json(results);
                }
                mongocliente.close();
            })
        })
    })
})

//Update By Id
app.put('/api/:id', function(req, res) {
    db.open(function(error, mongocliente) {
        mongocliente.collection('postagens', function(error, collection) {
            collection.update(
                {_id: objectId(req.params.id)},
                { $set: {titulo: req.body.titulo}},
                {},
                function(error, records) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json(records);
                    }

                    mongocliente.close();
                }
            );
        })
    })
})

//Delete By Id
app.delete('/api/:id', function(req, res) {
    db.open(function(error, mongocliente) {
        mongocliente.collection('postagens', function(error, collection) {
            collection.remove(
                {_id: objectId(req.params.id)},
                function(error, records) {
                    if (error) {
                        res.json(error);
                    } else {
                        res.json(records);
                    }

                    mongocliente.close();
                }
            );
        })
    })
})