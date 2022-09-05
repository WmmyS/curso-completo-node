const express = require('express'),
    bodyParser = require('body-parser'),
    multiparty = require('connect-multiparty'),
    mongodb = require('mongodb'),
    objectId = require('mongodb').ObjectId;
    fs = require('fs');

const app = express();

app.use(bodyParser.urlencoded({ extended: true })); //responsável por receber conteúdo x-www-form-urlencoded
app.use(bodyParser.json()); //responsável por receber conteúdo json
app.use(multiparty()); //responsável por receber conteúdo de arquivos

const port = 8080;
app.listen(port);

const db = new mongodb.Db('instagram', new mongodb.Server('localhost', 27017, {}));
console.log('HTTP Server listening on http://localhost:' + port);

app.get('/', function(req, res) {
    res.send({msg: 'Hello, world'});
})

//Insert
app.post('/api', function(req, res) {

    /**
     * Aceita dois parâmetros, propriedade a ser definida e valor a ser atribuído à propriedade.
     * Aqui estamos habilitando nossa api para responser a qualquer domínio.
     */
    res.setHeader("Access-Control-Allow-Origin", "*");

    const date = new Date();
    const time_stamp = date.getTime();
    const urlImage = time_stamp + '_' + req.files.arquivo.originalFilename;
    const pathOrign = req.files.arquivo.path;
    const pathDestiny = './uploads/' + urlImage;
    
    fs.rename(pathOrign, pathDestiny, function(error) { //parâmetros recebinos no rename: origem, destino e callback
        if(error) {
            res.status(500).json({error: error});
            return;
        }

        const dados = {
            url_image: urlImage,
            titulo: req.body.titulo
        }

        db.open(function(error, mongoclient) {
            mongoclient.collection('postagens', function(error, collection) {
                collection.insert(dados, function(error, records) {
                    if (error) {
                        res.json(error)
                    } else {
                        res.json({'status':'Inclusão realizada com sucesso'});
                    }
                    mongoclient.close();
                })
            })
        })
    })
})

//Get All
app.get('/api', function(req, res) {

    res.setHeader("Access-Control-Allow-Origin", "*");

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

app.get('/imagens/:imagem', function(req, res) {
    const img = req.params.imagem;
    fs.readFile('./uploads/' + img, function(error, fileContent){
        if (error) {
            res.status(400).json(error);
            return;
        }

        res.writeHead(200, {'content-Type': 'image/jpg'}) // O navegador irá entender que o que foi recebido é uma imagem
        res.end(fileContent);
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