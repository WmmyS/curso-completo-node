function UsuariosDAO(connection) {
    this._connection = connection()
}

UsuariosDAO.prototype.inserirUsuario = async function(usuario){
    
    const usuarioCollection = this._connection.collection('usuario');
    const saved = await usuarioCollection.insertOne(usuario)
    if (saved) {
        console.log('Usuário salvo com sucesso');
    }
}

module.exports = function() {
    return UsuariosDAO;
}