function UsuariosDAO(connection) {
    this._connection = connection
}

UsuariosDAO.prototype.inserirUsuario = async function(usuario){
    
    const usuarioCollection = this._connection.collection('usuarios');
    await usuarioCollection.insertMany([usuario])
    
    /* open(function(error, mongoClient){
        mongoClient.collection("usuarios", function(error,collection){
            collection.insert(usuario);
        })
    }) */
}

module.exports = function() {
    return UsuariosDAO;
}