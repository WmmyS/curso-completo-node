/* Importar o módulo do framework express */
const express = require('express');

/* Importar o múdulo do consign */
const consign = require('consign');

/* Importar o módulo do body-parser */
const bodyParser = require('body-parser');

/* Importar o módulo do espress validator */
const expressValidator = require('express-validator');

/* Iniciar o objeto express */
const application = express();

/* Definir as variáveis 'viwe engine' e 'views' do express */
application.set('view engine', 'ejs');
application.set('views', './app/views');

/* Configurar o middleware express static */
application.use(express.static('./app/public'));

/** Configurar o middleware badyparser */
application.use(bodyParser.urlencoded({extended: true}));

/* Configurar o middleware express validator */
application.use(expressValidator());

/* Executar função do módulo consign, efetuando o auto-load das rotas, dos models
e dos controllers para o objeto application */
consign()
    .include('app/routes')
    .then('app/models')
    .then('app/controllers')
    .into(application);

/* Exportar o objeto application */
module.exports = application