function NoticiasDAO(connection) {
    this._connection = connection
}

NoticiasDAO.prototype.getNoticias = function(callback) {
    this._connection.query('select * from noticias', callback);
}

NoticiasDAO.prototype.getNoticia = function(id, callback) {
    this._connection.query('select * from noticias where id_noticia = ?',id , callback);
}

NoticiasDAO.prototype.salvarNoticia = function(noticia, callback){
    console.log(noticia);
    this._connection.query('insert into noticias set ?', noticia, callback);
}

module.exports = function() {
    return NoticiasDAO;
}