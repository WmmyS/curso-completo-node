function UsuariosDAO(connection) {
    this._connection = connection
}

UsuariosDAO.prototype.inserirUsuario = function(usuario){
    this._connection(async function(db){
        const usuarioCollection = await db.collection('usuario');
        const saved = await usuarioCollection.insertOne(usuario);
        if (saved) {
            console.log('Usuário salvo com sucesso');
        }
        return 0;
    })
}

UsuariosDAO.prototype.autenticar = function(usuario, req, res){
    this._connection( async function(db) {
        const usuarioCollection = await db.collection('usuario');
        return await usuarioCollection.find(usuario).toArray(function(error, result){
            if (result[0] != undefined) {
                req.session.autorizado = true
                req.session.usuario = result[0].usuario
                req.session.casa = result[0].casa
            }
    
            if (req.session.autorizado) {
                res.render("jogo", {img_casa: req.session.casa})
            } else {
                res.render("index", {validacao: {}});
            }
        });
    })
}

module.exports = function() {
    return UsuariosDAO;
}