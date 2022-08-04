const dbConnection = require('../../config/dbConnection');

module.exports = function(application) {
    
    application.get('/noticia', (req, res) => {

        const connection =  application.config.dbConnection();
        const noticiaModel = application.app.models.noticiasModel;

        noticiaModel.getNoticia(connection, function(error, result){
            res.render("noticias/noticia", { noticia : result });
        })

    })
    
}