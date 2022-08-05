/* Importar configurações do servidor */
const app = require('./config/server');

/* Parametrizar a porta de escuta */
app.listen(8080, () => {
    console.log('Server online');
});

