const dbConnection = require('../../config/dbConnection');

module.exports = function(app) {
    
    app.get('/noticias', (req, res) => {
        const connection =  app.config.dbConnection();
        connection.query('select * from noticias', function(error, result){
            res.render("noticias/noticias", { noticias : result });
        });
    })
    
}