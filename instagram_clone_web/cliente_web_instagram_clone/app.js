/* importar as configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
app.listen(8081, function(){
	console.log('Server online on http://localhost:8081');
})