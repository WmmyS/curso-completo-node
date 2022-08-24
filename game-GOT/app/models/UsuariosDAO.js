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

UsuariosDAO.prototype.autenticar = async function(usuario, req, res){
    const usuarioCollection = this._connection.collection('usuario');
    await usuarioCollection.find(usuario).toArray(function(error, result){
        if (result[0] != undefined) {
            req.session.autorizado = true
            req.session.usuario = result[0].usuario
            req.session.casa = result[0].casa
        }

        if (req.session.autorizado) {
            res.redirect("Jogo")
        } else {
            res.render("index", {validacao: {}});
        }
    });
    //const saved = await usuarioCollection.insertOne(usuario)
}

module.exports = function() {
    return UsuariosDAO;
}