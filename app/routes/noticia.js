const dbConnection = require('../../config/dbConnection');

module.exports = function(application) {
    
    application.get('/noticia', (req, res) => {

        const connection =  application.config.dbConnection();
        const noticiaModel = new application.app.models.NoticiasDAO(connection);

        noticiaModel.getNoticia(function(error, result){
            res.render("noticias/noticia", { noticia : result });
        })

    })
    
}