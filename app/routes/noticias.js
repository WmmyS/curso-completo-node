const dbConnection = require('../../config/dbConnection');

module.exports = function(application) {
    
    application.get('/noticias', (req, res) => {

        const connection =  application.config.dbConnection();
        const noticiasModel = application.app.models.noticiasModel;

        noticiasModel.getNoticias(connection, function(error, result){
            res.render("noticias/noticias", { noticias : result });
        });

    })
    
}