module.exports = function(application){
	application.get('/', function(req, res){

		//res.render('222') //Colocado para visualizar o erro interno do servidor
		res.format({
			html: function() {
				res.send('Bem vindo a sua app NodeJS!')
			},

			json: function() {
				const retorno = {
					body: 'Bem vindo a sua app NodeJS!',
				}
				res.json(retorno);
			}
		
		});
	});

	application.post('/', function(req, res){
		const dados = req.body;
		res.send(dados);
	});
}